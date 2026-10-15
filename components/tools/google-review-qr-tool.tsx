"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { toDataURL } from "qrcode"
import { SignupLink } from "@/components/marketing/signup-link"
import { LeadCaptureForm } from "@/components/tools/lead-capture-form"
import { ReviewCardDownloads } from "@/components/tools/review-card-download"
import { trackToolUsage } from "@/lib/analytics-events"
import { reviewToolOutcome, type ReviewToolOutcome } from "@/lib/google-review-link"
import { SIGNUP_PATH } from "@/lib/signup"

const QR_OPTIONS = {
  errorCorrectionLevel: "M" as const,
  margin: 4,
  width: 640,
  color: { dark: "#000000", light: "#ffffff" },
}

function usageAction(outcome: ReviewToolOutcome): "link_ready" | "plain_qr_ready" | "" {
  switch (outcome.status) {
    case "review":
      return "link_ready"
    case "plain":
      return "plain_qr_ready"
    case "empty":
    case "error":
      return ""
    default: {
      const unreachable: never = outcome
      return unreachable
    }
  }
}

export function GoogleReviewQrTool({
  source,
  allowPlainUrl = false,
  ctaLocation,
  usagePage,
}: {
  source: "google-review-link" | "qr-code"
  allowPlainUrl?: boolean
  ctaLocation: string
  usagePage?: string
}) {
  const params = useSearchParams()
  const preset = params.get("url") ?? params.get("placeid") ?? ""
  const [input, setInput] = useState(preset)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState("")
  const [qr, setQr] = useState<{ url: string; dataUrl: string } | null>(null)
  const [qrError, setQrError] = useState("")
  const trackedUrl = useRef("")

  useEffect(() => {
    if (preset) setInput(preset)
  }, [preset])

  const outcome = useMemo(() => reviewToolOutcome(input, allowPlainUrl), [input, allowPlainUrl])
  const action = usageAction(outcome)
  const targetUrl = outcome.status === "review" || outcome.status === "plain" ? outcome.url : ""
  const dataUrl = qr?.url === targetUrl ? qr.dataUrl : ""

  useEffect(() => {
    if (!targetUrl || !action) {
      setQr(null)
      setQrError("")
      trackedUrl.current = ""
      return
    }

    let cancelled = false
    const timer = window.setTimeout(() => {
      toDataURL(targetUrl, QR_OPTIONS)
        .then((next) => {
          if (cancelled) return
          setQr({ url: targetUrl, dataUrl: next })
          setQrError("")
          if (trackedUrl.current !== targetUrl) {
            trackedUrl.current = targetUrl
            trackToolUsage(source, action, usagePage)
          }
        })
        .catch(() => {
          if (!cancelled) {
            setQr(null)
            setQrError("Could not create a QR code for that value.")
          }
        })
    }, 250)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [action, source, targetUrl, usagePage])

  const copy = async () => {
    if (!targetUrl) return
    setCopyError("")
    try {
      await navigator.clipboard.writeText(targetUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyError("Could not copy. Select the link and copy it manually.")
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <label htmlFor="review-qr-input" className="text-sm font-medium text-slate-800">
        Place ID, review link, or Google Maps URL
      </label>
      <input
        id="review-qr-input"
        value={input}
        onChange={(event) => {
          setCopied(false)
          setCopyError("")
          setInput(event.target.value)
        }}
        placeholder="ChIJ... or the long maps.google.com URL"
        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        autoComplete="off"
        spellCheck={false}
      />
      <p className="mt-2 text-sm leading-6 text-slate-500">
        A Place ID starts with ChIJ. A short g.page or maps.app.goo.gl link will not work. This page does not look your business up.
        {allowPlainUrl
          ? " You can also paste another https link, such as a ReputationFlow page, and the code will open that URL."
          : ""}
      </p>

      {outcome.status === "error" && (
        <p className="mt-3 text-sm text-rose-700" role="alert">
          {outcome.error}
        </p>
      )}

      {targetUrl && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          {outcome.status === "review" ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Google review link</p>
              <p className="mt-2 text-sm text-slate-600">
                Place ID <span className="font-mono text-slate-900">{outcome.placeId}</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">QR code target</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This is not a Google review link. The code opens the URL you pasted.
              </p>
            </>
          )}
          <p id="review-link-url" className="mt-2 break-all font-mono text-sm text-slate-900">
            {targetUrl}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={copy} className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">
              {copied ? "Copied" : "Copy link"}
            </button>
            <a
              href={targetUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-800"
            >
              Open link
            </a>
            {dataUrl && (
              <a
                href={dataUrl}
                download="google-review-qr-code.png"
                onClick={() => trackToolUsage(source, "qr_download", usagePage)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-800"
              >
                Download PNG
              </a>
            )}
          </div>
          {copyError && (
            <p className="mt-2 text-sm text-rose-700" role="alert">
              {copyError}
            </p>
          )}
          {qrError && (
            <p className="mt-3 text-sm text-rose-700" role="alert">
              {qrError}
            </p>
          )}
          {dataUrl && (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dataUrl}
                alt="QR code that opens the link above"
                width={224}
                height={224}
                className="h-56 w-56 rounded-lg border border-slate-200 bg-white"
              />
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                Open the link once and confirm it is your listing before you print. The PNG is 640 pixels wide, with a quiet zone, so a phone can scan the printed code.
              </p>
            </div>
          )}
          <div className="mt-4">
            <SignupLink
              href={SIGNUP_PATH}
              location={ctaLocation}
              className="inline-flex rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
            >
              Save this on a free review page
            </SignupLink>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Free Starter account. The public Google, Facebook, and Yelp buttons stay on that page for every customer.
            </p>
          </div>
          {dataUrl && (
            <ReviewCardDownloads
              qrDataUrl={dataUrl}
              onDownload={(kind) => trackToolUsage(source, kind === "tent" ? "tent_download" : "card_download", usagePage)}
            />
          )}
          <LeadCaptureForm source={source} details={targetUrl} />
        </div>
      )}
    </div>
  )
}
