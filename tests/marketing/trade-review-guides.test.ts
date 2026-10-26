import { readFileSync } from "node:fs"
import { join } from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import { generateMetadata } from "@/app/how-to-get-more-google-reviews-for/[slug]/page"
import { adLandings } from "@/lib/ad-landings"
import { cleanLocation } from "@/lib/funnel"
import { guideCluster } from "@/lib/guides"
import { industryBySlug } from "@/lib/industries"
import { comparisons, indexablePaths } from "@/lib/marketing-content"
import { qrCityPages } from "@/lib/qr-city-pages"
import { articleJsonLd, faqJsonLd, howToJsonLd, pageMetadata } from "@/lib/seo"
import {
  relatedTradeReviewGuides,
  tradeReviewGuideBySlug,
  tradeReviewGuideForIndustry,
  tradeReviewGuideHub,
  tradeReviewGuidePath,
  tradeReviewGuides,
} from "@/lib/trade-review-guides"

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8")
}

describe("trade review guides", () => {
  const originalSite = process.env.NEXT_PUBLIC_SITE_URL

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = originalSite
  })

  it("publishes a hub and ten trade guides with unique copy", () => {
    expect(tradeReviewGuides).toHaveLength(10)
    expect(tradeReviewGuides.map((guide) => guide.slug)).toEqual([
      "plumbers",
      "roofers",
      "hvac",
      "lawn-care",
      "landscapers",
      "electricians",
      "auto-repair",
      "dentists",
      "restaurants",
      "salons",
    ])
    expect(new Set(tradeReviewGuides.map((guide) => tradeReviewGuidePath(guide))).size).toBe(tradeReviewGuides.length)

    const titles = [tradeReviewGuideHub.title, ...tradeReviewGuides.map((guide) => guide.title)]
    const descriptions = [tradeReviewGuideHub.description, ...tradeReviewGuides.map((guide) => guide.description)]
    expect(new Set(titles).size).toBe(titles.length)
    expect(new Set(descriptions).size).toBe(descriptions.length)

    const taken = new Set([
      ...guideCluster.map((guide) => guide.title),
      ...guideCluster.map((guide) => guide.description),
      ...comparisons.flatMap((page) => [page.title, page.description]),
      ...adLandings.flatMap((page) => [page.title, page.description]),
      ...qrCityPages.flatMap((page) => [page.title, page.description, page.heading]),
    ])
    for (const value of [...titles, ...descriptions]) {
      expect(taken.has(value)).toBe(false)
    }

    const prose: string[] = []
    for (const guide of tradeReviewGuides) {
      expect(guide.title).toBe(`How to get more Google reviews for ${guide.queryName}`)
      expect(guide.title.length).toBeLessThanOrEqual(50)
      expect(guide.description.length).toBeGreaterThanOrEqual(120)
      expect(guide.description.length).toBeLessThanOrEqual(155)
      expect(tradeReviewGuideBySlug(guide.slug)?.title).toBe(guide.title)
      expect(tradeReviewGuideForIndustry(guide.industrySlug)?.slug).toBe(guide.slug)
      const industry = industryBySlug(guide.industrySlug)
      expect(industry?.slug).toBe(guide.industrySlug)
      expect(guide.steps).toHaveLength(4)
      expect(guide.templates.map((template) => template.label)).toEqual(["In person", "Text", "Email"])
      expect(guide.faqs.length).toBeGreaterThanOrEqual(3)
      expect(guide.whenToAsk.length).toBeGreaterThanOrEqual(2)
      expect(guide.followUp.length).toBeGreaterThanOrEqual(2)
      expect(guide.badReview.length).toBeGreaterThanOrEqual(2)
      expect(guide.avoid.join(" ").toLowerCase()).toContain("do not offer")

      const text = JSON.stringify(guide)
      const lower = text.toLowerCase()
      expect(lower).not.toContain("cullman")
      expect(lower).not.toMatch(/\d+%/)
      expect(lower).not.toContain("happy customers")
      expect(lower).not.toContain("only ask")
      expect(lower).not.toContain("gift card for a five")
      expect(text).not.toContain(industry?.bestMoment)
      expect(text).not.toContain(industry?.sampleMessage)
      expect(text).not.toContain(industry?.intro)
      expect(guide.templates[1]?.body).toContain("[link]")
      expect(guide.templates[2]?.body).toContain("[link]")
      expect(guide.templates[0]?.body.length).toBeGreaterThan(40)

      const faq = faqJsonLd(guide.faqs)
      expect(faq["@type"]).toBe("FAQPage")
      expect(faq.mainEntity).toHaveLength(guide.faqs.length)
      const article = articleJsonLd({
        title: guide.title,
        description: guide.description,
        path: tradeReviewGuidePath(guide),
      })
      expect(article["@type"]).toBe("Article")
      expect(article.headline).toBe(guide.title)
      const howTo = howToJsonLd({
        name: guide.title,
        description: guide.description,
        path: tradeReviewGuidePath(guide),
        steps: guide.steps,
      })
      expect(howTo["@type"]).toBe("HowTo")
      expect(howTo.step).toHaveLength(4)

      const base = `reviews_for_${guide.slug.replace(/-/g, "_")}`
      for (const suffix of ["_setup", "_pro", "_pricing", "_band", "_band_setup"]) {
        expect(cleanLocation(`${base}${suffix}`)).toBe(`${base}${suffix}`)
      }

      prose.push(
        guide.intro,
        ...guide.whenToAsk,
        ...guide.placement,
        ...guide.followUp,
        ...guide.badReview,
        ...guide.avoid,
        ...guide.steps.flatMap((step) => [step.name, step.text]),
        ...guide.templates.map((template) => template.body),
        ...guide.faqs.flatMap((faqItem) => [faqItem.question, faqItem.answer]),
      )
    }

    prose.push(
      tradeReviewGuideHub.intro,
      ...tradeReviewGuideHub.faqs.flatMap((faq) => [faq.question, faq.answer]),
    )
    expect(new Set(prose).size).toBe(prose.length)
    expect(relatedTradeReviewGuides("lawn-care").map((guide) => guide.slug)[0]).toBe("landscapers")
    expect(relatedTradeReviewGuides("landscapers").map((guide) => guide.slug)[0]).toBe("lawn-care")
    expect(tradeReviewGuideForIndustry("painter")).toBeNull()
  })

  it("adds the hub and each guide to the sitemap with a canonical URL", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://reviews.example.com"
    const paths = indexablePaths().map((entry) => entry.path)
    expect(paths).toContain(tradeReviewGuideHub.path)
    const hubMetadata = pageMetadata({
      title: tradeReviewGuideHub.title,
      description: tradeReviewGuideHub.description,
      path: tradeReviewGuideHub.path,
    })
    expect(hubMetadata.alternates).toEqual({
      canonical: "https://reviews.example.com/how-to-get-more-google-reviews-for",
    })
    expect(source("app/how-to-get-more-google-reviews-for/page.tsx")).toContain("tradeReviewGuideHub.path")
    expect(hubMetadata.title).toBe(tradeReviewGuideHub.title)
    for (const guide of tradeReviewGuides) {
      const path = tradeReviewGuidePath(guide)
      expect(paths).toContain(path)
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: guide.slug }) })
      expect(metadata.title).toBe(guide.title)
      expect(metadata.description).toBe(guide.description)
      expect(metadata.alternates).toEqual({ canonical: `https://reviews.example.com${path}` })
    }
    const missing = await generateMetadata({ params: Promise.resolve({ slug: "painters" }) })
    expect(missing).toEqual({})
    expect(paths.some((path) => path.toLowerCase().includes("cullman"))).toBe(false)
  })

  it("reuses the setup, signup, and pricing events and links the city pages", () => {
    const page = source("app/how-to-get-more-google-reviews-for/[slug]/page.tsx")
    const hub = source("app/how-to-get-more-google-reviews-for/page.tsx")
    const cta = source("components/marketing/trade-guide-cta.tsx")
    expect(page).toContain("articleJsonLd")
    expect(page).toContain("faqJsonLd")
    expect(page).toContain("howToJsonLd")
    expect(page).toContain("qrCityPath")
    expect(page).toContain("TradeGuideCta")
    expect(page).toContain("setupLocation")
    expect(hub).toContain("TradeGuideCta")
    expect(hub).toContain('setupLocation="reviews_for_hub_band_setup"')
    expect(cta).toContain("professionalSignupPath()")
    expect(cta).toContain("SetupLink")
    expect(cta).toContain("PricingLink")
    expect(cta).toContain("SETUP_CTA_NOTE")
    expect(source("components/marketing/setup-link.tsx")).toContain("trackSetupCtaClick")
    expect(source("components/marketing/signup-link.tsx")).toContain("trackSignupClick")
    expect(source("components/marketing/pricing-link.tsx")).toContain("trackPricingClick")
    expect(source("app/industries/[slug]/page.tsx")).toContain("tradeReviewGuidePath")
    expect(source("app/industries/[slug]/[city]/page.tsx")).toContain("tradeReviewGuidePath")
    expect(source("app/guides/page.tsx")).toContain("tradeReviewGuideHub.path")
    expect(source("lib/funnel.ts")).toContain("how-to-get-more-google-reviews-for")
  })
})
