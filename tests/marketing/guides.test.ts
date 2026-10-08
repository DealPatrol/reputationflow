import { describe, expect, it } from "vitest"
import { guideBySlug, guideCluster, guides } from "@/lib/guides"
import { indexablePaths } from "@/lib/marketing-content"
import { reviewRequestTemplates, templatePackText } from "@/lib/review-request-templates"

describe("guide cluster", () => {
  it("publishes ten guides and the template pack in the sitemap", () => {
    expect(guideCluster).toHaveLength(10)
    expect(new Set(guideCluster.map((guide) => guide.path)).size).toBe(10)
    const paths = indexablePaths().map((entry) => entry.path)
    for (const guide of guideCluster) {
      expect(paths).toContain(guide.path)
    }
    expect(paths).toContain("/guides")
    expect(paths).toContain("/google-review-request-templates")
    expect(paths.some((path) => path.toLowerCase().includes("cullman"))).toBe(false)
  })

  it("gives each new guide unique copy, sections, and an FAQ", () => {
    expect(guides).toHaveLength(8)
    expect(new Set(guides.map((guide) => guide.title)).size).toBe(guides.length)
    expect(new Set(guides.map((guide) => guide.description)).size).toBe(guides.length)
    for (const guide of guides) {
      expect(guideBySlug(guide.slug)?.title).toBe(guide.title)
      expect(guide.sections.length).toBeGreaterThanOrEqual(2)
      expect(guide.faqs.length).toBeGreaterThanOrEqual(3)
      const text = JSON.stringify(guide).toLowerCase()
      expect(text).not.toContain("cullman")
      expect(text).not.toMatch(/\d+%/)
    }
  })
})

describe("review request templates", () => {
  it("includes an in-person, text, and email script for each trade", () => {
    expect(reviewRequestTemplates.length).toBeGreaterThanOrEqual(8)
    const pack = templatePackText()
    for (const template of reviewRequestTemplates) {
      expect(template.inPerson.length).toBeGreaterThan(40)
      expect(template.sms).toContain("[link]")
      expect(template.email).toContain("[link]")
      expect(pack).toContain(template.trade.toUpperCase())
      expect(pack).toContain(template.sms)
    }
    expect(pack.toLowerCase()).toContain("does not text")
    expect(pack.toLowerCase()).toContain("do not offer a discount")
  })
})
