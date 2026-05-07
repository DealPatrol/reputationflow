"use client"

import { useState } from "react"
import { X, Sparkles, Copy, Check, Loader2 } from "lucide-react"

interface AIResponseModalProps {
  isOpen: boolean
  onClose: () => void
  feedback: any
  businessName: string
  onSave?: (response: string) => void
}

export function AIResponseModal({ isOpen, onClose, feedback, businessName, onSave }: AIResponseModalProps) {
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [edited, setEdited] = useState(false)

  if (!isOpen) return null

  const generateResponse = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/ai/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedback: feedback.feedback,
          rating: feedback.rating,
          businessName,
        }),
      })

      if (!res.ok) throw new Error("Failed to generate response")

      const data = await res.json()
      setResponse(data.response)
      setEdited(false)
    } catch (error) {
      console.error("[v0] Failed to generate response:", error)
      alert("Failed to generate response. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    if (onSave) onSave(response)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={20} className="text-indigo-200" />
                <h2 className="text-xl font-bold">AI Response Generator</h2>
              </div>
              <p className="text-indigo-100 text-sm">
                Generate a professional response to customer feedback in seconds
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(90vh-240px)] overflow-y-auto">
          {/* Original Feedback */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
              Customer Feedback
            </label>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-slate-900">{feedback.rating} Stars</span>
                <span className="text-xs text-slate-400">
                  {feedback.type === "positive" ? "Positive" : "Needs Attention"}
                </span>
              </div>
              <p className="text-slate-700 text-sm">{feedback.feedback}</p>
            </div>
          </div>

          {/* Generated Response */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
              AI-Generated Response
            </label>
            {!response && !loading ? (
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-12 text-center">
                <Sparkles size={48} className="mx-auto mb-4 text-slate-300" />
                <p className="text-slate-500 mb-4">Click generate to create a professional response</p>
                <button
                  onClick={generateResponse}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 mx-auto"
                >
                  <Sparkles size={16} />
                  Generate Response
                </button>
              </div>
            ) : loading ? (
              <div className="border border-slate-200 rounded-lg p-12 text-center">
                <Loader2 size={48} className="mx-auto mb-4 text-indigo-600 animate-spin" />
                <p className="text-slate-500">Crafting the perfect response...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={response}
                  onChange={(e) => {
                    setResponse(e.target.value)
                    setEdited(true)
                  }}
                  className="w-full p-4 border border-slate-200 rounded-lg text-slate-700 text-sm min-h-[150px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="Your response will appear here..."
                />
                {edited && (
                  <p className="text-xs text-amber-600 flex items-center gap-1">
                    <span>✏️</span> Response has been edited
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        {response && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
            <button
              onClick={generateResponse}
              disabled={loading}
              className="flex-1 bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700 px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Regenerate
            </button>
            <button
              onClick={copyToClipboard}
              className="flex-1 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-bold transition-colors"
            >
              Save Response
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
