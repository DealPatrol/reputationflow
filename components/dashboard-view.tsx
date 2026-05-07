"use client"

import { useState } from "react"
import { MessageSquare, TrendingUp, ShieldAlert, Star, Lock, Send, AlertTriangle, Users, Sparkles } from "lucide-react"
import { EmptyState } from "./ui/empty-state"
import { AIResponseModal } from "./ai-response-modal"

export const DashboardView = ({ feedbacks, isPremium, businessName, links, setActiveTab }: any) => {
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
  const [showAIModal, setShowAIModal] = useState(false)

  const total = feedbacks.length
  const positive = feedbacks.filter((f: any) => f.type === "positive").length
  const prevented = feedbacks.filter((f: any) => f.type === "negative").length

  const handleGenerateAIResponse = (feedback: any) => {
    if (!isPremium) {
      setActiveTab("billing")
      return
    }
    setSelectedFeedback(feedback)
    setShowAIModal(true)
  }

  const handleSaveResponse = (response: string) => {
    console.log("[v0] Saved AI response:", response)
    // In production, save to database
  }

  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-500">
        {!links?.google && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-start sm:items-center space-x-3 text-amber-800">
              <AlertTriangle size={20} className="flex-shrink-0 mt-0.5 sm:mt-0" />
              <span className="font-medium text-sm sm:text-base">Setup incomplete: Please add your review links.</span>
            </div>
            <button
              onClick={() => setActiveTab("settings")}
              className="text-sm font-bold text-amber-700 underline hover:text-amber-800 transition-colors whitespace-nowrap"
            >
              Go to Settings
            </button>
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Command Center</h1>
          <p className="text-slate-500">Real-time reputation monitoring.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Feedback" value={total} icon={<MessageSquare size={18} />} color="indigo" />
          <StatCard
            label="NPS Score"
            value={total > 0 ? Math.round((positive / total) * 100) : 0}
            icon={<TrendingUp size={18} />}
            color="emerald"
            suffix="%"
          />
          <StatCard label="Intercepted" value={prevented} icon={<ShieldAlert size={18} />} color="rose" />
          <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-xl text-white shadow-lg">
            <div className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">Quick Action</div>
            <button
              onClick={() => setActiveTab("campaigns")}
              className="w-full bg-white/10 hover:bg-white/20 p-2.5 rounded-lg text-sm font-bold flex items-center justify-center space-x-2 transition-colors"
            >
              <Send size={14} />
              <span>Send Request</span>
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
                title="No feedback yet"
                description="Start collecting reviews by sending your first campaign or sharing your feedback link with customers."
                action={{
                  label: "Send First Request",
                  onClick: () => setActiveTab("campaigns"),
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

const StatCard = ({ label, value, icon, color, suffix }: any) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className={`flex items-center space-x-2 mb-2 text-${color}-600`}>
      {icon}
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span>
    </div>
    <div className="text-2xl sm:text-3xl font-bold text-slate-900">
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
          className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap flex-shrink-0 flex items-center gap-1 hover:bg-indigo-100"
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
