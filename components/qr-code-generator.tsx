"use client"

import { useState, useEffect } from "react"
import { Download, Copy, Check, Printer, Share2, Loader2 } from "lucide-react"

interface QRCodeGeneratorProps {
  url: string
  businessName?: string
}

export function QRCodeGenerator({ url, businessName }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [size, setSize] = useState(300)
  const [loading, setLoading] = useState(false)
  const [cached, setCached] = useState(false)

  useEffect(() => {
    generateAndStoreQR()
  }, [url, size])

  const generateAndStoreQR = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/qr/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, businessName, size }),
      })

      if (response.ok) {
        const data = await response.json()
        setQrCodeUrl(data.qrCodeUrl)
        setCached(data.cached)
      } else {
        // Fallback to direct QR Server API
        const fallbackUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&format=png`
        setQrCodeUrl(fallbackUrl)
      }
    } catch (error) {
      console.error("[v0] QR generation failed:", error)
      // Fallback to direct QR Server API
      const fallbackUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&format=png`
      setQrCodeUrl(fallbackUrl)
    } finally {
      setLoading(false)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQR = () => {
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `${businessName || "reputationflow"}-qr-code.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const printQR = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body { 
                display: flex; 
                flex-direction: column;
                align-items: center; 
                justify-content: center; 
                min-height: 100vh;
                margin: 0;
                font-family: system-ui, -apple-system, sans-serif;
              }
              .container {
                text-align: center;
                padding: 40px;
              }
              h1 { 
                font-size: 24px; 
                margin-bottom: 10px;
                color: #1e293b;
              }
              p {
                font-size: 14px;
                color: #64748b;
                margin-bottom: 30px;
              }
              img { 
                max-width: 400px; 
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 20px;
                background: white;
              }
              .url {
                margin-top: 20px;
                font-size: 12px;
                color: #94a3b8;
                word-break: break-all;
              }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>${businessName || "ReputationFlow"}</h1>
              <p>Scan to leave a review</p>
              <img src="${qrCodeUrl}" alt="QR Code" />
              <div class="url">${url}</div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Leave a review for ${businessName || "us"}`,
          text: "Scan this QR code or use the link to leave your feedback:",
          url: url,
        })
      } catch (err) {
        console.log("Share cancelled or failed")
      }
    } else {
      copyLink()
    }
  }

  return (
    <div className="space-y-6">
      {/* QR Code Display */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border border-slate-200 flex flex-col items-center">
        <div className="bg-white p-6 rounded-xl shadow-lg mb-4 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
          )}
          <img
            src={qrCodeUrl || "/placeholder.svg"}
            alt="QR Code"
            className="w-full h-auto"
            style={{ maxWidth: `${size}px` }}
          />
          {cached && (
            <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">
              Cached
            </div>
          )}
        </div>

        {/* Size Selector */}
        <div className="flex items-center gap-2 mb-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Size:</label>
          <div className="flex bg-white rounded-lg border border-slate-200 p-1">
            <button
              onClick={() => setSize(200)}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${size === 200 ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              Small
            </button>
            <button
              onClick={() => setSize(300)}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${size === 300 ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              Medium
            </button>
            <button
              onClick={() => setSize(500)}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${size === 500 ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              Large
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          <button
            onClick={downloadQR}
            className="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700 px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            onClick={printQR}
            className="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700 px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Printer size={16} />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            onClick={shareQR}
            className="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700 px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={copyLink}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm"
          >
            {copied ? (
              <>
                <Check size={16} />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span className="hidden sm:inline">Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Link Display */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Your Review Link</label>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-mono text-sm text-slate-700 break-all select-all">
          {url}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h4 className="font-bold text-blue-900 text-sm mb-2">How to use your QR code</h4>
        <ul className="text-blue-700 text-xs space-y-1.5">
          <li>• Print it on receipts, business cards, or flyers</li>
          <li>• Display it at your checkout counter or entrance</li>
          <li>• Add it to email signatures and invoices</li>
          <li>• Include it in product packaging or thank-you cards</li>
        </ul>
      </div>
    </div>
  )
}
