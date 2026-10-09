"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toDataURL } from "qrcode"
import { buildGoogleReviewLink } from "@/lib/google-review-link"
import { SIGNUP_PATH } from "@/lib/signup"
import { reviewPageUrl } from "@/lib/site"

type OnboardingStep = "link" | "qr"

export default function OnboardingPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [step, setStep] = useState<OnboardingStep>("link")
  const [businessId, setBusinessId] = useState<string | number | null>(null)
  const [rawInput, setRawInput] = useState("")
  const [googleLink, setGoogleLink] = useState("")
  const [pageQr, setPageQr] = useState("")
  const [googleQr, setGoogleQr] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.user) {
          router.replace(SIGNUP_PATH)
          return
        }
        const business = data.user.business
        const savedLink = typeof business?.google_link === "string" ? business.google_link : ""
        setBusinessId(business?.id ?? null)
        setGoogleLink(savedLink)
        setRawInput(savedLink)
        setStep(savedLink.trim() ? "qr" : "link")
        setReady(true)
      })
      .catch(() => router.replace("/auth/signin"))
  }, [router])

  const reviewLink = businessId ? reviewPageUrl(businessId) : ""

  useEffect(() => {
    if (step !== "qr" || !reviewLink) return
    let cancelled = false
    setPageQr("")
    setGoogleQr("")
    toDataURL(reviewLink, { width: 640, margin: 2 })
      .then((next) => {
        if (!cancelled) setPageQr(next)
      })
      .catch(() => {
        if (!cancelled) setError("Could not create the QR code.")
      })
    if (googleLink) {
      toDataURL(googleLink, { width: 640, margin: 2 })
        .then((next) => {
          if (!cancelled) setGoogleQr(next)
        })
        .catch(() => {
          if (!cancelled) setError("Could not create the Google review QR code.")
        })
    }
    return () => {
      cancelled = true
    }
  }, [step, reviewLink, googleLink])

  const saveLink = async () => {
    const built = buildGoogleReviewLink(rawInput)
    if (!built.ok) {
      setError(built.error)
      return
    }
    setSaving(true)
    setError("")
    try {
      const response = await fetch("/api/business/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ google_link: built.url }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Could not save your review link")
      setGoogleLink(built.url)
      setRawInput(built.url)
      setStep("qr")
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save your review link")
    } finally {
      setSaving(false)
    }
  }

  const copyLink = async () => {
    if (!reviewLink) return
    await navigator.clipboard.writeText(reviewLink)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  if (!ready) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Loading your account...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-semibold text-indigo-700">Setup</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Create your review link</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Paste the Google review link, then download the QR code. You can leave the rest of the settings for later.
        </p>
        <ol className="mt-6 flex gap-2" aria-label="Progress">
          <li className="h-1.5 flex-1 rounded-full bg-indigo-600" />
          <li className={`h-1.5 flex-1 rounded-full ${step === "qr" ? "bg-indigo-600" : "bg-slate-200"}`} />
        </ol>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          {step === "link" && (
            <div>
              <h2 className="text-xl font-semibold">Google review link</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Open your Business Profile, choose Ask for reviews, and paste that link or the Place ID that starts with ChIJ. A short maps.app.goo.gl link cannot be converted here.
              </p>
              <label htmlFor="google-review-input" className="mt-4 block text-sm font-medium">
                Place ID or review URL
              </label>
              <textarea
                id="google-review-input"
                value={rawInput}
                onChange={(event) => setRawInput(event.target.value)}
                rows={3}
                placeholder="ChIJ... or https://search.google.com/local/writereview?placeid="
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              />
              <p className="mt-3 text-sm text-slate-600">
                <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
                  Open the free generator
                </Link>{" "}
                if you want to check the link before you save it.
              </p>
            </div>
          )}

          {step === "qr" && (
            <div>
              <h2 className="text-xl font-semibold">Your review QR code</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This code opens your ReputationFlow page. Put it on the counter, the invoice, or a card. Customers see the public review links you have saved.
              </p>
              {!googleLink && (
                <p className="mt-3 text-sm leading-6 text-amber-800">
                  You skipped the Google link. This QR code still works. Add the Place ID when you have it, from this screen or the dashboard.
                </p>
              )}
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input readOnly value={reviewLink} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 font-mono text-xs" />
                <button type="button" onClick={copyLink} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold">
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              {pageQr && (
                <div className="mt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pageQr} alt="QR code for your review page" width={224} height={224} className="h-56 w-56 rounded-lg border border-slate-200" />
                  <a href={pageQr} download="review-page-qr.png" className="mt-4 inline-flex rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">
                    Download review page QR
                  </a>
                </div>
              )}
              {googleQr && (
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h3 className="text-base font-semibold text-slate-950">Google review form</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This second code opens Google’s write-a-review form for the Place ID you saved. Use it when you want Google only, without the ReputationFlow page.
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={googleQr} alt="QR code for your Google review form" width={224} height={224} className="mt-4 h-56 w-56 rounded-lg border border-slate-200" />
                  <a href={googleQr} download="google-review-qr.png" className="mt-4 inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800">
                    Download Google review QR
                  </a>
                </div>
              )}
            </div>
          )}

          {error && <p className="mt-4 text-sm text-rose-700" role="alert">{error}</p>}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step === "qr" ? (
              <button type="button" onClick={() => { setError(""); setStep("link") }} className="text-sm font-semibold text-slate-600">
                Edit the Google link
              </button>
            ) : (
              <button type="button" onClick={() => { setError(""); setStep("qr") }} className="text-sm font-semibold text-slate-600">
                I don’t have a Place ID yet
              </button>
            )}
            {step === "link" ? (
              <button
                type="button"
                onClick={saveLink}
                disabled={saving || rawInput.trim().length === 0}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save link and make the QR code"}
              </button>
            ) : (
              <button type="button" onClick={() => router.push("/dashboard")} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
                Open dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
