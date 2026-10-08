import Link from "next/link"
import { Check } from "lucide-react"
import { CtaBand } from "@/components/marketing/cta-band"
import { SignupLink } from "@/components/marketing/signup-link"
import { SIGNUP_PATH } from "@/lib/signup"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { faqs } from "@/lib/marketing-content"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { faqJsonLd, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "ReputationFlow pricing for local businesses. Start free with one review link, or use Professional for $20 per month.",
  path: "/pricing",
  keywords: ["review management software pricing", "google review software cost", "reputationflow pricing"],
})

export default function PricingPage() {
  return (
    <MarketingShell>
      <JsonLd data={faqJsonLd(faqs)} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Pricing</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950">
          A free review link, or $20 a month when you want email requests.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          No setup fee. Professional is billed monthly through Stripe and can be canceled in the customer portal. There is no free trial on top of the Starter plan.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {(["free", "pro"] as const).map((key) => {
            const plan = PLANS[key]
            const featured = key === "pro"
            return (
              <article
                key={key}
                className={`rounded-2xl border p-6 sm:p-8 ${featured ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
              >
                {featured && <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Professional</p>}
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">{plan.name}</h2>
                <p className="mt-3 text-4xl font-semibold tracking-tight">
                  {formatPlanPrice(plan.price)}
                  {plan.price > 0 && <span className="text-base font-medium text-slate-500">/month</span>}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <SignupLink
                  href={SIGNUP_PATH}
                  location={featured ? "pricing_professional" : "pricing_starter"}
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold ${
                    featured ? "bg-indigo-600 text-white hover:bg-indigo-500" : "border border-slate-300 bg-white text-slate-900"
                  }`}
                >
                  {featured ? "Create a free account, then checkout" : "Create a free account"}
                </SignupLink>
              </article>
            )
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">What happens at checkout</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Create a Starter account. That plan is free and does not ask for a card.</li>
            <li>Open Billing and choose Professional when you want email requests, full history, export, and reply drafts.</li>
            <li>Stripe charges {formatPlanPrice(PLANS.pro.price)} per month. There is no trial on top of Starter and no setup fee.</li>
            <li>Cancel in the Stripe customer portal whenever you want. Access lasts through the period you already paid.</li>
          </ol>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Fees are non-refundable except where the law requires a refund. That is the same rule as the{" "}
            <Link href="/terms" className="font-semibold text-indigo-700">terms</Link>.
            There is no guarantee period and no extra free trial in the product. Starter remains free if you never upgrade.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">Every customer sees the public review links</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            The review page lists Google, Facebook, and Yelp for every star rating. A private note is an extra box on that same page. It is offered in addition to those links, and the page does not change when the rating is low.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-950">What $20 does not include</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            ReputationFlow does not text customers, import Google reviews, manage map listings, or offer a white-label app. SMS is not part of either plan. If you need a full inbox and payments product, read the{" "}
            <Link href="/compare/podium" className="font-semibold text-indigo-700">Podium comparison</Link>
            {" "}before you buy. For review-request marketing, read the{" "}
            <Link href="/compare/nicejob" className="font-semibold text-indigo-700">NiceJob comparison</Link>.
          </p>
        </div>

        <h2 className="mt-16 text-2xl font-semibold tracking-tight">Pricing questions</h2>
        <div className="mt-6">
          <FaqList items={faqs} />
        </div>
      </section>
      <CtaBand title="Start on the free plan" body="Add your Google review link and share the page. Upgrade only if you want email requests and the full history." />
    </MarketingShell>
  )
}
