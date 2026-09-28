import Link from "next/link"
import { ArrowRight, QrCode, ShieldCheck, Mail, MessageSquare } from "lucide-react"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { faqs, industries } from "@/lib/marketing-content"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { faqJsonLd, organizationJsonLd, softwareJsonLd } from "@/lib/seo"

const steps = [
  {
    title: "Add your public review links",
    body: "Paste the Google review link from your Business Profile. Add Facebook or Yelp if you use them.",
  },
  {
    title: "Share one link or QR code",
    body: "Put it on the receipt, the check presenter, a text, or an email. Every customer gets the same page.",
  },
  {
    title: "Read what comes back",
    body: "See private notes in the dashboard and draft a reply. Public reviews still live on Google, Facebook, and Yelp.",
  },
]

const features = [
  {
    icon: QrCode,
    title: "Link and QR code",
    body: "One URL for your counter, invoices, and email signature. Download or print the QR code from the dashboard.",
  },
  {
    icon: Mail,
    title: "Email requests",
    body: "On the Professional plan, send a review request to a customer by email. The message links to the same public page.",
  },
  {
    icon: MessageSquare,
    title: "Private feedback, in addition",
    body: "Customers can leave a note for you. That note does not replace or block the public review buttons.",
  },
  {
    icon: ShieldCheck,
    title: "No review gating",
    body: "The page does not change based on the star rating. A 1-star tap and a 5-star tap show the same public links.",
  },
]

export default function HomePage() {
  return (
    <MarketingShell>
      <JsonLd data={[organizationJsonLd(), softwareJsonLd(), faqJsonLd(faqs)]} />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-sm font-semibold text-indigo-700">Review requests for local businesses</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Ask every customer for an honest Google review.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              ReputationFlow gives you one link and one QR code. Every customer sees your Google, Facebook, and Yelp pages, plus an optional private note.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signin?signup=1"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Start free
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/how-to-get-more-google-reviews"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                How to get more Google reviews
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">Starter is free. Professional is {formatPlanPrice(PLANS.pro.price)} per month.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">What the customer sees</p>
            <div className="mt-4 rounded-xl bg-slate-950 px-5 py-6 text-white">
              <p className="text-sm text-slate-300">How was your visit?</p>
              <p className="mt-1 text-lg font-semibold">Northside Dental</p>
              <div className="mt-4 flex gap-1 text-amber-300" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {["Google", "Facebook", "Yelp"].map((platform) => (
                <div key={platform} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium">
                  <span>Leave a {platform} review</span>
                  <span className="text-slate-400">Open</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              The same buttons appear for every rating. A private comment is optional and does not hide these links.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">How it works</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-indigo-700">Step {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">What you can do with it</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <feature.icon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-slate-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Built for the businesses that live on Google reviews</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              These pages describe how to ask in each trade. They are guides, not customer stories. ReputationFlow does not publish testimonials or usage numbers it cannot verify.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="rounded-2xl border border-slate-200 p-5 hover:border-indigo-300"
            >
              <h3 className="font-semibold text-slate-950">{industry.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{industry.intro}</p>
            </Link>
          ))}
          <Link href="/compare/birdeye" className="rounded-2xl border border-slate-200 p-5 hover:border-indigo-300">
            <h3 className="font-semibold text-slate-950">Comparing larger suites?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Read the Birdeye and Podium comparisons if you are deciding between a full platform and a focused review link.
            </p>
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Pricing</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {(["free", "pro"] as const).map((key) => {
              const plan = PLANS[key]
              return (
                <article key={key} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">
                    {formatPlanPrice(plan.price)}
                    {plan.price > 0 && <span className="text-base font-medium text-slate-500">/month</span>}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
                  <Link href="/pricing" className="mt-4 inline-flex text-sm font-semibold text-indigo-700">
                    Compare plans
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Questions</h2>
        <div className="mt-8">
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand />
    </MarketingShell>
  )
}
