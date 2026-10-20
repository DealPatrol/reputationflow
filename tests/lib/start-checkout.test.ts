import { beforeEach, describe, expect, it, vi } from "vitest"

const track = vi.fn()

vi.mock("@vercel/analytics", () => ({
  track: (...args: unknown[]) => track(...args),
}))

import { FUNNEL_EVENT } from "@/lib/analytics-events"
import { startProfessionalCheckout } from "@/lib/start-checkout"

describe("professional checkout", () => {
  beforeEach(() => {
    track.mockClear()
    vi.unstubAllGlobals()
  })

  it("posts the existing pro plan and records checkout only after Stripe returns a url", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ url: "https://checkout.stripe.com/c/pay/cs_test_123" }),
    })
    vi.stubGlobal("fetch", fetchMock)
    vi.stubGlobal("window", {
      location: { pathname: "/onboarding", protocol: "http:", href: "" },
      sessionStorage: {
        getItem: () => null,
        setItem: () => undefined,
      },
    })
    vi.stubGlobal("document", { cookie: "" })

    await startProfessionalCheckout()

    expect(fetchMock).toHaveBeenCalledWith("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planType: "pro" }),
    })
    expect(window.location.href).toBe("https://checkout.stripe.com/c/pay/cs_test_123")
    expect(track).toHaveBeenCalledWith(FUNNEL_EVENT.checkoutStarted, { plan: "professional" })
  })

  it("does not record checkout when Stripe does not return a url", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Billing is unavailable in demo mode." }),
    }))
    vi.stubGlobal("window", {
      location: { pathname: "/dashboard", protocol: "http:", href: "https://reviews.example.com/dashboard" },
    })

    await expect(startProfessionalCheckout()).rejects.toThrow("Billing is unavailable in demo mode.")
    expect(window.location.href).toBe("https://reviews.example.com/dashboard")
    expect(track).not.toHaveBeenCalled()
  })
})
