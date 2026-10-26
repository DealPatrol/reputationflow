"use client"

import { useEffect, useState } from "react"
import { toDataURL } from "qrcode"
import { ReviewCardDownloads } from "@/components/tools/review-card-download"
import { QrStandGuide } from "@/components/tools/qr-stand-guide"

const QR_OPTIONS = {
  errorCorrectionLevel: "M" as const,
  margin: 4,
  width: 640,
  color: { dark: "#000000", light: "#ffffff" },
}

export function DashboardShareKit({ url, businessName }: { url: string; businessName: string }) {
  const [dataUrl, setDataUrl] = useState("")

  useEffect(() => {
    let cancelled = false
    toDataURL(url, QR_OPTIONS)
      .then((next) => {
        if (!cancelled) setDataUrl(next)
      })
      .catch(() => {
        if (!cancelled) setDataUrl("")
      })
    return () => {
      cancelled = true
    }
  }, [url])

  return (
    <div className="mt-8">
      {dataUrl ? <ReviewCardDownloads qrDataUrl={dataUrl} initialBusinessName={businessName} /> : null}
      <QrStandGuide url={url} />
    </div>
  )
}
