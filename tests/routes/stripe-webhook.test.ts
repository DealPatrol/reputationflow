import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  claimWebhookEvent: vi.fn(),
  constructEvent: vi.fn(),
  releaseWebhookEvent: vi.fn(),
  updateSubscription: vi.fn(),
  updateSubscriptionByStripeId: vi.fn(),
}))

vi.mock("@/lib/db", () => ({
  claimWebhookEvent: mocks.claimWebhookEvent,
  releaseWebhookEvent: mocks.releaseWebhookEvent,
  updateSubscription: mocks.updateSubscription,
  updateSubscriptionByStripeId: mocks.updateSubscriptionByStripeId,
}))
vi.mock("@/lib/stripe", () => ({
  getStripeClient: () => ({ webhooks: { constructEvent: mocks.constructEvent } }),
}))

import { POST } from "@/app/api/stripe/webhook/route"

describe("POST /api/stripe/webhook", () => {
  beforeEach(() => {
    process.env.DATABASE_URL = "postgresql://test"
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test"
  })

  it("activates a Pro subscription once for a verified checkout event", async () => {
    mocks.constructEvent.mockReturnValue({
      id: "evt_checkout",
      type: "checkout.session.completed",
      data: {
        object: {
          client_reference_id: "42",
          metadata: { businessId: "42" },
          subscription: "sub_123",
        },
      },
    })
    mocks.claimWebhookEvent.mockResolvedValue(true)

    const response = await POST(
      new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: { "stripe-signature": "valid" },
        body: "{}",
      }),
    )

    expect(response.status).toBe(200)
    expect(mocks.updateSubscription).toHaveBeenCalledWith("42", {
      plan_type: "pro",
      status: "active",
      stripe_subscription_id: "sub_123",
    })
  })

  it("acknowledges duplicate events without applying them again", async () => {
    mocks.constructEvent.mockReturnValue({
      id: "evt_duplicate",
      type: "checkout.session.completed",
      data: { object: { client_reference_id: "42", subscription: "sub_123" } },
    })
    mocks.claimWebhookEvent.mockResolvedValue(false)

    const response = await POST(
      new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: { "stripe-signature": "valid" },
        body: "{}",
      }),
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ duplicate: true })
    expect(mocks.updateSubscription).not.toHaveBeenCalled()
  })
})
