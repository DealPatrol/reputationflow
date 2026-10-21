"use client"

import { useMemo, useState } from "react"
import { REPLY_HELPER_NOTE, REPLY_SITUATIONS, REPLY_SITUATION_LABELS, replyDraft, type ReplySituation } from "@/lib/reply-templates"

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-100"

export function ReplyHelper({ businessName }: { businessName: string }) {
  const [situation, setSituation] = useState<ReplySituation>("thanks")
  const [reviewerName, setReviewerName] = useState("")
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState("")

  const draft = useMemo(() => replyDraft({ situation, businessName, reviewerName }), [situation, businessName, reviewerName])

  const copy = async () => {
    setCopyError("")
    try {
      await navigator.clipboard.writeText(draft)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyError("Could not copy. Select the draft and copy it manually.")
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="reply-helper-title">
      <h2 id="reply-helper-title" className="text-lg font-semibold text-slate-950">
        Reply template
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{REPLY_HELPER_NOTE}</p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium text-slate-800">
          Situation
          <select
            className={fieldClass}
            value={situation}
            onChange={(event) => {
              const next = event.target.value
              if (next === "thanks" || next === "delay" || next === "fix" || next === "brief") setSituation(next)
            }}
          >
            {REPLY_SITUATIONS.map((item) => (
              <option key={item} value={item}>
                {REPLY_SITUATION_LABELS[item]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Reviewer first name, if you want it
          <input className={fieldClass} value={reviewerName} onChange={(event) => setReviewerName(event.target.value)} placeholder="Optional" />
        </label>
        <label className="block text-sm font-medium text-slate-800" htmlFor="reply-draft">
          Draft
          <textarea id="reply-draft" readOnly rows={6} value={draft} className={`${fieldClass} leading-6`} />
        </label>
      </div>
      <button
        type="button"
        onClick={copy}
        className="mt-4 rounded-lg bg-indigo-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        {copied ? "Copied" : "Copy reply"}
      </button>
      {copyError && (
        <p className="mt-2 text-sm text-rose-700" role="alert">
          {copyError}
        </p>
      )}
    </section>
  )
}
