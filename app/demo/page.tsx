"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Star, Loader2 } from "lucide-react"

export default function DemoPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  useEffect(() => {
    const demoUser = {
      id: "demo-" + Date.now(),
      email: "demo@reputationflow.app",
      name: "Demo User",
    }

    localStorage.setItem("user", JSON.stringify(demoUser))

    // Animated loading sequence
    const timer1 = setTimeout(() => setStep(1), 800)
    const timer2 = setTimeout(() => setStep(2), 1600)
    const timer3 = setTimeout(() => router.push("/dashboard"), 2400)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [router])

  const steps = ["Creating your demo account...", "Setting up your dashboard...", "Loading sample data..."]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="text-center max-w-md px-4">
        <div className="bg-gradient-to-tr from-indigo-500 to-violet-500 p-4 rounded-2xl inline-flex mb-6 shadow-2xl shadow-indigo-500/20">
          <Star size={48} className="text-white" fill="currentColor" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Setting Up Your Demo</h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
          {steps.map((text, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 py-3 transition-all ${
                step >= index ? "opacity-100" : "opacity-30"
              }`}
            >
              {step > index ? (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : step === index ? (
                <Loader2 size={24} className="animate-spin text-indigo-400 flex-shrink-0" />
              ) : (
                <div className="w-6 h-6 border-2 border-white/30 rounded-full flex-shrink-0" />
              )}
              <span className="text-white font-medium">{text}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2 text-indigo-300">
          <Sparkles size={16} fill="currentColor" />
          <p className="text-sm">Full-featured demo with sample data</p>
        </div>
      </div>
    </div>
  )
}
