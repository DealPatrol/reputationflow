"use client"

import { useEffect, useMemo, useState } from "react"
import { toDataURL } from "qrcode"
import { Check, Copy, Maximize2, Share2, WifiOff, X } from "lucide-react"
import { haptic, loadCounterCache, saveCounterCache, shareReviewLink } from "@/lib/native/bridge"
import { buildCounterCache, COUNTER_TRADES } from "@/lib/native/counter-kit"
import type { CounterScript } from "@/lib/native/counter-cache"

const QR_OPTIONS = { errorCorrectionLevel: "M" as const, margin: 2, width: 720, color: { dark: "#000000", light: "#ffffff" } }

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-950 outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-100"

/**
 * Counter Kit (iPhone app only): show a full-screen QR at the counter or job site, or send the
 * review link through the iOS share sheet (Messages, Mail, AirDrop). Everything here is saved to the
 * device so it still works with no signal.
 */
export function CounterKit({ businessName, reviewUrl }: { businessName: string; reviewUrl: string }) {
  const [trade, setTrade] = useState(COUNTER_TRADES[0])
  const [senderName, setSenderName] = useState("")
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [fullScreen, setFullScreen] = useState(false)
  const [copiedId, setCopiedId] = useState("")
  const [error, setError] = useState("")
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    let cancelled = false
    void loadCounterCache().then((cache) => {
      if (cancelled) return
      if (cache) {
        if (COUNTER_TRADES.includes(cache.trade)) setTrade(cache.trade)
        setSenderName(cache.senderName)
        if (cache.reviewUrl === reviewUrl && cache.qrDataUrl) setQrDataUrl(cache.qrDataUrl)
      }
      setRestored(true)
    })
    toDataURL(reviewUrl, QR_OPTIONS)
      .then((url) => !cancelled && setQrDataUrl(url))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [reviewUrl])

  const cache = useMemo(
    () => buildCounterCache({ businessName, reviewUrl, trade, senderName, qrDataUrl }),
    [businessName, reviewUrl, trade, senderName, qrDataUrl],
  )

  useEffect(() => {
    if (!restored) return
    const timer = window.setTimeout(() => {
      void saveCounterCache(cache)
        .then(() => setSavedAt(cache.savedAt))
        .catch(() => setError("Could not save for offline use. Sharing still works."))
    }, 400)
    return () => window.clearTimeout(timer)
  }, [cache, restored])

  const share = async (script?: CounterScript) => {
    setError("")
    try {
      await shareReviewLink({
        url: reviewUrl,
        text: script?.text ?? `Leave a review for ${businessName}: ${reviewUrl}`,
        subject: script?.subject ?? `A review for ${businessName}`,
        qrDataUrl: script ? null : qrDataUrl,
      })
    } catch {
      setError("The share sheet did not open. Copy the text instead.")
    }
  }

  const copy = async (script: CounterScript) => {
    try {
      await navigator.clipboard.writeText(script.text)
      setCopiedId(script.id)
      haptic("success")
      window.setTimeout(() => setCopiedId(""), 1800)
    } catch {
      setError("Could not copy. Use Share instead.")
    }
  }

  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Counter Kit</h1>
        <p className="text-slate-500">Ask for the review while the customer is still with you. Works offline.</p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
        {qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={qrDataUrl} alt={`QR code for ${businessName}'s review page`} className="mx-auto h-64 w-64" />
        ) : (
          <div className="mx-auto h-64 w-64 animate-pulse rounded-lg bg-slate-100" />
        )}
        <p className="mt-3 break-all font-mono text-xs text-slate-500">{reviewUrl}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setFullScreen(true)}
            disabled={!qrDataUrl}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            <Maximize2 size={16} aria-hidden="true" />
            Show customer
          </button>
          <button
            type="button"
            onClick={() => void share()}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800"
          >
            <Share2 size={16} aria-hidden="true" />
            Share link + QR
          </button>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-500" role="status">
          <WifiOff size={12} aria-hidden="true" />
          {savedAt ? `Saved on this iPhone ${new Date(savedAt).toLocaleString()}` : "Saving for offline use…"}
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-950">Request scripts</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Trade
            <select value={trade} onChange={(e) => setTrade(e.target.value)} className={fieldClass}>
              {COUNTER_TRADES.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700">
            Your name
            <input value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Sam" className={fieldClass} />
          </label>
        </div>
        <ScriptList scripts={cache.requestScripts} copiedId={copiedId} onCopy={copy} onShare={share} />
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-950">Reply templates</h2>
        <p className="mt-1 text-sm text-slate-600">
          Copy a reply and paste it on Google, Facebook, or Yelp yourself. ReputationFlow does not post for you.
        </p>
        <ScriptList scripts={cache.replyTemplates} copiedId={copiedId} onCopy={copy} onShare={share} />
      </section>

      {error && (
        <p className="mt-4 text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}

      {fullScreen && qrDataUrl && (
        <div role="dialog" aria-modal="true" aria-label="Review QR code" className="fixed inset-0 z-[900] flex flex-col items-center justify-center bg-white p-6">
          <button
            type="button"
            onClick={() => setFullScreen(false)}
            className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] rounded-full bg-slate-100 p-3 text-slate-700"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <p className="text-2xl font-semibold text-slate-950">{businessName}</p>
          <p className="mt-1 text-base text-slate-600">Scan with your camera to leave a review</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrDataUrl} alt="Review QR code" className="mt-6 w-full max-w-sm" />
        </div>
      )}
    </div>
  )
}

function ScriptList({
  scripts,
  copiedId,
  onCopy,
  onShare,
}: {
  scripts: CounterScript[]
  copiedId: string
  onCopy: (script: CounterScript) => void
  onShare: (script: CounterScript) => void
}) {
  return (
    <ul className="mt-4 space-y-3">
      {scripts.map((script) => (
        <li key={script.id} className="rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-900">{script.label}</p>
          <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-700">{script.text}</p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => onCopy(script)}
              className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800"
            >
              {copiedId === script.id ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              {copiedId === script.id ? "Copied" : "Copy"}
            </button>
            <button
              type="button"
              onClick={() => onShare(script)}
              className="flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
            >
              <Share2 size={14} aria-hidden="true" />
              Share
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
