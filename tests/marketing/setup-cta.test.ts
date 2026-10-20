import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { PLANS } from "@/lib/plans"
import { SETUP_CTA_LABEL, SETUP_CTA_NOTE, SIGNUP_PATH } from "@/lib/signup"

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8")
}

describe("free setup call to action", () => {
  it("keeps Professional checkout and adds the free review-link setup on the named pages", () => {
    const pricing = source("app/pricing/page.tsx")
    const compare = source("app/compare/[slug]/page.tsx")
    const qr = source("app/tools/qr-code/page.tsx")
    const tool = source("components/tools/google-review-qr-tool.tsx")
    const setupLink = source("components/marketing/setup-link.tsx")
    const checkout = source("lib/start-checkout.ts")
    const stripeRoute = source("app/api/stripe/create-checkout-session/route.ts")

    expect(SETUP_CTA_LABEL).toBe("Set up your Google review link free")
    expect(SETUP_CTA_NOTE).toContain("No card")
    expect(PLANS.pro.price).toBe(2000)
    expect(pricing).toContain("professionalSignupPath()")
    expect(pricing).toContain('location="pricing_setup"')
    expect(pricing).toContain('setupLocation="pricing_band_setup"')
    expect(pricing).toContain("Create a free account, then checkout")
    expect(pricing).toContain("Stripe checkout as soon as the account exists")
    expect(pricing).not.toContain("Open Billing and choose Professional")
    expect(source("app/auth/signin/page.tsx")).toContain("startProfessionalCheckout()")
    expect(source("app/auth/signin/page.tsx")).toContain("After this form, Stripe checkout opens.")
    expect(source("app/auth/signin/page.tsx")).not.toContain("After this form, billing opens.")
    expect(source("components/billing-view.tsx")).toContain("Stripe checkout did not open")
    expect(source("components/billing-view.tsx")).toContain("Continue to Stripe")
    expect(compare).toContain("professionalSignupPath()")
    expect(compare).toContain("compare_${comparison.slug}_setup")
    expect(compare).toContain("compare_${comparison.slug}_choose")
    expect(compare).toContain("compare_${comparison.slug}_band")
    expect(compare).toContain("Create a free account, then checkout")
    expect(qr).toContain('location="tool_qr_setup"')
    expect(qr).toContain('setupLocation="tool_qr_result_setup"')
    expect(qr).toContain('setupLocation="tool_qr_band_setup"')
    expect(tool).toContain("setupLocation")
    expect(setupLink).toContain("SIGNUP_PATH")
    expect(setupLink).toContain("trackSetupCtaClick")
    expect(setupLink).not.toContain("professionalSignupPath")
    expect(setupLink).not.toContain("plan=")
    expect(SIGNUP_PATH).toBe("/signup")
    expect(checkout).toContain('planType: "pro"')
    expect(checkout).toContain("trackCheckoutStart")
    expect(stripeRoute).toContain('planType !== "pro"')
    expect(stripeRoute).toContain("line_items: [{ price: priceId, quantity: 1 }]")
    expect(source("app/onboarding/page.tsx")).toContain('location="onboarding_success"')
    expect(source("app/onboarding/page.tsx")).toContain("trackSetupCompleted")
    expect(source("components/dashboard-client.tsx")).toContain('location="dashboard_banner"')
    expect(source("components/billing-view.tsx")).toContain('trackUpgradeClick("billing")')
    expect(source("components/billing-view.tsx")).toContain("startProfessionalCheckout")
  })
})