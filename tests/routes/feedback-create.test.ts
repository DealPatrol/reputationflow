import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  createFeedback: vi.fn(),
  getCurrentUser: vi.fn(),
  getBusinessById: vi.fn(),
  getBusinessOwnerEmail: vi.fn(),
  sendNegativeFeedbackAlert: vi.fn(),
}))

vi.mock("@/lib/db", () => ({
  createFeedback: mocks.createFeedback,
  getBusinessById: mocks.getBusinessById,
  getBusinessOwnerEmail: mocks.getBusinessOwnerEmail,
}))
vi.mock("@/lib/auth", () => ({ getCurrentUser: mocks.getCurrentUser }))
vi.mock("@/lib/email", () => ({ sendNegativeFeedbackAlert: mocks.sendNegativeFeedbackAlert }))

import { POST as createFeedbackRoute } from "@/app/api/feedback/create/route"
import { POST as publicFeedbackRoute } from "@/app/api/feedback/public/route"

describe("POST /api/feedback/public", () => {
  beforeEach(() => {
    mocks.getBusinessOwnerEmail.mockResolvedValue(null)
  })

  it("validates and persists private feedback without trusting a client-supplied type", async () => {
    mocks.getBusinessById.mockResolvedValue({ id: 7, business_name: "Example Co" })
    mocks.createFeedback.mockResolvedValue({ id: 99, rating: 2, type: "negative" })

    const response = await publicFeedbackRoute(
      new Request("http://localhost/api/feedback/public", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          businessId: 7,
          rating: 2,
          feedback_text: "Please improve response times.",
          type: "positive",
        }),
      }),
    )

    expect(response.status).toBe(200)
    expect(mocks.createFeedback).toHaveBeenCalledWith(
      7,
      expect.objectContaining({ rating: 2, type: "negative" }),
    )
  })

  it("rejects ratings outside the supported range", async () => {
    const response = await publicFeedbackRoute(
      new Request("http://localhost/api/feedback/public", {
        method: "POST",
        body: JSON.stringify({ businessId: 7, rating: 6 }),
      }),
    )

    expect(response.status).toBe(400)
    expect(mocks.createFeedback).not.toHaveBeenCalled()
  })

  it("uses the authenticated business for dashboard feedback creation", async () => {
    mocks.getCurrentUser.mockResolvedValue({ id: "user-1", email: "owner@example.com", businessId: 42 })
    mocks.createFeedback.mockResolvedValue({
      id: 100,
      rating: 5,
      feedback_text: "Excellent customer service.",
      type: "positive",
      created_at: new Date().toISOString(),
    })

    const response = await createFeedbackRoute(
      new Request("http://localhost/api/feedback/create", {
        method: "POST",
        body: JSON.stringify({
          businessId: 999,
          rating: 5,
          feedback_text: "Excellent customer service.",
          type: "negative",
        }),
      }) as never,
    )

    expect(response.status).toBe(200)
    expect(mocks.createFeedback).toHaveBeenCalledWith(
      42,
      expect.objectContaining({ rating: 5, type: "positive" }),
    )
  })
})
