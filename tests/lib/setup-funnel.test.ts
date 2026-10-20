import { describe, expect, it } from "vitest"
import {
  canOfferProfessionalCheckout,
  isProfessionalSubscriber,
  setupCompletionToReport,
} from "@/lib/setup-funnel"

describe("setup completion", () => {
  it("reports a saved review link once, and a QR code only when no link was saved", () => {
    expect(
      setupCompletionToReport({
        alreadyReported: false,
        arrivedWithSavedLink: false,
        linkSavedThisVisit: true,
        qrReadyWithoutLink: false,
      }),
    ).toBe("saved")
    expect(
      setupCompletionToReport({
        alreadyReported: false,
        arrivedWithSavedLink: false,
        linkSavedThisVisit: false,
        qrReadyWithoutLink: true,
      }),
    ).toBe("qr")
    expect(
      setupCompletionToReport({
        alreadyReported: true,
        arrivedWithSavedLink: false,
        linkSavedThisVisit: true,
        qrReadyWithoutLink: true,
      }),
    ).toBeNull()
    expect(
      setupCompletionToReport({
        alreadyReported: false,
        arrivedWithSavedLink: true,
        linkSavedThisVisit: true,
        qrReadyWithoutLink: true,
      }),
    ).toBeNull()
    expect(
      setupCompletionToReport({
        alreadyReported: false,
        arrivedWithSavedLink: false,
        linkSavedThisVisit: true,
        qrReadyWithoutLink: true,
      }),
    ).toBe("saved")
  })

  it("offers checkout to free accounts and holds it for an active or past-due subscription", () => {
    expect(isProfessionalSubscriber({ is_premium: true, plan_type: "free", subscription_status: "active" })).toBe(true)
    expect(isProfessionalSubscriber({ plan_type: "pro", subscription_status: "active" })).toBe(true)
    expect(isProfessionalSubscriber({ plan_type: "pro", subscription_status: "cancelled" })).toBe(false)
    expect(isProfessionalSubscriber(null)).toBe(false)
    expect(canOfferProfessionalCheckout({ isPremium: false, subscriptionStatus: "active" })).toBe(true)
    expect(canOfferProfessionalCheckout({ isPremium: true, subscriptionStatus: "active" })).toBe(false)
    expect(canOfferProfessionalCheckout({ isPremium: false, subscriptionStatus: "past_due" })).toBe(false)
    expect(canOfferProfessionalCheckout({ isPremium: false, subscriptionStatus: "cancelled" })).toBe(true)
  })
})
