"use client"

import type React from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, Check, MessageSquare, QrCode, Star } from "lucide-react"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Feedbackr",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Review management software for local businesses.",
  offers: { "@type": "Offer", price: "20", priceCurrency: "USD", description: "3-day free trial, then $20 per month" },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Feedbackr home">
            <span className="flex size-9 items-center justify-center rounded-lg bg-foreground text-background">
              <Star size={18} fill="currentColor" />
            </span>
            <span className="text-lg font-bold tracking-[-0.03em]">Feedbackr</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-foreground/65 md:flex" aria-label="Primary navigation">
            <Link href="/how-it-works" className="transition-colors hover:text-foreground">How it works</Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground">Pricing</Link>
            <Link href="/blog" className="transition-colors hover:text-foreground">Resources</Link>
          </nav>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/auth/signin" className="hidden text-foreground/65 transition-colors hover:text-foreground sm:block">Log in</Link>
            <Link href="/checkout?plan=pro-monthly" className="rounded-md bg-foreground px-4 py-2.5 font-semibold text-background transition-colors hover:bg-foreground/85">Start free trial</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20">
        <div>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-accent">For independent businesses</p>
          <h1 className="max-w-xl text-[2.9rem] font-bold leading-[1.02] tracking-[-0.055em] text-balance sm:text-6xl">The simple way to stay close to your customers.</h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-foreground/62">Feedbackr gives you one place to ask for feedback, follow up thoughtfully, and make every customer interaction count.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/checkout?plan=pro-monthly" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-foreground px-6 font-semibold text-background transition-colors hover:bg-foreground/85">Try Feedbackr free <ArrowRight size={17} /></Link>
            <Link href="/demo" className="inline-flex min-h-12 items-center justify-center rounded-md border border-border px-6 font-semibold transition-colors hover:bg-secondary">See the demo</Link>
          </div>
          <p className="mt-4 text-sm text-foreground/48">3 days free. No charge today. $20/month after the trial unless canceled.</p>
        </div>

        <div className="relative rounded-xl border border-border bg-card p-4 shadow-[0_18px_60px_-35px_rgba(20,20,20,.35)] sm:p-6">
          <div className="flex items-center justify-between border-b border-border pb-5">
            <div><p className="text-sm font-semibold">Feedback overview</p><p className="mt-1 text-xs text-foreground/45">Your last 30 days</p></div>
            <span className="rounded bg-secondary px-2.5 py-1 text-xs font-medium text-foreground/60">This month</span>
          </div>
          <div className="grid grid-cols-2 gap-3 py-5">
            <DashboardMetric label="Responses" value="184" change="+24%" />
            <DashboardMetric label="Avg. rating" value="4.8" change="+0.3" />
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="mb-5 flex items-center justify-between"><p className="text-sm font-semibold">Customer sentiment</p><BarChart3 size={17} className="text-accent" /></div>
            <div className="flex h-24 items-end gap-2">{[38, 52, 44, 68, 61, 78, 73, 92, 82, 96, 88, 100].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-accent/75" style={{ height: `${height}%` }} />)}</div>
            <div className="mt-3 flex justify-between text-[11px] text-foreground/40"><span>Apr 1</span><span>Apr 30</span></div>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-border p-3"><span className="flex size-8 items-center justify-center rounded-full bg-accent/15 text-accent"><MessageSquare size={16} /></span><div><p className="text-xs font-semibold">New feedback received</p><p className="mt-0.5 text-xs text-foreground/45">“Fast service and a great experience.”</p></div></div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/55">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-3 md:gap-12">
          <ProcessStep number="01" title="Share one link" text="Put your feedback link on receipts, follow-up emails, or a QR code at the counter." />
          <ProcessStep number="02" title="Listen first" text="Give customers a quick, clear way to tell you what went well and what needs attention." />
          <ProcessStep number="03" title="Follow through" text="See patterns, reply promptly, and make the next customer experience better." />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Made for real workflows</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-5xl">Less chasing. More useful feedback.</h2><p className="mt-5 text-lg leading-8 text-foreground/60">A lightweight system your team will actually use, whether you run one location or several.</p></div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Feature icon={<MessageSquare size={19} />} title="Feedback inbox" text="Keep comments, follow-ups, and customer context together instead of scattered across email." />
          <Feature icon={<QrCode size={19} />} title="Links and QR codes" text="Make it easy for customers to respond from wherever the interaction happened." />
          <Feature icon={<BarChart3 size={19} />} title="Clear reporting" text="Spot trends in satisfaction and response volume without digging through spreadsheets." />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8"><div className="rounded-xl bg-foreground px-6 py-12 text-background sm:px-12"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-background/55">Start small</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">A better feedback habit starts with one link.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-background/65">Try every feature free for three days. Keep it for $20/month if it helps your team stay closer to customers.</p><Link href="/checkout?plan=pro-monthly" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-background px-6 font-semibold text-foreground hover:bg-background/90">Start your trial <ArrowRight size={17} /></Link></div></div></section>

      <footer className="border-t border-border"><div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-sm text-foreground/50 sm:px-8 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-2 font-semibold text-foreground"><span className="flex size-7 items-center justify-center rounded-md bg-foreground text-background"><Star size={14} fill="currentColor" /></span>Feedbackr</div><div className="flex flex-wrap gap-x-6 gap-y-2"><Link href="/pricing" className="hover:text-foreground">Pricing</Link><Link href="/blog" className="hover:text-foreground">Resources</Link><Link href="/privacy" className="hover:text-foreground">Privacy</Link><a href="mailto:support@feedbackr.app" className="hover:text-foreground">Contact</a></div><span>© 2025 Feedbackr</span></div></footer>
    </main>
  )
}

function DashboardMetric({ label, value, change }: { label: string; value: string; change: string }) { return <div className="rounded-lg border border-border p-4"><p className="text-xs text-foreground/45">{label}</p><div className="mt-2 flex items-end justify-between"><p className="text-2xl font-bold tracking-tight">{value}</p><span className="text-xs font-semibold text-accent">{change}</span></div></div> }
function ProcessStep({ number, title, text }: { number: string; title: string; text: string }) { return <div><p className="text-sm font-semibold text-accent">{number}</p><h3 className="mt-3 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-foreground/58">{text}</p></div> }
function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="border-t-2 border-foreground/15 pt-5"><div className="flex size-9 items-center justify-center rounded-md bg-secondary text-foreground">{icon}</div><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-foreground/58">{text}</p></div> }
