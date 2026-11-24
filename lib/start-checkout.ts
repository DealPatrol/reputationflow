"use client"

import { trackCheckoutStart } from "@/lib/analytics-events"
import { isNativeIos } from "@/lib/native/platform"

type CheckoutResponse = {
  url?: unknown
  error?: unknown
}

export async function startProfessionalCheckout(): Promise<void> {
  if (isNativeIos()) {
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- full reload drops cached client state
    window.location.assign("/dashboard?tab=billing")
    return
  }
  const response = await fetch("/api/stripe/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planType: "pro" }),
  })

  const data = (await response.json().catch(() => ({}))) as CheckoutResponse
  const url = typeof data.url === "string" ? data.url : ""
  if (!response.ok || !url) {
    const message = typeof data.error === "string" && data.error ? data.error : "Failed to create checkout session"
    throw new Error(message)
  }

  trackCheckoutStart("professional")
  window.location.href = url
}
