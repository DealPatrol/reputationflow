"use client"

import { useState } from "react"

type CardKind = "tent" | "card"

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Could not read the QR code image."))
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
) {
  ctx.save()
  if (upsideDown) {
    ctx.translate(width / 2, height / 2)
    ctx.rotate(Math.PI)
    ctx.translate(-width / 2, -height / 2)
  }

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, width, height)
  ctx.strokeStyle = "#e2e8f0"
  ctx.lineWidth = 2
  ctx.strokeRect(24, 24, width - 48, height - 48)

  const headingSize = Math.max(28, Math.round(height * 0.06))
  const nameSize = Math.max(32, Math.round(height * 0.07))
  const captionSize = Math.max(20, Math.round(height * 0.042))
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.font = `600 ${headingSize}px sans-serif`
  let cursor = Math.round(height * 0.16)
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

async function renderCard(kind: CardKind, businessName: string, qrDataUrl: string) {
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
    drawFace(ctx, canvas.width, canvas.height, false, businessName, qr)
  } else {
    const half = canvas.height / 2
    ctx.save()
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, half)
    ctx.clip()
    drawFace(ctx, canvas.width, half, true, businessName, qr)
    ctx.restore()

    ctx.save()
    ctx.translate(0, half)
    drawFace(ctx, canvas.width, half, false, businessName, qr)
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

export function ReviewCardDownloads({ qrDataUrl }: { qrDataUrl: string }) {
  const [businessName, setBusinessName] = useState("")
  const [error, setError] = useState("")
  const [preview, setPreview] = useState("")
  const [busy, setBusy] = useState<CardKind | null>(null)

  const download = async (kind: CardKind) => {
    setBusy(kind)
    setError("")
    try {
      const dataUrl = await renderCard(kind, businessName, qrDataUrl)
      setPreview(dataUrl)
      downloadDataUrl(dataUrl, kind === "tent" ? "google-review-table-tent.png" : "google-review-card.png")
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
        The table tent is a letter-size PNG. Fold it on the dashed line so it stands on the counter. The review card is about 3.5 by 2 inches. Nothing is uploaded to build either file.
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
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => download("tent")}
          disabled={busy !== null}
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
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
