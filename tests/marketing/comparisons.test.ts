import { readFileSync } from "node:fs"
import { join } from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import { generateMetadata } from "@/app/compare/[slug]/page"
import { comparisons, indexablePaths } from "@/lib/marketing-content"
import { faqJsonLd, pageMetadata } from "@/lib/seo"
import { professionalSignupPath } from "@/lib/signup"

describe("competitor comparisons", () => {
  const originalSite = process.env.NEXT_PUBLIC_SITE_URL

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = originalSite
  })

  it("publishes four sourced alternative pages with short descriptions", () => {
    expect(comparisons.map((page) => page.slug)).toEqual(["podium", "birdeye", "nicejob", "grade-us"])
    const descriptions = comparisons.map((page) => page.description)
    expect(new Set(descriptions).size).toBe(descriptions.length)
    for (const page of comparisons) {
      expect(page.description.length).toBeGreaterThan(80)
      expect(page.description.length).toBeLessThan(160)
      expect(page.checked).toBe("October 2026")
      expect(page.sourceUrl.startsWith("https://")).toBe(true)
      expect(page.rows.length).toBeGreaterThanOrEqual(3)
      expect(page.faqs.length).toBeGreaterThanOrEqual(3)
      expect(page.chooseThem.length).toBeGreaterThan(20)
      expect(page.chooseUs.length).toBeGreaterThan(20)
      const faq = faqJsonLd(page.faqs)
      expect(faq["@type"]).toBe("FAQPage")
      expect(faq.mainEntity).toHaveLength(page.faqs.length)
    }
  })

  it("puts each comparison in the sitemap with a canonical description", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://reviews.example.com"
    const paths = indexablePaths().map((entry) => entry.path)
    for (const page of comparisons) {
      expect(paths).toContain(`/compare/${page.slug}`)
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: page.slug }),
      })
      expect(metadata.title).toBe(page.title)
      expect(metadata.description).toBe(page.description)
      expect(metadata.description?.length).toBeLessThan(160)
      expect(metadata.alternates).toEqual({
        canonical: `https://reviews.example.com/compare/${page.slug}`,
      })
    }
    expect(pageMetadata({ title: "x", description: "y", path: "/compare/podium" }).alternates).toEqual({
      canonical: "https://reviews.example.com/compare/podium",
    })
  })

  it("links the pages from pricing, guides, and the comparison template", () => {
    const pricing = readFileSync(join(process.cwd(), "app/pricing/page.tsx"), "utf8")
    const guides = readFileSync(join(process.cwd(), "components/marketing/guide-resources.tsx"), "utf8")
    const footer = readFileSync(join(process.cwd(), "components/marketing/site-footer.tsx"), "utf8")
    const compare = readFileSync(join(process.cwd(), "app/compare/[slug]/page.tsx"), "utf8")
    expect(pricing).toContain("professionalSignupPath()")
    expect(pricing).toContain("comparisons.map")
    expect(guides).toContain("/compare/${comparison.slug}")
    expect(footer).toContain("/compare/${comparison.slug}")
    expect(compare).toContain("faqJsonLd")
    expect(compare).toContain('"/tools/qr-code"')
    expect(compare).toContain("professionalSignupPath()")
    expect(professionalSignupPath()).toBe("/signup?plan=professional")
  })
})
