import type Stripe from "stripe"
import { NextResponse } from "next/server"
import {
  claimWebhookEvent,
  releaseWebhookEvent,
  updateSubscription,
  updateSubscriptionByStripeId,
} from "@/lib/db"
import { getStripeClient } from "@/lib/stripe"

function subscriptionStatus(status: Stripe.Subscription.Status) {
  if (status === "active" || status === "trialing") return "active"
  if (status === "past_due" || status === "unpaid") return "past_due"
  return "cancelled"
}

export async function POST(request: Request) {
  let eventId: string | null = null
  try {
    const stripe = getStripeClient()
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!stripe || !endpointSecret) {
      return NextResponse.json({ error: "Stripe webhook is not configured" }, { status: 503 })
    }

    const body = await request.text()
    const signature = request.headers.get("stripe-signature")
    if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 })

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    eventId = event.id
    if (!(await claimWebhookEvent(event.id, event.type))) {
      return NextResponse.json({ received: true, duplicate: true })
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      const businessId = session.client_reference_id || session.metadata?.businessId
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : session.subscription?.id
      if (businessId && subscriptionId) {
        await updateSubscription(businessId, {
          plan_type: "pro",
          status: "active",
          stripe_subscription_id: subscriptionId,
        })
      }
    } else if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object
      await updateSubscriptionByStripeId(subscription.id, {
        status: subscriptionStatus(subscription.status),
      })
    } else if (event.type === "customer.subscription.deleted") {
      await updateSubscriptionByStripeId(event.data.object.id, { status: "cancelled" })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    if (eventId) await releaseWebhookEvent(eventId)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
