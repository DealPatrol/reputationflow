import { describe, expect, it } from "vitest"
import { capProperties, cleanPath, isSeoLanding, nextFunnelOrigin } from "@/lib/funnel"

describe("funnel origin", () => {
  it("keeps a normal marketing path and drops auth, review, and junk", () => {
    expect(cleanPath("/industries/plumber/houston")).toBe("/industries/plumber/houston")
    expect(cleanPath("/tools/qr-code/")).toBe("/tools/qr-code")
    expect(cleanPath("/tools/qr-code?utm_source=google")).toBe("/tools/qr-code")
    expect(cleanPath("/review-management-software")).toBe("/review-management-software")
    expect(cleanPath("/auth/signin")).toBe("/auth/signin")
    expect(cleanPath("/review/biz_123")).toBe("")
    expect(cleanPath("https://example.com/pricing")).toBe("")
    expect(cleanPath("/Industries/Plumber")).toBe("")
  })

  it("treats the generator, trade, and city pages as SEO landings", () => {
    expect(isSeoLanding("/tools/qr-code")).toBe(true)
    expect(isSeoLanding("/tools/google-review-link")).toBe(true)
    expect(isSeoLanding("/google-review-qr-by-city")).toBe(true)
    expect(isSeoLanding("/industries/plumber")).toBe(true)
    expect(isSeoLanding("/industries/cleaning-service/chicago")).toBe(true)
    expect(isSeoLanding("/pricing")).toBe(false)
    expect(isSeoLanding("/industries")).toBe(false)
  })

  it("remembers the first SEO page and ignores later app pages", () => {
    expect(nextFunnelOrigin(null, "/industries/plumber/houston")).toBe("/industries/plumber/houston")
    expect(nextFunnelOrigin("/industries/plumber/houston", "/auth/signin")).toBe("/industries/plumber/houston")
    expect(nextFunnelOrigin("/industries/plumber/houston", "/dashboard/billing")).toBe("/industries/plumber/houston")
    expect(nextFunnelOrigin("/industries/plumber/houston", "/pricing")).toBe("/industries/plumber/houston")
    expect(nextFunnelOrigin("/industries/plumber/houston", "/tools/qr-code")).toBe("/industries/plumber/houston")
    expect(nextFunnelOrigin(null, "/auth/signin")).toBeNull()
    expect(nextFunnelOrigin(null, "/review/biz_123")).toBeNull()
  })

  it("replaces a directory with the specific page the visitor opens", () => {
    expect(nextFunnelOrigin("/", "/tools/qr-code")).toBe("/tools/qr-code")
    expect(nextFunnelOrigin("/tools", "/tools/qr-code")).toBe("/tools/qr-code")
    expect(nextFunnelOrigin("/industries", "/industries/plumber")).toBe("/industries/plumber")
    expect(nextFunnelOrigin("/industries/plumber", "/industries/plumber/houston")).toBe("/industries/plumber/houston")
    expect(nextFunnelOrigin("/google-review-qr-by-city", "/industries/roofer/dallas")).toBe("/industries/roofer/dallas")
    expect(nextFunnelOrigin("/", "/pricing")).toBe("/")
    expect(nextFunnelOrigin("/tools/qr-code", "/pricing")).toBe("/tools/qr-code")
  })

  it("caps custom event properties at two non-empty values", () => {
    expect(capProperties({ path: "/tools/qr-code", kind: "review", extra: "nope" })).toEqual({
      path: "/tools/qr-code",
      kind: "review",
    })
    expect(capProperties({ origin: "", plan: "professional" })).toEqual({ plan: "professional" })
  })
})
