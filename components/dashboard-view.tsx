"use client"

import { useState, type ReactNode } from "react"
import { MessageSquare, TrendingUp, ShieldAlert, Star, Lock, Send, AlertTriangle, Users, Sparkles, Link2, Copy, CheckCircle2 } from "lucide-react"
import { EmptyState } from "./ui/empty-state"
import { AIResponseModal } from "./ai-response-modal"
import { ReplyHelper } from "@/components/dashboard/reply-helper"
import { ReviewGoalTracker } from "@/components/dashboard/review-goal-tracker"
import { ReviewRequestComposer } from "@/components/tools/review-request-composer"
import { reviewPageUrl } from "@/lib/site"

export const DashboardView = ({ feedbacks, isPremium, businessName, businessId, links, setActiveTab }: any) => {
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
  const [showAIModal, setShowAIModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const reviewLink = businessId ? reviewPageUrl(businessId) : ""

  const handleCopyLink = () => {
    if (reviewLink) {
      navigator.clipboard.writeText(reviewLink).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  const total = feedbacks.length
  const lowRatings = feedbacks.filter((f: any) => Number(f.rating) <= 3).length
  const average = total > 0
    ? (feedbacks.reduce((sum: number, item: any) => sum + Number(item.rating || 0), 0) / total).toFixed(1)
    : "—"

  const handleGenerateAIResponse = (feedback: any) => {
    if (!isPremium) {
      setActiveTab("billing")
      return
    }
    setSelectedFeedback(feedback)
    setShowAIModal(true)
  }

  const handleSaveResponse = async (response: string) => {
    const res = await fetch("/api/feedback/response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedbackId: selectedFeedback?.id, response }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || "Could not save the draft")
    }
  }

  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-500">
        {!links?.google && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-start sm:items-center space-x-3 text-amber-800">
              <AlertTriangle size={20} className="flex-shrink-0 mt-0.5 sm:mt-0" />
              <span className="font-medium text-sm sm:text-base">Add at least one public review link so customers can open Google, Facebook, or Yelp.</span>
            </div>
            <button
              onClick={() => setActiveTab("settings")}
              className="text-sm font-bold text-amber-700 underline hover:text-amber-800 transition-colors whitespace-nowrap"
            >
              Go to Settings →
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
            <p className="text-slate-500">Feedback submitted through your review page.</p>
          </div>
        </div>

        {reviewLink && (
          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
                <Link2 size={18} className="text-indigo-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-0.5">Your Review Link</p>
                <p className="text-sm text-slate-700 font-mono truncate">{reviewLink}</p>
              </div>
            </div>
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all flex-shrink-0 ${
                copied
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <ReviewGoalTracker businessId={businessId || "local"} />
          <ReplyHelper businessName={businessName || ""} />
        </div>

        <ReviewRequestComposer
          heading="Text or email to copy"
          initialBusinessName={businessName || ""}
          initialReviewLink={reviewLink}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Feedback" value={total} icon={<MessageSquare size={18} />} />
          <StatCard label="Average rating" value={average} icon={<TrendingUp size={18} />} />
          <StatCard label="Ratings of 3 or less" value={lowRatings} icon={<ShieldAlert size={18} />} />
          <div className="col-span-2 lg:col-span-1 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Next step</p>
            <button
              onClick={() => setActiveTab("campaigns")}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-800 px-3 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Send size={14} />
              Review requests
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Recent Feedback</h3>
            {!isPremium && feedbacks.length > 0 && (
              <span className="text-[10px] font-bold bg-slate-200 text-slate-500 px-2 py-1 rounded">
                SHOWING 1 OF {feedbacks.length}
              </span>
            )}
          </div>
          <div className="divide-y divide-slate-100">
            {feedbacks.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No private notes yet"
                description="Share your review link or print a card. Notes a customer types on your page show up here. Reviews they publish on Google stay on Google."
                action={{
                  label: "Open your link and QR code",
                  onClick: () => setActiveTab("links"),
                }}
              />
            ) : (
              <>
                {feedbacks.slice(0, isPremium ? undefined : 1).map((f: any) => (
                  <FeedbackItem
                    key={f.id}
                    item={f}
                    isPremium={isPremium}
                    onUnlock={() => setActiveTab("billing")}
                    onGenerateResponse={handleGenerateAIResponse}
                  />
                ))}
                {!isPremium && feedbacks.length > 1 && (
                  <div
                    className="p-4 text-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => setActiveTab("billing")}
                  >
                    <span className="text-sm font-bold text-indigo-600 flex items-center justify-center gap-2">
                      <Lock size={14} /> Unlock {feedbacks.length - 1} more{" "}
                      {feedbacks.length === 2 ? "response" : "responses"}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {showAIModal && selectedFeedback && (
        <AIResponseModal
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          feedback={selectedFeedback}
          businessName={businessName}
          onSave={handleSaveResponse}
        />
      )}
    </>
  )
}

const StatCard = ({ label, value, icon, suffix }: { label: string; value: string | number; icon: ReactNode; suffix?: string }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
    <div className="mb-2 flex items-center gap-2 text-indigo-800">
      {icon}
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
    </div>
    <div className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
      {value}
      {suffix}
    </div>
  </div>
)

const FeedbackItem = ({ item, isPremium, onUnlock, onGenerateResponse }: any) => (
  <div className="p-4 sm:p-6 hover:bg-slate-50 transition-colors group">
    <div className="flex items-start justify-between gap-4">
      <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
        <div
          className={`mt-1 p-2 rounded-lg flex-shrink-0 ${
            item.type === "positive" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
          }`}
        >
          {item.type === "positive" ? <Star size={16} fill="currentColor" /> : <ShieldAlert size={16} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-slate-900">{item.rating} Stars</span>
            <span className="text-xs text-slate-400">
              {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleDateString() : "Just now"}
            </span>
          </div>
          <p className="text-slate-600 text-sm break-words">{item.feedback}</p>
        </div>
      </div>
      {isPremium ? (
        <button
          onClick={() => onGenerateResponse(item)}
          className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-800 hover:bg-indigo-100"
        >
          <Sparkles size={12} />
          Reply with AI
        </button>
      ) : (
        <button
          onClick={onUnlock}
          className="text-xs bg-slate-100 text-slate-400 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 whitespace-nowrap flex-shrink-0"
        >
          <Lock size={12} /> AI Locked
        </button>
      )}
    </div>
  </div>
)
