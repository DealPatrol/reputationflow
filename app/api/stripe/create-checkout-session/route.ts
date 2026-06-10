import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: Request) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment variables." },
        { status: 503 },
      )
    }

    // Dynamically import Stripe only when needed
    const Stripe = (await import("stripe")).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-11-17.clover" as any,
    })

    const { planType, userId, businessId } = await request.json()

    if (planType !== "pro") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    // Get business
    const businesses = await (sql as any)`
      SELECT * FROM businesses WHERE id = ${businessId} LIMIT 1
    ` as any[]

    if (businesses.length === 0) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    const business = businesses[0]

    // Create or retrieve Stripe customer
    let customerId = business.stripe_customer_id

    const priceId = process.env.STRIPE_PRICE_ID_PRO || "price_1TgaEWLtoPzYBT7ApjKr2V5T"

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: `user-${userId}@reputationflow.app`,
        metadata: {
          userId: userId,
          businessId: business.id,
        },
      })
      customerId = customer.id

      await (sql as any)`
        UPDATE businesses
        SET stripe_customer_id = ${customerId}
        WHERE id = ${business.id}
      `
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?canceled=true`,
      metadata: {
        userId: userId,
        businessId: business.id,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error("[v0] Stripe checkout error:", error)
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 })
  }
}
