"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { MessageCopyNext } from "@/components/tools/message-copy-next"
import { trackGeneratorUsed } from "@/lib/analytics-events"
import {
  businessFieldLabel,
  composeReviewMessages,
  resolveReviewMessageTrade,
  REVIEW_MESSAGE_NOTE,
  reviewMessageTradeOptions,
  senderFieldLabel,
  type ReviewMessageLink,
} from "@/lib/review-message"

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"

type CopyTarget = "sms" | "email" | "inPerson"

function copyLabel(target: CopyTarget, copied: CopyTarget | "") {
  const active = copied === target
  switch (target) {
    case "sms":
      return active ? "Copied" : "Copy text"
    case "email":
      return active ? "Copied" : "Copy email"
    case "inPerson":
      return active ? "Copied" : "Copy in-person line"
    default: {
      const unreachable: never = target
      return unreachable
    }
  }
}

function linkNote(link: ReviewMessageLink) {
  switch (link.status) {
    case "empty":
      return "Paste a Place ID or a review link when you have it. Until then the [link] bracket stays in the message."
    case "error":
      return link.error
    case "review":
      return "The message uses the official write-a-review link for that Place ID."
    case "plain":
      return "This URL is not a Google review link. The message will use it as pasted. Open it once and confirm it is the page you mean."
    default: {
      const unreachable: never = link
      return unreachable
    }
  }
}

export function ReviewMessageGenerator({
  initialSlug,
  heading = "Write the text and the email",
}: {
  initialSlug?: string
  heading?: string
}) {
  const [trade, setTrade] = useState(() => resolveReviewMessageTrade(initialSlug))
  const [firstName, setFirstName] = useState("")
  const [senderName, setSenderName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [reviewLink, setReviewLink] = useState("")
  const [copied, setCopied] = useState<CopyTarget | "">("")
  const [lastCopied, setLastCopied] = useState<CopyTarget | "">("")
  const [copyError, setCopyError] = useState("")
  const tracked = useRef(false)

  const composed = useMemo(
    () =>
      composeReviewMessages({
        templateTrade: trade,
        firstName,
        senderName,
        businessName,
        reviewLink,
      }),
    [businessName, firstName, reviewLink, senderName, trade],
  )

  useEffect(() => {
    if (tracked.current) return
    const named = businessName.trim().length >= 2
    const linked = composed.link.status === "review" || composed.link.status === "plain"
    if (!named && !linked) return
    tracked.current = true
    trackGeneratorUsed("message")
  }, [businessName, composed.link])

  const copy = async (target: CopyTarget, value: string) => {
    setCopyError("")
    try {
      await navigator.clipboard.writeText(value)
      setCopied(target)
      setLastCopied(target)
      window.setTimeout(() => setCopied(""), 2000)
    } catch {
      setCopyError("Could not copy. Select the message and copy it manually.")
    }
  }

  const note = linkNote(composed.link)
  const noteIsError = composed.link.status === "error"

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="review-message-title">
      <h2 id="review-message-title" className="text-lg font-semibold text-slate-950">
        {heading}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{REVIEW_MESSAGE_NOTE}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-800" htmlFor="review-message-trade">
          Trade
          <select
            id="review-message-trade"
            className={fieldClass}
            value={trade}
            onChange={(event) => setTrade(resolveReviewMessageTrade(event.target.value))}
          >
            {reviewMessageTradeOptions().map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-800" htmlFor="review-message-business">
          {businessFieldLabel(trade)}
          <input
            id="review-message-business"
            className={fieldClass}
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            autoComplete="organization"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800" htmlFor="review-message-sender">
          {senderFieldLabel(trade)}
          <input
            id="review-message-sender"
            className={fieldClass}
            value={senderName}
            onChange={(event) => setSenderName(event.target.value)}
            autoComplete="name"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800" htmlFor="review-message-customer">
          Customer first name
          <input
            id="review-message-customer"
            className={fieldClass}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-800 sm:col-span-2" htmlFor="review-message-link">
          Google review link or Place ID
          <input
            id="review-message-link"
            className={fieldClass}
            value={reviewLink}
            onChange={(event) => setReviewLink(event.target.value)}
            placeholder="ChIJ... or https://search.google.com/local/writereview?placeid="
            spellCheck={false}
            autoComplete="off"
          />
        </label>
      </div>
      <p className={`mt-3 text-sm leading-6 ${noteIsError ? "text-rose-700" : "text-slate-600"}`} role={noteIsError ? "alert" : undefined}>
        {note}
      </p>

      <label className="mt-5 block text-sm font-medium text-slate-800" htmlFor="review-message-sms">
        Text
        <textarea id="review-message-sms" readOnly value={composed.sms} rows={6} className={`${fieldClass} font-normal leading-6`} />
      </label>
      <p className="mt-2 text-sm leading-6 text-slate-600">{composed.smsCharacters} characters. Keep the sentence short. The review link is the long part.</p>
      <button
        type="button"
        onClick={() => copy("sms", composed.sms)}
        className="mt-3 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white"
      >
        {copyLabel("sms", copied)}
      </button>
      {lastCopied === "sms" ? (
        <MessageCopyNext channel="sms" reviewLink={reviewLink} businessName={businessName} />
      ) : null}

      <label className="mt-6 block text-sm font-medium text-slate-800" htmlFor="review-message-email">
        Email
        <textarea id="review-message-email" readOnly value={composed.emailCopy} rows={8} className={`${fieldClass} font-normal leading-6`} />
      </label>
      <button
        type="button"
        onClick={() => copy("email", composed.emailCopy)}
        className="mt-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800"
      >
        {copyLabel("email", copied)}
      </button>
      {lastCopied === "email" ? (
        <MessageCopyNext channel="email" reviewLink={reviewLink} businessName={businessName} />
      ) : null}

      <label className="mt-6 block text-sm font-medium text-slate-800" htmlFor="review-message-in-person">
        In person
        <textarea id="review-message-in-person" readOnly value={composed.inPerson} rows={4} className={`${fieldClass} font-normal leading-6`} />
      </label>
      <button
        type="button"
        onClick={() => copy("inPerson", composed.inPerson)}
        className="mt-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800"
      >
        {copyLabel("inPerson", copied)}
      </button>
      {lastCopied === "inPerson" ? (
        <MessageCopyNext channel="inPerson" reviewLink={reviewLink} businessName={businessName} />
      ) : null}

      {composed.unresolved.length > 0 ? (
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Still in brackets, so you can edit them before you send: {composed.unresolved.join(", ")}.
        </p>
      ) : null}
      {copyError ? (
        <p className="mt-2 text-sm text-rose-700" role="alert">
          {copyError}
        </p>
      ) : null}
    </section>
  )
}
