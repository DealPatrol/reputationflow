import { describe, expect, it } from "vitest"
import { industries, industryBySlug } from "@/lib/industries"
import { indexablePaths } from "@/lib/marketing-content"

const tradeSlugs = [
  "plumber",
  "hvac",
  "roofer",
  "dentists",
  "chiropractor",
  "auto-repair",
  "salons",
  "barber",
  "landscaper",
  "lawn-care",
  "pest-control",
  "electrician",
  "med-spa",
  "restaurants",
  "cleaning-service",
  "painter",
  "realtor",
  "vet",
  "gym",
  "tattoo-shop",
]

describe("trade landing pages", () => {
  const pages = tradeSlugs.map((slug) => {
    const page = industryBySlug(slug)
    if (!page) throw new Error(`missing industry ${slug}`)
    return page
  })

  it("publishes a unique page for each requested trade", () => {
    expect(pages).toHaveLength(20)
    const paths = indexablePaths().map((entry) => entry.path)
    for (const page of pages) {
      expect(paths).toContain(`/industries/${page.slug}`)
    }
    expect(paths).toContain("/industries")
  })

  it("gives each trade a unique title, description, canonical path, and ask", () => {
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length)
    expect(new Set(pages.map((page) => page.description)).size).toBe(pages.length)
    expect(new Set(pages.map((page) => page.slug)).size).toBe(pages.length)
    expect(new Set(pages.map((page) => page.sampleMessage)).size).toBe(pages.length)
    expect(new Set(pages.map((page) => page.bestMoment)).size).toBe(pages.length)
    expect(new Set(pages.map((page) => page.guideHeading)).size).toBe(pages.length)

    for (const page of pages) {
      expect(page.title.toLowerCase()).toContain("google review qr code")
      expect(page.description.toLowerCase()).toContain("how to get more google reviews")
      expect(page.guideHeading.toLowerCase()).toContain("how to get more google reviews")
      expect(page.faqs.length).toBeGreaterThanOrEqual(3)
      expect(page.sampleMessage).toContain("[link]")
      expect(page.bestMoment.length).toBeGreaterThan(80)
      const serialized = JSON.stringify(page).toLowerCase()
      expect(serialized).not.toContain("cullman")
      expect(serialized).not.toContain("alabama")
    }
  })

  it("does not add city landing pages", () => {
    expect(industries.some((page) => page.slug.includes("cullman"))).toBe(false)
    expect(indexablePaths().some((entry) => entry.path.toLowerCase().includes("cullman"))).toBe(false)
  })
})
