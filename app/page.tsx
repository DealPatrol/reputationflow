"use client"

import type React from "react"
import Link from "next/link"
import { Star, Zap, TrendingUp, ArrowRight, Sparkles, DollarSign } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-purple-600 to-red-500 p-2 rounded-lg">
              <Star className="text-white h-6 w-6" fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              <span className="text-gradient bg-gradient-to-r from-purple-600 to-red-500">ReputationFlow</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/pricing" className="text-foreground hover:text-primary font-semibold text-sm">
              Pricing
            </Link>
            <Link href="/demo" className="text-foreground hover:text-primary font-semibold text-sm">
              Try Demo
            </Link>
            <Link
              href="/auth/signin"
              className="bg-gradient-to-r from-purple-600 to-red-500 hover:shadow-lg hover:shadow-purple-500/30 text-white px-5 py-2 rounded-lg font-bold text-sm transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-red-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-in fade-in duration-500">
            <Sparkles size={16} fill="currentColor" />
            <span>Turn Reviews Into Your Superpower</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 text-balance animate-in slide-in-from-bottom duration-700 leading-tight">
            Rad Reviews.
            <br />
            <span className="text-gradient bg-gradient-to-r from-purple-600 via-pink-600 to-red-500">Real Results.</span>
          </h1>

          <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto text-pretty animate-in fade-in duration-700 delay-200 font-medium">
            Get more 5-star reviews while handling negative feedback privately. It's like having a reputation bouncer that actually works.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in duration-700 delay-300">
            <Link
              href="/demo"
              className="bg-gradient-to-r from-purple-600 to-red-500 hover:shadow-2xl hover:shadow-purple-500/40 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <span>Try Demo Free</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/auth/signin"
              className="bg-white hover:bg-slate-50 text-foreground px-8 py-4 rounded-xl font-bold text-lg border-2 border-border transition-all w-full sm:w-auto justify-center flex items-center"
            >
              Sign In
            </Link>
          </div>

          <p className="text-sm text-foreground/50 mt-8 font-medium">No card needed. Full access to everything.</p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Zap size={28} />}
            title="Review Router"
            description="Happy customers → Google/Facebook/Yelp. Unhappy customers → private feedback form."
            gradient="from-purple-600 to-pink-600"
          />
          <FeatureCard
            icon={<Star size={28} />}
            title="Shareable Links"
            description="Get unique review links and QR codes. Share on receipts, emails, social—anywhere."
            gradient="from-pink-600 to-red-500"
          />
          <FeatureCard
            icon={<TrendingUp size={28} />}
            title="Real Analytics"
            description="Track your NPS, see trends, read actual feedback. No BS metrics."
            gradient="from-red-500 to-orange-500"
          />
        </div>
      </section>

      {/* ROI Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-purple-600/5 to-red-500/5 rounded-3xl p-12 border border-border">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <DollarSign size={16} />
              <span>Proven ROI</span>
            </div>
            <h2 className="text-4xl font-black mb-4">The Math Is Simple</h2>
            <p className="text-foreground/60 font-medium">Average business sees 8-12x ROI in first year</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-red-500 text-gradient mb-2">50K+</div>
              <div className="text-foreground/70 font-semibold">Reviews Collected</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-red-500 text-gradient mb-2">$2.1M</div>
              <div className="text-foreground/70 font-semibold">Extra Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-red-500 text-gradient mb-2">12K</div>
              <div className="text-foreground/70 font-semibold">Negative Reviews Prevented</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-purple-200/50 text-center">
            <p className="text-foreground/60 font-semibold mb-3">Your typical savings:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div>
                <p className="text-2xl font-black text-foreground">$20</p>
                <p className="text-sm text-foreground/50">/month investment</p>
              </div>
              <div className="text-3xl font-black text-purple-600">→</div>
              <div>
                <p className="text-2xl font-black text-green-600">$300+</p>
                <p className="text-sm text-foreground/50">/month in new revenue</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-purple-600 to-red-500 rounded-3xl p-12 shadow-2xl shadow-purple-600/30">
          <h2 className="text-4xl font-black text-white mb-6 text-center">Ready for Better Reviews?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto text-center font-medium">
            Join 500+ businesses collecting more 5-star reviews. Try our interactive demo. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all"
            >
              <span>Launch Demo Now</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all border-2 border-white/30"
            >
              <span>See Pricing</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-12 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-purple-600 to-red-500 p-2 rounded-lg">
                <Star className="text-white h-5 w-5" fill="currentColor" />
              </div>
              <span className="font-bold text-lg">ReputationFlow</span>
            </div>
            <div className="flex space-x-8 text-sm text-foreground/60 font-medium">
              <Link href="/pricing" className="hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <a href="mailto:support@reputationflow.app" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            <p className="text-sm text-foreground/40">© 2025 ReputationFlow.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: { icon: React.ReactNode; title: string; description: string; gradient: string }) {
  return (
    <div className="group bg-white border border-border rounded-2xl p-8 hover:shadow-lg transition-all hover:border-primary/50">
      <div className={`bg-gradient-to-br ${gradient} p-3 w-fit rounded-xl mb-6 text-white`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-foreground/60 font-medium">{description}</p>
    </div>
  )
}
