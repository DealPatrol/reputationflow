export const PLANS = {
  free: {
    name: "Starter",
    price: 0,
    priceId: null,
    features: ["1 review collection link", "Basic analytics", "Email support", "Multi-location routing basics"],
    limits: { campaigns: 3, feedback_view: 1, ai_responses: 0 },
  },
  pro: {
    name: "Professional",
    price: 2000,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO || "price_pro",
    features: ["Unlimited review links", "Unlimited feedback history", "Email automation", "Advanced analytics & NPS", "SMS notifications", "QR code generation", "Priority support", "White-label option"],
    limits: { campaigns: -1, feedback_view: -1, ai_responses: -1 },
  },
} as const

export type PlanType = keyof typeof PLANS
