"use client"

import type React from "react"
import Link from "next/link"
import { Star, ArrowRight, ArrowUpRight, ShieldCheck, Share2, BarChart3, Check } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-foreground p-1.5 rounded-lg">
              <Star className="text-background h-5 w-5" fill="currentColor" />
            </div>
            <span className="font-bold text-lg tracking-tight">Feedbackr</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/pricing" className="text-foreground/70 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/case-studies" className="text-foreground/70 hover:text-foreground transition-colors">
              Case Studies
            </Link>
            <Link href="/demo" className="text-foreground/70 hover:text-foreground transition-colors">
              Demo
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin" className="hidden sm:block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link
              href="/checkout?plan=pro-monthly"
              className="bg-foreground text-background hover:bg-foreground/90 px-4 py-2 rounded-full font-semibold text-sm transition-all"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-secondary text-foreground/80 px-3 py-1.5 rounded-full text-sm font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-accent" />
          <span>Trusted by 500+ local businesses</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-balance leading-[0.95] mb-8">
          More 5-star reviews.
          <br />
          <span className="text-accent">Fewer public complaints.</span>
        </h1>

        <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto text-pretty mb-10 leading-relaxed">
          Feedbackr routes happy customers to Google, Facebook, and Yelp—while quietly capturing unhappy feedback before it goes public.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/checkout?plan=pro-monthly"
            className="group bg-foreground text-background hover:bg-foreground/90 px-7 py-3.5 rounded-full font-semibold text-base transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span>Start for $20/mo</span>
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/demo"
            className="bg-background hover:bg-secondary text-foreground px-7 py-3.5 rounded-full font-semibold text-base border border-border transition-all w-full sm:w-auto justify-center flex items-center"
          >
            Try the demo
          </Link>
        </div>
        <p className="text-sm text-foreground/40 mt-6">No credit card required to explore.</p>
      </section>

      {/* Hero visual / stat band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-foreground rounded-3xl p-8 sm:p-12 text-background">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-background/15">
            <StatBlock value="50K+" label="Reviews collected" company="Across all customers" />
            <StatBlock value="+1.4★" label="Avg. rating lift" company="In first 90 days" />
            <StatBlock value="12K" label="Complaints intercepted" company="Kept off public sites" />
            <StatBlock value="8–12x" label="Typical first-year ROI" company="On a $20/mo plan" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-3">How it works</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance">Everything you need to win the review game</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            icon={<ShieldCheck size={22} />}
            title="Smart review router"
            description="Five-star customers go straight to Google, Facebook, and Yelp. Unhappy ones land on a private feedback form you control."
          />
          <FeatureCard
            icon={<Share2 size={22} />}
            title="Shareable links & QR"
            description="Drop a link on receipts, emails, texts, or table tents. Generate QR codes that route customers in one tap."
          />
          <FeatureCard
            icon={<BarChart3 size={22} />}
            title="Honest analytics"
            description="Track NPS, rating trends, and real feedback in one dashboard. No vanity metrics—just what moves revenue."
          />
        </div>
      </section>

      {/* ROI Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-secondary rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-3">The math</p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 text-balance">$20 in. Hundreds back.</h2>
              <p className="text-foreground/60 text-lg leading-relaxed mb-8">
                One recovered customer or one prevented 1-star review usually pays for the year. Most businesses see returns within the first month.
              </p>
              <ul className="space-y-3">
                {["Win back unhappy customers privately", "Outrank competitors with more 5-star reviews", "Spend less time chasing feedback manually"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground/80 font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <p className="text-foreground/50 font-medium text-sm mb-6">Your typical month</p>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-black">$20</p>
                  <p className="text-sm text-foreground/50 mt-1">invested</p>
                </div>
                <ArrowRight className="text-accent mb-2" size={28} />
                <div className="text-right">
                  <p className="text-4xl font-black text-accent">$300+</p>
                  <p className="text-sm text-foreground/50 mt-1">new revenue</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <Link href="/pricing" className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-accent transition-colors">
                  See full pricing breakdown
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-foreground rounded-3xl p-10 sm:p-16 text-center text-background">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-5 text-balance">Ready for better reviews?</h2>
          <p className="text-background/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join 500+ businesses collecting more 5-star reviews. Set up in minutes, cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/checkout?plan=pro-monthly"
              className="bg-background text-foreground hover:bg-background/90 px-7 py-3.5 rounded-full font-semibold text-base transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Get started for $20/mo</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/demo"
              className="bg-background/10 hover:bg-background/20 text-background px-7 py-3.5 rounded-full font-semibold text-base border border-background/20 transition-all inline-flex items-center justify-center"
            >
              Launch demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-foreground p-1.5 rounded-lg">
              <Star className="text-background h-4 w-4" fill="currentColor" />
            </div>
            <span className="font-bold">Feedbackr</span>
          </div>
          <div className="flex gap-6 text-sm text-foreground/60 font-medium">
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <a href="mailto:support@feedbackr.app" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-sm text-foreground/40">© 2025 Feedbackr.</p>
        </div>
      </footer>
    </div>
  )
}

function StatBlock({ value, label, company }: { value: string; label: string; company: string }) {
  return (
    <div className="px-0 md:px-8 py-6 md:py-0 first:pl-0 first:pt-0">
      <div className="text-4xl sm:text-5xl font-black tracking-tight mb-2">{value}</div>
      <div className="font-semibold text-background/90">{label}</div>
      <div className="text-sm text-background/50 mt-1">{company}</div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group bg-card border border-border rounded-2xl p-7 hover:border-foreground/20 transition-all">
      <div className="bg-secondary text-foreground p-2.5 w-fit rounded-xl mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/60 leading-relaxed">{description}</p>
    </div>
  )
}
