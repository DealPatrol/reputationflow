import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  getCurrentUser: vi.fn(),
  getBusinessByUserId: vi.fn(),
  applyAppStoreEntitlement: vi.fn(),
  refreshAppStorePlan: vi.fn(),
  isDemoMode: vi.fn(),
  verifyAppleJws: vi.fn(),
}))

vi.mock("@/lib/auth", () => ({ getCurrentUser: mocks.getCurrentUser }))
vi.mock("@/lib/db", () => ({
  getBusinessByUserId: mocks.getBusinessByUserId,
  applyAppStoreEntitlement: mocks.applyAppStoreEntitlement,
  refreshAppStorePlan: mocks.refreshAppStorePlan,
}))
vi.mock("@/lib/demo", () => ({ isDemoMode: mocks.isDemoMode }))
vi.mock("@/lib/app-store", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/app-store")>()
  return { ...actual, verifyAppleJws: mocks.verifyAppleJws }
})

import { AppStoreVerificationError } from "@/lib/app-store"
import { POST } from "@/app/api/iap/apple/sync/route"

const USER_ID = "8b0c1d2e-0000-4000-8000-000000000001"
const tx = {
  bundleId: "com.colecollins.reputationflow",
  productId: "com.colecollins.reputationflow.pro.yearly",
  transactionId: "t2",
  originalTransactionId: "t1",
  expiresDate: Date.now() + 86400000,
  appAccountToken: USER_ID.toUpperCase(),
}

function request(transactions: unknown) {
  return new Request("http://localhost/api/iap/apple/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transactions }),
  }) as never
}

describe("POST /api/iap/apple/sync", () => {
  beforeEach(() => {
    Object.values(mocks).forEach((fn) => fn.mockReset())
    mocks.isDemoMode.mockReturnValue(false)
    mocks.getCurrentUser.mockResolvedValue({ id: USER_ID, email: "owner@example.com", businessId: 7 })
    mocks.getBusinessByUserId.mockResolvedValue({ id: 7, is_premium: true })
    mocks.refreshAppStorePlan.mockResolvedValue("inactive")
  })

  it("requires sign-in", async () => {
    mocks.getCurrentUser.mockResolvedValue(null)
    expect((await POST(request(["jws"]))).status).toBe(401)
  })

  it("activates Professional for a verified transaction owned by this account", async () => {
    mocks.verifyAppleJws.mockReturnValue(tx)
    mocks.applyAppStoreEntitlement.mockResolvedValue("active")
    const response = await POST(request(["signed"]))
    expect(await response.json()).toEqual({ status: "active", isPremium: true, rejected: 0, linkedElsewhere: false })
    expect(mocks.applyAppStoreEntitlement).toHaveBeenCalledWith(7, expect.objectContaining({ originalTransactionId: "t1", active: true }))
  })

  it("never applies a purchase made for a different ReputationFlow account", async () => {
    mocks.verifyAppleJws.mockReturnValue({ ...tx, appAccountToken: "11111111-1111-4111-8111-111111111111" })
    mocks.getBusinessByUserId.mockResolvedValue({ id: 7, is_premium: false })
    const data = await (await POST(request(["signed"]))).json()
    expect(data.linkedElsewhere).toBe(true)
    expect(mocks.applyAppStoreEntitlement).not.toHaveBeenCalled()
  })

  it("counts unverifiable data and recomputes the plan", async () => {
    mocks.verifyAppleJws.mockImplementation(() => {
      throw new AppStoreVerificationError("JWS is not signed by Apple")
    })
    mocks.getBusinessByUserId.mockResolvedValue({ id: 7, is_premium: false })
    const data = await (await POST(request(["forged"]))).json()
    expect(data).toMatchObject({ status: "inactive", isPremium: false, rejected: 1 })
    expect(mocks.refreshAppStorePlan).toHaveBeenCalledWith(7)
  })
})
