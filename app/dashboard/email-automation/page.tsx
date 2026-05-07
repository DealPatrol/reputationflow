"use client"

import { Mail, Send, Settings, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function EmailAutomationPage() {
  const [emailTemplate, setEmailTemplate] = useState("default")
  const [sendTime, setSendTime] = useState("24h")
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black">Email Automation</h1>
          <Link href="/dashboard" className="text-foreground/60 hover:text-foreground font-semibold">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2">
            {/* Master Toggle */}
            <div className="bg-white rounded-2xl border-2 border-border p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black mb-2">Auto Send Review Requests</h2>
                  <p className="text-foreground/60 font-medium">
                    Automatically send review requests after purchases
                  </p>
                </div>
                <button
                  onClick={() => setEnabled(!enabled)}
                  className={`relative w-14 h-8 rounded-full transition-all ${
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

              {enabled && (
                <div className="flex items-center space-x-2 text-green-600 font-semibold text-sm">
                  <CheckCircle size={16} />
                  <span>Active - Sending 3,241 emails/month</span>
                </div>
              )}
            </div>

            {/* Timing */}
            <div className="bg-white rounded-2xl border-2 border-border p-8 mb-8">
              <h3 className="text-xl font-black mb-6">When to Send</h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-bold text-foreground/60 mb-2 block">Hours after purchase</span>
                  <select
                    value={sendTime}
                    onChange={(e) => setSendTime(e.target.value)}
                    className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-semibold"
                  >
                    <option value="1h">1 hour</option>
                    <option value="6h">6 hours (Best - 62% open rate)</option>
                    <option value="24h">24 hours</option>
                    <option value="48h">48 hours</option>
                  </select>
                  <p className="text-xs text-foreground/50 mt-2">6 hours has the highest open rate</p>
                </label>
              </div>
            </div>

            {/* Template Selection */}
            <div className="bg-white rounded-2xl border-2 border-border p-8 mb-8">
              <h3 className="text-xl font-black mb-6">Email Template</h3>
              <div className="space-y-3">
                {[
                  {
                    id: "default",
                    name: "Professional",
                    preview: "We'd love your feedback! Share your experience.",
                  },
                  {
                    id: "casual",
                    name: "Casual & Friendly",
                    preview: "Quick question - how did we do? Let us know!",
                  },
                  {
                    id: "urgent",
                    name: "Time-Sensitive",
                    preview: "Your feedback matters! Help us improve (only takes 30 secs)",
                  },
                  {
                    id: "incentive",
                    name: "With Incentive Offer",
                    preview: "Share your review = 10% off your next order",
                  },
                ].map((template) => (
                  <label key={template.id} className="flex items-start space-x-3 p-4 rounded-lg border-2 border-border hover:bg-slate-50 cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="template"
                      value={template.id}
                      checked={emailTemplate === template.id}
                      onChange={(e) => setEmailTemplate(e.target.value)}
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

            {/* Email Preview */}
            <div className="bg-slate-50 rounded-2xl border-2 border-border p-8">
              <h3 className="text-lg font-black mb-4">Preview</h3>
              <div className="bg-white rounded-lg p-6 font-sans text-sm">
                <p className="text-foreground/60 mb-4">Hi Sarah,</p>
                <p className="text-foreground mb-4">
                  We'd love to hear what you think about your recent purchase. Your feedback helps us create better
                  products and services.
                </p>
                <p className="text-foreground mb-6">
                  Share your honest review - it takes just 2 minutes and means the world to us.
                </p>
                <div className="mb-6">
                  <a
                    href="#"
                    className="inline-block bg-gradient-to-r from-purple-600 to-red-500 text-white px-6 py-3 rounded-lg font-bold"
                  >
                    Share Your Review
                  </a>
                </div>
                <p className="text-foreground/50 text-xs">Questions? Reply to this email or contact us anytime.</p>
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Performance Card */}
            <div className="bg-gradient-to-br from-purple-50 to-red-50 rounded-2xl border-2 border-purple-200 p-6">
              <h3 className="text-lg font-black mb-4">This Month</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60 font-semibold mb-1">Emails Sent</p>
                  <p className="text-3xl font-black text-purple-600">3,241</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 font-semibold mb-1">Open Rate</p>
                  <p className="text-3xl font-black text-green-600">62%</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 font-semibold mb-1">Click Rate</p>
                  <p className="text-3xl font-black text-blue-600">18%</p>
                </div>
              </div>
            </div>

            {/* Revenue Impact */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-6">
              <h3 className="text-lg font-black mb-4">Revenue Impact</h3>
              <div>
                <p className="text-sm text-foreground/60 font-semibold mb-2">Reviews Generated</p>
                <p className="text-2xl font-black text-green-600 mb-4">584</p>
                <p className="text-sm text-foreground/60 font-semibold mb-2">Est. Revenue</p>
                <p className="text-3xl font-black text-green-600">$43,800</p>
                <p className="text-xs text-foreground/50 mt-2">@ $75 avg order value × 5% conversion</p>
              </div>
            </div>

            {/* Best Practices */}
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
