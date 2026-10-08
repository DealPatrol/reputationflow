import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  createSession: vi.fn(),
  createBusiness: vi.fn(),
  createUser: vi.fn(),
  isDemoMode: vi.fn(),
  saveUserAttribution: vi.fn(),
  sendWelcomeEmail: vi.fn(),
  updateBusinessOwnerEmail: vi.fn(),
}))

vi.mock("@/lib/auth", () => ({ createSession: mocks.createSession }))
vi.mock("@/lib/db", () => ({
  createBusiness: mocks.createBusiness,
  createUser: mocks.createUser,
  saveUserAttribution: mocks.saveUserAttribution,
  updateBusinessOwnerEmail: mocks.updateBusinessOwnerEmail,
}))
vi.mock("@/lib/demo", () => ({ isDemoMode: mocks.isDemoMode }))
vi.mock("@/lib/email", () => ({ sendWelcomeEmail: vi.fn(() => Promise.resolve()) }))

import { POST } from "@/app/api/auth/signup/route"

describe("POST /api/auth/signup attribution", () => {
  beforeEach(() => {
    mocks.isDemoMode.mockReturnValue(false)
    mocks.createUser.mockResolvedValue({ id: "user-1" })
    mocks.createBusiness.mockResolvedValue({ id: 7 })
    mocks.saveUserAttribution.mockResolvedValue(true)
    mocks.createSession.mockResolvedValue(undefined)
  })

  it("stores sanitized campaign parameters on the new user", async () => {
    const response = await POST(new Request("http://localhost/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: "owner@example.com",
        password: "correct-password",
        businessName: "Northside",
        attribution: { utm_source: "google", gclid: "click123", fbclid: "bad id" },
      }),
    }) as never)

    expect(response.status).toBe(200)
    const userId = mocks.createUser.mock.calls[0][0]
    expect(mocks.saveUserAttribution).toHaveBeenCalledWith(userId, {
      utm_source: "google",
      gclid: "click123",
    })
  })
})
