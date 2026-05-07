"use client"

import { BarChart3, TrendingUp, Users, MessageSquare, Mail, Download } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState("30")

  // Demo metrics
  const metrics = {
    totalReviews: 127,
    avgRating: 4.6,
    conversionRate: 8.2,
    estimatedRevenue: 2850,
    negativeReviews: 3,
    reviewsThisMonth: 31,
    openRate: 62,
    clickRate: 18,
  }

  const recentFeedback = [
    { id: 1, rating: 5, text: "Amazing service! Highly recommend.", type: "positive", date: "Today" },
    { id: 2, rating: 5, text: "Best experience we've had in years.", type: "positive", date: "Yesterday" },
    { id: 3, rating: 2, text: "Service was slow today.", type: "negative", date: "2 days ago" },
    { id: 4, rating: 5, text: "Will definitely come back.", type: "positive", date: "3 days ago" },
  ]

  const dailyData = [
    { day: "Mon", reviews: 5, positive: 5, negative: 0 },
    { day: "Tue", reviews: 3, positive: 3, negative: 0 },
    { day: "Wed", reviews: 8, positive: 7, negative: 1 },
    { day: "Thu", reviews: 6, positive: 5, negative: 1 },
    { day: "Fri", reviews: 4, positive: 4, negative: 0 },
    { day: "Sat", reviews: 3, positive: 3, negative: 0 },
    { day: "Sun", reviews: 2, positive: 2, negative: 0 },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-slate-100 border border-border rounded-lg px-4 py-2 font-semibold"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <Link href="/settings" className="text-foreground hover:text-purple-600 font-semibold">
              Settings
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <MetricCard
            icon={<TrendingUp size={24} />}
            label="Avg Rating"
            value={metrics.avgRating}
            unit="★"
            trend="+0.3 this month"
          />
          <MetricCard
            icon={<Users size={24} />}
            label="Total Reviews"
            value={metrics.totalReviews}
            trend="+{metrics.reviewsThisMonth} this month"
          />
          <MetricCard
            icon={<BarChart3 size={24} />}
            label="Review to Buy Rate"
            value={metrics.conversionRate}
            unit="%"
            trend="Industry avg: 3%"
          />
          <MetricCard
            icon={<Download size={24} />}
            label="Est. Revenue Generated"
            value={`$${metrics.estimatedRevenue}`}
            trend="At $20/mo investment"
          />
        </div>

        {/* Email Automation Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200/50">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="text-blue-600" size={24} />
              <h3 className="text-xl font-black">Email Performance</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">Open Rate</span>
                  <span className="text-blue-600 font-black">{metrics.openRate}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: `${metrics.openRate}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">Click Rate</span>
                  <span className="text-blue-600 font-black">{metrics.clickRate}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: `${metrics.clickRate}%` }} />
                </div>
              </div>
              <p className="text-sm text-foreground/60 mt-4">
                Industry avg open: 28% | Industry avg click: 4%
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200/50">
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="text-red-600" size={24} />
              <h3 className="text-xl font-black">Feedback Breakdown</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">Positive</span>
                  <span className="text-green-600 font-black">{metrics.totalReviews - metrics.negativeReviews}</span>
                </div>
                <div className="w-full bg-white rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                    style={{ width: `${((metrics.totalReviews - metrics.negativeReviews) / metrics.totalReviews) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">Needs Attention</span>
                  <span className="text-red-600 font-black">{metrics.negativeReviews}</span>
                </div>
                <div className="w-full bg-white rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-400 to-orange-500 h-3 rounded-full"
                    style={{ width: `${(metrics.negativeReviews / metrics.totalReviews) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border-2 border-border p-8 mb-12">
          <h3 className="text-xl font-black mb-8">Review Activity</h3>
          <div className="flex items-end justify-between h-64 gap-2">
            {dailyData.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <div className="flex gap-0.5 mb-4 h-48 items-end">
                  <div
                    className="flex-1 bg-gradient-to-t from-green-400 to-emerald-500 rounded-t-lg"
                    style={{ height: `${(day.positive / 10) * 100}%` }}
                    title={`Positive: ${day.positive}`}
                  />
                  {day.negative > 0 && (
                    <div
                      className="flex-1 bg-gradient-to-t from-red-400 to-orange-500 rounded-t-lg"
                      style={{ height: `${(day.negative / 10) * 100}%` }}
                      title={`Negative: ${day.negative}`}
                    />
                  )}
                </div>
                <span className="text-sm font-bold">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white rounded-2xl border-2 border-border p-8">
          <h3 className="text-xl font-black mb-6">Recent Feedback</h3>
          <div className="space-y-4">
            {recentFeedback.map((feedback) => (
              <div key={feedback.id} className="flex items-start space-x-4 pb-4 border-b border-border last:border-0">
                <div className={`flex-shrink-0 px-3 py-1 rounded-lg font-bold text-sm ${
                  feedback.type === "positive"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}>
                  {feedback.rating}★
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{feedback.text}</p>
                  <p className="text-sm text-foreground/50">{feedback.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ icon, label, value, unit, trend }: any) {
  return (
    <div className="bg-white rounded-2xl border-2 border-border p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gradient-to-br from-purple-600/10 to-red-500/10 p-3 rounded-lg text-purple-600">
          {icon}
        </div>
        <p className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-lg">↑ {trend}</p>
      </div>
      <p className="text-foreground/60 font-semibold text-sm mb-2">{label}</p>
      <p className="text-4xl font-black text-foreground">
        {value}
        {unit && <span className="text-2xl text-foreground/60">{unit}</span>}
      </p>
    </div>
  )
}
