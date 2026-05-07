"use client"

import { Mail, MessageSquare, Share2, QrCode, TrendingUp, Copy, Download } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const shareLink = "https://reputationflow.app/review/your-business-123"

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black">Settings</h1>
          <Link href="/dashboard" className="text-foreground/60 hover:text-foreground font-semibold">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl border-2 border-border p-6">
              <h3 className="text-sm font-black text-foreground/60 mb-4 uppercase tracking-wider">SETTINGS</h3>
              <nav className="space-y-2">
                {[
                  { href: "#business", label: "Business Info", icon: "📋" },
                  { href: "#review-links", label: "Review Links", icon: "🔗" },
                  { href: "#automation", label: "Automation", icon: "⚙️" },
                  { href: "#billing", label: "Billing", icon: "💳" },
                  { href: "#team", label: "Team", icon: "👥" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 rounded-lg font-semibold text-foreground/60 hover:bg-slate-100 hover:text-foreground transition-all"
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Business Info */}
            <section id="business" className="bg-white rounded-2xl border-2 border-border p-8">
              <h2 className="text-2xl font-black mb-6">Business Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-foreground mb-2">Business Name</label>
                  <input
                    type="text"
                    defaultValue="Your Business Name"
                    className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-foreground mb-2">Website</label>
                  <input
                    type="url"
                    defaultValue="https://yourbusiness.com"
                    className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-foreground mb-2">Industry</label>
                  <select className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-medium">
                    <option>Select industry...</option>
                    <option>Retail</option>
                    <option>Restaurant</option>
                    <option>Services</option>
                    <option>Healthcare</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Review Links */}
            <section id="review-links" className="bg-white rounded-2xl border-2 border-border p-8">
              <h2 className="text-2xl font-black mb-6">Review Platform Links</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-foreground mb-2 flex items-center space-x-2">
                    <span>🔍</span>
                    <span>Google Business Link</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://g.page/your-business"
                    className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-foreground mb-2 flex items-center space-x-2">
                    <span>f</span>
                    <span>Facebook Page Link</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/your-page"
                    className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-foreground mb-2 flex items-center space-x-2">
                    <span>⭐</span>
                    <span>Yelp Link</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://yelp.com/biz/your-business"
                    className="w-full bg-slate-100 border-2 border-border rounded-xl px-4 py-3 font-medium"
                  />
                </div>
              </div>
            </section>

            {/* Your Review Link */}
            <section className="bg-gradient-to-br from-purple-50 to-red-50 rounded-2xl border-2 border-purple-200 p-8">
              <h2 className="text-2xl font-black mb-4">Your Review Collection Link</h2>
              <p className="text-foreground/60 font-medium mb-6">
                Share this link with your customers. They'll see your review options and can choose where to leave feedback.
              </p>
              <div className="flex items-center space-x-2 bg-white rounded-lg p-4 border-2 border-purple-200 mb-4">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-transparent outline-none font-mono text-sm"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-bold transition-colors"
                >
                  <Copy size={18} />
                  <span>Copy</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border-2 border-purple-200 hover:bg-white transition-all">
                  <QrCode size={24} className="text-purple-600" />
                  <span className="font-bold text-sm">QR Code</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border-2 border-purple-200 hover:bg-white transition-all">
                  <Mail size={24} className="text-purple-600" />
                  <span className="font-bold text-sm">Email</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border-2 border-purple-200 hover:bg-white transition-all">
                  <Share2 size={24} className="text-purple-600" />
                  <span className="font-bold text-sm">Share</span>
                </button>
              </div>
            </section>

            {/* Save Button */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-red-500 hover:shadow-lg shadow-purple-600/30 text-white px-6 py-3 rounded-xl font-bold transition-all">
                Save Changes
              </button>
              <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-foreground px-6 py-3 rounded-xl font-bold transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
