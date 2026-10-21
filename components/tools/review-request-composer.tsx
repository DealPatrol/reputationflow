"use client"

import { useMemo, useState } from "react"
import { reviewRequestTemplates } from "@/lib/review-request-templates"
import {
  composeReviewRequest,
  REQUEST_CHANNELS,
  REQUEST_COMPOSER_NOTE,
  type RequestChannel,
} from "@/lib/review-request-message"

const channelLabels: Record<RequestChannel, string> = {
  sms: "Text",
  email: "Email",
  inPerson: "In person",
}

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-100"

export function ReviewRequestComposer({
  initialBusinessName = "",
  initialReviewLink = "",
  heading = "Write a text or email you send yourself",
}: {
  initialBusinessName?: string
  initialReviewLink?: string
  heading?: string
}) {
  const [trade, setTrade] = useState(reviewRequestTemplates[0]?.trade ?? "Plumber")
  const [channel, setChannel] = useState<RequestChannel>("sms")
  const [firstName, setFirstName] = useState("")
  const [senderName, setSenderName] = useState("")
  const [businessName, setBusinessName] = useState(initialBusinessName)
  const [reviewLink, setReviewLink] = useState(initialReviewLink)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState("")

  const composed = useMemo(
    () => composeReviewRequest({ trade, channel, firstName, senderName, businessName, reviewLink }),
    [trade, channel, firstName, senderName, businessName, reviewLink],
  )

  const copy = async () => {
    setCopyError("")
    try {
      await navigator.clipboard.writeText(composed.text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyError("Could not copy. Select the message and copy it manually.")
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="request-composer-title">
      <h2 id="request-composer-title" className="text-lg font-semibold text-slate-950">
        {heading}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{REQUEST_COMPOSER_NOTE}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-800">
          Trade
          <select className={fieldClass} value={trade} onChange={(event) => setTrade(event.target.value)}>
            {reviewRequestTemplates.map((template) => (
              <option key={template.trade} value={template.trade}>
                {template.trade}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend className="text-sm font-medium text-slate-800">Channel</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {REQUEST_CHANNELS.map((item) => (
              <label
                key={item}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold ${
                  channel === item ? "border-indigo-700 bg-indigo-50 text-indigo-900" : "border-slate-300 text-slate-800"
                }`}
              >
                <input
                  type="radio"
                  name="request-channel"
                  className="sr-only"
                  checked={channel === item}
                  onChange={() => setChannel(item)}
                />
                {channelLabels[item]}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm font-medium text-slate-800">
          Customer first name
          <input className={fieldClass} value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Alex" />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Your name
          <input className={fieldClass} value={senderName} onChange={(event) => setSenderName(event.target.value)} placeholder="Jordan" />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Business name
          <input className={fieldClass} value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Your business" />
        </label>
        <label className="block text-sm font-medium text-slate-800 sm:col-span-2">
          Review link
          <input
            className={fieldClass}
            value={reviewLink}
            onChange={(event) => setReviewLink(event.target.value)}
            placeholder="https://search.google.com/local/writereview?placeid=..."
            spellCheck={false}
          />
        </label>
      </div>
      <label className="mt-4 block text-sm font-medium text-slate-800" htmlFor="request-message">
        Message to copy
        <textarea
          id="request-message"
          readOnly
          value={composed.text}
          rows={7}
          className={`${fieldClass} font-normal leading-6`}
        />
      </label>
      {composed.unresolved.length > 0 && (
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Still in brackets, so you can edit them before you send: {composed.unresolved.join(", ")}.
        </p>
      )}
      <button
        type="button"
        onClick={copy}
        className="mt-4 rounded-lg bg-indigo-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        {copied ? "Copied" : "Copy message"}
      </button>
      {copyError && (
        <p className="mt-2 text-sm text-rose-700" role="alert">
          {copyError}
        </p>
      )}
    </section>
  )
}
