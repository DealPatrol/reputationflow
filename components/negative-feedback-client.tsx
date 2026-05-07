"use client"

import React from "react"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Send } from "lucide-react"

interface NegativeFeedbackClientProps {
  businessId: string
}

export function NegativeFeedbackClient({ businessId }: NegativeFeedbackClientProps) {
  const [businessName, setBusinessName] = useState("Us")
  const [feedbackText, setFeedbackText] = useState("")
  const [email, setEmail] = useState("")
  const [step, setStep] = useState("form") // form, loading, success
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch business details
    const fetchBusiness = async () => {
      try {
        const res = await fetch(`/api/business/public?id=${businessId}`)
        if (res.ok) {
          const data = await res.json()
          setBusinessName(data.business.business_name || "Us")
        }
      } catch (err) {
        console.error("[v0] Error fetching business:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBusiness()
  }, [businessId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!feedbackText.trim() || feedbackText.length < 10) {
      setError("Please provide at least 10 characters of feedback")
      return
    }

    setStep("loading")
    setError("")

    try {
      const res = await fetch("/api/feedback/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          rating: 2, // Default for negative feedback flow
          feedback_text: feedbackText,
          type: "negative",
          customer_email: email || undefined,
        }),
      })

      if (!res.ok) throw new Error("Failed to submit feedback")

      setStep("success")
      setFeedbackText("")
      setEmail("")

      setTimeout(() => {
        window.close()
      }, 3000)
    } catch (err) {
      console.error("[v0] Feedback submission error:", err)
      setError("Failed to submit feedback. Please try again.")
      setStep("form")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    )
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h2>
          <p className="text-slate-600 mb-4">We appreciate your detailed feedback and will use it to improve.</p>
          <p className="text-sm text-slate-500">This window will close automatically...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <AlertCircle className="absolute top-2 left-2 text-white" size={32} opacity={0.3} />
          </div>
          <h1 className="text-white text-3xl font-bold relative z-10">{businessName}</h1>
          <p className="text-amber-50 text-sm font-semibold mt-2 relative z-10">We value your feedback</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-3">How can we do better?</label>
            <textarea
              value={feedbackText}
              onChange={(e) => {
                setFeedbackText(e.target.value)
                if (error) setError("")
              }}
              maxLength={1000}
              rows={5}
              placeholder="Tell us what happened and how we can improve..."
              className={`w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 transition-colors resize-none ${
                error ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-amber-100"
              }`}
            />
            <div className="flex justify-between items-center mt-2">
              {error ? (
                <p className="text-xs text-red-600 font-medium">{error}</p>
              ) : (
                <p className="text-xs text-slate-400">{feedbackText.length}/1000 characters</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-100 transition-colors"
            />
            <p className="text-xs text-slate-500 mt-1">We'll use this to follow up if needed</p>
          </div>

          <button
            type="submit"
            disabled={step === "loading" || !feedbackText.trim()}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/30 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Send Feedback
          </button>

          <p className="text-xs text-slate-500 text-center">Your feedback is kept private and helps us improve our service.</p>
        </form>
      </div>
    </div>
  )
}
