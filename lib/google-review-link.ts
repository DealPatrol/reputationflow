const PLACE_ID_PATTERN = /ChI[A-Za-z0-9_-]{8,}/

export type GoogleReviewLinkResult =
  | { ok: true; placeId: string; url: string }
  | { ok: false; error: string }

/**
 * Builds the official Google "write a review" URL from a Place ID or a link that already contains one.
 * Short maps.app.goo.gl links do not include a Place ID, so they cannot be converted here.
 */
export function buildGoogleReviewLink(input: string): GoogleReviewLinkResult {
  const value = input.trim()
  if (!value) {
    return { ok: false, error: "Paste a Place ID or a Google review link." }
  }

  const queryMatch = value.match(/[?&](?:placeid|place_id|query_place_id)=([^&#\s]+)/i)
  const candidate = queryMatch ? decodeURIComponent(queryMatch[1]) : value
  const placeMatch = candidate.match(PLACE_ID_PATTERN)

  if (!placeMatch) {
    return {
      ok: false,
      error:
        "That input does not include a Google Place ID. Open your Business Profile, choose Ask for reviews, and paste the link or the ID that starts with ChIJ.",
    }
  }

  const placeId = placeMatch[0]
  return {
    ok: true,
    placeId,
    url: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
  }
}
