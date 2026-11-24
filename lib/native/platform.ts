/**
 * Native iOS detection for the ReputationFlow App Store build.
 *
 * The iOS app (Capacitor 8, see capacitor.config.ts) loads this Next.js app and appends
 * NATIVE_IOS_UA_TOKEN to the WKWebView user agent. This module is safe to import from server code,
 * tests, and client components: it never imports @capacitor/* at module scope.
 */

export const NATIVE_IOS_UA_TOKEN = "ReputationFlowIOS"
export const NATIVE_APP_SCHEME = "reputationflow"
export const NATIVE_HOME_PATH = "/dashboard"
export const NATIVE_HTML_CLASS = "native-ios"

type CapacitorGlobal = { getPlatform?: () => string; isNativePlatform?: () => boolean }

export function isNativeIosUserAgent(userAgent: string | null | undefined): boolean {
  return typeof userAgent === "string" && userAgent.includes(NATIVE_IOS_UA_TOKEN)
}

/** True only inside the ReputationFlow iPhone/iPad app. Always false on the web and on the server. */
export function isNativeIos(): boolean {
  if (typeof window === "undefined") return false
  const cap = (window as unknown as { Capacitor?: CapacitorGlobal }).Capacitor
  try {
    if (cap?.isNativePlatform?.() && cap.getPlatform?.() === "ios") return true
  } catch {
    /* fall through to the user agent check */
  }
  return isNativeIosUserAgent(window.navigator?.userAgent)
}

/**
 * Paths the iOS app shows. Marketing, pricing, comparison and free-tool pages carry web (Stripe)
 * purchase calls to action, so inside the app they redirect to the dashboard (Guideline 3.1.1).
 * Customer-facing review pages stay reachable so owners can preview them.
 */
export const NATIVE_ALLOWED_PREFIXES = [
  "/dashboard",
  "/auth",
  "/signup",
  "/onboarding",
  "/settings",
  "/privacy",
  "/terms",
  "/contact",
  "/review/",
  "/feedback/",
  "/embed/",
  "/api/",
  "/_next/",
] as const

function matchesPrefix(path: string, prefix: string) {
  if (prefix.endsWith("/")) return path.startsWith(prefix)
  return path === prefix || path.startsWith(`${prefix}/`)
}

export function isNativeAllowedPath(pathname: string): boolean {
  const path = (pathname || "/").split(/[?#]/)[0] || "/"
  if (/\.[a-z0-9]+$/i.test(path)) return true // static files: icons, images, llms.txt
  return NATIVE_ALLOWED_PREFIXES.some((prefix) => matchesPrefix(path, prefix))
}

/** Dashboard tabs a deep link may open. */
export const DEEP_LINK_TABS = [
  "dashboard",
  "counter",
  "links",
  "campaigns",
  "analytics",
  "monitoring",
  "settings",
  "billing",
  "widgets",
] as const

/**
 * Maps a reputationflow:// deep link (or an https link to this site) to an in-app path.
 * Only known destinations are accepted; anything else returns null.
 *   reputationflow://counter               -> /dashboard?tab=counter
 *   reputationflow://dashboard?tab=links   -> /dashboard?tab=links
 */
export function deepLinkToPath(raw: string | null | undefined): string | null {
  if (!raw) return null
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    return null
  }
  let segments: string[]
  if (url.protocol === `${NATIVE_APP_SCHEME}:`) {
    segments = [url.hostname, ...url.pathname.split("/")].filter(Boolean)
  } else if (url.protocol === "https:") {
    segments = url.pathname.split("/").filter(Boolean)
  } else {
    return null
  }
  const tabs: readonly string[] = DEEP_LINK_TABS
  const first = (segments[0] || "dashboard").toLowerCase()
  if (first === "dashboard") {
    const tab = url.searchParams.get("tab")
    return tab && tabs.includes(tab) && tab !== "dashboard" ? `/dashboard?tab=${tab}` : "/dashboard"
  }
  if (tabs.includes(first)) return `/dashboard?tab=${first}`
  if (first === "signin" || first === "login") return "/auth/signin"
  if (first === "privacy" || first === "terms" || first === "contact") return `/${first}`
  return null
}

/**
 * Inline <head> script. Runs before first paint inside the iOS app only: tags <html> so `.web-only`
 * blocks are hidden by CSS, and replaces any page that is not part of the app with the dashboard.
 * On the web the first check returns immediately, so web pages are unaffected.
 */
export function nativeBootScript(): string {
  const allowed = JSON.stringify(NATIVE_ALLOWED_PREFIXES)
  return [
    "(function(){try{",
    `if(navigator.userAgent.indexOf(${JSON.stringify(NATIVE_IOS_UA_TOKEN)})<0)return;`,
    `document.documentElement.classList.add(${JSON.stringify(NATIVE_HTML_CLASS)});`,
    'var p=location.pathname||"/";if(/\\.[a-z0-9]+$/i.test(p))return;',
    `var a=${allowed};`,
    'for(var i=0;i<a.length;i++){var x=a[i];if(x.charAt(x.length-1)==="/"?p.indexOf(x)===0:(p===x||p.indexOf(x+"/")===0))return;}',
    `location.replace(${JSON.stringify(NATIVE_HOME_PATH)});`,
    "}catch(e){}})();",
  ].join("")
}
