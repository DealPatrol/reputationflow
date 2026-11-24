"use client"

/**
 * Client-only wrappers around Capacitor plugins for the iOS app. Every @capacitor/* import is
 * dynamic, so none of this code runs (or is downloaded up front) on the website.
 */
import { isNativeIos } from "@/lib/native/platform"
import type { CounterCache } from "@/lib/native/counter-cache"
import { COUNTER_CACHE_KEY, parseCounterCache } from "@/lib/native/counter-cache"
import { buildReminderNotifications, REMINDER_ID_MAX, REMINDER_ID_MIN, type ReminderFrequency } from "@/lib/native/reminders"

export interface NativeTransaction {
  productId: string
  jws: string
  expirationDate?: number | null
  originalTransactionId?: string
}

export interface NativeProduct {
  id: string
  displayName: string
  description: string
  displayPrice: string
  price: number
  period?: "day" | "week" | "month" | "year" | null
  introductoryOffer?: string | null
}

interface ListenerHandle {
  remove: () => Promise<void>
}

export interface ReputationFlowNativePlugin {
  getProducts(options: { productIds: string[] }): Promise<{ products: NativeProduct[] }>
  purchase(options: { productId: string; appAccountToken?: string }): Promise<{ status: string; transaction?: NativeTransaction }>
  restore(): Promise<{ transactions: NativeTransaction[] }>
  currentEntitlements(): Promise<{ transactions: NativeTransaction[] }>
  manageSubscriptions(): Promise<void>
  biometryInfo(): Promise<{ available: boolean; type: "faceId" | "touchId" | "opticId" | "passcode" }>
  authenticate(options: { reason: string }): Promise<{ ok: boolean; error?: string }>
  qrCode(options: { text: string; size?: number }): Promise<{ base64: string }>
  share(options: {
    text?: string
    url?: string
    subject?: string
    imageBase64?: string
    fileBase64?: string
    filename?: string
  }): Promise<{ completed: boolean; activityType?: string | null }>
  addListener(
    event: "transactionsUpdated",
    callback: (data: { transactions: NativeTransaction[] }) => void,
  ): Promise<ListenerHandle>
}

let pluginPromise: Promise<ReputationFlowNativePlugin> | null = null

export function nativePlugin(): Promise<ReputationFlowNativePlugin> {
  if (!isNativeIos()) return Promise.reject(new Error("Only available in the iPhone app"))
  pluginPromise ??= import("@capacitor/core").then(({ registerPlugin }) =>
    registerPlugin<ReputationFlowNativePlugin>("ReputationFlowNative"),
  )
  return pluginPromise
}

// ---- Preferences (native UserDefaults; survives WebView cache eviction and works offline) ----

export async function prefGet(key: string): Promise<string | null> {
  if (!isNativeIos()) return null
  const { Preferences } = await import("@capacitor/preferences")
  return (await Preferences.get({ key })).value
}

export async function prefSet(key: string, value: string): Promise<void> {
  if (!isNativeIos()) return
  const { Preferences } = await import("@capacitor/preferences")
  await Preferences.set({ key, value })
}

export async function prefRemove(key: string): Promise<void> {
  if (!isNativeIos()) return
  const { Preferences } = await import("@capacitor/preferences")
  await Preferences.remove({ key })
}

export async function saveCounterCache(cache: CounterCache): Promise<void> {
  await prefSet(COUNTER_CACHE_KEY, JSON.stringify(cache))
}

export async function loadCounterCache(): Promise<CounterCache | null> {
  return parseCounterCache(await prefGet(COUNTER_CACHE_KEY))
}

// ---- Feedback & chrome ----

export function haptic(kind: "light" | "success" = "light") {
  if (!isNativeIos()) return
  void import("@capacitor/haptics")
    .then(({ Haptics, ImpactStyle, NotificationType }) =>
      kind === "success" ? Haptics.notification({ type: NotificationType.Success }) : Haptics.impact({ style: ImpactStyle.Light }),
    )
    .catch(() => {})
}

/** dark = light text for dark headers (the dashboard), light = dark text for light pages. */
export function setStatusBarTheme(theme: "dark" | "light") {
  if (!isNativeIos()) return
  void import("@capacitor/status-bar")
    .then(({ StatusBar, Style }) => StatusBar.setStyle({ style: theme === "dark" ? Style.Dark : Style.Light }))
    .catch(() => {})
}

// ---- Share ----

function base64FromDataUrl(dataUrl: string): string | null {
  const match = /^data:[^;,]+;base64,(.*)$/.exec(dataUrl)
  return match ? match[1] : null
}

async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = new Uint8Array(await blob.arrayBuffer())
  let binary = ""
  for (let i = 0; i < buffer.length; i += 0x8000) {
    binary += String.fromCharCode(...buffer.subarray(i, i + 0x8000))
  }
  return btoa(binary)
}

/** Opens the iOS share sheet (Messages, Mail, AirDrop, Copy, Save Image, Print). */
export async function shareReviewLink(input: { url: string; text?: string; subject?: string; qrDataUrl?: string | null }) {
  const plugin = await nativePlugin()
  const imageBase64 = input.qrDataUrl ? base64FromDataUrl(input.qrDataUrl) ?? undefined : undefined
  haptic()
  return plugin.share({ url: input.url, text: input.text, subject: input.subject, imageBase64 })
}

/** Replaces <a download> (unsupported in WKWebView) with the share sheet, which offers Save to Files/Photos. */
export async function shareDownload(href: string, filename: string) {
  const plugin = await nativePlugin()
  const inline = href.startsWith("data:") ? base64FromDataUrl(href) : null
  const fileBase64 = inline ?? (await blobToBase64(await (await fetch(href)).blob()))
  return plugin.share({ fileBase64, filename: filename || "reputationflow-file" })
}

export async function nativeQrDataUrl(text: string, size = 1024): Promise<string> {
  const plugin = await nativePlugin()
  const { base64 } = await plugin.qrCode({ text, size })
  return `data:image/png;base64,${base64}`
}

// ---- Reminders (local notifications, scheduled on device) ----

export const REMINDER_PREF_KEY = "rf.reminders.v1"

export async function scheduleReminders(frequency: ReminderFrequency, businessName: string): Promise<"scheduled" | "denied" | "off"> {
  const { LocalNotifications } = await import("@capacitor/local-notifications")
  const pending = await LocalNotifications.getPending()
  const ours = pending.notifications.filter((n) => n.id >= REMINDER_ID_MIN && n.id <= REMINDER_ID_MAX)
  if (ours.length) await LocalNotifications.cancel({ notifications: ours.map((n) => ({ id: n.id })) })
  await prefSet(REMINDER_PREF_KEY, frequency)
  if (frequency === "off") return "off"
  let permission = await LocalNotifications.checkPermissions()
  if (permission.display === "prompt" || permission.display === "prompt-with-rationale") {
    permission = await LocalNotifications.requestPermissions()
  }
  if (permission.display !== "granted") {
    await prefSet(REMINDER_PREF_KEY, "off")
    return "denied"
  }
  await LocalNotifications.schedule({ notifications: buildReminderNotifications(frequency, businessName) })
  return "scheduled"
}

// ---- App lock ----

export const LOCK_PREF_KEY = "rf.lock.v1"

// ---- StoreKit 2 entitlements -> server ----

export const ENTITLEMENTS_EVENT = "rf-entitlements"

export interface ServerEntitlement {
  status: string
  isPremium: boolean
  linkedElsewhere?: boolean
}

/** Sends signed StoreKit transactions to the server, which verifies them with Apple's certificates. */
export async function syncTransactionsToServer(transactions: NativeTransaction[]): Promise<ServerEntitlement | null> {
  const response = await fetch("/api/iap/apple/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ transactions: transactions.map((t) => t.jws).filter(Boolean) }),
  })
  if (response.status === 401) return null
  const data = (await response.json().catch(() => ({}))) as Partial<ServerEntitlement> & { error?: string }
  if (!response.ok) throw new Error(data.error || "Could not confirm the App Store purchase")
  const result = { status: String(data.status ?? "inactive"), isPremium: Boolean(data.isPremium), linkedElsewhere: Boolean(data.linkedElsewhere) }
  window.dispatchEvent(new CustomEvent<ServerEntitlement>(ENTITLEMENTS_EVENT, { detail: result }))
  return result
}

export async function refreshEntitlements(): Promise<ServerEntitlement | null> {
  const plugin = await nativePlugin()
  const { transactions } = await plugin.currentEntitlements()
  return syncTransactionsToServer(transactions)
}
