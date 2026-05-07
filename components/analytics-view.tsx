"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Star, Users, MessageSquare, ShieldAlert, Download, BarChart3 } from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"

interface AnalyticsViewProps {
  feedbacks: any[]
  isPremium: boolean
  businessId?: string | number
}

export const AnalyticsView = ({ feedbacks, isPremium, businessId }: AnalyticsViewProps) => {
  const [period, setPeriod] = useState("30d")
  const [exporting, setExporting] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (businessId) {
      const days = period === "7d" ? 7 : period === "30d" ? 30 : period === "90d" ? 90 : 365
      fetch(`/api/analytics?businessId=${businessId}&days=${days}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setAnalyticsData(data.data)
          }
          setLoading(false)
        })
        .catch((err) => {
          console.error("[v0] Failed to fetch analytics:", err)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [businessId, period])

  // Calculate analytics from data or fallback to feedbacks
  const total = analyticsData?.totalFeedback || feedbacks.length
  const positive = analyticsData?.positiveCount || feedbacks.filter((f) => f.type === "positive").length
  const negative = analyticsData?.negativeCount || feedbacks.filter((f) => f.type === "negative").length
  const avgRating =
    analyticsData?.averageRating || (total > 0 ? feedbacks.reduce((acc, f) => acc + f.rating, 0) / total : 0)
  const npsScore = analyticsData?.npsScore || (total > 0 ? Math.round((positive / total) * 100) : 0)
  const thisWeek = analyticsData?.trend?.thisWeek || 0
  const lastWeek = analyticsData?.trend?.lastWeek || 0
  const weekChange = analyticsData?.trend?.change || 0

  const handleExport = async () => {
    if (!businessId) return
    setExporting(true)
    try {
      const response = await fetch(`/api/analytics/export?businessId=${businessId}&type=feedback`)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `reputationflow-feedback-${Date.now()}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Export failed:", error)
    } finally {
      setExporting(false)
    }
  }

  // Rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: feedbacks.filter((f) => f.rating === rating).length,
    percentage: total > 0 ? (feedbacks.filter((f) => f.rating === rating).length / total) * 100 : 0,
  }))

  if (loading) {
    return (
      <div className="max-w-6xl animate-in fade-in duration-500">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="max-w-6xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500">Insights into your reputation performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-lg p-1">
            {["7d", "30d", "90d", "all"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  period === p ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {p === "all" ? "All Time" : p.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={handleExport}
            disabled={exporting || total === 0}
            className="bg-slate-900 hover:bg-black disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download size={16} />
            <span>{exporting ? "Exporting..." : "Export CSV"}</span>
          </button>
        </div>
      </div>

      {!isPremium && (
        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-600 text-white p-3 rounded-lg">
              <BarChart3 size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-1">Unlock Advanced Analytics</h3>
              <p className="text-slate-600 text-sm mb-4">
                Get detailed trends, platform breakdown, response rate tracking, and automated reports with Pro.
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Reviews" value={total} icon={<MessageSquare size={18} />} color="indigo" />
        <MetricCard
          label="Average Rating"
          value={avgRating.toFixed(1)}
          icon={<Star size={18} />}
          color="amber"
          suffix="/5"
        />
        <MetricCard label="NPS Score" value={npsScore} icon={<TrendingUp size={18} />} color="emerald" suffix="%" />
        <TrendCard label="This Week" value={thisWeek} change={weekChange} />
      </div>

      {/* Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Rating Distribution</h3>
          <div className="space-y-4">
            {ratingDistribution.reverse().map((item) => (
              <div key={item.rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="font-medium text-sm text-slate-700">{item.rating}</span>
                  <Star size={14} className="text-amber-400" fill="currentColor" />
                </div>
                <div className="flex-1">
                  <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${item.percentage}%` }}
                    >
                      {item.percentage > 10 && <span className="text-xs font-bold text-white">{item.count}</span>}
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-slate-500 w-12 text-right">
                  {item.percentage.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Performance Overview</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Star size={20} className="text-emerald-600" fill="currentColor" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Positive</div>
                  <div className="text-2xl font-bold text-slate-900">{positive}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">of total</div>
                <div className="text-lg font-bold text-emerald-600">
                  {total > 0 ? Math.round((positive / total) * 100) : 0}%
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-rose-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-rose-100 p-2 rounded-lg">
                  <ShieldAlert size={20} className="text-rose-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">Intercepted</div>
                  <div className="text-2xl font-bold text-slate-900">{negative}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">prevented</div>
                <div className="text-lg font-bold text-rose-600">
                  {total > 0 ? Math.round((negative / total) * 100) : 0}%
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Impact</div>
              <p className="text-sm text-slate-600 leading-relaxed">
                You've intercepted{" "}
                <span className="font-bold text-slate-900">
                  {negative} negative review{negative !== 1 ? "s" : ""}
                </span>
                , preventing potential damage to your online reputation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {total === 0 && (
        <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={28} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No data yet</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Analytics will appear here once you start collecting feedback from customers.
          </p>
        </div>
      )}
    </div>
  )
}

const MetricCard = ({ label, value, icon, color, suffix = "" }: any) => (
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

const TrendCard = ({ label, value, change }: any) => {
  const isPositive = change >= 0
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center space-x-2 mb-2">
        <Users size={18} className="text-indigo-600" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl sm:text-3xl font-bold text-slate-900">{value}</div>
        <div
          className={`flex items-center gap-1 text-sm font-bold ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{Math.abs(change).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  )
}
