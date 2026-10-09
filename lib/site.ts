const LOCAL_FALLBACK = "http://localhost:3000"

/** Public contact address until mail is set up on the public site domain. */
export const PUBLIC_CONTACT_EMAIL = "support@tryreputationflow.com"

function trimTrailingSlash(value: string) {
  return value.trim().replace(/\/$/, "")
}

/** Canonical public origin. Prefer NEXT_PUBLIC_SITE_URL when a custom domain is attached. */
export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL
  return trimTrailingSlash(configured || LOCAL_FALLBACK)
}

/** Base URL for links a customer will open. Uses the configured site URL, then the current browser origin. */
export function getShareBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL)
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin
  }
  return getSiteUrl()
}

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return getSiteUrl()
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${getSiteUrl()}${normalized}`
}

export function reviewPagePath(businessId: string | number) {
  return `/review/${businessId}`
}

export function reviewPageUrl(businessId: string | number) {
  return `${getShareBaseUrl()}${reviewPagePath(businessId)}`
}
