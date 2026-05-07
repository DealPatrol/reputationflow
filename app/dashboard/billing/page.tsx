"use client"

import { CreditCard, Check, AlertCircle, Download } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function BillingPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black">Billing</h1>
          <Link href="/dashboard" className="text-foreground/60 hover:text-foreground font-semibold">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border-2 border-border p-8 mb-8">
              <h2 className="text-2xl font-black mb-6">Current Plan</h2>
              <div className="flex items-center justify-between mb-8 pb-8 border-b-2 border-border">
                <div>
                  <h3 className="text-2xl font-black text-foreground mb-2">Professional</h3>
                  <p className="text-4xl font-black text-purple-600">
                    $20<span className="text-lg text-foreground/60">/month</span>
                  </p>
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-red-500 hover:shadow-lg shadow-purple-600/30 text-white px-6 py-3 rounded-xl font-bold transition-all">
                  Manage Plan
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-foreground mb-4">What's Included:</h4>
                {[
                  "Unlimited review collection links",
                  "Advanced analytics & NPS tracking",
                  "Email automation (unlimited)",
                  "SMS notifications",
                  "QR code generation",
                  "White-label options",
                  "Priority support",
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <Check size={20} className="text-green-600" />
                    <span className="text-foreground/70 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-2xl border-2 border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Billing History</h2>
                <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-bold">
                  <Download size={18} />
                  <span>Download All</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="pb-3 font-bold text-foreground/60">DATE</th>
                      <th className="pb-3 font-bold text-foreground/60">DESCRIPTION</th>
                      <th className="pb-3 font-bold text-foreground/60">AMOUNT</th>
                      <th className="pb-3 font-bold text-foreground/60">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "Jan 15, 2025", desc: "Professional Plan", amount: "$20.00", status: "Paid" },
                      { date: "Dec 15, 2024", desc: "Professional Plan", amount: "$20.00", status: "Paid" },
                      { date: "Nov 15, 2024", desc: "Professional Plan", amount: "$20.00", status: "Paid" },
                      { date: "Oct 15, 2024", desc: "Professional Plan", amount: "$20.00", status: "Paid" },
                    ].map((invoice, index) => (
                      <tr key={index} className="border-b border-border hover:bg-slate-50 transition-colors">
                        <td className="py-4 font-medium text-foreground">{invoice.date}</td>
                        <td className="py-4 text-foreground/70">{invoice.desc}</td>
                        <td className="py-4 font-bold text-foreground">{invoice.amount}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                            <Check size={14} />
                            <span>{invoice.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="bg-white rounded-2xl border-2 border-border p-6">
              <h3 className="text-lg font-black mb-4 flex items-center space-x-2">
                <CreditCard size={20} />
                <span>Payment Method</span>
              </h3>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 mb-4">
                <p className="text-sm text-foreground/60 font-semibold mb-2">VISA</p>
                <p className="text-lg font-black text-foreground">•••• •••• •••• 4242</p>
                <p className="text-xs text-foreground/50 mt-2">Expires 12/25</p>
              </div>
              <button className="w-full text-purple-600 hover:text-purple-700 font-bold py-2 transition-colors">
                Update Card
              </button>
            </div>

            {/* Billing Contact */}
            <div className="bg-white rounded-2xl border-2 border-border p-6">
              <h3 className="text-lg font-black mb-4">Billing Contact</h3>
              <div className="space-y-2">
                <p className="font-bold text-foreground">Your Business Name</p>
                <p className="text-sm text-foreground/60">billing@yourbusiness.com</p>
              </div>
              <button className="w-full mt-4 text-purple-600 hover:text-purple-700 font-bold py-2 transition-colors">
                Edit Contact
              </button>
            </div>

            {/* Next Billing Date */}
            <div className="bg-gradient-to-br from-purple-50 to-red-50 rounded-2xl border-2 border-purple-200 p-6">
              <h3 className="font-bold text-foreground mb-2">Next Billing Date</h3>
              <p className="text-2xl font-black text-purple-600 mb-1">Feb 15, 2025</p>
              <p className="text-sm text-foreground/60">Your card will be charged $20.00</p>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-2xl border-2 border-red-200 p-6">
              <h3 className="text-lg font-black text-red-600 mb-4 flex items-center space-x-2">
                <AlertCircle size={20} />
                <span>Danger Zone</span>
              </h3>
              <button className="w-full text-red-600 hover:text-red-700 hover:bg-red-100 font-bold py-2 px-4 rounded-lg transition-colors border-2 border-red-200">
                Cancel Subscription
              </button>
              <p className="text-xs text-red-600 mt-2">Your access will continue until Feb 15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
