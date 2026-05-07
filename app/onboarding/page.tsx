"use client"

import { ArrowRight, Zap, Users, BarChart3, Mail, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const steps = [
  {
    number: 1,
    title: "Connect Your Platform",
    description: "Add your Google, Facebook, and Yelp review links",
    icon: <Users size={32} />,
  },
  {
    number: 2,
    title: "Share Your Link",
    description: "Send the unique review link to customers (QR code, email, SMS)",
    icon: <Mail size={32} />,
  },
  {
    number: 3,
    title: "We Handle the Routing",
    description: "Happy customers go to reviews. Unhappy ones give private feedback",
    icon: <Zap size={32} />,
  },
  {
    number: 4,
    title: "Watch Reviews Multiply",
    description: "Dashboard shows real-time metrics. Your rating climbs automatically",
    icon: <BarChart3 size={32} />,
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [businessName, setBusinessName] = useState("")
  const [googleLink, setGoogleLink] = useState("")
  const [facebookLink, setFacebookLink] = useState("")
  const [yelpLink, setYelpLink] = useState("")

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleComplete = async () => {
    // Save settings and redirect to dashboard
    try {
      const response = await fetch("/api/business/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: businessName,
          google_link: googleLink,
          facebook_link: facebookLink,
          yelp_link: yelpLink,
        }),
      })

      if (response.ok) {
        window.location.href = "/dashboard"
      }
    } catch (error) {
      console.error("[v0] Error saving settings:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-red-500 p-3 rounded-xl">
              <Zap className="text-white h-8 w-8" />
            </div>
          </div>
          <h1 className="text-5xl font-black mb-4">Let's Get You Set Up</h1>
          <p className="text-xl text-foreground/70 font-medium">In just 4 steps, you'll be collecting 5-star reviews</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all ${
                    step.number <= currentStep
                      ? "bg-gradient-to-br from-purple-600 to-red-500 text-white shadow-lg shadow-purple-600/30"
                      : "bg-white border-2 border-border text-foreground/40"
                  }`}
                >
                  {step.number < currentStep ? <Check size={24} /> : step.number}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      step.number < currentStep
                        ? "bg-gradient-to-r from-purple-600 to-red-500"
                        : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-12 border-2 border-border">
            <div className="flex items-center justify-center mb-8 text-purple-600">
              {steps[currentStep - 1].icon}
            </div>

            <h2 className="text-3xl font-black text-center mb-4">{steps[currentStep - 1].title}</h2>
            <p className="text-center text-foreground/60 font-medium mb-10">{steps[currentStep - 1].description}</p>

            {/* Step 1: Business Name */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Enter your business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-100 border-2 border-border rounded-xl outline-none focus:ring-2 focus:ring-purple-600/50 transition-all font-medium"
                />
                <p className="text-sm text-foreground/50 italic">(We'll use this to personalize your review links)</p>
              </div>
            )}

            {/* Step 2: Review Links */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block font-bold text-foreground mb-2">Google Maps Link</label>
                  <input
                    type="url"
                    placeholder="https://g.page/your-business"
                    value={googleLink}
                    onChange={(e) => setGoogleLink(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-100 border-2 border-border rounded-xl outline-none focus:ring-2 focus:ring-purple-600/50 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-foreground mb-2">Facebook Page Link</label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/your-page"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-100 border-2 border-border rounded-xl outline-none focus:ring-2 focus:ring-purple-600/50 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-foreground mb-2">Yelp Link</label>
                  <input
                    type="url"
                    placeholder="https://yelp.com/biz/your-business"
                    value={yelpLink}
                    onChange={(e) => setYelpLink(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-100 border-2 border-border rounded-xl outline-none focus:ring-2 focus:ring-purple-600/50 transition-all font-medium"
                  />
                </div>
              </div>
            )}

            {/* Step 3: How It Works */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h4 className="font-bold text-green-700 mb-2">Customers Rate 4-5 Stars</h4>
                  <p className="text-sm text-green-600">We show them buttons to leave reviews on your linked platforms</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                  <h4 className="font-bold text-orange-700 mb-2">Customers Rate 1-3 Stars</h4>
                  <p className="text-sm text-orange-600">We privately capture their feedback. No bad reviews on Google</p>
                </div>
              </div>
            )}

            {/* Step 4: Ready to Launch */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-100 to-red-100 rounded-2xl p-8 border-2 border-purple-200 text-center">
                  <h3 className="text-2xl font-black mb-2">You're All Set!</h3>
                  <p className="text-foreground/60 font-medium">
                    Your review collection system is ready. Start sharing your link with customers today.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border-2 border-border">
                  <p className="text-sm font-bold text-foreground/60 mb-2">YOUR SHAREABLE LINK:</p>
                  <div className="flex items-center space-x-2 bg-white rounded-lg p-4 border-2 border-border">
                    <input
                      type="text"
                      value={`${typeof window !== "undefined" ? window.location.origin : ""}/review/your-business`}
                      readOnly
                      className="flex-1 bg-transparent outline-none font-mono text-sm"
                    />
                    <button className="text-purple-600 hover:text-purple-700 font-bold">Copy</button>
                  </div>
                  <p className="text-xs text-foreground/50 mt-2">Generate QR codes, add to emails, put on receipts</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-3 rounded-xl font-bold text-foreground/60 hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Back
              </button>

              <button
                onClick={currentStep === steps.length ? handleComplete : handleNext}
                disabled={
                  (currentStep === 1 && !businessName) ||
                  (currentStep === 2 && !googleLink && !facebookLink && !yelpLink)
                }
                className="bg-gradient-to-r from-purple-600 to-red-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
              >
                <span>{currentStep === steps.length ? "Get Started" : "Continue"}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
