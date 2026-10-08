"use client"

import { track } from "@vercel/analytics"
import { adsConfig, googleAdsSendTo } from "@/lib/ads-config"

type Gtag = (...args: unknown[]) => void
type Fbq = (...args: unknown[]) => void

function gtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined
  return (window as Window & { gtag?: Gtag }).gtag
}

function fbq(): Fbq | undefined {
  if (typeof window === "undefined") return undefined
  return (window as Window & { fbq?: Fbq }).fbq
}

function trackVercel(name: string, properties: Record<string, string>) {
  try {
    track(name, properties)
  } catch {
    // Analytics must not block the action that just succeeded.
  }
}

export function trackLead(source: string) {
  const config = adsConfig()
  if (config.metaPixelId) fbq()?.("track", "Lead", { content_name: source })
  if (config.ga4Id) gtag()?.("event", "generate_lead", { lead_source: source })
  const sendTo = googleAdsSendTo(config.googleAdsId, config.leadLabel)
  if (sendTo) gtag()?.("event", "conversion", { send_to: sendTo })
  trackVercel("Lead", { source })
}

export function trackSignup() {
  const config = adsConfig()
  if (config.metaPixelId) fbq()?.("track", "CompleteRegistration")
  if (config.ga4Id) gtag()?.("event", "sign_up")
  const sendTo = googleAdsSendTo(config.googleAdsId, config.signupLabel)
  if (sendTo) gtag()?.("event", "conversion", { send_to: sendTo })
  trackVercel("Signup", { method: "email" })
}

export function trackPurchase(input: { transactionId: string; value: number; currency: "USD" }) {
  const config = adsConfig()
  if (config.metaPixelId) {
    fbq()?.("track", "Purchase", { value: input.value, currency: input.currency })
  }
  if (config.ga4Id) {
    gtag()?.("event", "purchase", {
      transaction_id: input.transactionId,
      value: input.value,
      currency: input.currency,
    })
  }
  const sendTo = googleAdsSendTo(config.googleAdsId, config.purchaseLabel)
  if (sendTo) {
    gtag()?.("event", "conversion", {
      send_to: sendTo,
      value: input.value,
      currency: input.currency,
      transaction_id: input.transactionId,
    })
  }
  trackVercel("Purchase", { transaction_id: input.transactionId })
}
