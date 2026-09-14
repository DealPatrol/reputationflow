export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  mode: "payment" | "subscription"
  interval?: "month" | "year"
  trialPeriodDays?: number
}

// This is the source of truth for all products.
// All UI to display products should pull from this array.
// IDs passed to the checkout session should be the same as IDs from this array.
export const PRODUCTS: Product[] = [
  {
    id: "pro-monthly",
    name: "Feedbackr Professional",
    description: "Unlimited review links, email automation, advanced analytics, SMS notifications, QR codes, and priority support.",
    priceInCents: 2000, // $20.00
    mode: "subscription",
    interval: "month",
    trialPeriodDays: 3,
  },
  {
    id: "pro-yearly",
    name: "Feedbackr Professional (Annual)",
    description: "Save 20% with annual billing. All professional features included.",
    priceInCents: 19200, // $192.00/year ($16/mo equivalent)
    mode: "subscription",
    interval: "year",
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
