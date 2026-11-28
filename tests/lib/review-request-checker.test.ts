import { describe, expect, it } from "vitest"
import {
  checkReviewRequest,
  compliantRewrite,
  extractLink,
  REVIEW_CHECKER_DESCRIPTION,
  REVIEW_CHECKER_PATH,
  smsSegmentInfo,
} from "@/lib/review-request-checker"
import { indexablePaths } from "@/lib/marketing-content"

const ids = (text: string) => checkReviewRequest(text).findings.map((f) => f.id)

describe("review request checker", () => {
  it("flags incentives, five-star asks, gating, and removal requests", () => {
    expect(ids("Leave us a review and get 10% off your next visit!")).toContain("incentive")
    expect(ids("Please leave us a 5-star review")).toContain("sentiment")
    expect(ids("If you were happy, leave a Google review. Not happy? Call us first.")).toContain("gating")
    expect(ids("Could you update your review now that it's fixed?")).toContain("removal")
    expect(ids("Please mention Jake by name in your review")).toContain("specific-content")
    expect(ids("Scan this before you leave")).toContain("pressure")
  })

  it("passes a plain honest request and the compliant rewrite", () => {
    const plain = "Thanks for choosing Acme HVAC! Would you leave an honest Google review? https://g.page/r/abc/review Reply STOP to opt out."
    const result = checkReviewRequest(plain)
    expect(result.findings).toHaveLength(0)
    expect(result.passed).toBe(true)
    for (const channel of ["text", "email"] as const) {
      const rewrite = compliantRewrite({ businessName: "Acme HVAC", link: "https://g.page/r/abc/review", channel })
      expect(checkReviewRequest(rewrite, channel).findings).toHaveLength(0)
    }
  })

  it("counts SMS segments and finds the link", () => {
    expect(smsSegmentInfo("a".repeat(160)).segments).toBe(1)
    expect(smsSegmentInfo("a".repeat(161)).segments).toBe(2)
    expect(smsSegmentInfo("hi 😀").unicode).toBe(true)
    expect(extractLink("Review us: https://g.page/r/abc/review.")).toBe("https://g.page/r/abc/review")
    expect(checkReviewRequest("Please review us").tips.join(" ")).toMatch(/No review link/)
  })

  it("is in the sitemap and has a snippet-length description", () => {
    expect(indexablePaths().some((entry) => entry.path === REVIEW_CHECKER_PATH)).toBe(true)
    expect(REVIEW_CHECKER_DESCRIPTION.length).toBeLessThanOrEqual(160)
  })
})
