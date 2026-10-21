"use client"

import { useEffect, useState } from "react"
import { CARD_COLOR_PRESETS, DEFAULT_CARD_COLOR, normalizeHexColor } from "@/lib/card-style"

type CardKind = "tent" | "card"

const MAX_LOGO_BYTES = 1_500_000

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Could not read that image."))
    image.src = src
  })
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ""
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  if (lines.length <= maxLines) return lines
  const kept = lines.slice(0, maxLines)
  kept[maxLines - 1] = `${kept[maxLines - 1].replace(/…$/, "")}…`
  return kept
}

function drawFace(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  upsideDown: boolean,
  businessName: string,
  qr: HTMLImageElement,
  accent: string,
  logo: HTMLImageElement | null,
) {
  ctx.save()
  if (upsideDown) {
    ctx.translate(width / 2, height / 2)
    ctx.rotate(Math.PI)
    ctx.translate(-width / 2, -height / 2)
  }

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = accent
  ctx.fillRect(0, 0, width, Math.max(18, Math.round(height * 0.045)))
  ctx.strokeStyle = "#e7e3dc"
  ctx.lineWidth = 2
  ctx.strokeRect(24, 24, width - 48, height - 48)

  let cursor = Math.round(height * 0.12)
  if (logo) {
    const maxW = width * 0.42
    const maxH = height * 0.16
    const scale = Math.min(maxW / logo.width, maxH / logo.height)
    const logoW = logo.width * scale
    const logoH = logo.height * scale
    ctx.drawImage(logo, (width - logoW) / 2, cursor, logoW, logoH)
    cursor += logoH + 16
  }

  const headingSize = Math.max(28, Math.round(height * 0.055))
  const nameSize = Math.max(32, Math.round(height * 0.065))
  const captionSize = Math.max(20, Math.round(height * 0.04))
  ctx.fillStyle = "#142033"
  ctx.textAlign = "center"
  ctx.font = `600 ${headingSize}px sans-serif`
  ctx.fillText("How was your visit?", width / 2, cursor)

  cursor += headingSize + 8
  ctx.font = `700 ${nameSize}px sans-serif`
  const nameLines = wrapLines(ctx, businessName || "Your business", width - 140, 2)
  for (const line of nameLines) {
    cursor += nameSize
    ctx.fillText(line, width / 2, cursor)
    cursor += 8
  }

  const captionY = height - Math.round(height * 0.1)
  const qrSize = Math.max(120, Math.min(width * 0.42, captionY - cursor - 28, 460))
  const qrX = (width - qrSize) / 2
  const qrY = cursor + Math.max(12, (captionY - cursor - qrSize) / 2)
  ctx.drawImage(qr, qrX, qrY, qrSize, qrSize)

  ctx.font = `400 ${captionSize}px sans-serif`
  ctx.fillStyle = "#334155"
  ctx.fillText("Scan to leave a Google review", width / 2, captionY)
  ctx.restore()
}

async function renderCard(
  kind: CardKind,
  businessName: string,
  qrDataUrl: string,
  accent: string,
  logo: HTMLImageElement | null,
) {
  const qr = await loadImage(qrDataUrl)
  const canvas = document.createElement("canvas")
  if (kind === "card") {
    canvas.width = 1050
    canvas.height = 600
  } else {
    canvas.width = 1275
    canvas.height = 1650
  }
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not prepare the download.")
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if (kind === "card") {
    drawFace(ctx, canvas.width, canvas.height, false, businessName, qr, accent, logo)
  } else {
    const half = canvas.height / 2
    ctx.save()
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, half)
    ctx.clip()
    drawFace(ctx, canvas.width, half, true, businessName, qr, accent, logo)
    ctx.restore()

    ctx.save()
    ctx.translate(0, half)
    drawFace(ctx, canvas.width, half, false, businessName, qr, accent, logo)
    ctx.restore()

    ctx.save()
    ctx.strokeStyle = "#94a3b8"
    ctx.lineWidth = 2
    ctx.setLineDash([10, 10])
    ctx.beginPath()
    ctx.moveTo(36, half)
    ctx.lineTo(canvas.width - 36, half)
    ctx.stroke()
    ctx.restore()
  }

  return canvas.toDataURL("image/png")
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a")
  link.href = dataUrl
  link.download = filename
  link.click()
}

export function ReviewCardDownloads({
  qrDataUrl,
  onDownload,
  initialBusinessName = "",
}: {
  qrDataUrl: string
  onDownload?: (kind: CardKind) => void
  initialBusinessName?: string
}) {
  const [businessName, setBusinessName] = useState(initialBusinessName)
  const [accent, setAccent] = useState<string>(DEFAULT_CARD_COLOR)
  const [customColor, setCustomColor] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const [logo, setLogo] = useState<HTMLImageElement | null>(null)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState("")
  const [busy, setBusy] = useState<CardKind | null>(null)

  useEffect(() => {
    if (!initialBusinessName) return
    setBusinessName((current) => current || initialBusinessName)
  }, [initialBusinessName])

  useEffect(() => {
    let cancelled = false
    if (!logoUrl) {
      setLogo(null)
      return
    }
    loadImage(logoUrl)
      .then((image) => {
        if (!cancelled) setLogo(image)
      })
      .catch(() => {
        if (!cancelled) {
          setLogo(null)
          setError("Could not read that logo. Use a PNG, JPEG, or WebP.")
        }
      })
    return () => {
      cancelled = true
    }
  }, [logoUrl])

  useEffect(() => {
    let cancelled = false
    const timer = window.setTimeout(() => {
      renderCard("card", businessName, qrDataUrl, accent, logo)
        .then((dataUrl) => {
          if (!cancelled) setPreview(dataUrl)
        })
        .catch(() => {
          if (!cancelled) setPreview("")
        })
    }, 200)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [accent, businessName, logo, qrDataUrl])

  const applyCustomColor = () => {
    const next = normalizeHexColor(customColor)
    if (!next) {
      setError("Use a 6-digit hex color such as #142033.")
      return
    }
    setError("")
    setAccent(next)
  }

  const onLogo = (file: File | undefined) => {
    setError("")
    if (!file) {
      setLogoUrl("")
      return
    }
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("Use a PNG, JPEG, or WebP logo.")
      return
    }
    if (file.size > MAX_LOGO_BYTES) {
      setError("That logo is over 1.5 MB. Export a smaller file.")
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") setLogoUrl(reader.result)
    }
    reader.onerror = () => setError("Could not read that logo.")
    reader.readAsDataURL(file)
  }

  const download = async (kind: CardKind) => {
    setBusy(kind)
    setError("")
    try {
      const dataUrl = await renderCard(kind, businessName, qrDataUrl, accent, logo)
      if (kind === "card") setPreview(dataUrl)
      downloadDataUrl(dataUrl, kind === "tent" ? "google-review-table-tent.png" : "google-review-card.png")
      onDownload?.(kind)
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : "Could not create the file.")
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="mt-6 border-t border-slate-200 pt-4">
      <h2 className="text-sm font-semibold text-slate-950">Printable review card</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        Pick a color and, if you want, a logo. The table tent is a letter-size PNG. Fold it on the dashed line so it stands on the counter. The review card is about 3.5 by 2 inches. Nothing is uploaded to build either file. The logo stays in this browser.
      </p>
      <label htmlFor="card-business-name" className="mt-3 block text-xs font-medium text-slate-600">
        Name to print on the card
        <input
          id="card-business-name"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          placeholder="Your business"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
        />
      </label>
      <fieldset className="mt-4">
        <legend className="text-xs font-medium text-slate-600">Color band</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {CARD_COLOR_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                setAccent(preset.value)
                setError("")
              }}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${
                accent === preset.value ? "border-slate-950 text-slate-950" : "border-slate-300 text-slate-700"
              }`}
              aria-pressed={accent === preset.value}
            >
              <span className="h-3.5 w-3.5 rounded-sm border border-black/10" style={{ backgroundColor: preset.value }} />
              {preset.label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <label className="block flex-1 text-xs font-medium text-slate-600" htmlFor="card-custom-color">
            Custom hex
            <input
              id="card-custom-color"
              value={customColor}
              onChange={(event) => setCustomColor(event.target.value)}
              placeholder="#142033"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
            />
          </label>
          <button
            type="button"
            onClick={applyCustomColor}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 sm:self-end"
          >
            Use color
          </button>
        </div>
      </fieldset>
      <label htmlFor="card-logo" className="mt-4 block text-xs font-medium text-slate-600">
        Logo, optional
        <input
          id="card-logo"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(event) => onLogo(event.target.files?.[0])}
          className="mt-1 block w-full text-sm text-slate-700"
        />
      </label>
      {logoUrl && (
        <button type="button" onClick={() => setLogoUrl("")} className="mt-2 text-sm font-semibold text-indigo-800">
          Remove logo
        </button>
      )}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => download("tent")}
          disabled={busy !== null}
          className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {busy === "tent" ? "Preparing..." : "Download table tent"}
        </button>
        <button
          type="button"
          onClick={() => download("card")}
          disabled={busy !== null}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 disabled:opacity-60"
        >
          {busy === "card" ? "Preparing..." : "Download review card"}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Preview of the printable review card"
          width={320}
          height={180}
          className="mt-4 h-auto w-full max-w-xs rounded-lg border border-slate-200"
        />
      )}
    </div>
  )
}
