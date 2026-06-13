"use client"

import { useState } from "react"
import { FeedbackFlow } from "@/components/feedback-flow"
import { Star } from "lucide-react"
import Link from "next/link"

interface PublicReviewClientProps {
  business: {
    id: string
    business_name: string
    google_link?: string
    facebook_link?: string
    yelp_link?: string
  }
}

export function PublicReviewClient({ business }: PublicReviewClientProps) {
  const [submitting, setSubmitting] = useState(false)

  const handleFeedbackSubmit = async (data: any) => {
    if (submitting) return

    setSubmitting(true)

    try {
      const res = await fetch("/api/feedback/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: business.id,
          rating: data.rating,
          feedback_text: data.feedback,
          type: data.type,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to submit feedback")
      }

      console.log("[v0] Feedback submitted successfully")
    } catch (error) {
      console.error("[v0] Feedback submission error:", error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-md">
          {/* Branding header */}
          <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-2xl shadow-lg shadow-indigo-500/30 mb-4">
              <Star size={28} className="text-white" fill="currentColor" />
            </div>
            <p className="text-slate-600 text-sm font-medium">Powered by Feedbackr</p>
          </div>

          {/* Feedback form */}
          <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <FeedbackFlow
              businessName={business.business_name}
              links={{
                google: business.google_link,
                facebook: business.facebook_link,
                yelp: business.yelp_link,
              }}
              onComplete={handleFeedbackSubmit}
            />
          </div>

          {/* Footer */}
          <div className="text-center mt-8 animate-in fade-in duration-700 delay-400">
            <p className="text-slate-500 text-xs">Your feedback helps us improve our service</p>
          </div>
        </div>
      </div>

      <footer className="relative z-10 py-6 text-center">
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
          <Link href="/terms" className="hover:text-slate-700 transition-colors">
            Terms
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-slate-700 transition-colors">
            Privacy
          </Link>
          <span>•</span>
          <a href="mailto:support@reputationflow.app" className="hover:text-slate-700 transition-colors">
            Support
          </a>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
