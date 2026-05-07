"use client"

import { useState } from "react"
import { Star, CheckCircle, ArrowRight, Facebook } from "lucide-react"
import { validators, sanitize } from "@/lib/validators"

interface FeedbackFlowProps {
  businessName: string
  links: {
    google?: string
    facebook?: string
    yelp?: string
    googleAdditional?: string[]
    facebookAdditional?: string[]
    yelpAdditional?: string[]
    negativeLink?: string
  }
  onComplete: (data: any) => void
}

export const FeedbackFlow = ({ businessName, links, onComplete }: FeedbackFlowProps) => {
  const [rating, setRating] = useState(0)
  const [step, setStep] = useState("rate")
  const [feedbackText, setFeedbackText] = useState("")
  const [error, setError] = useState("")

  const handleRate = (score: number) => {
    setRating(score)
    setTimeout(() => {
      if (score >= 4) {
        setStep("positive")
      } else {
        setStep("negative")
      }
    }, 300)
  }

  const handleNegativeRedirect = () => {
    if (links.negativeLink) {
      window.open(links.negativeLink, "_blank", "noopener,noreferrer")
    }
    onComplete({ rating, feedback: "Redirected to negative feedback form", type: "negative" })
    setStep("done")
  }

  const submitNegative = () => {
    const validation = validators.feedback(feedbackText)
    if (!validation.valid) {
      setError(validation.error || "")
      return
    }

    const sanitizedFeedback = sanitize.html(feedbackText)
    onComplete({ rating, feedback: sanitizedFeedback, type: "negative" })
    setStep("done")
  }

  const handleRedirect = (platform: string, url?: string) => {
    if (url) {
      const validation = validators.url(url)
      if (!validation.valid) {
        console.error("[v0] Invalid URL:", url)
        onComplete({ rating, feedback: `Attempted redirect to ${platform} (invalid URL)`, type: "positive" })
        setStep("done")
        return
      }
    }

    onComplete({ rating, feedback: `Redirected to ${platform}`, type: "positive" })
    if (url) window.open(url, "_blank", "noopener,noreferrer")
    setStep("done")
  }

  if (step === "done") {
    return (
      <div className="text-center p-12 animate-in zoom-in">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-black text-foreground">Yo, thanks!</h2>
        <p className="text-foreground/60 mt-2 font-medium">Your feedback means everything to us.</p>
      </div>
    )
  }

  const allGoogleLinks = [
    links.google,
    ...(links.googleAdditional || []),
  ].filter(Boolean)

  const allFacebookLinks = [
    links.facebook,
    ...(links.facebookAdditional || []),
  ].filter(Boolean)

  const allYelpLinks = [
    links.yelp,
    ...(links.yelpAdditional || []),
  ].filter(Boolean)

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-border">
      <div className="bg-gradient-to-br from-purple-600 to-red-500 p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <h2 className="text-white text-sm font-bold uppercase tracking-widest relative z-10 mb-2">Rate Us</h2>
        <h1 className="text-white text-3xl font-black relative z-10">{businessName || "Us"}</h1>
      </div>

      <div className="p-10">
        {step === "rate" && (
          <div className="flex flex-col items-center space-y-8">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => handleRate(star)} className="hover:scale-125 transition-transform duration-300">
                  <Star
                    size={44}
                    className={`${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-border"}`}
                  />
                </button>
              ))}
            </div>
            <p className="text-foreground/50 text-sm font-bold uppercase tracking-wider">Tap to rate</p>
          </div>
        )}

        {step === "positive" && (
          <div className="space-y-6 animate-in slide-in-from-right">
            <div className="text-center">
              <h3 className="font-black text-2xl text-foreground">That's fire!</h3>
              <p className="text-foreground/60 mt-2 font-medium">Drop a review wherever:</p>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {allGoogleLinks.map((url, idx) => (
                <button
                  key={`google-${idx}`}
                  onClick={() => handleRedirect(`Google ${idx > 0 ? `(${idx + 1})` : ""}`, url)}
                  className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-border hover:border-blue-500 hover:shadow-lg text-foreground font-bold py-4 rounded-xl flex items-center justify-between px-4 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="G" />
                    <span>Google {idx > 0 ? `(${idx + 1})` : ""}</span>
                  </div>
                  <ArrowRight size={16} className="text-blue-400 group-hover:text-blue-600" />
                </button>
              ))}

              {allFacebookLinks.map((url, idx) => (
                <button
                  key={`facebook-${idx}`}
                  onClick={() => handleRedirect(`Facebook ${idx > 0 ? `(${idx + 1})` : ""}`, url)}
                  className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-border hover:border-blue-600 hover:shadow-lg text-foreground font-bold py-4 rounded-xl flex items-center justify-between px-4 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <Facebook size={20} className="text-blue-600" fill="currentColor" />
                    <span>Facebook {idx > 0 ? `(${idx + 1})` : ""}</span>
                  </div>
                  <ArrowRight size={16} className="text-blue-400 group-hover:text-blue-600" />
                </button>
              ))}

              {allYelpLinks.map((url, idx) => (
                <button
                  key={`yelp-${idx}`}
                  onClick={() => handleRedirect(`Yelp ${idx > 0 ? `(${idx + 1})` : ""}`, url)}
                  className="w-full bg-gradient-to-r from-red-50 to-orange-50 border-2 border-border hover:border-red-500 hover:shadow-lg text-foreground font-bold py-4 rounded-xl flex items-center justify-between px-4 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-black text-red-600 text-lg">Y!</span>
                    <span>Yelp {idx > 0 ? `(${idx + 1})` : ""}</span>
                  </div>
                  <ArrowRight size={16} className="text-red-400 group-hover:text-red-600" />
                </button>
              ))}

              {allGoogleLinks.length === 0 && allFacebookLinks.length === 0 && allYelpLinks.length === 0 && (
                <p className="text-red-500 text-center text-sm font-bold">No review links configured!</p>
              )}
            </div>
          </div>
        )}

        {step === "negative" && (
          <div className="space-y-4 animate-in slide-in-from-right">
            <h3 className="font-black text-xl text-foreground text-center">We'd love to fix it</h3>
            <p className="text-sm text-foreground/70 text-center font-medium">
              {links.negativeLink
                ? "Help us improve by sharing your thoughts."
                : "Tell us what happened so we can do better."}
            </p>
            {links.negativeLink ? (
              <button
                onClick={handleNegativeRedirect}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-lg transition-all"
              >
                Share Your Feedback
              </button>
            ) : (
              <>
                <div>
                  <textarea
                    className={`w-full p-4 bg-background border-2 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-colors font-medium ${
                      error ? "border-red-400" : "border-border"
                    }`}
                    rows={4}
                    placeholder="What could we do better? (be real with us)"
                    value={feedbackText}
                    onChange={(e) => {
                      setFeedbackText(e.target.value)
                      if (error) setError("")
                    }}
                    maxLength={1000}
                  />
                  <div className="flex justify-between items-center mt-2">
                    {error ? (
                      <p className="text-xs text-red-600 font-bold">{error}</p>
                    ) : (
                      <p className="text-xs text-foreground/50 font-medium">{feedbackText.length}/1000</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={submitNegative}
                  disabled={!feedbackText.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-red-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Send It
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
