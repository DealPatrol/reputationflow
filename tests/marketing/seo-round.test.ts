import { describe, expect, it } from "vitest"
import { guides } from "@/lib/guides"
import { indexablePaths } from "@/lib/marketing-content"
import { googleSiteVerificationToken } from "@/lib/site-verification"

describe("seo round", () => {
  it("parses a Search Console token or meta tag and ignores junk", () => {
    expect(googleSiteVerificationToken("abcDEF123_-xyz")).toBe("abcDEF123_-xyz")
    expect(googleSiteVerificationToken('<meta name="google-site-verification" content="abcDEF123_-xyz" />')).toBe("abcDEF123_-xyz")
    expect(googleSiteVerificationToken("")).toBeNull()
    expect(googleSiteVerificationToken("bad token")).toBeNull()
  })

  it("lists the buyer guides in the sitemap with FAQs and unique slugs", () => {
    const slugs = guides.map((guide) => guide.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    const paths = indexablePaths().map((entry) => entry.path)
    for (const slug of [
      "how-to-choose-review-management-software",
      "how-to-get-google-reviews-for-a-new-business",
      "how-to-respond-to-positive-google-reviews",
    ]) {
      expect(paths).toContain(`/guides/${slug}`)
      expect(guides.find((guide) => guide.slug === slug)?.faqs.length).toBeGreaterThanOrEqual(3)
    }
  })
})
