import bcrypt from "bcryptjs"
import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  getCurrentUser: vi.fn(),
  destroySession: vi.fn(),
  getUserById: vi.fn(),
  getAccountBillingRefs: vi.fn(),
  deleteUserAccount: vi.fn(),
  isDemoMode: vi.fn(),
  retrieve: vi.fn(),
  cancel: vi.fn(),
  del: vi.fn(),
  stripeEnabled: { value: true },
}))

vi.mock("@/lib/auth", () => ({ getCurrentUser: mocks.getCurrentUser, destroySession: mocks.destroySession }))
vi.mock("@/lib/db", () => ({
  getUserById: mocks.getUserById,
  getAccountBillingRefs: mocks.getAccountBillingRefs,
  deleteUserAccount: mocks.deleteUserAccount,
}))
vi.mock("@/lib/demo", () => ({ isDemoMode: mocks.isDemoMode }))
vi.mock("@/lib/stripe", () => ({
  getStripeClient: () =>
    mocks.stripeEnabled.value
      ? { subscriptions: { retrieve: mocks.retrieve, cancel: mocks.cancel }, customers: { del: mocks.del } }
      : null,
}))

import { POST } from "@/app/api/auth/delete-account/route"

const user = { id: "user-1", email: "owner@example.com", businessId: 7 }

function request(body: unknown) {
  return new Request("http://localhost/api/auth/delete-account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as never
}

describe("POST /api/auth/delete-account", () => {
  beforeEach(async () => {
    for (const fn of Object.values(mocks)) if (typeof fn === "function") (fn as ReturnType<typeof vi.fn>).mockReset()
    mocks.stripeEnabled.value = true
    mocks.isDemoMode.mockReturnValue(false)
    mocks.getCurrentUser.mockResolvedValue(user)
    mocks.getUserById.mockResolvedValue({ id: "user-1", email: "owner@example.com", password_hash: await bcrypt.hash("right-password", 4) })
    mocks.getAccountBillingRefs.mockResolvedValue({ businessId: 7, stripeCustomerId: null, stripeSubscriptionIds: [], hasAppStoreSubscription: false })
    mocks.deleteUserAccount.mockResolvedValue(true)
  })

  it("requires a signed-in user", async () => {
    mocks.getCurrentUser.mockResolvedValue(null)
    const response = await POST(request({ password: "x", confirmation: "DELETE" }))
    expect(response.status).toBe(401)
  })

  it("requires the typed confirmation and the correct password", async () => {
    expect((await POST(request({ password: "right-password", confirmation: "delete" }))).status).toBe(400)
    expect((await POST(request({ password: "wrong", confirmation: "DELETE" }))).status).toBe(403)
    expect(mocks.deleteUserAccount).not.toHaveBeenCalled()
  })

  it("does not delete the keyless demo account", async () => {
    mocks.isDemoMode.mockReturnValue(true)
    expect((await POST(request({ password: "right-password", confirmation: "DELETE" }))).status).toBe(400)
    expect(mocks.deleteUserAccount).not.toHaveBeenCalled()
  })

  it("cancels Stripe billing, deletes the account, and ends the session", async () => {
    mocks.getAccountBillingRefs.mockResolvedValue({ businessId: 7, stripeCustomerId: "cus_1", stripeSubscriptionIds: ["sub_1"], hasAppStoreSubscription: true })
    mocks.retrieve.mockResolvedValue({ id: "sub_1", status: "active" })
    mocks.del.mockResolvedValue({ deleted: true })
    const response = await POST(request({ password: "right-password", confirmation: "DELETE" }))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: true, appStoreSubscriptionActive: true })
    expect(mocks.cancel).toHaveBeenCalledWith("sub_1")
    expect(mocks.del).toHaveBeenCalledWith("cus_1")
    expect(mocks.deleteUserAccount).toHaveBeenCalledWith("user-1", "owner@example.com")
    expect(mocks.destroySession).toHaveBeenCalled()
  })

  it("deletes nothing when Stripe cancellation fails", async () => {
    mocks.getAccountBillingRefs.mockResolvedValue({ businessId: 7, stripeCustomerId: null, stripeSubscriptionIds: ["sub_1"], hasAppStoreSubscription: false })
    mocks.retrieve.mockResolvedValue({ id: "sub_1", status: "active" })
    mocks.cancel.mockRejectedValue(new Error("stripe down"))
    const response = await POST(request({ password: "right-password", confirmation: "DELETE" }))
    expect(response.status).toBe(502)
    expect(mocks.deleteUserAccount).not.toHaveBeenCalled()
  })

  it("does not delete a paying account when Stripe is not configured", async () => {
    mocks.stripeEnabled.value = false
    mocks.getAccountBillingRefs.mockResolvedValue({ businessId: 7, stripeCustomerId: "cus_1", stripeSubscriptionIds: [], hasAppStoreSubscription: false })
    expect((await POST(request({ password: "right-password", confirmation: "DELETE" }))).status).toBe(503)
    expect(mocks.deleteUserAccount).not.toHaveBeenCalled()
  })
})
