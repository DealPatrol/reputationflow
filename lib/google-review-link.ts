const PLACE_ID_PATTERN = /ChI[A-Za-z0-9_-]{8,}/
const SHORT_LINK_HOSTS = new Set(["maps.app.goo.gl", "goo.gl", "g.page"])

export type GoogleReviewLinkResult =
  | { ok: true; placeId: string; url: string }
  | { ok: false; error: string }

export type ReviewToolOutcome =
  | { status: "empty" }
  | { status: "error"; error: string }
  | { status: "review"; placeId: string; url: string }
  | { status: "plain"; url: string }

export const findPlaceIdSteps: { name: string; text: string }[] = [
  {
    name: "Open the Business Profile for this location",
    text: "Reviews attach to one listing. Sign in at business.google.com and open the profile whose name and address match the door. If you have more than one location, pick the one customers should review.",
  },
  {
    name: "Copy the Ask for reviews link",
    text: "Choose Ask for reviews and copy the link Google shows. If that link contains placeid= or a code that starts with ChIJ, paste it into the box. This page does not call Google’s Places API and does not need an API key.",
  },
  {
    name: "If you only got a short link, copy the Maps address bar",
    text: "Links on g.page and maps.app.goo.gl hide the Place ID, and this page cannot expand them. Open maps.google.com, search the business name and city, and click the listing that shows your address. Copy the entire address-bar URL. The Place ID is the ChIJ text after !1s. Paste that long URL.",
  },
  {
    name: "Skip a feature ID that starts with 0x",
    text: "Some Maps and embed URLs contain !1s0x… instead of !1sChIJ. That 0x value is not a Place ID. Go back to the listing until the address bar includes ChIJ, or use the Ask for reviews link when it includes placeid=.",
  },
]

function decodeRepeated(value: string): string {
  let current = value.replace(/\+/g, " ")
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const next = decodeURIComponent(current)
      if (next === current) break
      current = next
    } catch {
      break
    }
  }
  return current
}

export function isShortGoogleLink(input: string): boolean {
  const value = input.trim()
  if (!value) return false
  try {
    const host = new URL(value).hostname.toLowerCase().replace(/^www\./, "")
    return SHORT_LINK_HOSTS.has(host)
  } catch {
    return false
  }
}

function isGoogleMapsUrl(input: string): boolean {
  if (isShortGoogleLink(input)) return true
  try {
    const url = new URL(input)
    const host = url.hostname.toLowerCase().replace(/^www\./, "")
    if (host === "maps.google.com" || host === "search.google.com") return true
    return (host === "google.com" || host.endsWith(".google.com")) && url.pathname.startsWith("/maps")
  } catch {
    return false
  }
}

function isHttpUrl(input: string): boolean {
  try {
    const protocol = new URL(input).protocol
    return protocol === "https:" || protocol === "http:"
  } catch {
    return false
  }
}

/**
 * Pulls a Google Place ID out of a raw ID, a write-a-review link, or a long Maps place URL.
 * Short maps.app.goo.gl and g.page links do not contain a Place ID.
 */
export function extractPlaceId(input: string): string | null {
  const decoded = decodeRepeated(input.trim())
  if (!decoded) return null

  const labeled = decoded.match(/(?:^|[?&#\s"'])(?:placeid|place_id|query_place_id)(?:=|:)([^&#\s"']+)/i)
  if (labeled) {
    const fromLabel = decodeRepeated(labeled[1]).match(PLACE_ID_PATTERN)
    if (fromLabel) return fromLabel[0]
  }

  const fromMapsData = decoded.match(/!1s(ChI[A-Za-z0-9_-]{8,})/)
  if (fromMapsData) return fromMapsData[1]

  const anywhere = decoded.match(PLACE_ID_PATTERN)
  return anywhere ? anywhere[0] : null
}

/**
 * Builds the official Google "write a review" URL from a Place ID or a link that already contains one.
 * Looking a business up by name needs the paid Places API, so this function never does that.
 */
export function buildGoogleReviewLink(input: string): GoogleReviewLinkResult {
  const value = input.trim()
  if (!value) {
    return {
      ok: false,
      error: "Paste a Place ID, a Google review link, or the long Google Maps URL for your listing.",
    }
  }

  if (isShortGoogleLink(value)) {
    return {
      ok: false,
      error:
        "That short link hides the Place ID, so it cannot be turned into a review link here. Open Google Maps, click your listing, and paste the long address-bar URL. It contains !1sChIJ.",
    }
  }

  const decoded = decodeRepeated(value)
  const placeId = extractPlaceId(decoded)
  if (!placeId) {
    if (/!1s0x[0-9a-f]+:0x[0-9a-f]+/i.test(decoded)) {
      return {
        ok: false,
        error:
          "That Maps URL has a feature ID that starts with 0x, not a Place ID. Click your listing and copy the address-bar URL that contains !1sChIJ, or copy the Ask for reviews link when it includes placeid=.",
      }
    }
    return {
      ok: false,
      error:
        "That input does not include a Google Place ID. Paste an ID that starts with ChIJ, a review link with placeid=, or the long Maps URL that contains !1sChIJ.",
    }
  }

  return {
    ok: true,
    placeId,
    url: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
  }
}

export function reviewToolOutcome(input: string, allowPlainUrl: boolean): ReviewToolOutcome {
  const value = input.trim()
  if (!value) return { status: "empty" }

  const review = buildGoogleReviewLink(value)
  if (review.ok) return { status: "review", placeId: review.placeId, url: review.url }

  if (allowPlainUrl && isHttpUrl(value) && !isGoogleMapsUrl(value)) {
    return { status: "plain", url: value }
  }

  return { status: "error", error: review.error }
}
