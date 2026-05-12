"use server"

import { stripe } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"

export async function startCheckoutSession(productId: string) {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || process.env.VERCEL_URL || "http://localhost:3000"
  const returnUrl = `${baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`}/checkout/success`

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    return_url: returnUrl,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
          recurring: product.mode === "subscription" ? { interval: product.interval! } : undefined,
        },
        quantity: 1,
      },
    ],
    mode: product.mode,
  })

  return session.client_secret
}
