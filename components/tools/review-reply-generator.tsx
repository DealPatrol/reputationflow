"use client"

import { useMemo, useState } from "react"
import { trackGeneratorUsed } from "@/lib/analytics-events"
import {
  REPLY_STARS,
  REPLY_TOPICS,
  REPLY_TOPIC_LABELS,
  reviewReplyDrafts,
  type ReplyStars,
  type ReplyTopic,
} from "@/lib/review-reply"

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-[#8CAE93] focus:ring-2 focus:ring-[#D6DDD7]"

export function ReviewReplyGenerator() {
  const [stars, setStars] = useState<ReplyStars>(5)
  const [topic, setTopic] = useState<ReplyTopic>("none")
  const [reviewerName, setReviewerName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [signOff, setSignOff] = useState("")
  const [contact, setContact] = useState("")
  const [privacySensitive, setPrivacySensitive] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)
  const [tracked, setTracked] = useState(false)

  const drafts = useMemo(
    () => reviewReplyDrafts({ stars, topic, reviewerName, businessName, signOff, contact, privacySensitive }),
    [stars, topic, reviewerName, businessName, signOff, contact, privacySensitive],
  )

  async function copy(index: number) {
    try {
      await navigator.clipboard.writeText(drafts[index])
      setCopied(index)
      window.setTimeout(() => setCopied(null), 2000)
      if (!tracked) {
        trackGeneratorUsed("reply")
        setTracked(true)
      }
    } catch {
      setCopied(null)
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="review-reply-title">
      <h2 id="review-reply-title" className="text-lg font-semibold text-slate-950">
        Write the reply
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Runs in your browser. Nothing is posted and nothing you type is sent to us. Read the draft, make it match what happened, then paste it under the review yourself.
      </p>
      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-slate-800">Star rating</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {REPLY_STARS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setStars(value)}
              aria-pressed={stars === value}
              className={`rounded-lg border px-3 py-2 text-sm font-semibold ${stars === value ? "border-[#8CAE93] bg-[#E84630] text-white" : "border-slate-300 bg-white text-slate-800"}`}
            >
              {value}★
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-800" htmlFor="review-reply-topic">
          What the review mentions
          <select id="review-reply-topic" className={fieldClass} value={topic} onChange={(e) => setTopic(e.target.value as ReplyTopic)}>
            {REPLY_TOPICS.map((value) => (
              <option key={value} value={value}>
                {REPLY_TOPIC_LABELS[value]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-800" htmlFor="review-reply-name">
          Reviewer’s first name (optional)
          <input id="review-reply-name" className={fieldClass} value={reviewerName} maxLength={40} onChange={(e) => setReviewerName(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-slate-800" htmlFor="review-reply-business">
          Business name
          <input id="review-reply-business" className={fieldClass} value={businessName} maxLength={80} onChange={(e) => setBusinessName(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-slate-800" htmlFor="review-reply-sign">
          Sign-off (optional)
          <input id="review-reply-sign" className={fieldClass} value={signOff} maxLength={60} placeholder="Dana, owner" onChange={(e) => setSignOff(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-slate-800 sm:col-span-2" htmlFor="review-reply-contact">
          Phone or email for unhappy customers (optional)
          <input id="review-reply-contact" className={fieldClass} value={contact} maxLength={80} onChange={(e) => setContact(e.target.value)} />
        </label>
        <label className="flex items-start gap-2 text-sm text-slate-800 sm:col-span-2" htmlFor="review-reply-privacy">
          <input id="review-reply-privacy" type="checkbox" className="mt-1" checked={privacySensitive} onChange={(e) => setPrivacySensitive(e.target.checked)} />
          <span>Health, legal, or financial business: keep the reply from confirming the person was a client or naming the visit.</span>
        </label>
      </div>
      {drafts.map((draft, index) => (
        <div key={index} className="mt-6">
          <label className="block text-sm font-medium text-slate-800" htmlFor={`review-reply-draft-${index}`}>
            {index === 0 ? "Reply" : "Shorter reply"}
          </label>
          <textarea id={`review-reply-draft-${index}`} readOnly rows={index === 0 ? 5 : 3} className={fieldClass} value={draft} />
          <button
            type="button"
            onClick={() => copy(index)}
            className={`mt-3 rounded-lg px-4 py-2.5 text-sm font-semibold ${index === 0 ? "bg-[#E84630] text-white" : "border border-slate-300 bg-white text-slate-800"}`}
          >
            {copied === index ? "Copied" : "Copy reply"}
          </button>
        </div>
      ))}
    </section>
  )
}
