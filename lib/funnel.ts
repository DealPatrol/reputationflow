/**
 * Vercel Pro custom events allow 2 properties. Web Analytics Plus allows 8.
 * Every funnel event stays within 2 so the path is kept on Pro.
 */
export const FUNNEL_PROPERTY_LIMIT = 2

const PATH_PATTERN = /^\/[a-z0-9/-]{0,119}$/
const LOCATION_PATTERN = /^[a-z0-9_-]{1,80}$/

const BLOCKED_PREFIXES = [
  "/auth",
  "/signup",
  "/dashboard",
  "/onboarding",
  "/settings",
  "/api",
  "/embed",
  "/review",
  "/feedback",
  "/_next",
]

const WEAK_INDEXES = new Set(["/", "/guides", "/resources", "/tools", "/industries", "/google-review-qr-by-city"])

export function cleanPath(value: string): string {
  if (typeof value !== "string") return ""
  const trimmed = value.trim().split("?")[0]?.split("#")[0] ?? ""
  const normalized = trimmed.length > 1 ? trimmed.replace(/\/+$/, "") : trimmed
  if (!PATH_PATTERN.test(normalized)) return ""
  return normalized
}

export function cleanLocation(value: string): string {
  if (typeof value !== "string") return ""
  const trimmed = value.trim()
  return LOCATION_PATTERN.test(trimmed) ? trimmed : ""
}

function hasPrefix(path: string, prefix: string) {
  return path === prefix || path.startsWith(`${prefix}/`)
}

export function isOriginCandidate(path: string): boolean {
  const cleaned = cleanPath(path)
  if (!cleaned) return false
  return !BLOCKED_PREFIXES.some((prefix) => hasPrefix(cleaned, prefix))
}

export function isSeoLanding(path: string): boolean {
  if (path === "/tools/qr-code" || path === "/tools/google-review-link" || path === "/google-review-qr-by-city") return true
  if (/^\/compare\/[a-z0-9-]+$/.test(path)) return true
  if (path === "/tools/review-request-message" || /^\/review-request-text\/[a-z0-9-]+$/.test(path)) return true
  return /^\/industries\/[a-z0-9-]+(?:\/[a-z0-9-]+)?$/.test(path)
}

function isDescendant(parent: string, child: string) {
  if (parent === "/") return false
  return child.startsWith(`${parent}/`)
}

function shouldYield(current: string, path: string) {
  if (current === "/review-management-software" && /^\/compare\/[a-z0-9-]+$/.test(path)) return true
  if (!WEAK_INDEXES.has(current) || path === current) return false
  if (isDescendant(current, path)) return true
  if (current === "/" || current === "/guides" || current === "/resources" || current === "/tools" || current === "/industries") {
    return isSeoLanding(path)
  }
  if (current === "/google-review-qr-by-city") return path.startsWith("/industries/")
  return false
}

export function nextFunnelOrigin(current: string | null, path: string): string | null {
  const cleaned = cleanPath(path)
  const stored = current ? cleanPath(current) : ""
  if (!cleaned || !isOriginCandidate(cleaned)) {
    return stored && isOriginCandidate(stored) ? stored : null
  }
  if (!stored || !isOriginCandidate(stored)) return cleaned
  if (shouldYield(stored, cleaned) || isDescendant(stored, cleaned)) return cleaned
  return stored
}

export function capProperties(properties: Record<string, string>, max = FUNNEL_PROPERTY_LIMIT): Record<string, string> {
  const next: Record<string, string> = {}
  for (const [key, value] of Object.entries(properties)) {
    if (!value || value.length > 255) continue
    if (Object.keys(next).length >= max) break
    next[key] = value
  }
  return next
}
