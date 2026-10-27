"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { trackSignup } from "@/lib/ads-events"
import { trackSignupClick } from "@/lib/analytics-events"
import { readStoredAttribution } from "@/lib/attribution"
import { dropPendingBusinessName, takePendingBusinessName } from "@/lib/message-handoff"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { startProfessionalCheckout } from "@/lib/start-checkout"
import { afterAuthDestination, BILLING_CHECKOUT_FAILED_PATH, isProfessionalIntent } from "@/lib/signup"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [wantsProfessional, setWantsProfessional] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openingCheckout, setOpeningCheckout] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("signup") === "1") {
      setIsSignUp(true)
      const pendingName = takePendingBusinessName()
      if (pendingName) setBusinessName((current) => current || pendingName)
    }
    if (isProfessionalIntent(params.get("plan"))) setWantsProfessional(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    if (isSignUp) trackSignupClick("auth_form")

    try {
      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin"
      const body = isSignUp
        ? { email, password, businessName, attribution: readStoredAttribution() }
        : { email, password }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed")
      }

      if (isSignUp) {
        trackSignup()
        dropPendingBusinessName()
      }
      const next = afterAuthDestination({ isSignUp, wantsProfessional })
      switch (next.type) {
        case "checkout": {
          setOpeningCheckout(true)
          try {
            await startProfessionalCheckout()
          } catch (checkoutError) {
            console.error("[v0] Checkout redirect error:", checkoutError)
            router.push(BILLING_CHECKOUT_FAILED_PATH)
            router.refresh()
          }
          return
        }
        case "path":
          router.push(next.path)
          router.refresh()
          return
        default: {
          const unreachable: never = next
          return unreachable
        }
      }
    } catch (err: unknown) {
      console.error("[v0] Auth error:", err)
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setError(message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f5f1] text-slate-950 lg:grid lg:grid-cols-[minmax(0,1fr)_32rem]">
      <aside className="border-b border-slate-200 px-6 py-10 sm:px-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
        <div>
          <Link href="/" className="inline-flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand-header.png" alt="Reputation Flow" width={208} height={36} className="h-9 w-auto" />
          </Link>
          <p className="mt-8 max-w-md text-2xl font-semibold tracking-tight text-slate-950">
            One review link for every customer.
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Starter is free and does not ask for a card. Professional is {formatPlanPrice(PLANS.pro.price)} a month through Stripe, with no trial on top of Starter.
          </p>
        </div>
        <ul className="mt-8 max-w-md space-y-3 text-sm leading-6 text-slate-700 lg:mt-10">
          <li>Google, Facebook, and Yelp stay on the page at every rating.</li>
          <li>The next screen after a free signup is the Google review link, then the QR code.</li>
          <li>Choosing Professional opens Stripe checkout as soon as the account exists.</li>
        </ul>
      </aside>

      <div className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="mt-2 mb-6 text-sm leading-6 text-slate-600">
            {wantsProfessional
              ? isSignUp
                ? "The account form does not ask for a card. Stripe checkout opens next."
                : "Sign in, then billing opens the $20 plan."
              : isSignUp
                ? "Starter is free. This form does not ask for a card."
                : "Sign in to your account"}
          </p>
          {wantsProfessional && (
            <div className="mb-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm leading-6 text-slate-700">
              Professional is {formatPlanPrice(PLANS.pro.price)} a month through Stripe. There is no trial on top of Starter.
              You can cancel in the Stripe customer portal, and access lasts through the period you already paid.
              {isSignUp ? " After this form, Stripe checkout opens." : " After you sign in, billing opens."}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Your business"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-100"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-100"
                placeholder="Password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                minLength={6}
              />
              {isSignUp && <p className="mt-1 text-xs text-slate-500">At least 6 characters</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-800 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {openingCheckout ? "Opening Stripe..." : loading ? "Loading..." : isSignUp ? (wantsProfessional ? "Create free account" : "Create Account") : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                if (!isSignUp) trackSignupClick("auth_switch")
                setIsSignUp(!isSignUp)
                setError("")
              }}
              className="text-sm font-semibold text-indigo-800 hover:text-indigo-700"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
