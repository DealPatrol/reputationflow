import { afterEach, describe, expect, it } from "vitest"
import { csvCell, csvRow } from "@/lib/csv"
import { absoluteUrl, getSiteUrl } from "@/lib/site"
import { indexablePaths } from "@/lib/marketing-content"
import { toPublicBusiness } from "@/lib/public-business"

describe("site URL", () => {
  const originalSite = process.env.NEXT_PUBLIC_SITE_URL
  const originalApp = process.env.NEXT_PUBLIC_APP_URL

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = originalSite
    process.env.NEXT_PUBLIC_APP_URL = originalApp
  })

  it("prefers NEXT_PUBLIC_SITE_URL and strips a trailing slash", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://reviews.example.com/"
    process.env.NEXT_PUBLIC_APP_URL = "https://ignored.example.com"
    expect(getSiteUrl()).toBe("https://reviews.example.com")
    expect(absoluteUrl("/pricing")).toBe("https://reviews.example.com/pricing")
  })
})

describe("csv", () => {
  it("quotes cells and neutralizes formula injection", () => {
    expect(csvRow(["=cmd", "hello"])).toBe(`"'=cmd","hello"`)
  })

  it("escapes quotes", () => {
    expect(csvCell(`say "hi"`)).toBe(`"say ""hi"""`)
  })
})

describe("public business", () => {
  it("drops billing and owner fields", () => {
    const business = toPublicBusiness({
      id: 4,
      business_name: "Northside Dental",
      google_link: "https://example.com/google",
      facebook_link: "",
      yelp_link: "",
      google_links_2: ["https://example.com/second"],
      user_id: "secret",
      stripe_customer_id: "cus_secret",
      owner_email: "owner@example.com",
    })

    expect(business).toEqual({
      id: 4,
      business_name: "Northside Dental",
      google_link: "https://example.com/google",
      facebook_link: "",
      yelp_link: "",
      google_links_2: ["https://example.com/second"],
      facebook_links_2: [],
      yelp_links_2: [],
    })
  })
})

describe("indexable paths", () => {
  it("includes the acquisition pages and no private app routes", () => {
    const paths = indexablePaths().map((entry) => entry.path)
    expect(paths).toEqual(expect.arrayContaining([
      "/",
      "/pricing",
      "/how-to-get-more-google-reviews",
      "/review-management-software",
      "/tools/google-review-link",
      "/tools/qr-code",
      "/how-to-respond-to-negative-google-reviews",
      "/compare/nicejob",
      "/industries",
      "/industries/dentists",
      "/industries/plumber",
      "/industries/tattoo-shop",
      "/compare/birdeye",
      "/compare/podium",
      "/guides",
      "/guides/how-to-ask-customers-for-reviews",
      "/guides/incentivizing-reviews-ftc-rules",
      "/guides/how-to-remove-a-fake-google-review",
      "/guides/review-qr-code-ideas",
      "/google-review-request-templates",
      "/resources",
      "/tools",
      "/guides/review-request-text-message-templates",
      "/guides/negative-google-review-responses-restaurants",
    ]))
    expect(paths.some((path) => path.startsWith("/dashboard") || path.startsWith("/review/"))).toBe(false)
  })
})
