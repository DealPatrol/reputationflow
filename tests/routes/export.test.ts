import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  getCurrentUser: vi.fn(),
  getBusinessByUserId: vi.fn(),
  getFeedbackByBusinessId: vi.fn(),
  getCampaignsByBusinessId: vi.fn(),
}))

vi.mock("@/lib/auth", () => ({ getCurrentUser: mocks.getCurrentUser }))
vi.mock("@/lib/db", () => ({
  getBusinessByUserId: mocks.getBusinessByUserId,
  getFeedbackByBusinessId: mocks.getFeedbackByBusinessId,
  getCampaignsByBusinessId: mocks.getCampaignsByBusinessId,
}))

import { NextRequest } from "next/server"
import { GET as exportRoute } from "@/app/api/analytics/export/route"

describe("GET /api/analytics/export", () => {
  beforeEach(() => {
    mocks.getCurrentUser.mockReset()
    mocks.getBusinessByUserId.mockReset()
    mocks.getFeedbackByBusinessId.mockResolvedValue([])
  })

  it("requires a signed-in business", async () => {
    mocks.getCurrentUser.mockResolvedValue(null)
    const response = await exportRoute(new NextRequest("http://localhost/api/analytics/export"))
    expect(response.status).toBe(401)
    expect(mocks.getFeedbackByBusinessId).not.toHaveBeenCalled()
  })

  it("keeps CSV export on the Professional plan", async () => {
    mocks.getCurrentUser.mockResolvedValue({ id: "user-1", email: "owner@example.com", businessId: 7 })
    mocks.getBusinessByUserId.mockResolvedValue({ is_premium: false })
    const response = await exportRoute(new NextRequest("http://localhost/api/analytics/export"))
    expect(response.status).toBe(403)
    expect(mocks.getFeedbackByBusinessId).not.toHaveBeenCalled()
  })

  it("exports feedback for a Professional business", async () => {
    mocks.getCurrentUser.mockResolvedValue({ id: "user-1", email: "owner@example.com", businessId: 7 })
    mocks.getBusinessByUserId.mockResolvedValue({ is_premium: true })
    mocks.getFeedbackByBusinessId.mockResolvedValue([
      { id: 3, created_at: "2026-09-01T00:00:00.000Z", rating: 5, type: "positive", feedback_text: "Great", customer_email: "a@example.com" },
    ])
    const response = await exportRoute(new NextRequest("http://localhost/api/analytics/export"))
    expect(response.status).toBe(200)
    const body = await response.text()
    expect(body).toContain("Great")
    expect(mocks.getFeedbackByBusinessId).toHaveBeenCalledWith(7)
  })
})
