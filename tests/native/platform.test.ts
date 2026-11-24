import { afterEach, describe, expect, it, vi } from "vitest"
import {
  deepLinkToPath,
  isNativeAllowedPath,
  isNativeIos,
  isNativeIosUserAgent,
  nativeBootScript,
  NATIVE_IOS_UA_TOKEN,
} from "@/lib/native/platform"

const IOS_UA = `Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ${NATIVE_IOS_UA_TOKEN}/1.0`
const SAFARI_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"

function runBootScript(pathname: string, userAgent: string) {
  const classes = new Set<string>()
  const replace = vi.fn()
  const context = {
    navigator: { userAgent },
    document: { documentElement: { classList: { add: (c: string) => classes.add(c) } } },
    location: { pathname, replace },
  }
  new Function("navigator", "document", "location", nativeBootScript())(context.navigator, context.document, context.location)
  return { classes, replace }
}

describe("native iOS detection", () => {
  afterEach(() => vi.unstubAllGlobals())

  it("matches only the app's user agent token", () => {
    expect(isNativeIosUserAgent(IOS_UA)).toBe(true)
    expect(isNativeIosUserAgent(SAFARI_UA)).toBe(false)
    expect(isNativeIosUserAgent(undefined)).toBe(false)
  })

  it("is false on the server and in a normal browser", () => {
    expect(isNativeIos()).toBe(false)
    vi.stubGlobal("window", { navigator: { userAgent: SAFARI_UA } })
    expect(isNativeIos()).toBe(false)
  })

  it("is true inside the Capacitor iOS shell", () => {
    vi.stubGlobal("window", { navigator: { userAgent: SAFARI_UA }, Capacitor: { isNativePlatform: () => true, getPlatform: () => "ios" } })
    expect(isNativeIos()).toBe(true)
    vi.stubGlobal("window", { navigator: { userAgent: IOS_UA } })
    expect(isNativeIos()).toBe(true)
  })
})

describe("in-app page allowlist (Guideline 3.1.1)", () => {
  it("keeps app, account, legal and customer review pages", () => {
    for (const path of ["/dashboard", "/dashboard/billing", "/auth/signin", "/signup", "/onboarding", "/privacy", "/terms", "/contact", "/review/12", "/feedback/12", "/api/auth/me", "/icon-512.png"]) {
      expect(isNativeAllowedPath(path), path).toBe(true)
    }
  })

  it("leaves pricing, marketing and free tool pages that carry web checkout", () => {
    for (const path of ["/", "/pricing", "/tools/qr-code", "/industries/plumber", "/compare/birdeye", "/dashboards", "/review", "/guides"]) {
      expect(isNativeAllowedPath(path), path).toBe(false)
    }
  })

  it("boot script redirects marketing pages only inside the app", () => {
    const inApp = runBootScript("/pricing", IOS_UA)
    expect(inApp.classes.has("native-ios")).toBe(true)
    expect(inApp.replace).toHaveBeenCalledWith("/dashboard")

    const appPage = runBootScript("/dashboard", IOS_UA)
    expect(appPage.replace).not.toHaveBeenCalled()

    const web = runBootScript("/pricing", SAFARI_UA)
    expect(web.classes.size).toBe(0)
    expect(web.replace).not.toHaveBeenCalled()
  })
})

describe("reputationflow:// deep links", () => {
  it("maps known destinations", () => {
    expect(deepLinkToPath("reputationflow://counter")).toBe("/dashboard?tab=counter")
    expect(deepLinkToPath("reputationflow://dashboard?tab=links")).toBe("/dashboard?tab=links")
    expect(deepLinkToPath("reputationflow://dashboard")).toBe("/dashboard")
    expect(deepLinkToPath("reputationflow:///billing")).toBe("/dashboard?tab=billing")
    expect(deepLinkToPath("reputationflow://signin")).toBe("/auth/signin")
    expect(deepLinkToPath("https://tryreputationflow.com/dashboard?tab=settings")).toBe("/dashboard?tab=settings")
  })

  it("rejects unknown or unsafe links", () => {
    expect(deepLinkToPath("reputationflow://pricing")).toBeNull()
    expect(deepLinkToPath("reputationflow://dashboard?tab=evil")).toBe("/dashboard")
    expect(deepLinkToPath("javascript:alert(1)")).toBeNull()
    expect(deepLinkToPath("not a url")).toBeNull()
    expect(deepLinkToPath(null)).toBeNull()
  })
})
