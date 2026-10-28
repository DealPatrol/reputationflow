"use client"

import { useEffect, useState } from "react"
import { trackSetupCompleted } from "@/lib/analytics-events"
import { dropPendingReviewLink, takePendingReviewLink } from "@/lib/message-handoff"

export function PendingReviewLinkSave({
  hasSavedLink,
  onSaved,
}: {
  hasSavedLink: boolean
  onSaved: (url: string) => void
}) {
  const [link, setLink] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (hasSavedLink || done) return
    setLink(takePendingReviewLink())
  }, [done, hasSavedLink])

  if (!link || done || hasSavedLink) return null

  const save = async () => {
    if (saving) return
    setSaving(true)
    setError("")
    try {
      const response = await fetch("/api/business/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ google_link: link }),
      })
      const data = (await response.json().catch(() => ({}))) as { error?: unknown }
      if (!response.ok) {
        const message = typeof data.error === "string" && data.error ? data.error : "Could not save your review link"
        throw new Error(message)
      }
      dropPendingReviewLink()
      trackSetupCompleted("saved")
      setDone(true)
      onSaved(link)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save your review link")
      setSaving(false)
    }
  }

  return (
    <section aria-label="Save the Google review link from the generator" className="mb-6 rounded-xl border border-indigo-200 bg-white p-4">
      <h2 className="text-base font-semibold text-slate-950">Save the Google review link from the generator</h2>
      <p className="mt-1 text-sm leading-6 text-slate-700">
        This is the link you made before creating the account. It is not saved yet. Saving it does not start a charge.
      </p>
      <p className="mt-2 break-all font-mono text-xs text-slate-800">{link}</p>
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save this review link"}
      </button>
      {error ? (
        <p className="mt-2 text-sm text-rose-700" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  )
}
