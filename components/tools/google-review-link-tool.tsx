"use client"

import { useMemo, useState } from "react"
import { buildGoogleReviewLink } from "@/lib/google-review-link"
import { LeadCaptureForm } from "@/components/tools/lead-capture-form"

export function GoogleReviewLinkTool() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)
  const result = useMemo(() => (input.trim() ? buildGoogleReviewLink(input) : null), [input])

  const copy = async () => {
    if (!result?.ok) return
    await navigator.clipboard.writeText(result.url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <label htmlFor="place-id" className="text-sm font-medium text-slate-800">
        Place ID or Google review link
      </label>
      <input
        id="place-id"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="ChIJ... or https://search.google.com/local/writereview?placeid="
        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />

      {result && !result.ok && (
        <p className="mt-3 text-sm text-rose-700" role="alert">{result.error}</p>
      )}

      {result?.ok && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Review link</p>
          <p className="mt-2 break-all font-mono text-sm text-slate-900">{result.url}</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={copy} className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">
              {copied ? "Copied" : "Copy link"}
            </button>
            <a href={result.url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-800">
              Open link
            </a>
          </div>
          <LeadCaptureForm source="google-review-link" details={result.url} />
        </div>
      )}
    </div>
  )
}
