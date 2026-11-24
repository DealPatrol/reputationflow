"use client"

import { useState } from "react"
import { Loader2, LogOut, Trash2 } from "lucide-react"
import { DELETE_CONFIRMATION } from "@/lib/account"
import { COUNTER_CACHE_KEY } from "@/lib/native/counter-cache"
import { LOCK_PREF_KEY, nativePlugin, prefRemove, scheduleReminders } from "@/lib/native/bridge"
import { isNativeIos } from "@/lib/native/platform"

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-950 outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-100"

async function clearDeviceData() {
  if (!isNativeIos()) return
  await Promise.allSettled([prefRemove(COUNTER_CACHE_KEY), prefRemove(LOCK_PREF_KEY), scheduleReminders("off", "")])
}

/** Sign out and permanently delete the account (App Review Guideline 5.1.1(v)). Shown on web and iOS. */
export function AccountSection({ email, demoMode = false }: { email?: string; demoMode?: boolean }) {
  const [signingOut, setSigningOut] = useState(false)
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")

  const signOut = async () => {
    setSigningOut(true)
    await fetch("/api/auth/signout", { method: "POST" }).catch(() => null)
    await clearDeviceData()
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- full reload drops cached client state
    window.location.assign("/auth/signin")
  }

  const deleteAccount = async () => {
    setError("")
    setDeleting(true)
    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirmation }),
      })
      const data = (await response.json().catch(() => ({}))) as { error?: string; appStoreSubscriptionActive?: boolean }
      if (!response.ok) throw new Error(data.error || "Could not delete the account.")
      await clearDeviceData()
      if (data.appStoreSubscriptionActive && isNativeIos()) {
        // Apple bills App Store subscriptions; show the system screen so the user can cancel it.
        await nativePlugin()
          .then((plugin) => plugin.manageSubscriptions())
          .catch(() => {})
      }
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- full reload drops cached client state
      window.location.assign(`/auth/signin?deleted=1${data.appStoreSubscriptionActive ? "&appstore=1" : ""}`)
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete the account.")
      setDeleting(false)
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5" aria-labelledby="account-title">
      <h2 id="account-title" className="text-lg font-semibold text-slate-950">
        Account
      </h2>
      {email && <p className="mt-1 text-sm text-slate-600">Signed in as {email}</p>}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => void signOut()}
          disabled={signingOut}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 disabled:opacity-60"
        >
          {signingOut ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <LogOut size={16} aria-hidden="true" />}
          Sign out
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-300 px-4 py-2.5 text-sm font-semibold text-rose-700"
        >
          <Trash2 size={16} aria-hidden="true" />
          Delete account
        </button>
      </div>

      {open && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4" role="region" aria-labelledby="delete-account-title">
          <h3 id="delete-account-title" className="text-base font-semibold text-rose-900">
            Permanently delete your account
          </h3>
          <p className="mt-1 text-sm leading-6 text-rose-900">
            This deletes your login, business profile, review links, customer feedback, review requests, and settings. Your review page and QR
            code stop working. A web (Stripe) subscription is cancelled right away. An App Store subscription is billed by Apple: cancel it in
            Settings &gt; Apple Account &gt; Subscriptions. This cannot be undone.
          </p>
          {demoMode ? (
            <p className="mt-3 text-sm font-semibold text-rose-900">The keyless demo account cannot be deleted.</p>
          ) : (
            <>
              <label className="mt-3 block text-sm font-medium text-rose-900">
                Password
                <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={fieldClass} />
              </label>
              <label className="mt-3 block text-sm font-medium text-rose-900">
                Type {DELETE_CONFIRMATION} to confirm
                <input
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  autoCapitalize="characters"
                  autoCorrect="off"
                  className={fieldClass}
                />
              </label>
            </>
          )}
          {error && (
            <p className="mt-3 text-sm font-semibold text-rose-800" role="alert">
              {error}
            </p>
          )}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              disabled={demoMode || deleting || !password || confirmation !== DELETE_CONFIRMATION}
              onClick={() => void deleteAccount()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-700 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {deleting && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
              Delete account permanently
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                setError("")
                setPassword("")
                setConfirmation("")
              }}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
