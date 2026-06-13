"use client"

import React from "react"

import { Star, Quote, TrendingUp, Users, Award, Building2 } from "lucide-react"
import Link from "next/link"

const caseStudies = [
  {
    name: "Sarah's Pizza Place",
    industry: "Restaurant",
    challenge: "Struggling to get reviews - Google rating was only 3.2 stars",
    result: "+1.5 stars in 3 months",
    revenue: "$18,500 in new orders traced to reviews",
    quote:
      "Feedbackr is a game-changer. We went from hiding our Google profile to being proud of our reputation.",
    stats: [
      { label: "Reviews/Month", value: "127" },
      { label: "Avg Rating", value: "4.7★" },
      { label: "New Customers", value: "847" },
    ],
  },
  {
    name: "Mike's Hair Salon",
    industry: "Beauty & Wellness",
    challenge: "Negative reviews were hurting his business reputation online",
    result: "100% of bad reviews resolved privately before posting",
    revenue: "$24,200 in new bookings from positive reviews",
    quote:
      "No more embarrassing 1-star reviews on Google. Now I fix problems before they become public.",
    stats: [
      { label: "Reviews/Month", value: "84" },
      { label: "Avg Rating", value: "4.9★" },
      { label: "New Clients", value: "523" },
    ],
  },
  {
    name: "Dr. Johnson's Dental Practice",
    industry: "Healthcare",
    challenge: "Building patient trust through authentic reviews",
    result: "Became top-rated dentist in the area",
    revenue: "$42,100 in new patient revenue",
    quote:
      "Our patients love having the option to leave private feedback. We've fixed so many small issues.",
    stats: [
      { label: "Reviews/Month", value: "156" },
      { label: "Avg Rating", value: "4.8★" },
      { label: "New Patients", value: "1,247" },
    ],
  },
]

const testimonials = [
  {
    text: "The ROI is insane. I'm spending $20/month and making $1,500+/month in extra revenue from the reviews.",
    author: "James K.",
    role: "Restaurant Owner",
    rating: 5,
  },
  {
    text: "Finally, a tool that actually solves the reputation management problem without being complicated.",
    author: "Lisa M.",
    role: "Salon Owner",
    rating: 5,
  },
  {
    text: "My customers appreciate having the option to give feedback privately first. Customer service has improved dramatically.",
    author: "Tom D.",
    role: "Service Business Owner",
    rating: 5,
  },
  {
    text: "Best $20 I spend every month. Hands down. Competitors are trying to figure out why we're their top rated.",
    author: "Angela P.",
    role: "Retail Store Manager",
    rating: 5,
  },
]

export default function SocialProofPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black">Featured Stories</h1>
          <Link href="/" className="text-foreground/60 hover:text-foreground font-semibold">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-black mb-6">
            Businesses That are Already <span className="text-gradient bg-gradient-to-r from-purple-600 to-red-500">Crushing It</span>
          </h1>
          <p className="text-xl text-foreground/70 font-medium">
            See real results from businesses like yours that switched to ReputationFlow.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-cols-2 lg:auto-cols-fr lg:[grid-auto-flow:dense]" : ""}`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                  <Building2 size={16} />
                  <span>{study.industry}</span>
                </div>

                <h2 className="text-3xl font-black mb-4">{study.name}</h2>

                <div className="mb-8 space-y-4">
                  <div>
                    <p className="text-sm font-bold text-foreground/60 mb-2">THE CHALLENGE</p>
                    <p className="text-foreground text-lg font-medium">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground/60 mb-2">THE RESULT</p>
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-red-500">
                      {study.result}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground/60 mb-2">REVENUE IMPACT</p>
                    <p className="text-2xl font-black text-green-600">{study.revenue}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-red-50 rounded-2xl p-8 border-2 border-purple-200 mb-8">
                  <div className="flex mb-4">
                    {[...Array(study.stats[0].value || 5)].slice(0, 5).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg font-bold italic text-foreground mb-4">"{study.quote}"</p>
                  <p className="font-bold text-foreground">{study.name}</p>
                </div>
              </div>

              {/* Stats */}
              <div className={`grid grid-cols-3 gap-4 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                {study.stats.map((stat) => (
                  <div key={stat.label} className="bg-gradient-to-br from-purple-50 to-red-50 rounded-2xl p-6 border-2 border-purple-200 text-center">
                    <p className="text-sm font-bold text-foreground/60 mb-2">{stat.label}</p>
                    <p className="text-3xl font-black text-gradient bg-gradient-to-r from-purple-600 to-red-500">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-purple-600/5 to-red-500/5 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">What Business Owners Say</h2>
            <p className="text-xl text-foreground/70 font-medium">Actual quotes from real customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl border-2 border-border p-8 hover:shadow-lg transition-all">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                  ))}
                </div>
                <div className="mb-6">
                  <Quote size={24} className="text-purple-600/30 mb-2" />
                  <p className="text-foreground font-medium text-lg leading-relaxed">"{testimonial.text}"</p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-purple-600 to-red-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-black mb-12">Our Community By The Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard icon={<Users size={32} />} value="500+" label="Active Businesses" />
            <StatCard icon={<Star size={32} />} value="50K+" label="Reviews Collected" />
            <StatCard icon={<TrendingUp size={32} />} value="$2.1M" label="Revenue Generated" />
            <StatCard icon={<Award size={32} />} value="4.9★" label="Avg Rating" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl border-2 border-border p-12 text-center">
          <h2 className="text-4xl font-black mb-6">Ready to Join These Success Stories?</h2>
          <p className="text-xl text-foreground/70 font-medium mb-8 max-w-2xl mx-auto">
            Start collecting amazing reviews today. See your first results in just 7 days.
          </p>
          <Link
            href="/auth/signin"
            className="inline-block bg-gradient-to-r from-purple-600 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg shadow-purple-600/30 transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div>
      <div className="flex justify-center mb-4 opacity-80">{icon}</div>
      <p className="text-4xl font-black mb-2">{value}</p>
      <p className="text-white/80 font-semibold">{label}</p>
    </div>
  )
}
