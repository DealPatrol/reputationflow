"use client"

import { useEffect, useState } from "react"
import { Bell, Fingerprint, WifiOff } from "lucide-react"
import { COUNTER_CACHE_KEY } from "@/lib/native/counter-cache"
import { LOCK_PREF_KEY, nativePlugin, prefGet, prefRemove, prefSet, REMINDER_PREF_KEY, scheduleReminders } from "@/lib/native/bridge"
import { isReminderFrequency, type ReminderFrequency } from "@/lib/native/reminders"

const BIOMETRY_LABEL: Record<string, string> = { faceId: "Face ID", touchId: "Touch ID", opticId: "Optic ID", passcode: "Passcode" }

/** iPhone-only settings: app lock, review check-in reminders, and the offline Counter Kit copy. */
export function NativePreferences({ businessName, showToast }: { businessName: string; showToast: (m: string, t: "success" | "error" | "info") => void }) {
  const [lock, setLock] = useState(false)
  const [biometry, setBiometry] = useState("Face ID")
  const [reminders, setReminders] = useState<ReminderFrequency>("off")
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    void (async () => {
      setLock((await prefGet(LOCK_PREF_KEY)) === "true")
      const saved = await prefGet(REMINDER_PREF_KEY)
      if (isReminderFrequency(saved)) setReminders(saved)
      try {
        const info = await (await nativePlugin()).biometryInfo()
        setBiometry(BIOMETRY_LABEL[info.type] ?? "Face ID")
      } catch {
        /* keep the default label */
      }
    })()
  }, [])

  const toggleLock = async () => {
    setBusy(true)
    try {
      const plugin = await nativePlugin()
      const info = await plugin.biometryInfo()
      if (!info.available) {
        showToast("Set up Face ID or a device passcode in iPhone Settings first.", "info")
        return
      }
      const next = !lock
      const result = await plugin.authenticate({ reason: next ? "Turn on the ReputationFlow app lock" : "Turn off the ReputationFlow app lock" })
      if (!result.ok) return
      await prefSet(LOCK_PREF_KEY, String(next))
      setLock(next)
      window.dispatchEvent(new CustomEvent("rf-lock-changed", { detail: next }))
      showToast(next ? `App lock is on. ${BIOMETRY_LABEL[info.type] ?? "Face ID"} or your passcode opens the app.` : "App lock is off.", "success")
    } catch {
      showToast("Could not change the app lock.", "error")
    } finally {
      setBusy(false)
    }
  }

  const changeReminders = async (frequency: ReminderFrequency) => {
    setBusy(true)
    try {
      const result = await scheduleReminders(frequency, businessName)
      if (result === "denied") {
        setReminders("off")
        showToast("Notifications are off for ReputationFlow. Allow them in iPhone Settings to get check-ins.", "info")
        return
      }
      setReminders(frequency)
      showToast(
        frequency === "off" ? "Review check-ins are off." : frequency === "daily" ? "Daily check-in set for 5 PM." : "Weekly check-in set for Fridays at 5 PM.",
        "success",
      )
    } catch {
      showToast("Could not schedule reminders.", "error")
    } finally {
      setBusy(false)
    }
  }

  const clearOffline = async () => {
    await prefRemove(COUNTER_CACHE_KEY)
    showToast("Removed the offline copy from this iPhone. Open Counter Kit to save it again.", "success")
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5" aria-labelledby="iphone-settings-title">
      <h2 id="iphone-settings-title" className="text-lg font-semibold text-slate-950">
        On this iPhone
      </h2>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Fingerprint className="mt-0.5 h-5 w-5 text-indigo-600" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-slate-900">Lock with {biometry}</p>
            <p className="text-sm text-slate-600">Hide customer feedback when the app is in the background.</p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={lock}
          aria-label={`Lock with ${biometry}`}
          disabled={busy}
          onClick={() => void toggleLock()}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${lock ? "bg-indigo-600" : "bg-slate-300"}`}
        >
          <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${lock ? "left-[1.375rem]" : "left-0.5"}`} />
        </button>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <Bell className="mt-0.5 h-5 w-5 text-indigo-600" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">Review check-in reminders</p>
          <p className="text-sm text-slate-600">A local reminder to ask the day&apos;s customers. No customer details appear on the lock screen.</p>
          <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Reminder frequency">
            {(["off", "daily", "weekly"] as const).map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={reminders === option}
                disabled={busy}
                onClick={() => void changeReminders(option)}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold capitalize ${
                  reminders === option ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-300 text-slate-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <WifiOff className="mt-0.5 h-5 w-5 text-indigo-600" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">Offline Counter Kit</p>
          <p className="text-sm text-slate-600">
            Your review link, QR code, and scripts are saved on this iPhone so they open without signal.
          </p>
          <button type="button" onClick={() => void clearOffline()} className="mt-2 text-sm font-semibold text-indigo-700">
            Remove offline copy
          </button>
        </div>
      </div>
    </section>
  )
}
