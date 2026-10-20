"use client"

import { track } from "@vercel/analytics"
import { capProperties, cleanLocation } from "@/lib/funnel"
import { pagePath, readFunnelOrigin, rememberFunnelOrigin } from "@/lib/funnel-client"

export const FUNNEL_EVENT = {
  generatorUsed: "Generator Used",
  qrDownloaded: "QR Downloaded",
  pricingClicked: "Pricing Clicked",
  signupStarted: "Signup Started",
  setupCtaClicked: "Setup CTA Clicked",
  setupCompleted: "Setup Completed",
  upgradeClicked: "Upgrade Clicked",
  checkoutStarted: "Checkout Started",
} as const

function trackEvent(name: string, properties: Record<string, string>) {
  const payload = capProperties(properties)
  if (process.env.NODE_ENV === "development") {
    console.info("[reputationflow analytics]", name, payload)
  }
  try {
    track(name, payload)
  } catch {
    // Analytics must not block signup, checkout, or the free tool.
  }
}

function rememberCurrentPage() {
  const path = pagePath()
  if (path) rememberFunnelOrigin(path)
  return path
}

export function trackGeneratorUsed(kind: "review" | "plain") {
  const path = rememberCurrentPage()
  trackEvent(FUNNEL_EVENT.generatorUsed, { path, kind })
}

export function trackQrDownloaded(format: "png" | "card" | "tent") {
  const path = rememberCurrentPage()
  trackEvent(FUNNEL_EVENT.qrDownloaded, { path, format })
}

export function trackPricingClick(location: string) {
  const path = rememberCurrentPage()
  trackEvent(FUNNEL_EVENT.pricingClicked, { path, location: cleanLocation(location) })
}

export function trackSignupClick(location: string) {
  rememberCurrentPage()
  const origin = readFunnelOrigin() || pagePath()
  trackEvent(FUNNEL_EVENT.signupStarted, { origin, location: cleanLocation(location) })
}

export function trackSetupCtaClick(location: string) {
  rememberCurrentPage()
  const origin = readFunnelOrigin() || pagePath()
  trackEvent(FUNNEL_EVENT.setupCtaClicked, { origin, location: cleanLocation(location) })
}

export function trackSetupCompleted(result: "saved" | "qr") {
  rememberCurrentPage()
  trackEvent(FUNNEL_EVENT.setupCompleted, { origin: readFunnelOrigin(), result: cleanLocation(result) })
}

export function trackUpgradeClick(location: string) {
  rememberCurrentPage()
  trackEvent(FUNNEL_EVENT.upgradeClicked, { origin: readFunnelOrigin(), location: cleanLocation(location) })
}

export function trackCheckoutStart(plan: "professional") {
  rememberCurrentPage()
  trackEvent(FUNNEL_EVENT.checkoutStarted, { origin: readFunnelOrigin(), plan })
}
