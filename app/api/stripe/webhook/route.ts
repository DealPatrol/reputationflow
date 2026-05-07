import { stripe } from "@/lib/stripe"
import { updateSubscription } from "@/lib/db"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: Request) {
  try {
    if (!stripe) {
      console.log("[v0] Stripe not configured, skipping webhook")
      return NextResponse.json({ received: true })
    }

    const body = await request.text()
    const headersList = await headers()
    const sig = headersList.get("stripe-signature") || ""

    let event

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err: any) {
      console.error(`[v0] Webhook Error: ${err.message}`)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as any
        const businessId = session.client_reference_id

        if (businessId) {
          await updateSubscription(businessId, {
            plan_type: "pro",
            status: "active",
            stripe_subscription_id: session.subscription as string,
          })
          console.log(`[v0] Subscription created for business ${businessId}`)
        }
        break

      case "customer.subscription.updated":
        const subscription = event.data.object as any
        console.log(`[v0] Subscription updated: ${subscription.id}`)
        break

      case "customer.subscription.deleted":
        const deletedSub = event.data.object as any
        console.log(`[v0] Subscription cancelled: ${deletedSub.id}`)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
