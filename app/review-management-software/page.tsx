import Link from "next/link"
import { CtaBand } from "@/components/marketing/cta-band"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Review management software for small business",
  description:
    "Review management software for a small business that needs a Google review link, QR code, email requests, and private feedback without a large suite.",
  path: "/review-management-software",
  keywords: [
    "review management software for small business",
    "reputation management software",
    "google review software",
    "small business review requests",
  ],
})

const needs = [
  {
    title: "A link staff will actually use",
    body: "If the tool takes a training session, the front desk will not open it. ReputationFlow is a URL and a QR code.",
  },
  {
    title: "The same ask for every customer",
    body: "Small businesses get in trouble when software hides public review options after a low rating. This product does not do that.",
  },
  {
    title: "A price that matches one location",
    body: `Starter is free. Professional is ${formatPlanPrice(PLANS.pro.price)} per month for email requests, history, export, and response drafts.`,
  },
]

export default function ReviewSoftwarePage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Product</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
          Review management software for small business
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Most local businesses do not need a listings department. They need customers to find the Google review form, and they need a place to read the notes people would rather send in private.
        </p>
        <div className="mt-10 space-y-8">
          {needs.map((need) => (
            <section key={need.title}>
              <h2 className="text-xl font-semibold text-slate-950">{need.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{need.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm leading-7 text-slate-600">
          If you are comparing ReputationFlow with a larger platform, read the{" "}
          <Link className="font-semibold text-indigo-700" href="/compare/birdeye">Birdeye alternative</Link>
          {" "}and{" "}
          <Link className="font-semibold text-indigo-700" href="/compare/podium">Podium alternative</Link>
          {" "}pages. They describe what those products cover that this one does not.
        </p>
      </article>
      <CtaBand />
    </MarketingShell>
  )
}
