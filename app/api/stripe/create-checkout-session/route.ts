import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getBusinessByUserId, updateBusinessStripeCustomer } from "@/lib/db"
import { getStripeClient, PLANS } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

    const { planType } = await request.json()
    if (planType !== "pro") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const stripe = getStripeClient()
    const priceId = PLANS.pro.priceId
    if (!stripe || !priceId || !process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Billing is unavailable in demo mode." }, { status: 503 })
    }

    const business = await getBusinessByUserId(user.id)
    if (!business || business.id !== user.businessId) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }
    let customerId = business.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
          businessId: String(business.id),
        },
      })
      customerId = customer.id
      await updateBusinessStripeCustomer(business.id, customerId)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: String(business.id),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?canceled=true`,
      metadata: {
        userId: user.id,
        businessId: String(business.id),
      },
      subscription_data: { metadata: { businessId: String(business.id) } },
      integration_identifier: "reputationflow_qxjkmnpr",
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("[v0] Stripe checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
