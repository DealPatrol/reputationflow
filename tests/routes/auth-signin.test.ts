import bcrypt from "bcryptjs"
import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  createSession: vi.fn(),
  getBusinessByUserId: vi.fn(),
  getUserByEmail: vi.fn(),
  isDemoMode: vi.fn(),
}))

vi.mock("@/lib/auth", () => ({ createSession: mocks.createSession }))
vi.mock("@/lib/db", () => ({
  getBusinessByUserId: mocks.getBusinessByUserId,
  getUserByEmail: mocks.getUserByEmail,
}))
vi.mock("@/lib/demo", () => ({
  DEMO_USER: {
    id: "demo-user",
    email: "demo@reputationflow.local",
    password: "demo-reputationflow",
    businessId: 1,
  },
  isDemoMode: mocks.isDemoMode,
}))

import { POST } from "@/app/api/auth/signin/route"

describe("POST /api/auth/signin", () => {
  beforeEach(() => {
    mocks.isDemoMode.mockReturnValue(false)
  })

  it("rejects an incorrect password without creating a session", async () => {
    mocks.getUserByEmail.mockResolvedValue({
      id: "user-1",
      email: "owner@example.com",
      password_hash: await bcrypt.hash("correct-password", 4),
    })

    const response = await POST(
      new Request("http://localhost/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({ email: "owner@example.com", password: "wrong-password" }),
      }) as never,
    )

    expect(response.status).toBe(401)
    expect(mocks.createSession).not.toHaveBeenCalled()
    expect(mocks.getBusinessByUserId).not.toHaveBeenCalled()
  })
})
