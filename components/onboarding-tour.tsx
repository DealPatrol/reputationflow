"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight, Check } from "lucide-react"

interface OnboardingTourProps {
  onComplete: () => void
}

export function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [step, setStep] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenOnboarding")
    if (hasSeenTour) {
      setShow(false)
      onComplete()
    }
  }, [onComplete])

  const steps = [
    {
      title: "Welcome to Feedbackr!",
      description:
        "Let's take a quick tour of your new reputation management dashboard. This will only take 30 seconds.",
      highlight: "dashboard",
    },
    {
      title: "Share Your Review Link",
      description: "Get your unique review collection link and share it with customers via any channel you prefer.",
      highlight: "campaigns",
    },
    {
      title: "Monitor Your Reviews",
      description:
        "Track all your feedback in one place. Negative reviews are kept private while positive ones go public.",
      highlight: "feedback",
    },
    {
      title: "Configure Your Settings",
      description: "Add your Google, Facebook, and Yelp links so customers can leave reviews on your platforms.",
      highlight: "settings",
    },
  ]

  const currentStep = steps[step]

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      completeTour()
    }
  }

  const completeTour = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    setShow(false)
    onComplete()
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
              {step + 1}
            </div>
            <span className="text-sm text-slate-500 font-medium">
              Step {step + 1} of {steps.length}
            </span>
          </div>
          <button
            onClick={completeTour}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Skip tour"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-3">{currentStep.title}</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">{currentStep.description}</p>

        <div className="flex items-center space-x-3">
          {step < steps.length - 1 ? (
            <>
              <button
                onClick={completeTour}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Skip Tour
              </button>
              <button
                onClick={nextStep}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Next</span>
                <ArrowRight size={18} />
              </button>
            </>
          ) : (
            <button
              onClick={completeTour}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center space-x-2 transition-colors"
            >
              <Check size={18} />
              <span>Get Started</span>
            </button>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${index === step ? "w-8 bg-indigo-600" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
