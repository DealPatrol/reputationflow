"use client"

import Link from "next/link"
import { CheckCircle, Star, ArrowRight } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-border">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <CheckCircle size={40} className="text-white" />
          </div>

          <h1 className="text-3xl font-black text-foreground mb-4">Welcome to Pro!</h1>

          <p className="text-foreground/60 font-medium mb-8">
            Your subscription is now active. You have full access to all ReputationFlow features.
          </p>

          <div className="bg-gradient-to-br from-purple-50 to-red-50 rounded-2xl p-6 mb-8 border border-purple-100">
            <h3 className="font-bold text-foreground mb-4">What you can do now:</h3>
            <ul className="text-left space-y-3 text-foreground/70 font-medium">
              <li className="flex items-center space-x-3">
                <Star size={16} className="text-purple-600 flex-shrink-0" fill="currentColor" />
                <span>Create unlimited review collection links</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star size={16} className="text-purple-600 flex-shrink-0" fill="currentColor" />
                <span>Set up email automation campaigns</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star size={16} className="text-purple-600 flex-shrink-0" fill="currentColor" />
                <span>Access advanced analytics and NPS tracking</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star size={16} className="text-purple-600 flex-shrink-0" fill="currentColor" />
                <span>Generate QR codes for in-person reviews</span>
              </li>
            </ul>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-purple-600 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all"
          >
            <span>Go to Dashboard</span>
            <ArrowRight size={20} />
          </Link>

          <p className="mt-6 text-sm text-foreground/50">
            Questions? Contact{" "}
            <a href="mailto:support@reputationflow.app" className="text-purple-600 hover:underline">
              support@reputationflow.app
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
