import { afterEach, describe, expect, it } from "vitest"
import { adsConfig, googleAdsSendTo } from "@/lib/ads-config"
import { attributionFromSearch, sanitizeAttribution } from "@/lib/attribution"

const envKeys = [
  "NEXT_PUBLIC_META_PIXEL_ID",
  "NEXT_PUBLIC_GA4_ID",
  "NEXT_PUBLIC_GOOGLE_ADS_ID",
  "NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL",
  "NEXT_PUBLIC_GOOGLE_ADS_SIGNUP_LABEL",
  "NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL",
] as const

describe("ads config", () => {
  const original = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]))

  afterEach(() => {
    for (const key of envKeys) {
      if (original[key] === undefined) delete process.env[key]
      else process.env[key] = original[key]
    }
  })

  it("loads nothing when the ids are blank or malformed", () => {
    delete process.env.NEXT_PUBLIC_META_PIXEL_ID
    delete process.env.NEXT_PUBLIC_GA4_ID
    delete process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
    process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL = "lead label"
    const config = adsConfig()
    expect(config.metaPixelId).toBeNull()
    expect(config.ga4Id).toBeNull()
    expect(config.googleAdsId).toBeNull()
    expect(config.leadLabel).toBeNull()
    expect(googleAdsSendTo(config.googleAdsId, config.leadLabel)).toBeNull()
  })

  it("keeps valid ids and builds a Google Ads send_to only when the label is set", () => {
    process.env.NEXT_PUBLIC_META_PIXEL_ID = "1234567890"
    process.env.NEXT_PUBLIC_GA4_ID = "G-ABC123"
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = "AW-999"
    process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL = "purchase1"
    const config = adsConfig()
    expect(config).toMatchObject({
      metaPixelId: "1234567890",
      ga4Id: "G-ABC123",
      googleAdsId: "AW-999",
      purchaseLabel: "purchase1",
    })
    expect(googleAdsSendTo(config.googleAdsId, config.purchaseLabel)).toBe("AW-999/purchase1")
    expect(googleAdsSendTo(config.googleAdsId, null)).toBeNull()
  })
})

describe("attribution", () => {
  it("keeps utm and click ids from the landing URL and drops unsafe values", () => {
    const captured = attributionFromSearch(
      "?utm_source=google&utm_medium=cpc&gclid=abc123&fbclid=not allowed&utm_campaign=<script>",
      "/ads/restaurants",
    )
    expect(captured).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      gclid: "abc123",
      landing_path: "/ads/restaurants",
    })
  })

  it("returns null when the URL has no campaign parameters", () => {
    expect(attributionFromSearch("?signup=1", "/pricing")).toBeNull()
  })

  it("sanitizes a stored payload", () => {
    expect(sanitizeAttribution({
      utm_source: "meta",
      landing_path: "/guides/review-request-text-message-templates",
      gclid: "bad id",
      extra: "nope",
    })).toEqual({
      utm_source: "meta",
      landing_path: "/guides/review-request-text-message-templates",
    })
  })
})
