"use client"

import React from "react"

import { Check, ArrowRight, Zap, Lock, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SuccessPage() {
  const [claimOffer, setClaimOffer] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-2 border-green-200">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
              <Check className="text-white" size={40} fill="white" />
            </div>
          </div>

          <h1 className="text-4xl font-black mb-4">Welcome to ReputationFlow!</h1>
          <p className="text-xl text-foreground/70 mb-12 font-medium">
            Your account is all set up and ready to start collecting amazing reviews.
          </p>

          {/* Quick Start Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <QuickCard
              icon={<Zap size={24} />}
              title="Get Started"
              description="Access your dashboard"
            />
            <QuickCard
              icon={<TrendingUp size={24} />}
              title="Instant Results"
              description="See real-time metrics"
            />
            <QuickCard
              icon={<Lock size={24} />}
              title="100% Secure"
              description="Enterprise grade security"
            />
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-purple-50 to-red-50 rounded-2xl p-8 mb-12 text-left border-2 border-purple-200">
            <h3 className="text-lg font-black mb-6 text-center">Your Next Steps</h3>
            <div className="space-y-4">
              <Step number={1} title="Share Your Review Link" description="Send to customers via email, SMS, QR code, or social media" />
              <Step number={2} title="Watch Positive Reviews Flow In" description="Happy customers go directly to Google, Facebook, or Yelp" />
              <Step number={3} title="Improve from Private Feedback" description="Unhappy customers share feedback privately for you to fix" />
              <Step number={4} title="See Your Rating Climb" description="Track everything in your dashboard and celebrate the wins" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="flex-1 bg-gradient-to-r from-purple-600 to-red-500 hover:shadow-lg shadow-purple-600/30 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>Go to Dashboard</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/onboarding"
              className="flex-1 bg-white hover:bg-slate-50 text-foreground border-2 border-border px-6 py-4 rounded-xl font-bold text-lg transition-all"
            >
              View Setup Guide
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-foreground/60 font-medium mb-4">Join our growing community</p>
            <div className="flex justify-center space-x-8">
              <div>
                <p className="text-2xl font-black text-purple-600">500+</p>
                <p className="text-xs text-foreground/50">Active Businesses</p>
              </div>
              <div>
                <p className="text-2xl font-black text-purple-600">50K+</p>
                <p className="text-xs text-foreground/50">Reviews Collected</p>
              </div>
              <div>
                <p className="text-2xl font-black text-purple-600">$2.1M</p>
                <p className="text-xs text-foreground/50">Revenue Generated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-foreground/50 mt-8 font-medium">
          Need help?{" "}
          <a href="mailto:support@reputationflow.app" className="text-purple-600 hover:text-purple-700 font-bold">
            Contact support
          </a>
        </p>
      </div>
    </div>
  )
}

function QuickCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-red-50 rounded-xl p-4 border-2 border-purple-100">
      <div className="text-purple-600 mb-2">{icon}</div>
      <h4 className="font-bold text-foreground mb-1">{title}</h4>
      <p className="text-xs text-foreground/60">{description}</p>
    </div>
  )
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-red-500 text-white font-bold text-sm">
          {number}
        </div>
      </div>
      <div className="text-left">
        <p className="font-bold text-foreground mb-1">{title}</p>
        <p className="text-sm text-foreground/60">{description}</p>
      </div>
    </div>
  )
}
