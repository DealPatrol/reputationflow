"use client"

import { useEffect, useState } from "react"
import { goalRatio, monthKey, parseReviewGoal, storageKey, withAsked, withTarget, type ReviewGoalState } from "@/lib/review-goal"

export function ReviewGoalTracker({ businessId }: { businessId: string | number }) {
  const month = monthKey(new Date())
  const [goal, setGoal] = useState<ReviewGoalState>({ month, target: 0, asked: 0 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      setGoal(parseReviewGoal(window.localStorage.getItem(storageKey(businessId)), month))
    } catch {
      setGoal(parseReviewGoal(null, month))
    }
    setReady(true)
  }, [businessId, month])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(storageKey(businessId), JSON.stringify(goal))
    } catch {
      // The counter still works for this visit if storage is blocked.
    }
  }, [businessId, goal, ready])

  const ratio = goalRatio(goal)
  const percent = Math.round(ratio * 100)

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="review-goal-title">
      <h2 id="review-goal-title" className="text-lg font-semibold text-slate-950">
        Review ask goal
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Log how many people you ask this month. This counter is what you enter here. It does not read Google, Facebook, or Yelp.
      </p>
      <label className="mt-4 block text-sm font-medium text-slate-800" htmlFor="review-goal-target">
        Asks you plan to make in {month}
        <input
          id="review-goal-target"
          type="number"
          min={0}
          max={500}
          inputMode="numeric"
          value={goal.target}
          onChange={(event) => setGoal((current) => withTarget(current, Number(event.target.value)))}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-950"
        />
      </label>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-sm text-slate-700">
          <span className="text-2xl font-semibold tracking-tight text-slate-950">{goal.asked}</span>
          <span className="text-slate-500"> logged{goal.target > 0 ? ` of ${goal.target}` : ""}</span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setGoal((current) => withAsked(current, -1))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800"
          >
            Undo
          </button>
          <button
            type="button"
            onClick={() => setGoal((current) => withAsked(current, 1))}
            className="rounded-lg bg-indigo-800 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            I asked someone
          </button>
        </div>
      </div>
      {goal.target > 0 ? (
        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={goal.target}
          aria-valuenow={Math.min(goal.asked, goal.target)}
          aria-label="Review asks logged this month"
        >
          <div className="h-full rounded-full bg-indigo-700" style={{ width: `${percent}%` }} />
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-slate-600">Set a number above. Zero means you have not picked a goal yet.</p>
      )}
    </section>
  )
}
