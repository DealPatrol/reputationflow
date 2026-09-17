"use client"

import React from "react"

import { Check, TrendingUp, Users, Zap, DollarSign } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PricingPage() {
  const [businessSize, setBusinessSize] = useState(50)

  // ROI calculation
  const reviewsPerMonth = businessSize * 2 // avg 2 reviews per customer per month
  const conversionPercentage = 0.05 // 5% of reviews convert to customer
  const avgOrderValue = 75
  const monthlyRevenue = reviewsPerMonth * conversionPercentage * avgOrderValue
  const yearlyRevenue = monthlyRevenue * 12
  const roiMultiple = yearlyRevenue / 240 // $20/month = $240/year

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-purple-600 to-red-500 p-2 rounded-lg">
              <TrendingUp className="text-white h-6 w-6" />
            </div>
            <span className="font-bold text-xl">Feedbackr</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-foreground/60 hover:text-foreground font-semibold text-sm">
              Back to Home
            </Link>
            <Link href="/auth/signin" className="bg-gradient-to-r from-purple-600 to-red-500 text-white px-5 py-2 rounded-lg font-bold text-sm">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <DollarSign size={16} fill="currentColor" />
            <span>Transparent Pricing. Zero Surprises.</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            You Only Pay for{" "}
            <span className="text-gradient bg-gradient-to-r from-purple-600 to-red-500">Real Results</span>
          </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-4 font-medium">
            See what Feedbackr can do for your business with a full 3-day free trial. No charge today.
          </p>
          <p className="text-sm text-foreground/55 max-w-xl mx-auto">
            Payment details are collected securely at signup. Billing begins at $20/month after the trial unless you cancel.
          </p>
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-to-br from-purple-50 to-red-50 rounded-3xl p-12 mb-16 border border-purple-200/50">
          <h2 className="text-3xl font-black mb-8 text-center">See Your ROI in Real-Time</h2>

          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <label className="block text-lg font-bold text-foreground mb-4">
                How many customers do you serve monthly?
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={businessSize}
                  onChange={(e) => setBusinessSize(Number(e.target.value))}
                  className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <div className="bg-white border-2 border-border rounded-lg px-4 py-2 font-bold text-xl min-w-20 text-center">
                  {businessSize}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricBox label="Reviews/Mo" value={reviewsPerMonth} />
              <MetricBox label="Conversion" value={`${(conversionPercentage * 100).toFixed(0)}%`} />
              <MetricBox label="Avg Order" value={`$${avgOrderValue}`} />
              <MetricBox label="Extra Revenue/Mo" value={`$${monthlyRevenue.toFixed(0)}`} highlight />
            </div>

            <div className="mt-8 bg-white rounded-2xl p-6 border-2 border-purple-600">
              <div className="text-center">
                <p className="text-foreground/60 font-semibold mb-2">Annual ROI at $20/month investment:</p>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-red-500">
                  {roiMultiple.toFixed(1)}x
                </div>
                <p className="text-foreground/60 mt-2 font-medium">
                  ${yearlyRevenue.toFixed(0)}/year in additional revenue
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-center mb-12">Simple, Honest Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="relative bg-white border-2 border-border rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-black mb-2">Starter</h3>
                <div className="text-5xl font-black text-foreground mb-2">Free</div>
                <p className="text-foreground/60 font-medium">Try it out, see the magic</p>
              </div>

              <Link
                href="/auth/signin"
                className="block w-full py-3 rounded-xl font-bold text-lg mb-8 transition-all bg-slate-100 text-foreground hover:bg-slate-200 text-center"
              >
                Get Started Free
              </Link>

              <div className="space-y-4">
                <PricingFeature text="1 review collection link" included />
                <PricingFeature text="Basic analytics" included />
                <PricingFeature text="Email support" included />
                <PricingFeature text="Multi-location routing" included={false} />
                <PricingFeature text="Email automation" included={false} />
                <PricingFeature text="Priority support" included={false} />
                <PricingFeature text="Advanced analytics" included={false} />
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative bg-white border-2 border-purple-600 rounded-3xl p-8 shadow-xl shadow-purple-600/10">
              <div className="absolute -top-4 left-6 bg-gradient-to-r from-purple-600 to-red-500 text-white px-4 py-1 rounded-full text-sm font-black">
                RECOMMENDED
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-black mb-2">Professional</h3>
                <div className="text-5xl font-black text-foreground mb-2">
                  $20<span className="text-2xl font-bold text-foreground/60">/mo</span>
                </div>
                <p className="text-foreground/60 font-medium">Full access free for 3 days</p>
                <p className="text-xs text-foreground/50 mt-2">Then $20/month. Cancel before billing.</p>
              </div>

              <Link
                href="/checkout?plan=pro-monthly"
                className="block w-full py-3 rounded-xl font-bold text-lg mb-3 transition-all bg-gradient-to-r from-purple-600 to-red-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl text-center"
              >
                Start 3-Day Free Trial
              </Link>
              <p className="text-center text-xs text-foreground/50 mb-8">
                No charge today. $20/month begins after the trial unless canceled.
              </p>

              <div className="space-y-4">
                <PricingFeature text="Unlimited review links" included />
                <PricingFeature text="Multi-location routing" included />
                <PricingFeature text="Advanced analytics & NPS" included />
                <PricingFeature text="Email review requests" included />
                <PricingFeature text="SMS notifications" included />
                <PricingFeature text="Priority email support" included />
                <PricingFeature text="White-label option" included />
              </div>
            </div>
          </div>
        </div>

        {/* Value Props */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-center mb-12">Why Pay $20/Month?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<TrendingUp size={32} />}
              title="5-Star Review Machine"
              description="Our smart routing automatically sends happy customers to Google, Facebook, and Yelp. Watch your ratings climb."
            />
            <ValueCard
              icon={<Users size={32} />}
              title="Keep Unhappy Customers"
              description="Bad reviews hurt. We send frustrated customers to a private form instead. Fix issues before they go public."
            />
            <ValueCard
              icon={<Zap size={32} />}
              title="Automate Everything"
              description="Send review requests via email automatically. Set it and forget it. We handle all the heavy lifting."
            />
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-gradient-to-br from-purple-600/10 to-red-500/10 rounded-3xl p-12 mb-20 border border-purple-200/50">
          <h2 className="text-3xl font-black text-center mb-12">What Business Owners Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              quote="Feedbackr generated $3,400 in new revenue in just 30 days. Best $20 I've spent."
              author="Sarah M."
              role="Pizza Restaurant Owner"
              stars={5}
            />
            <Testimonial
              quote="We went from 3.2 stars to 4.7 stars in 3 months. Our customers finally see the real us."
              author="James K."
              role="Hair Salon"
              stars={5}
            />
            <Testimonial
              quote="No more negative reviews on Google. This thing is a game changer for reputation management."
              author="Mike P."
              role="Dental Practice"
              stars={5}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-purple-600 to-red-500 rounded-3xl p-12 text-center shadow-2xl shadow-purple-600/30">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Stop Losing Reviews?</h2>
          <p className="text-white/90 text-lg mb-8 font-medium">
            Join businesses building a stronger review workflow with a full 3-day trial. Payment details are collected securely; billing starts after the trial unless canceled.
          </p>
          <Link
            href="/auth/signin"
            className="inline-block bg-white hover:bg-slate-50 text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>
    </div>
  )
}

function MetricBox({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 text-center ${highlight ? "bg-gradient-to-br from-purple-600 to-red-500 text-white" : "bg-white border-2 border-border"}`}>
      <div className="text-xs font-bold uppercase tracking-wider opacity-75 mb-1">{label}</div>
      <div className={`text-2xl font-black ${highlight ? "text-white" : "text-foreground"}`}>{value}</div>
    </div>
  )
}

function PricingFeature({ text, included }: { text: string; included: boolean }) {
  return (
    <div className="flex items-center space-x-3">
      {included ? (
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-red-500 flex items-center justify-center">
          <Check size={16} className="text-white" />
        </div>
      ) : (
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-border" />
      )}
      <span className={`font-medium ${included ? "text-foreground" : "text-foreground/40"}`}>{text}</span>
    </div>
  )
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white border-2 border-border rounded-2xl p-8 hover:shadow-lg transition-all group">
      <div className="bg-gradient-to-br from-purple-600/10 to-red-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:from-purple-600 group-hover:to-red-500 group-hover:text-white transition-all text-purple-600">
        {icon}
      </div>
      <h3 className="text-xl font-black mb-3 group-hover:text-purple-600 transition-colors">{title}</h3>
      <p className="text-foreground/60 font-medium leading-relaxed">{description}</p>
    </div>
  )
}

function Testimonial({ quote, author, role, stars }: { quote: string; author: string; role: string; stars: number }) {
  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-border">
      <div className="flex mb-4">
        {[...Array(stars)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">
            ★
          </span>
        ))}
      </div>
      <p className="text-foreground font-medium mb-6 leading-relaxed italic">"{quote}"</p>
      <div>
        <p className="font-black text-foreground">{author}</p>
        <p className="text-sm text-foreground/60">{role}</p>
      </div>
    </div>
  )
}
