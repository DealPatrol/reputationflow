"use client"

import { useMemo, useState } from "react"
import { trackGeneratorUsed } from "@/lib/analytics-events"
import {
  checkReviewRequest,
  compliantRewrite,
  extractLink,
  FTC_465_4_URL,
  GOOGLE_POLICY_URL,
} from "@/lib/review-request-checker"

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-[#8CAE93] focus:ring-2 focus:ring-[#D6DDD7]"

const EXAMPLE =
  "Hi! Thanks for choosing us today. If you were happy with your visit, please leave us a 5-star Google review and get 10% off your next service! Not happy? Call us first."

export function ReviewRequestChecker() {
  const [text, setText] = useState("")
  const [channel, setChannel] = useState<"text" | "email">("text")
  const [businessName, setBusinessName] = useState("")
  const [checked, setChecked] = useState(false)
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => (checked ? checkReviewRequest(text, channel) : null), [checked, text, channel])
  const rewrite = useMemo(
    () => compliantRewrite({ businessName, link: extractLink(text), channel }),
    [businessName, text, channel],
  )

  const run = (value = text) => {
    setText(value)
    setChecked(true)
    setCopied(false)
    trackGeneratorUsed("checker")
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-800">
          Message type
          <select className={fieldClass} value={channel} onChange={(e) => setChannel(e.target.value as "text" | "email")}>
            <option value="text">Text message</option>
            <option value="email">Email or printed card</option>
          </select>
        </label>
        <label className="text-sm font-medium text-slate-800">
          Business name (for the rewrite)
          <input className={fieldClass} value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Acme Heating & Air" />
        </label>
      </div>
      <label className="mt-4 block text-sm font-medium text-slate-800">
        Your review request
        <textarea
          className={`${fieldClass} min-h-[140px]`}
          value={text}
          maxLength={2000}
          onChange={(e) => {
            setText(e.target.value)
            setChecked(false)
          }}
          placeholder={EXAMPLE}
        />
      </label>
      <div className="mt-3 flex flex-wrap gap-3">
        <button type="button" onClick={() => run()} className="rounded-full bg-[#2F3A33] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1F2822]">
          Check my message
        </button>
        <button type="button" onClick={() => run(EXAMPLE)} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          Try a bad example
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-500">Checked in your browser. Nothing is sent or saved. Not legal advice.</p>

      {result && (
        <div aria-live="polite" className="mt-6 space-y-4">
          <p className={`rounded-lg px-4 py-3 text-sm font-semibold ${result.passed ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>
            {result.passed
              ? "No policy problems found in the wording."
              : `${result.findings.filter((f) => f.level === "fix").length} problem(s) to fix before you send this.`}
          </p>
          {result.findings.length > 0 && (
            <ul className="space-y-3">
              {result.findings.map((finding) => (
                <li key={finding.id} className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-950">
                    <span className={`mr-2 rounded px-2 py-0.5 text-xs ${finding.level === "fix" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-900"}`}>
                      {finding.level === "fix" ? "Fix" : "Review"}
                    </span>
                    {finding.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Flagged words: “{finding.match}”</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {finding.why}{" "}
                    <a className="underline" href={finding.source === "ftc" ? FTC_465_4_URL : GOOGLE_POLICY_URL} target="_blank" rel="noopener">
                      Source
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          )}
          {result.tips.length > 0 && (
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
              {result.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          )}
          <div className="rounded-xl bg-[#F3F5F2] p-4">
            <p className="text-sm font-semibold text-slate-950">A version that asks every customer the same way</p>
            <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">{rewrite}</pre>
            <button
              type="button"
              className="mt-3 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(rewrite)
                  setCopied(true)
                } catch {
                  setCopied(false)
                }
              }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
