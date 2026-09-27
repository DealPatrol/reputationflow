import Stripe from "stripe"

let stripeClient: Stripe | null = null

export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  stripeClient ??= new Stripe(key, { typescript: true })
  return stripeClient
}

export const PLANS = {
  free: {
    name: "Starter",
    price: 0,
    priceId: null,
    features: ["1 review collection link", "Basic analytics", "Email support", "Multi-location routing basics"],
    limits: {
      campaigns: 3,
      feedback_view: 1,
      ai_responses: 0,
    },
  },
  pro: {
    name: "Professional",
    price: 2000, // $20 in cents
    priceId: process.env.STRIPE_PRICE_ID_PRO || null,
    features: [
      "Unlimited review links",
      "Unlimited feedback history",
      "Email automation",
      "Advanced analytics & NPS",
      "SMS notifications",
      "QR code generation",
      "Priority support",
      "White-label option",
    ],
    limits: {
      campaigns: -1, // unlimited
      feedback_view: -1, // unlimited
      ai_responses: -1, // unlimited
    },
  },
} as const

export type PlanType = keyof typeof PLANS
