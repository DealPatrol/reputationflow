import { beforeEach, describe, expect, it, vi } from "vitest"

const track = vi.fn()

vi.mock("@vercel/analytics", () => ({
  track: (...args: unknown[]) => track(...args),
}))

import {
  FUNNEL_EVENT,
  trackCheckoutStart,
  trackGeneratorUsed,
  trackPricingClick,
  trackQrDownloaded,
  trackSetupCompleted,
  trackSetupCtaClick,
  trackSignupClick,
  trackUpgradeClick,
} from "@/lib/analytics-events"

function installBrowser() {
  let pathname = "/"
  let cookie = ""
  const storage = new Map<string, string>()
  vi.stubGlobal("window", {
    location: {
      get pathname() {
        return pathname
      },
      protocol: "http:",
    },
    sessionStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value)
      },
    },
  })
  vi.stubGlobal("document", {
    get cookie() {
      return cookie
    },
    set cookie(value: string) {
      cookie = value
    },
  })
  return {
    go(next: string) {
      pathname = next
    },
  }
}

describe("funnel analytics events", () => {
  beforeEach(() => {
    track.mockClear()
    vi.unstubAllGlobals()
  })

  it("sends the page path with generator, download, and pricing events", () => {
    const browser = installBrowser()
    browser.go("/industries/plumber/houston")

    trackGeneratorUsed("review")
    trackQrDownloaded("png")
    trackPricingClick("qr_city_plumber_houston")

    expect(track).toHaveBeenNthCalledWith(1, FUNNEL_EVENT.generatorUsed, {
      path: "/industries/plumber/houston",
      kind: "review",
    })
    expect(track).toHaveBeenNthCalledWith(2, FUNNEL_EVENT.qrDownloaded, {
      path: "/industries/plumber/houston",
      format: "png",
    })
    expect(track).toHaveBeenNthCalledWith(3, FUNNEL_EVENT.pricingClicked, {
      path: "/industries/plumber/houston",
      location: "qr_city_plumber_houston",
    })
    for (const call of track.mock.calls) {
      expect(Object.keys(call[1] as object).length).toBeLessThanOrEqual(2)
    }
  })

  it("attaches the originating SEO page to signup and checkout", () => {
    const browser = installBrowser()
    browser.go("/tools/qr-code")
    trackGeneratorUsed("review")
    track.mockClear()

    browser.go("/pricing")
    trackPricingClick("paths_tools_qr-code")
    browser.go("/auth/signin")
    trackSignupClick("tool_qr_result")
    browser.go("/dashboard/billing")
    trackCheckoutStart("professional")

    expect(track).toHaveBeenNthCalledWith(1, FUNNEL_EVENT.pricingClicked, {
      path: "/pricing",
      location: "paths_tools_qr-code",
    })
    expect(track).toHaveBeenNthCalledWith(2, FUNNEL_EVENT.signupStarted, {
      origin: "/tools/qr-code",
      location: "tool_qr_result",
    })
    expect(track).toHaveBeenNthCalledWith(3, FUNNEL_EVENT.checkoutStarted, {
      origin: "/tools/qr-code",
      plan: "professional",
    })
  })

  it("attributes signup on a comparison page to that page", () => {
    const browser = installBrowser()
    browser.go("/compare/podium")
    trackSignupClick("compare_podium_checkout")
    browser.go("/auth/signin")
    trackSignupClick("auth_form")
    browser.go("/dashboard/billing")
    trackCheckoutStart("professional")

    expect(track).toHaveBeenNthCalledWith(1, FUNNEL_EVENT.signupStarted, {
      origin: "/compare/podium",
      location: "compare_podium_checkout",
    })
    expect(track).toHaveBeenNthCalledWith(2, FUNNEL_EVENT.signupStarted, {
      origin: "/compare/podium",
      location: "auth_form",
    })
    expect(track).toHaveBeenNthCalledWith(3, FUNNEL_EVENT.checkoutStarted, {
      origin: "/compare/podium",
      plan: "professional",
    })
  })

  it("keeps the originating page on setup, completion, upgrade, and checkout", () => {
    const browser = installBrowser()
    browser.go("/tools/qr-code")
    trackSetupCtaClick("tool_qr_setup")
    browser.go("/compare/nicejob")
    trackSetupCtaClick("compare_nicejob_setup")
    browser.go("/onboarding")
    trackSetupCompleted("saved")
    trackUpgradeClick("onboarding_success")
    browser.go("/dashboard")
    trackUpgradeClick("dashboard_banner")
    trackCheckoutStart("professional")

    expect(track).toHaveBeenNthCalledWith(1, FUNNEL_EVENT.setupCtaClicked, {
      origin: "/tools/qr-code",
      location: "tool_qr_setup",
    })
    expect(track).toHaveBeenNthCalledWith(2, FUNNEL_EVENT.setupCtaClicked, {
      origin: "/tools/qr-code",
      location: "compare_nicejob_setup",
    })
    expect(track).toHaveBeenNthCalledWith(3, FUNNEL_EVENT.setupCompleted, {
      origin: "/tools/qr-code",
      result: "saved",
    })
    expect(track).toHaveBeenNthCalledWith(4, FUNNEL_EVENT.upgradeClicked, {
      origin: "/tools/qr-code",
      location: "onboarding_success",
    })
    expect(track).toHaveBeenNthCalledWith(5, FUNNEL_EVENT.upgradeClicked, {
      origin: "/tools/qr-code",
      location: "dashboard_banner",
    })
    expect(track).toHaveBeenNthCalledWith(6, FUNNEL_EVENT.checkoutStarted, {
      origin: "/tools/qr-code",
      plan: "professional",
    })
    for (const call of track.mock.calls) {
      expect(Object.keys(call[1] as object).length).toBeLessThanOrEqual(2)
    }
  })

  it("records a pricing setup click with that page as the origin", () => {
    const browser = installBrowser()
    browser.go("/pricing")
    trackSetupCtaClick("pricing_setup")
    trackSetupCtaClick("not a location")

    expect(track).toHaveBeenNthCalledWith(1, FUNNEL_EVENT.setupCtaClicked, {
      origin: "/pricing",
      location: "pricing_setup",
    })
    expect(track).toHaveBeenNthCalledWith(2, FUNNEL_EVENT.setupCtaClicked, {
      origin: "/pricing",
    })
  })
})
