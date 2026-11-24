import { describe, expect, it } from "vitest"
import { COUNTER_CACHE_VERSION, parseCounterCache } from "@/lib/native/counter-cache"
import { buildCounterCache, COUNTER_TRADES } from "@/lib/native/counter-kit"
import { buildReminderNotifications, REMINDER_ID_MAX, REMINDER_ID_MIN } from "@/lib/native/reminders"

const base = {
  businessName: "Lopez Plumbing",
  reviewUrl: "https://tryreputationflow.com/review/7",
  trade: "Plumber",
  senderName: "Ana",
  qrDataUrl: "data:image/png;base64,AAAA",
  now: new Date("2026-11-20T18:00:00Z"),
}

describe("Counter Kit offline cache", () => {
  it("fills request scripts with the review link, business and sender", () => {
    const cache = buildCounterCache(base)
    expect(cache.requestScripts.map((s) => s.id)).toEqual(["sms", "email", "inPerson"])
    const sms = cache.requestScripts[0].text
    expect(sms).toContain("https://tryreputationflow.com/review/7")
    expect(sms).toContain("Lopez Plumbing")
    expect(sms).toContain("Ana")
    expect(sms).not.toMatch(/\[first name\]/i)
    expect(cache.requestScripts[1].subject).toBe("A Google review for Lopez Plumbing")
    expect(cache.requestScripts[1].text.startsWith("Subject:")).toBe(false)
    expect(cache.replyTemplates).toHaveLength(4)
    expect(cache.savedAt).toBe("2026-11-20T18:00:00.000Z")
  })

  it("falls back to a known trade", () => {
    expect(buildCounterCache({ ...base, trade: "Unknown" }).trade).toBe(COUNTER_TRADES[0])
  })

  it("round-trips through parse and rejects unsafe or malformed data", () => {
    const cache = buildCounterCache(base)
    expect(parseCounterCache(JSON.stringify(cache))).toEqual(cache)
    expect(parseCounterCache(JSON.stringify({ ...cache, reviewUrl: "javascript:alert(1)" }))).toBeNull()
    expect(parseCounterCache(JSON.stringify({ ...cache, reviewUrl: "http://example.com" }))).toBeNull()
    expect(parseCounterCache(JSON.stringify({ ...cache, version: COUNTER_CACHE_VERSION + 1 }))).toBeNull()
    expect(parseCounterCache("{not json")).toBeNull()
    expect(parseCounterCache(null)).toBeNull()
    expect(parseCounterCache(JSON.stringify({ ...cache, qrDataUrl: "https://evil.example/qr.png" }))?.qrDataUrl).toBeNull()
  })
})

describe("review check-in reminders", () => {
  it("schedules nothing when off", () => {
    expect(buildReminderNotifications("off", "Shop")).toEqual([])
  })

  it("schedules a repeating daily or weekly reminder without customer data", () => {
    const [daily] = buildReminderNotifications("daily", "Lopez Plumbing")
    expect(daily.schedule.on).toEqual({ hour: 17, minute: 0 })
    expect(daily.id).toBeGreaterThanOrEqual(REMINDER_ID_MIN)
    expect(daily.id).toBeLessThanOrEqual(REMINDER_ID_MAX)
    expect(daily.extra.path).toBe("/dashboard?tab=counter")
    const [weekly] = buildReminderNotifications("weekly", "  ")
    expect(weekly.schedule.on).toEqual({ weekday: 6, hour: 17, minute: 0 })
    expect(weekly.body).toContain("your business")
  })
})
