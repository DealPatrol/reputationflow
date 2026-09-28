"use client"

import { ExternalLink, Star } from "lucide-react"

interface ReviewMonitoringViewProps {
  feedbacks: Array<{
    id: string | number
    rating: number
    feedback?: string
    type?: string
    timestamp?: { seconds?: number }
  }>
  googleLink?: string
  facebookLink?: string
  yelpLink?: string
}

export function ReviewMonitoringView({ feedbacks, googleLink, facebookLink, yelpLink }: ReviewMonitoringViewProps) {
  const platforms = [
    { name: "Google", url: googleLink },
    { name: "Facebook", url: facebookLink },
    { name: "Yelp", url: yelpLink },
  ].filter((platform) => platform.url)

  const average = feedbacks.length
    ? (feedbacks.reduce((sum, item) => sum + Number(item.rating || 0), 0) / feedbacks.length).toFixed(1)
    : "—"

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Review monitoring</h1>
        <p className="text-slate-500">
          Feedback submitted on your ReputationFlow page. Public reviews on Google, Facebook, and Yelp stay on those sites.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Responses</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{feedbacks.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Average rating</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{average}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Public profiles</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{platforms.length}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Open the public listings</h2>
        <p className="mt-1 text-sm text-slate-500">ReputationFlow does not import or invent reviews from these platforms.</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {platforms.length === 0 && <p className="text-sm text-slate-600">Add a Google, Facebook, or Yelp link in Business Profile.</p>}
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800"
            >
              {platform.name}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Private page responses</h2>
        </div>
        {feedbacks.length === 0 ? (
          <p className="px-5 py-10 text-sm text-slate-500">No responses yet. Share your review link to start collecting them.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {feedbacks.map((item) => (
              <li key={item.id} className="px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Star className="h-4 w-4 text-amber-500" aria-hidden="true" />
                  {item.rating} stars
                </div>
                <p className="mt-1 text-sm text-slate-600">{item.feedback || "No written note."}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
