import { describe, expect, it } from "vitest"
import { adLandings } from "@/lib/ad-landings"
import { guideCluster } from "@/lib/guides"
import { industryBySlug } from "@/lib/industries"
import { comparisons, indexablePaths } from "@/lib/marketing-content"
import {
  otherQrCities,
  otherTradesInQrCity,
  qrCityHub,
  qrCityPage,
  qrCityPages,
  qrCityPagesForTrade,
  qrCityPath,
} from "@/lib/qr-city-pages"

const BRAND_SUFFIX = " · ReputationFlow"

describe("city QR landing pages", () => {
  const paths = indexablePaths().map((entry) => entry.path)

  it("publishes a capped set of distinct city pages and a hub", () => {
    expect(qrCityPages).toHaveLength(16)
    expect(new Set(qrCityPages.map((page) => qrCityPath(page))).size).toBe(qrCityPages.length)
    expect(paths).toContain(qrCityHub.path)
    for (const page of qrCityPages) {
      expect(paths).toContain(qrCityPath(page))
      expect(industryBySlug(page.tradeSlug)?.slug).toBe(page.tradeSlug)
    }
    expect(qrCityPagesForTrade("plumber").map((page) => page.citySlug)).toEqual(["houston", "chicago", "phoenix", "miami"])
    expect(qrCityPagesForTrade("hvac").map((page) => page.citySlug)).toEqual(["phoenix", "houston", "chicago", "denver"])
    expect(qrCityPagesForTrade("roofer").map((page) => page.citySlug)).toEqual(["dallas", "denver", "miami", "houston"])
    expect(qrCityPagesForTrade("electrician").map((page) => page.citySlug)).toEqual(["houston", "chicago", "phoenix", "miami"])
    expect(qrCityPage("plumber", "denver")).toBeNull()
    expect(qrCityPage("cleaning-service", "houston")).toBeNull()
    expect(paths.some((path) => path.toLowerCase().includes("cullman"))).toBe(false)
  })

  it("keeps titles, descriptions, and on-page copy unique and within search limits", () => {
    const cityTitles = new Set([...qrCityPages.map((page) => page.title), qrCityHub.title])
    const existingTitles = [
      ...["plumber", "hvac", "roofer", "electrician", "dentists", "salons"].flatMap((slug) => {
        const title = industryBySlug(slug)?.title
        return title ? [title] : []
      }),
      ...guideCluster.map((guide) => guide.title),
      ...comparisons.map((page) => page.title),
      ...adLandings.map((page) => page.title),
    ]
    expect(cityTitles.size).toBe(qrCityPages.length + 1)
    expect(new Set([...qrCityPages.map((page) => page.description), qrCityHub.description]).size).toBe(qrCityPages.length + 1)
    for (const title of existingTitles) {
      expect(cityTitles.has(title)).toBe(false)
    }
    expect(new Set(qrCityPages.map((page) => page.heading)).size).toBe(qrCityPages.length)
    expect(new Set(qrCityPages.map((page) => page.intro)).size).toBe(qrCityPages.length)
    expect(new Set(qrCityPages.map((page) => page.script)).size).toBe(qrCityPages.length)
    expect(new Set(qrCityPages.map((page) => page.timing)).size).toBe(qrCityPages.length)
    expect(new Set(qrCityPages.map((page) => page.summary)).size).toBe(qrCityPages.length)
    expect(new Set(qrCityPages.map((page) => page.placements.join("\n"))).size).toBe(qrCityPages.length)

    const questions = [...qrCityPages.flatMap((page) => page.faqs.map((faq) => faq.question)), ...qrCityHub.faqs.map((faq) => faq.question)]
    const answers = [...qrCityPages.flatMap((page) => page.faqs.map((faq) => faq.answer)), ...qrCityHub.faqs.map((faq) => faq.answer)]
    expect(new Set(questions).size).toBe(questions.length)
    expect(new Set(answers).size).toBe(answers.length)

    for (const page of [...qrCityPages, { title: qrCityHub.title, description: qrCityHub.description, heading: qrCityHub.title, query: "", cityName: "", script: "[link]", faqs: qrCityHub.faqs, intro: qrCityHub.description, timing: "hub" }]) {
      expect(page.title.length).toBeGreaterThan(10)
      expect(page.title.length).toBeLessThan(60)
      expect(page.title.length + BRAND_SUFFIX.length).toBeLessThanOrEqual(60)
      expect(page.description.length).toBeGreaterThanOrEqual(120)
      expect(page.description.length).toBeLessThanOrEqual(155)
    }

    for (const page of qrCityPages) {
      expect(page.heading.toLowerCase()).toContain(page.cityName.toLowerCase())
      expect(page.heading.toLowerCase()).toContain("qr")
      expect(page.query.toLowerCase()).toContain(page.cityName.toLowerCase())
      expect(page.query.toLowerCase()).toContain("google review qr code")
      expect(page.intro).toContain(page.cityName)
      expect(page.script).toContain("[link]")
      expect(page.faqs.length).toBeGreaterThanOrEqual(3)
      expect(page.placements).toHaveLength(3)
      expect(otherQrCities(page).length).toBe(3)
      const serialized = JSON.stringify(page).toLowerCase()
      expect(serialized).not.toContain("cullman")
      expect(serialized).not.toContain("alabama")
      expect(serialized).not.toMatch(/\d+%/)
      expect(serialized).not.toContain("happy customers")
    }
  })

  it("links same-city trades only when that pair was written", () => {
    const houstonPlumber = qrCityPage("plumber", "houston")
    expect(houstonPlumber).not.toBeNull()
    if (!houstonPlumber) return
    expect(otherTradesInQrCity(houstonPlumber).map((page) => page.tradeSlug).sort()).toEqual(["electrician", "hvac", "roofer"])
    const dallasRoofer = qrCityPage("roofer", "dallas")
    expect(dallasRoofer).not.toBeNull()
    if (!dallasRoofer) return
    expect(otherTradesInQrCity(dallasRoofer)).toEqual([])
  })
})
