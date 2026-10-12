import { describe, expect, it } from "vitest"
import { buildGoogleReviewLink, extractPlaceId, reviewToolOutcome } from "@/lib/google-review-link"

const placeId = "ChIJexamplePlaceId123"
const reviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`

describe("buildGoogleReviewLink", () => {
  it("builds the official review URL from a Place ID", () => {
    const result = buildGoogleReviewLink(placeId)
    expect(result).toEqual({
      ok: true,
      placeId,
      url: reviewUrl,
    })
  })

  it("extracts a Place ID from a review URL", () => {
    const result = buildGoogleReviewLink(`${reviewUrl}&hl=en`)
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.placeId).toBe(placeId)
  })

  it("extracts a Place ID from a long Maps place URL", () => {
    const result = buildGoogleReviewLink(
      `https://www.google.com/maps/place/Northside+Dental/@34.1,-86.8,17z/data=!4m6!3m5!1s${placeId}!8m2!3d34.1!4d-86.8`,
    )
    expect(result).toEqual({ ok: true, placeId, url: reviewUrl })
  })

  it("extracts a Place ID from a percent-encoded Maps URL", () => {
    expect(extractPlaceId(`https://www.google.com/maps/place/Shop/data=%211s${placeId}`)).toBe(placeId)
  })

  it("extracts a place_id: value", () => {
    expect(extractPlaceId(`place_id:${placeId}`)).toBe(placeId)
  })

  it("rejects a maps short link that does not contain a Place ID", () => {
    const result = buildGoogleReviewLink("https://maps.app.goo.gl/abc123")
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error.toLowerCase()).toContain("short link")
  })

  it("rejects a g.page short link", () => {
    const result = buildGoogleReviewLink("https://g.page/r/abc123/review")
    expect(result.ok).toBe(false)
  })

  it("explains a hex feature id instead of treating it as a Place ID", () => {
    const result = buildGoogleReviewLink(
      "https://www.google.com/maps/embed?pb=!1m2!1s0x89c25855c6480299:0x55194ec5a1ae072e!2sExample",
    )
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toContain("0x")
  })
})

describe("reviewToolOutcome", () => {
  it("keeps a non-Google https URL as a plain QR target", () => {
    expect(reviewToolOutcome("https://reviews.example.com/review/12", true)).toEqual({
      status: "plain",
      url: "https://reviews.example.com/review/12",
    })
  })

  it("does not turn a Maps URL that lacks a Place ID into a plain QR", () => {
    const outcome = reviewToolOutcome(
      "https://www.google.com/maps/embed?pb=!1m2!1s0x89c25855c6480299:0x55194ec5a1ae072e!2sExample",
      true,
    )
    expect(outcome.status).toBe("error")
  })

  it("does not accept a plain URL on the link generator", () => {
    expect(reviewToolOutcome("https://reviews.example.com/review/12", false).status).toBe("error")
  })
})
