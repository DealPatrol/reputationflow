/**
 * Offline "Counter Kit" cache: the business's review link, QR image, and ready-to-send scripts.
 * Saved to native Preferences by the dashboard; read by the dashboard and by the bundled offline
 * page (ios-offline/index.html) when there is no signal at the counter or job site.
 */
export const COUNTER_CACHE_KEY = "rf.counter.v1"
export const COUNTER_CACHE_VERSION = 1

export interface CounterScript {
  id: string
  label: string
  text: string
  subject?: string | null
}

export interface CounterCache {
  version: typeof COUNTER_CACHE_VERSION
  businessName: string
  reviewUrl: string
  qrDataUrl: string | null
  trade: string
  senderName: string
  requestScripts: CounterScript[]
  replyTemplates: CounterScript[]
  savedAt: string
}

const MAX_TEXT = 4000

function cleanScripts(value: unknown): CounterScript[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((s): s is CounterScript => Boolean(s) && typeof s.id === "string" && typeof s.label === "string" && typeof s.text === "string")
    .slice(0, 20)
    .map((s) => ({
      id: s.id.slice(0, 40),
      label: s.label.slice(0, 80),
      text: s.text.slice(0, MAX_TEXT),
      subject: typeof s.subject === "string" ? s.subject.slice(0, 200) : null,
    }))
}

export function isSafeShareUrl(value: unknown): value is string {
  if (typeof value !== "string") return false
  try {
    const url = new URL(value)
    return url.protocol === "https:" && !url.username && !url.password
  } catch {
    return false
  }
}

/** Parses and sanitizes a stored cache. Returns null for anything malformed. */
export function parseCounterCache(raw: string | null | undefined): CounterCache | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<CounterCache>
    if (data.version !== COUNTER_CACHE_VERSION || !isSafeShareUrl(data.reviewUrl)) return null
    const qr = typeof data.qrDataUrl === "string" && data.qrDataUrl.startsWith("data:image/png;base64,") ? data.qrDataUrl : null
    return {
      version: COUNTER_CACHE_VERSION,
      businessName: String(data.businessName ?? "").slice(0, 120),
      reviewUrl: data.reviewUrl,
      qrDataUrl: qr,
      trade: String(data.trade ?? "").slice(0, 60),
      senderName: String(data.senderName ?? "").slice(0, 80),
      requestScripts: cleanScripts(data.requestScripts),
      replyTemplates: cleanScripts(data.replyTemplates),
      savedAt: typeof data.savedAt === "string" ? data.savedAt : new Date(0).toISOString(),
    }
  } catch {
    return null
  }
}
