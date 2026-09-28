import Stripe from "stripe"
export { PLANS, type PlanType } from "@/lib/plans"

let stripeClient: Stripe | null = null

export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  stripeClient ??= new Stripe(key, { typescript: true })
  return stripeClient
}

