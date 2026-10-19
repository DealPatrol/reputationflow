"use client"

import { cleanPath, nextFunnelOrigin } from "@/lib/funnel"

const STORAGE_KEY = "rf_funnel_origin"
export const FUNNEL_ORIGIN_COOKIE = "rf_origin"
const MAX_AGE_SECONDS = 60 * 60 * 24 * 90

function readCookie(): string {
  if (typeof document === "undefined") return ""
  const prefix = `${FUNNEL_ORIGIN_COOKIE}=`
  const row = document.cookie.split("; ").find((part) => part.startsWith(prefix))
  if (!row) return ""
  try {
    return cleanPath(decodeURIComponent(row.slice(prefix.length)))
  } catch {
    return ""
  }
}

function writeCookie(path: string) {
  if (typeof document === "undefined" || typeof window === "undefined") return
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${FUNNEL_ORIGIN_COOKIE}=${encodeURIComponent(path)}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`
}

export function readFunnelOrigin(): string {
  if (typeof window === "undefined") return ""
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    const cleaned = stored ? cleanPath(stored) : ""
    if (cleaned) return cleaned
  } catch {
    // Session storage can throw in private mode.
  }
  return readCookie()
}

export function rememberFunnelOrigin(path: string): string {
  if (typeof window === "undefined") return ""
  const current = readFunnelOrigin()
  const next = nextFunnelOrigin(current || null, path)
  if (!next) return ""
  if (next === current) return next
  try {
    sessionStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Session storage can throw in private mode. The cookie still carries the path.
  }
  writeCookie(next)
  return next
}

export function pagePath(): string {
  if (typeof window === "undefined") return ""
  return cleanPath(window.location.pathname)
}
