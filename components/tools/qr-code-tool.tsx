"use client"

import { useEffect, useState } from "react"
import { validators } from "@/lib/validators"
import { LeadCaptureForm } from "@/components/tools/lead-capture-form"

export function QrCodeTool() {
  const [url, setUrl] = useState("")
  const [dataUrl, setDataUrl] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const value = url.trim()
    if (!value) {
      setDataUrl("")
      setError("")
      return
    }
    const validation = validators.url(value)
    if (!validation.valid) {
      setDataUrl("")
      setError(validation.error || "Enter a valid https URL.")
      return
    }

    let cancelled = false
    setError("")
    import("qrcode")
      .then((QRCode) => QRCode.toDataURL(value, { width: 640, margin: 2 }))
      .then((next) => {
        if (!cancelled) setDataUrl(next)
      })
      .catch(() => {
        if (!cancelled) setError("Could not create a QR code for that URL.")
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <label htmlFor="qr-url" className="text-sm font-medium text-slate-800">
        Review link
      </label>
      <input
        id="qr-url"
        type="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://search.google.com/local/writereview?placeid="
        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
      {error && <p className="mt-3 text-sm text-rose-700" role="alert">{error}</p>}
      {dataUrl && (
        <div className="mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl} alt="QR code for the review link" className="h-56 w-56 rounded-lg border border-slate-200" />
          <a
            href={dataUrl}
            download="review-qr-code.png"
            className="mt-4 inline-flex rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
          >
            Download PNG
          </a>
          <LeadCaptureForm source="qr-code" details={url.trim()} />
        </div>
      )}
    </div>
  )
}
