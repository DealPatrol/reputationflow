"use client"

import { useEffect, useState, type FormEvent } from "react"
import { CheckCircle } from "lucide-react"
import type { PublicBusiness } from "@/lib/public-business"

interface NegativeFeedbackClientProps {
  businessId: string
}

function publicReviewLinks(business: PublicBusiness | null) {
  if (!business) return []
  return [
    ["Google", business.google_link],
    ...business.google_links_2.map((url, index) => [`Google (${index + 2})`, url] as const),
    ["Facebook", business.facebook_link],
    ...business.facebook_links_2.map((url, index) => [`Facebook (${index + 2})`, url] as const),
    ["Yelp", business.yelp_link],
    ...business.yelp_links_2.map((url, index) => [`Yelp (${index + 2})`, url] as const),
  ].filter((entry): entry is [string, string] => entry[1].trim().length > 0)
}

function PublicReviewLinks({ business }: { business: PublicBusiness | null }) {
  const links = publicReviewLinks(business)
  if (links.length === 0) return null
  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm font-medium text-slate-950">Public review links</p>
      {links.map(([label, url]) => (
        <a
          key={`${label}-${url}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800"
        >
          <span>Leave a {label} review</span>
          <span className="text-slate-400">Open</span>
        </a>
      ))}
    </div>
  )
}

export function NegativeFeedbackClient({ businessId }: NegativeFeedbackClientProps) {
  const [business, setBusiness] = useState<PublicBusiness | null>(null)
  const [rating, setRating] = useState(0)
  const [feedbackText, setFeedbackText] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`/api/business/public?id=${businessId}`)
      .then(async (response) => {
        if (!response.ok) {
          setMissing(true)
          return
        }
        const data = await response.json()
        setBusiness(data.business)
      })
      .catch(() => setMissing(true))
      .finally(() => setLoading(false))
  }, [businessId])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (rating < 1) {
      setError("Choose a rating from 1 to 5.")
      return
    }
    if (feedbackText.trim().length < 10) {
      setError("Please write at least 10 characters.")
      return
    }

    setSubmitting(true)
    setError("")
    try {
      const response = await fetch("/api/feedback/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          rating,
          feedback_text: feedbackText,
          customer_email: email || undefined,
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || "Could not send that note")
      }
      setDone(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not send that note")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Loading...</div>
  if (missing) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p className="text-sm text-slate-600">This feedback page is not available.</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6">
        {done ? (
          <div className="text-center">
            <CheckCircle className="mx-auto h-10 w-10 text-emerald-600" />
            <h1 className="mt-4 text-2xl font-semibold text-slate-950">Note sent</h1>
            <p className="mt-2 text-sm text-slate-600">The public review links stay on this page for every rating.</p>
            <PublicReviewLinks business={business} />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-slate-950">Private note for {business?.business_name}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This note goes to the business. The public review links below are on this page as well.
            </p>
            <PublicReviewLinks business={business} />
            <fieldset className="mt-4">
              <legend className="text-sm font-medium">Rating</legend>
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`h-10 w-10 rounded-lg border text-sm font-semibold ${rating === value ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300"}`}
                    aria-pressed={rating === value}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="mt-4 block text-sm font-medium">
              What happened?
              <textarea
                value={feedbackText}
                onChange={(event) => setFeedbackText(event.target.value)}
                rows={5}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Tell the business what to know"
              />
            </label>
            <label className="mt-4 block text-sm font-medium">
              Email, if you want a reply
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="you@example.com"
              />
            </label>
            {error && <p className="mt-3 text-sm text-rose-700" role="alert">{error}</p>}
            <button type="submit" disabled={submitting} className="mt-4 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {submitting ? "Sending..." : "Send private note"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
