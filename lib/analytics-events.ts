"use client"

import { track } from "@vercel/analytics"

function trackEvent(name: string, properties: Record<string, string>) {
  try {
    track(name, properties)
  } catch {
    // Analytics must not block signup or checkout.
  }
}

export function trackSignupClick(location: string) {
  trackEvent("Signup Click", { location })
}

export function trackCheckoutStart(plan: "professional") {
  trackEvent("Checkout Started", { plan })
}
