"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Download, Link2, Mail, Share2 } from "lucide-react"
import { Input } from "./ui/input"
import type { ToastType } from "@/lib/use-toast"
import { reviewPageUrl } from "@/lib/site"

interface CampaignsViewProps {
  isPremium: boolean
  businessId: string | number
  showToast?: (message: string, type: ToastType) => void
  businessName?: string
  setActiveTab?: (tab: string) => void
}

interface Campaign {
  id: string | number
  customer_name: string
  contact: string
  status: string
  created_at?: string
}

export const CampaignsView = ({ isPremium, businessId, showToast, businessName, setActiveTab }: CampaignsViewProps) => {
  const [copied, setCopied] = useState(false)
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [sending, setSending] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [sampleData, setSampleData] = useState(false)
  const reviewLink = reviewPageUrl(businessId)

  useEffect(() => {
    fetch("/api/campaigns/list")
      .then((response) => response.json())
      .then((data) => {
        setCampaigns(data.campaigns || [])
        setSampleData(Boolean(data.sampleData))
      })
      .catch(() => {
        showToast?.("Could not load review requests", "error")
      })
  }, [showToast])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewLink)
    setCopied(true)
    showToast?.("Review link copied", "success")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Leave a review for ${businessName || "us"}`,
          url: reviewLink,
        })
      } catch {
        handleCopyLink()
      }
      return
    }
    handleCopyLink()
  }

  const handleSend = async (event: FormEvent) => {
    event.preventDefault()
    setSending(true)
    try {
      const response = await fetch("/api/email/send-review-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerEmail, customerName }),
      })
      const data = await response.json()
      if (!response.ok) {
        showToast?.(data.error || "Could not send the request", "error")
        return
      }
      setCustomerEmail("")
      setCustomerName("")
      setCampaigns((current) => [data.campaign, ...current].filter(Boolean))
      showToast?.("Review request sent", "success")
    } catch {
      showToast?.("Could not send the request", "error")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Review requests</h1>
        <p className="text-slate-500">Share one link, or email it to a customer on the Professional plan.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <label htmlFor="review-link" className="text-sm font-semibold text-slate-700">Your review link</label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <Input id="review-link" value={reviewLink} readOnly className="font-mono text-sm" />
          <button type="button" onClick={handleCopyLink} className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
            <Link2 size={16} />
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={handleShareLink} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold">
            <Share2 size={16} />
            Share
          </button>
          <button type="button" onClick={() => setActiveTab?.("links")} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold">
            <Download size={16} />
            Get QR code
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Email a customer</h2>
        <p className="mt-1 text-sm text-slate-500">
          Sends one message with your review page. Requests are not sent automatically after a purchase.
        </p>
        {!isPremium ? (
          <button type="button" onClick={() => setActiveTab?.("billing")} className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Upgrade to send email requests
          </button>
        ) : (
          <form onSubmit={handleSend} className="mt-4 space-y-3">
            <input
              type="email"
              required
              value={customerEmail}
              onChange={(event) => setCustomerEmail(event.target.value)}
              placeholder="Customer email"
              aria-label="Customer email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
            <input
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Customer name (optional)"
              aria-label="Customer name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
            <button type="submit" disabled={sending} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              <Mail size={16} />
              {sending ? "Sending..." : "Send review request"}
            </button>
          </form>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Sent requests</h2>
          {sampleData && <p className="mt-1 text-xs text-amber-700">Sample rows from demo mode.</p>}
        </div>
        {campaigns.length === 0 ? (
          <p className="px-5 py-8 text-sm text-slate-500">No email requests yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {campaigns.map((campaign) => (
              <li key={campaign.id} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{campaign.customer_name}</p>
                  <p className="text-sm text-slate-500">{campaign.contact}</p>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{campaign.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
