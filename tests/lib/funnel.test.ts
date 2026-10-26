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
    expect(isSeoLanding("/tools/review-request-message")).toBe(true)
    expect(isSeoLanding("/review-request-text/plumber")).toBe(true)
    expect(isSeoLanding("/review-request-text")).toBe(false)
    expect(isSeoLanding("/google-review-qr-by-city")).toBe(true)
    expect(isSeoLanding("/industries/plumber")).toBe(true)
    expect(isSeoLanding("/industries/cleaning-service/chicago")).toBe(true)
    expect(isSeoLanding("/compare/podium")).toBe(true)
    expect(isSeoLanding("/compare/grade-us")).toBe(true)
    expect(isSeoLanding("/how-to-get-more-google-reviews-for")).toBe(true)
    expect(isSeoLanding("/how-to-get-more-google-reviews-for/plumbers")).toBe(true)
    expect(isSeoLanding("/how-to-get-more-google-reviews-for/lawn-care")).toBe(true)
    expect(isSeoLanding("/how-to-get-more-google-reviews")).toBe(false)
    expect(isSeoLanding("/pricing")).toBe(false)
    expect(isSeoLanding("/compare")).toBe(false)
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
    expect(nextFunnelOrigin("/tools", "/tools/review-request-message")).toBe("/tools/review-request-message")
    expect(nextFunnelOrigin("/industries", "/review-request-text/plumber")).toBe("/review-request-text/plumber")
    expect(nextFunnelOrigin("/review-request-text/plumber", "/pricing")).toBe("/review-request-text/plumber")
    expect(nextFunnelOrigin("/industries", "/industries/plumber")).toBe("/industries/plumber")
    expect(nextFunnelOrigin("/industries/plumber", "/industries/plumber/houston")).toBe("/industries/plumber/houston")
    expect(nextFunnelOrigin("/google-review-qr-by-city", "/industries/roofer/dallas")).toBe("/industries/roofer/dallas")
    expect(nextFunnelOrigin("/", "/pricing")).toBe("/")
    expect(nextFunnelOrigin("/tools/qr-code", "/pricing")).toBe("/tools/qr-code")
    expect(nextFunnelOrigin(null, "/compare/podium")).toBe("/compare/podium")
    expect(nextFunnelOrigin("/", "/compare/nicejob")).toBe("/compare/nicejob")
    expect(nextFunnelOrigin("/guides", "/compare/grade-us")).toBe("/compare/grade-us")
    expect(nextFunnelOrigin("/compare/podium", "/pricing")).toBe("/compare/podium")
    expect(nextFunnelOrigin("/compare/podium", "/auth/signin")).toBe("/compare/podium")
    expect(nextFunnelOrigin("/compare/birdeye", "/compare/podium")).toBe("/compare/birdeye")
    expect(nextFunnelOrigin("/review-management-software", "/compare/grade-us")).toBe("/compare/grade-us")
    expect(nextFunnelOrigin("/", "/how-to-get-more-google-reviews-for/plumbers")).toBe(
      "/how-to-get-more-google-reviews-for/plumbers",
    )
    expect(nextFunnelOrigin("/guides", "/how-to-get-more-google-reviews-for/hvac")).toBe(
      "/how-to-get-more-google-reviews-for/hvac",
    )
    expect(nextFunnelOrigin("/how-to-get-more-google-reviews-for", "/how-to-get-more-google-reviews-for/roofers")).toBe(
      "/how-to-get-more-google-reviews-for/roofers",
    )
    expect(nextFunnelOrigin("/how-to-get-more-google-reviews-for/plumbers", "/pricing")).toBe(
      "/how-to-get-more-google-reviews-for/plumbers",
    )
    expect(nextFunnelOrigin("/how-to-get-more-google-reviews-for/plumbers", "/signup")).toBe(
      "/how-to-get-more-google-reviews-for/plumbers",
    )
  })

  it("caps custom event properties at two non-empty values", () => {
    expect(capProperties({ path: "/tools/qr-code", kind: "review", extra: "nope" })).toEqual({
      path: "/tools/qr-code",
      kind: "review",
    })
    expect(capProperties({ origin: "", plan: "professional" })).toEqual({
      plan: "professional",
    })
  })
})
