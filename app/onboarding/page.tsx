"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { reviewPageUrl } from "@/lib/site"

export default function OnboardingPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [step, setStep] = useState(1)
  const [businessId, setBusinessId] = useState<string | number | null>(null)
  const [businessName, setBusinessName] = useState("")
  const [googleLink, setGoogleLink] = useState("")
  const [facebookLink, setFacebookLink] = useState("")
  const [yelpLink, setYelpLink] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.user) {
          router.replace("/auth/signin?signup=1")
          return
        }
        const business = data.user.business
        setBusinessId(business?.id ?? null)
        setBusinessName(business?.business_name || "")
        setGoogleLink(business?.google_link || "")
        setFacebookLink(business?.facebook_link || "")
        setYelpLink(business?.yelp_link || "")
        setReady(true)
      })
      .catch(() => router.replace("/auth/signin"))
  }, [router])

  const reviewLink = businessId ? reviewPageUrl(businessId) : ""

  const save = async () => {
    setSaving(true)
    setError("")
    try {
      const response = await fetch("/api/business/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: businessName,
          google_link: googleLink,
          facebook_link: facebookLink,
          yelp_link: yelpLink,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Could not save your business")
      router.push("/dashboard")
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save your business")
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
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Get your review page ready</h1>
        <ol className="mt-6 flex gap-2" aria-label="Progress">
          {[1, 2, 3].map((number) => (
            <li key={number} className={`h-1.5 flex-1 rounded-full ${number <= step ? "bg-indigo-600" : "bg-slate-200"}`} />
          ))}
        </ol>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold">Business name</h2>
              <label htmlFor="business-name" className="mt-4 block text-sm font-medium">Name customers will see</label>
              <input
                id="business-name"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Public review links</h2>
              <p className="text-sm text-slate-600">Every customer will see each link you add. You can skip this and add them later.</p>
              <label className="block text-sm font-medium">Google review link
                <input value={googleLink} onChange={(event) => setGoogleLink(event.target.value)} placeholder="https://search.google.com/local/writereview?placeid=" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5" />
              </label>
              <label className="block text-sm font-medium">Facebook
                <input value={facebookLink} onChange={(event) => setFacebookLink(event.target.value)} placeholder="https://facebook.com/your-page" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5" />
              </label>
              <label className="block text-sm font-medium">Yelp
                <input value={yelpLink} onChange={(event) => setYelpLink(event.target.value)} placeholder="https://yelp.com/biz/your-business" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5" />
              </label>
              <Link href="/tools/google-review-link" className="inline-flex text-sm font-semibold text-indigo-700">Need a Google review link?</Link>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold">Share this page</h2>
              <p className="mt-2 text-sm text-slate-600">This is the link for your QR code, receipts, and email requests.</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input readOnly value={reviewLink || "Your link will appear after the account is saved"} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 font-mono text-xs" />
                <button type="button" onClick={copyLink} disabled={!reviewLink} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold">
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><Check className="h-4 w-4 text-indigo-600" /> The same public links appear for every rating.</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-indigo-600" /> Private feedback is optional and does not hide those links.</li>
              </ul>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-rose-700" role="alert">{error}</p>}

          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1} className="text-sm font-semibold text-slate-600 disabled:opacity-40">
              Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((current) => current + 1)}
                disabled={step === 1 && businessName.trim().length < 2}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="button" onClick={save} disabled={saving || businessName.trim().length < 2} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
                {saving ? "Saving..." : "Save and open dashboard"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
