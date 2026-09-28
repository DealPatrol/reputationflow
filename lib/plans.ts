export const PLANS = {
  free: {
    name: "Starter",
    price: 0,
    priceId: null as string | null,
    description: "One review link, a QR code, and your latest customer feedback.",
    features: [
      "1 review link and QR code",
      "Google, Facebook, and Yelp buttons for every customer",
      "Optional private feedback on the same page",
      "Latest response in the dashboard",
      "Basic analytics",
    ],
    limits: {
      campaigns: 0,
      feedback_view: 1,
      ai_responses: 0,
    },
  },
  pro: {
    name: "Professional",
    price: 2000,
    priceId: process.env.STRIPE_PRICE_ID_PRO || null,
    description: "Email requests, full history, and drafts you can edit before you publish.",
    features: [
      "Everything in Starter",
      "Email review requests",
      "Full feedback history",
      "AI-assisted response drafts",
      "Additional location links",
      "CSV export",
      "Email support",
    ],
    limits: {
      campaigns: -1,
      feedback_view: -1,
      ai_responses: -1,
    },
  },
} as const

export type PlanType = keyof typeof PLANS

export function formatPlanPrice(cents: number) {
  if (cents === 0) return "Free"
  return `$${cents / 100}`
}
