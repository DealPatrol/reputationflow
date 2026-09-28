"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

interface NegativeFeedbackClientProps {
  businessId: string
}

export function NegativeFeedbackClient({ businessId }: NegativeFeedbackClientProps) {
  const [businessName, setBusinessName] = useState("")
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
        setBusinessName(data.business.business_name || "")
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
            <p className="mt-2 text-sm text-slate-600">You can still leave a public review. The same links are shown for every rating.</p>
            <Link href={`/review/${businessId}`} className="mt-4 inline-flex text-sm font-semibold text-indigo-700">
              Open the public review page
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-slate-950">Private note for {businessName}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This goes to the business. It does not replace a public review.
            </p>
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
            <Link href={`/review/${businessId}`} className="mt-3 block text-center text-sm font-semibold text-indigo-700">
              Leave a public review instead
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
