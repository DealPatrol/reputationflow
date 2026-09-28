import { describe, expect, it } from "vitest"
import { buildGoogleReviewLink } from "@/lib/google-review-link"

describe("buildGoogleReviewLink", () => {
  it("builds the official review URL from a Place ID", () => {
    const result = buildGoogleReviewLink("ChIJexamplePlaceId123")
    expect(result).toEqual({
      ok: true,
      placeId: "ChIJexamplePlaceId123",
      url: "https://search.google.com/local/writereview?placeid=ChIJexamplePlaceId123",
    })
  })

  it("extracts a Place ID from a review URL", () => {
    const result = buildGoogleReviewLink(
      "https://search.google.com/local/writereview?placeid=ChIJexamplePlaceId123&hl=en",
    )
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.placeId).toBe("ChIJexamplePlaceId123")
  })

  it("rejects a maps link that does not contain a Place ID", () => {
    const result = buildGoogleReviewLink("https://maps.app.goo.gl/abc123")
    expect(result.ok).toBe(false)
  })
})
