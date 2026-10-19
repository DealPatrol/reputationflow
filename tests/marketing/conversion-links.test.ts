import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8")
}

describe("money-page links", () => {
  it("connects the generator, trade pages, city pages, and pricing", () => {
    const paths = source("components/marketing/conversion-paths.tsx")
    const pricing = source("app/pricing/page.tsx")
    const trades = source("app/industries/[slug]/page.tsx")
    const cities = source("app/industries/[slug]/[city]/page.tsx")
    const hub = source("app/google-review-qr-by-city/page.tsx")
    const generator = source("app/tools/qr-code/page.tsx")
    const linkTool = source("app/tools/google-review-link/page.tsx")
    const tradeIndex = source("app/industries/page.tsx")
    const toolIndex = source("app/tools/page.tsx")

    for (const href of [
      '"/tools/qr-code"',
      '"/tools/google-review-link"',
      '"/industries"',
      '"/google-review-qr-by-city"',
      '"/pricing"',
    ]) {
      expect(paths).toContain(href)
    }

    expect(pricing).toContain("ConversionPaths")
    expect(trades).toContain("ConversionPaths")
    expect(trades).toContain("PlanOffer")
    expect(trades).toContain('"/tools/qr-code"')
    expect(trades).toContain('"/google-review-qr-by-city"')
    expect(hub).toContain("ConversionPaths")
    expect(hub).toContain('"/tools/qr-code"')
    expect(hub).toContain('"/tools/google-review-link"')
    expect(tradeIndex).toContain("ConversionPaths")
    expect(tradeIndex).toContain('"/tools/qr-code"')
    expect(cities).toContain("PricingLink")
    expect(cities).toContain('"/tools/qr-code"')
    expect(cities).toContain('"/tools/google-review-link"')
    expect(cities).toContain("GoogleReviewQrTool")
    expect(generator).toContain('"/pricing"')
    expect(generator).toContain('"/industries"')
    expect(generator).toContain("qrCityHub.path")
    expect(linkTool).toContain("PricingLink")
    expect(linkTool).toContain('"/tools/qr-code"')
    expect(linkTool).toContain('"/google-review-qr-by-city"')
    expect(toolIndex).toContain("PricingLink")
    expect(toolIndex).toContain('"/industries"')
    expect(toolIndex).toContain('"/google-review-qr-by-city"')
    expect(source("components/marketing/pricing-link.tsx")).toContain('"/pricing"')
    expect(source("components/tools/google-review-qr-tool.tsx")).toContain("PlanOffer")
    expect(source("components/marketing/plan-offer.tsx")).toContain("PLANS")
    expect(source("components/marketing/plan-offer.tsx")).toContain("formatPlanPrice")
  })
})