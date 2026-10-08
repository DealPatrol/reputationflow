import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  getCurrentUser: vi.fn(),
  claimAdsPurchase: vi.fn(),
}))

vi.mock("@/lib/auth", () => ({ getCurrentUser: mocks.getCurrentUser }))
vi.mock("@/lib/db", () => ({ claimAdsPurchase: mocks.claimAdsPurchase }))

import { GET } from "@/app/api/stripe/confirmed-purchase/route"

describe("GET /api/stripe/confirmed-purchase", () => {
  beforeEach(() => {
    mocks.getCurrentUser.mockReset()
    mocks.claimAdsPurchase.mockReset()
  })

  it("does not report a purchase before Stripe has activated Professional", async () => {
    mocks.getCurrentUser.mockResolvedValue({ id: "user-1", email: "owner@example.com", businessId: 7 })
    mocks.claimAdsPurchase.mockResolvedValue({ state: "pending" })
    const response = await GET(new Request("http://localhost/api/stripe/confirmed-purchase") as never)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ confirmed: false })
  })

  it("reports the purchase once, at the Professional price, after confirmation", async () => {
    mocks.getCurrentUser.mockResolvedValue({ id: "user-1", email: "owner@example.com", businessId: 7 })
    mocks.claimAdsPurchase.mockResolvedValue({ state: "ready", transactionId: "sub_123" })
    const response = await GET(new Request("http://localhost/api/stripe/confirmed-purchase") as never)
    expect(await response.json()).toEqual({
      confirmed: true,
      report: true,
      transactionId: "sub_123",
      value: 20,
      currency: "USD",
    })
  })

  it("does not report the purchase again", async () => {
    mocks.getCurrentUser.mockResolvedValue({ id: "user-1", email: "owner@example.com", businessId: 7 })
    mocks.claimAdsPurchase.mockResolvedValue({ state: "already" })
    const response = await GET(new Request("http://localhost/api/stripe/confirmed-purchase") as never)
    expect(await response.json()).toEqual({ confirmed: true, report: false })
  })
})
