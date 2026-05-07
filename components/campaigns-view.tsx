"use client"

import { useState } from "react"
import { Link2, Share2, Download } from "lucide-react"
import { Input } from "./ui/input"
import type { ToastType } from "@/lib/use-toast"

interface CampaignsViewProps {
  isPremium: boolean
  businessId: string
  showToast?: (message: string, type: ToastType) => void
  businessName?: string
}

export const CampaignsView = ({ isPremium, businessId, showToast, businessName }: CampaignsViewProps) => {
  const [copied, setCopied] = useState(false)

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://reputationflow.app"
  const reviewLink = `${baseUrl}/review/${businessId}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewLink)
    setCopied(true)
    showToast?.("Review link copied to clipboard!", "success")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Leave a review for ${businessName || "us"}`,
          text: `We'd love to hear your feedback!`,
          url: reviewLink,
        })
        showToast?.("Share successful", "success")
      } catch (error) {
        console.log("[v0] Share cancelled or failed")
      }
    } else {
      handleCopyLink()
    }
  }

  const handleDownloadQR = () => {
    showToast?.("Visit the Widget Builder tab to generate and download QR codes", "info")
  }

  return (
    <div className="max-w-5xl animate-in fade-in duration-500 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Share Your Review Link</h1>
        <p className="text-slate-500">Share this link with customers to collect reviews.</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl border border-indigo-100 shadow-sm p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Your Review Collection Link</label>
            <div className="flex gap-3">
              <Input value={reviewLink} readOnly className="font-mono text-sm bg-white" />
              <button
                onClick={handleCopyLink}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 whitespace-nowrap"
              >
                <Link2 size={16} />
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Share this unique link with your customers via any channel</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <button
              onClick={handleShareLink}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
            >
              <Share2 size={16} />
              <span>Share Link</span>
            </button>

            <button
              onClick={handleDownloadQR}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
            >
              <Download size={16} />
              <span>Get QR Code</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Ways to Share Your Link</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Add to your email signature</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Include on invoices and receipts</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Share on social media</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Text or message directly to customers</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Display QR code in your business location</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
