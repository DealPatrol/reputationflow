export type SetupCompletionResult = "saved" | "qr"

export function setupCompletionToReport(input: {
  alreadyReported: boolean
  arrivedWithSavedLink: boolean
  linkSavedThisVisit: boolean
  qrReadyWithoutLink: boolean
}): SetupCompletionResult | null {
  if (input.alreadyReported || input.arrivedWithSavedLink) return null
  if (input.linkSavedThisVisit) return "saved"
  if (input.qrReadyWithoutLink) return "qr"
  return null
}

export function isProfessionalSubscriber(business: {
  is_premium?: unknown
  plan_type?: unknown
  subscription_status?: unknown
} | null): boolean {
  if (!business) return false
  if (business.is_premium === true) return true
  return business.plan_type === "pro" && business.subscription_status === "active"
}

export function canOfferProfessionalCheckout(input: {
  isPremium: boolean
  subscriptionStatus?: string | null
}): boolean {
  if (input.isPremium) return false
  if (input.subscriptionStatus === "past_due") return false
  return true
}
