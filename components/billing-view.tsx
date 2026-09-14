"use client"

import { useState } from "react"
import { Check, Zap, Loader2 } from "lucide-react"
import { PLANS } from "@/lib/plans"

interface BillingViewProps {
  isPremium: boolean
  subscriptionStatus?: string
  showToast: (message: string, type: "success" | "error") => void
}

export function BillingView({ isPremium, subscriptionStatus, showToast }: BillingViewProps) {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planType: "pro" }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error: any) {
      console.error("[v0] Upgrade error:", error)
      showToast(error.message || "Failed to start upgrade", "error")
      setLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to open billing portal")
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error: any) {
      console.error("[v0] Portal error:", error)
      showToast(error.message || "Failed to open billing portal", "error")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Billing & Plans</h1>
        <p className="text-slate-500">Choose the plan that works best for your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-sm">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-slate-900">$0</span>
              <span className="text-slate-500">/month</span>
            </div>
            <p className="text-slate-600">Perfect for getting started</p>
          </div>

          <ul className="space-y-3 mb-8">
            {PLANS.free.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check size={20} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600">{feature}</span>
              </li>
            ))}
          </ul>

          {!isPremium && (
            <div className="bg-slate-100 text-slate-600 text-center py-3 rounded-xl font-bold">Current Plan</div>
          )}
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <span className="bg-emerald-400 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Zap size={12} fill="currentColor" />
              POPULAR
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold">$49</span>
              <span className="text-indigo-200">/month</span>
            </div>
            <p className="text-indigo-100">Everything you need to scale</p>
          </div>

          <ul className="space-y-3 mb-8">
            {PLANS.pro.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check size={20} className="text-emerald-300 flex-shrink-0 mt-0.5" />
                <span className="text-white">{feature}</span>
              </li>
            ))}
          </ul>

          {isPremium ? (
            <div className="space-y-3">
              <div className="bg-white/10 text-white text-center py-3 rounded-xl font-bold">
                Current Plan {subscriptionStatus === "active" && "✓"}
              </div>
              <button
                onClick={handleManageSubscription}
                disabled={loading}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                Manage Subscription
              </button>
            </div>
          ) : (
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full bg-white hover:bg-slate-50 text-indigo-600 py-4 rounded-xl font-bold shadow-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Processing..." : "Upgrade to Pro"}
            </button>
          )}
        </div>
      </div>

      {/* Status Messages */}
      {subscriptionStatus === "past_due" && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800">
          <p className="font-bold mb-1">Payment Issue</p>
          <p className="text-sm">
            Your subscription payment failed. Please update your payment method to continue using Pro features.
          </p>
        </div>
      )}
    </div>
  )
}
