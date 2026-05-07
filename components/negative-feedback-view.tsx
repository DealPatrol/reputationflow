"use client"

import { useState } from "react"
import { AlertCircle, Copy, Check } from "lucide-react"

interface NegativeFeedbackViewProps {
  businessId: string
  businessName: string
  negativeReviewLink?: string
}

export function NegativeFeedbackView({
  businessId,
  businessName,
  negativeReviewLink,
}: NegativeFeedbackViewProps) {
  const [copied, setCopied] = useState(false)

  const feedbackLink = negativeReviewLink || `${typeof window !== "undefined" ? window.location.origin : ""}/feedback/${businessId}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(feedbackLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <AlertCircle className="text-amber-600" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Collect Constructive Feedback</h1>
        </div>
        <p className="text-slate-500">Share this link with customers who give 1-3 star reviews to collect detailed feedback.</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800">Feedback Collection Link</label>
          <p className="text-sm text-slate-500">
            Customers who rate 1-3 stars will be shown your feedback form at this link. You can customize this URL below.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              value={feedbackLink}
              readOnly
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-600"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg space-y-3">
          <h3 className="font-bold text-blue-900 text-sm">How it works:</h3>
          <ul className="text-sm text-blue-900 space-y-2 ml-4 list-disc">
            <li>When customers give you a 1-3 star rating, they see a form to share detailed feedback</li>
            <li>You can view all collected feedback in your dashboard under "Analytics"</li>
            <li>This helps you identify and address service issues quickly</li>
            <li>No data is sent to external review platforms</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-3">
          <h3 className="font-bold text-green-900 text-sm">Pro Tip:</h3>
          <p className="text-sm text-green-900">
            Use this link in your follow-up messages to customers. Include it in emails or QR codes to make it easy for unhappy customers to provide feedback privately.
          </p>
        </div>
      </div>
    </div>
  )
}
