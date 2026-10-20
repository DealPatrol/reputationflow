"use client"

import { useState } from "react"
import { trackUpgradeClick } from "@/lib/analytics-events"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { startProfessionalCheckout } from "@/lib/start-checkout"

const checkoutLabel = `Upgrade to Professional · ${formatPlanPrice(PLANS.pro.price)}/month`

export function ProfessionalUpgrade({
  location,
  variant,
  heading,
  detail,
}: {
  location: string
  variant: "card" | "banner"
  heading: string
  detail: string
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onUpgrade = async () => {
    if (loading) return
    trackUpgradeClick(location)
    setLoading(true)
    setError("")
    try {
      await startProfessionalCheckout()
    } catch (upgradeError) {
      const message = upgradeError instanceof Error ? upgradeError.message : "Failed to start upgrade"
      setError(message)
      setLoading(false)
    }
  }

  const banner = variant === "banner"

  return (
    <section
      aria-label="Upgrade to Professional"
      className={
        banner
          ? "mb-6 flex flex-col gap-4 rounded-xl border border-indigo-200 bg-indigo-50 p-4 sm:flex-row sm:items-center sm:justify-between"
          : "rounded-2xl border border-indigo-200 bg-indigo-50 p-5"
      }
    >
      <div>
        <h2 className={banner ? "text-base font-semibold text-slate-950" : "text-lg font-semibold text-slate-950"}>{heading}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-700">
          {detail} Stripe bills {formatPlanPrice(PLANS.pro.price)} a month. There is no trial. Cancel in the Stripe customer portal.
        </p>
      </div>
      <div className={banner ? "shrink-0" : "mt-4"}>
        <button
          type="button"
          onClick={onUpgrade}
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Opening Stripe..." : checkoutLabel}
        </button>
        {error && (
          <p className="mt-2 text-sm text-rose-700" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  )
}
