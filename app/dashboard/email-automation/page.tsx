"use client"

import { Mail, Settings, CheckCircle, Loader2, Lock, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function EmailAutomationPage() {
  const [emailTemplate, setEmailTemplate] = useState("default")
  const [sendTime, setSendTime] = useState("6h")
  const [enabled, setEnabled] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [campaignCount, setCampaignCount] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  // Manual send form
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ success?: boolean; error?: string } | null>(null)

  useEffect(() => {
    // Load settings and premium status
    Promise.all([
      fetch("/api/settings/email-automation").then((r) => r.json()),
      fetch("/api/auth/me").then((r) => r.json()),
    ])
      .then(([settingsData, userData]) => {
        if (settingsData.settings) {
          setEnabled(settingsData.settings.enabled ?? false)
        }
        if (settingsData.stats) {
          setCampaignCount(settingsData.stats.campaign_count ?? 0)
        }
        if (userData.business) {
          setIsPremium(userData.business.is_premium || userData.business.plan_type === "pro")
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleToggle = async () => {
    if (!isPremium) return
    const newEnabled = !enabled
    setEnabled(newEnabled)
    setSaving(true)
    try {
      await fetch("/api/settings/email-automation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: newEnabled, send_timing: sendTime, template: emailTemplate }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setSendResult(null)
    try {
      const res = await fetch("/api/email/send-review-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerEmail, customerName }),
      })
      const data = await res.json()
      if (res.ok) {
        setSendResult({ success: true })
        setCustomerEmail("")
        setCustomerName("")
        setCampaignCount((c) => c + 1)
      } else {
        setSendResult({ error: data.error || "Failed to send" })
      }
    } catch {
      setSendResult({ error: "Network error — please try again" })
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black">Email Automation</h1>
          <Link href="/dashboard" className="text-foreground/60 hover:text-foreground font-semibold">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isPremium && (
          <div className="mb-8 bg-gradient-to-r from-purple-50 to-red-50 border-2 border-purple-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Lock size={24} className="text-purple-600 flex-shrink-0" />
              <div>
                <p className="font-black text-lg">Pro Feature</p>
                <p className="text-foreground/60 text-sm">Email automation and manual review requests require a Pro plan.</p>
              </div>
            </div>
            <Link
              href="/dashboard/billing"
              className="bg-gradient-to-r from-purple-600 to-red-500 text-white px-6 py-3 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              Upgrade to Pro <ExternalLink size={14} />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Manual Send */}
            <div className="bg-white rounded-2xl border-2 border-border p-8">
              <h2 className="text-2xl font-black mb-2">Send Review Request</h2>
              <p className="text-foreground/60 font-medium mb-6">
                Send a personalized review request email to a customer right now.
              </p>
              {!isPremium ? (
                <div className="opacity-50 pointer-events-none">
                  <div className="space-y-4">
                    <input disabled placeholder="Customer email" className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-semibold" />
                    <input disabled placeholder="Customer name (optional)" className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-semibold" />
                    <button disabled className="w-full bg-gradient-to-r from-purple-600 to-red-500 text-white px-6 py-3 rounded-xl font-bold opacity-50">
                      Send Review Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendRequest} className="space-y-4">
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Customer email *"
                    className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-semibold focus:outline-none focus:border-purple-400"
                  />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Customer name (optional)"
                    className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-semibold focus:outline-none focus:border-purple-400"
                  />
                  {sendResult && (
                    <div className={`p-3 rounded-lg text-sm font-semibold ${sendResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      {sendResult.success ? "✓ Review request sent successfully!" : `✗ ${sendResult.error}`}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-gradient-to-r from-purple-600 to-red-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {sending ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
                    {sending ? "Sending..." : "Send Review Request"}
                  </button>
                </form>
              )}
            </div>

            {/* Auto Send Toggle */}
            <div className="bg-white rounded-2xl border-2 border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black mb-2">Auto Send Review Requests</h2>
                  <p className="text-foreground/60 font-medium">
                    Automatically follow up with customers after purchases
                  </p>
                </div>
                <button
                  onClick={handleToggle}
                  disabled={!isPremium || saving}
                  className={`relative w-14 h-8 rounded-full transition-all ${
                    !isPremium ? "opacity-40 cursor-not-allowed bg-border" :
                    enabled ? "bg-gradient-to-r from-purple-600 to-red-500" : "bg-border"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all ${
                      enabled ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>

              {saved && (
                <div className="flex items-center space-x-2 text-green-600 font-semibold text-sm mb-4">
                  <CheckCircle size={16} />
                  <span>Settings saved</span>
                </div>
              )}

              {isPremium && enabled && (
                <div className="flex items-center space-x-2 text-green-600 font-semibold text-sm">
                  <CheckCircle size={16} />
                  <span>Active — follow-up emails will be sent automatically</span>
                </div>
              )}
            </div>

            {/* Timing */}
            <div className={`bg-white rounded-2xl border-2 border-border p-8 ${!isPremium ? "opacity-50 pointer-events-none" : ""}`}>
              <h3 className="text-xl font-black mb-6">When to Send</h3>
              <label className="block">
                <span className="text-sm font-bold text-foreground/60 mb-2 block">Hours after purchase</span>
                <select
                  value={sendTime}
                  onChange={(e) => setSendTime(e.target.value)}
                  disabled={!isPremium}
                  className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-semibold"
                >
                  <option value="1h">1 hour</option>
                  <option value="6h">6 hours (Best — highest open rate)</option>
                  <option value="24h">24 hours</option>
                  <option value="48h">48 hours</option>
                </select>
                <p className="text-xs text-foreground/50 mt-2">6 hours typically has the highest open rate</p>
              </label>
            </div>

            {/* Template Selection */}
            <div className={`bg-white rounded-2xl border-2 border-border p-8 ${!isPremium ? "opacity-50 pointer-events-none" : ""}`}>
              <h3 className="text-xl font-black mb-6">Email Template</h3>
              <div className="space-y-3">
                {[
                  { id: "default", name: "Professional", preview: "We'd love your feedback! Share your experience." },
                  { id: "casual", name: "Casual & Friendly", preview: "Quick question — how did we do? Let us know!" },
                  { id: "urgent", name: "Time-Sensitive", preview: "Your feedback matters! Help us improve (only takes 30 secs)" },
                  { id: "incentive", name: "With Incentive Offer", preview: "Share your review = 10% off your next order" },
                ].map((template) => (
                  <label key={template.id} className="flex items-start space-x-3 p-4 rounded-lg border-2 border-border hover:bg-slate-50 cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="template"
                      value={template.id}
                      checked={emailTemplate === template.id}
                      onChange={(e) => setEmailTemplate(e.target.value)}
                      disabled={!isPremium}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-foreground">{template.name}</p>
                      <p className="text-sm text-foreground/60">{template.preview}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-red-50 rounded-2xl border-2 border-purple-200 p-6">
              <h3 className="text-lg font-black mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60 font-semibold mb-1">Requests Sent</p>
                  <p className="text-3xl font-black text-purple-600">{campaignCount}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 font-semibold mb-1">Status</p>
                  <p className={`text-lg font-black ${isPremium ? "text-green-600" : "text-slate-400"}`}>
                    {isPremium ? (enabled ? "Active" : "Ready") : "Upgrade Required"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-border p-6">
              <h3 className="text-lg font-black mb-4 flex items-center space-x-2">
                <Settings size={20} />
                <span>Best Practices</span>
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70">Send 6 hours after purchase</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70">Use casual, friendly tone</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70">Include direct review link</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70">Personalize with customer name</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
