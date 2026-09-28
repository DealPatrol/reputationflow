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
  onComplete: (data: any) => void | Promise<void>
}

export const FeedbackFlow = ({ businessName, links, onComplete }: FeedbackFlowProps) => {
  const [rating, setRating] = useState(0)
  const [step, setStep] = useState("rate")
  const [feedbackText, setFeedbackText] = useState("")
  const [error, setError] = useState("")

  const handleRate = (score: number) => {
    setRating(score)
    setTimeout(() => setStep("share"), 300)
  }

  const finish = async (data: { rating: number; feedback: string; type: string }, openUrl?: string) => {
    setError("")
    try {
      await onComplete(data)
      if (openUrl) window.open(openUrl, "_blank", "noopener,noreferrer")
      setStep("done")
    } catch (submitError) {
      console.error("[v0] Feedback submit failed:", submitError)
      setError("Could not save that response. Please try again.")
    }
  }

  const submitPrivate = () => {
    const validation = validators.feedback(feedbackText)
    if (!validation.valid) {
      setError(validation.error || "")
      return
    }

    const sanitizedFeedback = sanitize.html(feedbackText)
    void finish({ rating, feedback: sanitizedFeedback, type: "private" })
  }

  const handleRedirect = (platform: string, url?: string) => {
    if (url && !validators.url(url).valid) {
      setError("That review link is not a valid URL. Ask the business to update it.")
      return
    }

    void finish({ rating, feedback: `Opened ${platform}`, type: "public" }, url)
  }

  if (step === "done") {
    return (
      <div className="text-center p-12 animate-in zoom-in">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-black text-foreground">Thank you</h2>
        <p className="text-foreground/60 mt-2 font-medium">Your response was recorded.</p>
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
                <button key={star} type="button" onClick={() => handleRate(star)} aria-label={`${star} ${star === 1 ? "star" : "stars"}`} className="hover:scale-125 transition-transform duration-300">
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

        {step === "share" && (
          <div className="space-y-6 animate-in slide-in-from-right">
            <div className="text-center">
              <h3 className="font-black text-2xl text-foreground">Thanks for rating us</h3>
              <p className="text-foreground/60 mt-2 font-medium">
                Share an honest public review, leave private feedback, or do both.
              </p>
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
                <p className="text-foreground/60 text-center text-sm">Public review links have not been configured yet.</p>
              )}
            </div>
            <div className="border-t border-border pt-5 space-y-4">
              <h3 className="font-black text-lg text-foreground text-center">Optional private feedback</h3>
            <p className="text-sm text-foreground/70 text-center font-medium">
              Tell the business what went well or what it could improve. This does not replace the public review buttons above.
            </p>
            {error && <p className="text-xs text-red-600 font-bold text-center" role="alert">{error}</p>}
              <>
                <div>
                  <textarea
                    className={`w-full p-4 bg-background border-2 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-colors font-medium ${
                      error ? "border-red-400" : "border-border"
                    }`}
                    rows={4}
                      placeholder="Optional private feedback"
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
                    onClick={submitPrivate}
                  disabled={!feedbackText.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-red-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Send Private Feedback
                </button>
              </>
            </div>
            <button
              onClick={() => {
                void finish({ rating, feedback: "Rated only", type: "rating" })
              }}
              className="w-full text-sm font-bold text-foreground/60 hover:text-foreground py-2"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
