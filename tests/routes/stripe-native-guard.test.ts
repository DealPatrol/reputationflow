import { describe, expect, it, vi } from "vitest"

const { getCurrentUser } = vi.hoisted(() => ({ getCurrentUser: vi.fn() }))
vi.mock("@/lib/auth", () => ({ getCurrentUser }))
vi.mock("@/lib/db", () => ({ getBusinessByUserId: vi.fn(), updateBusinessStripeCustomer: vi.fn() }))
vi.mock("@/lib/stripe", () => ({ getStripeClient: () => null, PLANS: { pro: { priceId: "price_1" } } }))

import { POST as checkout } from "@/app/api/stripe/create-checkout-session/route"
import { POST as portal } from "@/app/api/stripe/create-portal-session/route"

const IOS_UA = "Mozilla/5.0 (iPhone) AppleWebKit/605.1.15 Mobile/15E148 ReputationFlowIOS/1.0"

describe("Stripe routes inside the iOS app (Guideline 3.1.1)", () => {
  it("refuses web checkout and the billing portal from the app", async () => {
    for (const handler of [checkout, portal]) {
      const response = await handler(
        new Request("http://localhost/api/stripe/x", { method: "POST", headers: { "user-agent": IOS_UA }, body: "{}" }) as never,
      )
      expect(response.status).toBe(403)
    }
    expect(getCurrentUser).not.toHaveBeenCalled()
  })
})
