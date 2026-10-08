import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { adLandings } from "@/lib/ad-landings"
import { guideCluster, guides, relatedGuides } from "@/lib/guides"
import { industryBySlug } from "@/lib/industries"
import { comparisons, indexablePaths, industries } from "@/lib/marketing-content"
import { articleJsonLd, faqJsonLd } from "@/lib/seo"

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    if (entry === "node_modules" || entry === ".next") return []
    const path = join(directory, entry)
    const stats = statSync(path)
    if (stats.isDirectory()) return collectSourceFiles(path)
    if (path.endsWith(".ts") || path.endsWith(".tsx")) return [path]
    return []
  })
}

describe("technical seo", () => {
  const paths = indexablePaths().map((entry) => entry.path)

  it("keeps titles and descriptions unique across trades, guides, tools hubs, and comparisons", () => {
    const pages = [
      ...industries.map((page) => ({ title: page.title, description: page.description })),
      ...guideCluster.map((page) => ({ title: page.title, description: page.description })),
      ...comparisons.map((page) => ({ title: page.title, description: page.description })),
      ...adLandings.map((page) => ({ title: page.title, description: page.description })),
      { title: "Free Google review tools", description: "tools hub" },
      { title: "Google review resources", description: "resources hub" },
    ]
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length)
    expect(new Set(pages.map((page) => page.description)).size).toBe(pages.length)
  })

  it("points ad landing pages at an organic canonical and keeps them out of the sitemap", () => {
    expect(adLandings).toHaveLength(3)
    for (const landing of adLandings) {
      expect(paths).toContain(landing.canonicalPath)
      expect(paths).not.toContain(`/ads/${landing.slug}`)
    }
    expect(paths.some((path) => path.startsWith("/ads"))).toBe(false)
    expect(paths).toContain("/resources")
    expect(paths).toContain("/tools")
  })

  it("gives every guide valid article and FAQ schema and keeps reply templates in the reply cluster", () => {
    for (const guide of guides) {
      const faq = faqJsonLd(guide.faqs)
      expect(faq.mainEntity.length).toBeGreaterThanOrEqual(3)
      for (const question of faq.mainEntity) {
        expect(question.name.length).toBeGreaterThan(8)
        expect(question.acceptedAnswer.text.length).toBeGreaterThan(20)
      }
      const article = articleJsonLd({ title: guide.title, description: guide.description, path: `/guides/${guide.slug}` })
      expect(article["@type"]).toBe("Article")
      expect(article.headline).toBe(guide.title)
      expect(article.image).toContain("/opengraph-image")
      expect(article.mainEntityOfPage).toMatchObject({ "@type": "WebPage" })
      expect(JSON.stringify(guide).toLowerCase()).not.toMatch(/\d+%/)
    }

    const related = relatedGuides("negative-google-review-responses-restaurants", 3)
    expect(related).toHaveLength(3)
    expect(related.every((guide) => guide.cluster === "reply")).toBe(true)
  })

  it("separates the general contractor page from the specialty trades", () => {
    const contractors = industryBySlug("contractors")
    expect(contractors?.spokes?.map((spoke) => spoke.slug)).toEqual([
      "plumber",
      "electrician",
      "hvac",
      "roofer",
      "painter",
    ])
    expect(contractors?.description).not.toBe(industryBySlug("plumber")?.description)
    expect(industryBySlug("landscaper")?.description).not.toBe(industryBySlug("lawn-care")?.description)
    expect(industryBySlug("salons")?.description).not.toBe(industryBySlug("barber")?.description)
  })

  it("does not link marketing pages to missing routes", () => {
    const allowed = new Set([
      ...paths,
      ...adLandings.map((landing) => `/ads/${landing.slug}`),
      "/auth/signin",
      "/dashboard",
      "/dashboard/billing",
      "/dashboard/analytics",
      "/dashboard/email-automation",
      "/dashboard/success",
      "/onboarding",
      "/demo",
      "/settings",
      "/case-studies",
    ])
    const files = [
      ...collectSourceFiles(join(process.cwd(), "app")),
      ...collectSourceFiles(join(process.cwd(), "components")),
    ]
    const broken = files.flatMap((file) => {
      const source = readFileSync(file, "utf8")
      return [...source.matchAll(/href="(\/[^"]*)"/g)].flatMap((match) => {
        const path = match[1].split("?")[0].split("#")[0]
        if (!path || path === "/" || allowed.has(path)) return []
        if (path.startsWith("/review/") || path.startsWith("/feedback/") || path.startsWith("/embed/") || path.startsWith("/api/")) {
          return []
        }
        return [`${file}: ${path}`]
      })
    })
    expect(broken).toEqual([])
  })
})
