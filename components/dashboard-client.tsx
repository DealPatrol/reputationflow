"use client"

import { useState, useEffect } from "react"
import { LogOut, QrCode } from "lucide-react"
import { BillingView } from "@/components/billing-view"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { DashboardView } from "@/components/dashboard-view"
import { CampaignsView } from "@/components/campaigns-view"
import { WidgetBuilderView } from "@/components/widget-builder-view"
import { SettingsView } from "@/components/settings-view"
import { FeedbackFlow } from "@/components/feedback-flow"
import { ErrorBoundary } from "@/components/error-boundary"
import { ToastContainer } from "@/lib/toast-container"
import { useToast } from "@/lib/use-toast"
import { DashboardSkeleton } from "@/components/ui/skeleton"
import { AnalyticsView } from "@/components/analytics-view"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { ReviewMonitoringView } from "@/components/review-monitoring-view"
import { OnboardingTour } from "@/components/onboarding-tour"

interface DashboardClientProps {
  business: any
  user: any
}

export default function DashboardClient({ business: initialBusiness, user }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [feedbacks, setFeedbacks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const { toasts, showToast, dismissToast } = useToast()

  const [settings, setSettings] = useState({
    businessName: initialBusiness.business_name || "My Business",
    googleLink: initialBusiness.google_link || "",
    facebookLink: initialBusiness.facebook_link || "",
    yelpLink: initialBusiness.yelp_link || "",
    isPremium: initialBusiness.plan_type === "pro" && initialBusiness.subscription_status === "active",
  })

  useEffect(() => {
    // Check if this is a new user
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
    if (!hasSeenOnboarding) {
      setTimeout(() => setShowOnboarding(true), 1000)
    }

    fetch(`/api/feedback?businessId=${initialBusiness.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data.feedbacks || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Failed to fetch feedback:", err)
        showToast("Failed to load feedback", "error")
        setLoading(false)
      })
  }, [initialBusiness.id])

  const handleSaveSettings = async () => {
    try {
      const res = await fetch("/api/business/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: initialBusiness.id,
          business_name: settings.businessName,
          google_link: settings.googleLink,
          facebook_link: settings.facebookLink,
          yelp_link: settings.yelpLink,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to save")
      }

      setSaved(true)
      showToast("Settings saved successfully", "success")
      setTimeout(() => setSaved(false), 2000)
    } catch (e: any) {
      console.error("[v0] Failed to save settings:", e)
      showToast(e.message || "Failed to save settings", "error")
    }
  }

  const handleSimulatedSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/feedback/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: initialBusiness.id,
          rating: data.rating,
          feedback_text: data.feedback,
          type: data.type,
        }),
      })

      if (!res.ok) throw new Error("Failed to save feedback")

      const newFeedback = await res.json()
      setFeedbacks([newFeedback, ...feedbacks])
      showToast("Feedback recorded successfully", "success")
      setTimeout(() => setActiveTab("dashboard"), 2000)
    } catch (e) {
      console.error("[v0] Failed to save feedback:", e)
      showToast("Failed to save feedback", "error")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isPremium={settings.isPremium} />
        <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
          <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} isPremium={settings.isPremium} />
          <main className="flex-1 p-8 overflow-y-auto">
            <DashboardSkeleton />
          </main>
        </div>
      </div>
    )
  }

  if (activeTab === "preview") {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col relative">
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md z-20">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">PREVIEW</div>
          </div>
          <button
            onClick={() => setActiveTab("dashboard")}
            className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <LogOut size={16} />
            <span>Exit</span>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 bg-slate-200">
          <div className="w-full max-w-[400px]">
            <div className="border-[8px] border-slate-900 rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl">
              <div className="bg-white min-h-[700px] relative pt-8">
                <div className="absolute top-0 w-full h-7 bg-slate-900 z-10 rounded-b-xl opacity-90 mx-auto w-1/2 left-0 right-0"></div>
                <FeedbackFlow
                  businessName={settings.businessName}
                  links={{
                    google: settings.googleLink,
                    facebook: settings.facebookLink,
                    yelp: settings.yelpLink,
                  }}
                  onComplete={handleSimulatedSubmit}
                />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      {showOnboarding && <OnboardingTour onComplete={() => setShowOnboarding(false)} />}

      <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isPremium={settings.isPremium} />
        <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
          <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} isPremium={settings.isPremium} />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {activeTab === "dashboard" && (
              <DashboardView
                feedbacks={feedbacks}
                isPremium={settings.isPremium}
                businessName={settings.businessName}
                links={{ google: settings.googleLink }}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === "analytics" && (
              <AnalyticsView feedbacks={feedbacks} isPremium={settings.isPremium} businessId={initialBusiness.id} />
            )}
            {activeTab === "monitoring" && (
              <ReviewMonitoringView
                isPremium={settings.isPremium}
                googleLink={settings.googleLink}
                facebookLink={settings.facebookLink}
                yelpLink={settings.yelpLink}
              />
            )}
            {activeTab === "settings" && (
              <SettingsView settings={settings} setSettings={setSettings} onSave={handleSaveSettings} saved={saved} />
            )}
            {activeTab === "campaigns" && (
              <CampaignsView
                isPremium={settings.isPremium}
                businessId={initialBusiness.id}
                showToast={showToast}
                businessName={settings.businessName}
              />
            )}
            {activeTab === "widgets" && (
              <WidgetBuilderView businessName={settings.businessName} isPremium={settings.isPremium} />
            )}
            {activeTab === "links" && (
              <div className="max-w-2xl animate-in fade-in duration-500">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-slate-900">Collection Links</h1>
                  <p className="text-slate-500">Share your feedback link or QR code with customers</p>
                </div>

                <QRCodeGenerator
                  url={`${process.env.NEXT_PUBLIC_APP_URL || "https://reputationflow.app"}/review/${initialBusiness.id}`}
                  businessName={settings.businessName}
                />

                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
                  >
                    <QrCode size={20} />
                    Open Live Preview
                  </button>
                </div>
              </div>
            )}
            {activeTab === "billing" && (
              <BillingView
                isPremium={settings.isPremium}
                subscriptionStatus={initialBusiness.subscription_status}
                showToast={showToast}
              />
            )}
          </main>
        </div>
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    </ErrorBoundary>
  )
}
