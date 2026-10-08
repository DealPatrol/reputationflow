export const ATTRIBUTION_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "landing_path",
] as const

export type AttributionField = (typeof ATTRIBUTION_FIELDS)[number]

export type Attribution = Partial<Record<AttributionField, string>>

const CLICK_FIELDS = new Set<AttributionField>(["gclid", "fbclid"])
const FIELD_PATTERN = /^[A-Za-z0-9 ._~-]{1,120}$/
const PATH_PATTERN = /^\/[a-z0-9/-]{0,119}$/

export const ATTRIBUTION_COOKIE = "rf_attr"
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90

function cleanField(field: AttributionField, value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > 120) return undefined
  if (field === "landing_path") {
    return PATH_PATTERN.test(trimmed) ? trimmed : undefined
  }
  if (CLICK_FIELDS.has(field) && !/^[A-Za-z0-9._~-]{1,120}$/.test(trimmed)) return undefined
  if (!FIELD_PATTERN.test(trimmed)) return undefined
  return trimmed
}

export function sanitizeAttribution(input: unknown): Attribution {
  if (!input || typeof input !== "object") return {}
  const source = input as Record<string, unknown>
  const attribution: Attribution = {}
  for (const field of ATTRIBUTION_FIELDS) {
    const value = cleanField(field, source[field])
    if (value) attribution[field] = value
  }
  return attribution
}

export function attributionFromSearch(search: string, landingPath: string): Attribution | null {
  const params = new URLSearchParams(search)
  const raw: Record<string, string> = {}
  for (const field of ATTRIBUTION_FIELDS) {
    if (field === "landing_path") continue
    const value = params.get(field)
    if (value) raw[field] = value
  }
  if (Object.keys(raw).length === 0) return null
  raw.landing_path = landingPath
  const attribution = sanitizeAttribution(raw)
  return Object.keys(attribution).length > 0 ? attribution : null
}

export function hasAttribution(attribution: Attribution) {
  return ATTRIBUTION_FIELDS.some((field) => Boolean(attribution[field]))
}

export function captureAttributionFromLocation() {
  if (typeof window === "undefined") return
  const next = attributionFromSearch(window.location.search, window.location.pathname)
  if (!next) return
  document.cookie = `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(next))}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`
}

export function readStoredAttribution(): Attribution {
  if (typeof document === "undefined") return {}
  const prefix = `${ATTRIBUTION_COOKIE}=`
  const row = document.cookie.split("; ").find((part) => part.startsWith(prefix))
  if (!row) return {}
  try {
    return sanitizeAttribution(JSON.parse(decodeURIComponent(row.slice(prefix.length))))
  } catch {
    return {}
  }
}
