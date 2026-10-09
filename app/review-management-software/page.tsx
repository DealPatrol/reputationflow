import Link from "next/link"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { comparisons } from "@/lib/marketing-content"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo"

const fits = [
  {
    need: "A Google review link, a QR code, and the same public buttons for every customer",
    lookAt: "ReputationFlow, or the free tools on this site if you only need the link and a printable card.",
  },
  {
    need: "Listings, surveys, and reporting across many locations",
    lookAt: "Birdeye. It is a broad reputation suite. ReputationFlow does not manage map listings.",
  },
  {
    need: "Texting, webchat, or payments in the same login as reviews",
    lookAt: "Podium. ReputationFlow does not text customers and does not take payments.",
  },
  {
    need: "Review requests as a marketing product for a service business",
    lookAt: "NiceJob. ReputationFlow does not run a review-marketing suite or republish reviews as ads.",
  },
]

const faqs = [
  {
    question: "What is the best review management software for a small business?",
    answer:
      "For a single-location business that needs customers to find the Google review form, the useful tool is a link and a QR code. ReputationFlow does that, with Starter free and Professional at $20 per month. A multi-location listings team, a texting inbox, or a review-marketing suite is a different product.",
  },
  {
    question: "Is this a ranked award or a sponsored list?",
    answer:
      "No. ReputationFlow sells the product on this site. The notes above say when Birdeye, Podium, or NiceJob is the clearer fit. We do not publish their prices, ratings, or customer counts.",
  },
  {
    question: "Does the best option include a free trial?",
    answer:
      "ReputationFlow’s Starter plan is free, with no card. Professional is $20 per month through Stripe. There is no extra trial. You can cancel Professional in the Stripe customer portal and keep access through the period already paid. Fees are non-refundable except where the law requires a refund.",
  },
]

export const metadata = pageMetadata({
  title: "Best review management software for small business",
  description:
    "How to choose review management software for a small business: a free review link, or a larger suite for listings, texting, or review marketing.",
  path: "/review-management-software",
  keywords: [
    "best review management software for small business",
    "review management software for small business",
    "birdeye alternative",
    "podium alternative",
    "nicejob alternative",
  ],
})

export default function ReviewSoftwarePage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Review management software", path: "/review-management-software" },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Comparison</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
          Best review management software for small business
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          “Best” depends on the job. A one-location shop usually needs a Google review link the staff will actually hand over. A multi-location brand may need listings software. This page says which is which. It is not a trophy list, and it does not invent scores.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Match the software to the job</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th scope="col" className="py-3 pr-4 font-semibold">What you need</th>
                <th scope="col" className="py-3 font-semibold">Where to look</th>
              </tr>
            </thead>
            <tbody>
              {fits.map((row) => (
                <tr key={row.need} className="border-b border-slate-100 align-top">
                  <th scope="row" className="py-3 pr-4 font-medium text-slate-800">{row.need}</th>
                  <td className="py-3 text-slate-600">{row.lookAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          ReputationFlow Starter is free. Professional is {formatPlanPrice(PLANS.pro.price)} per month for email requests, full history, CSV export, and reply drafts you edit before you publish. There is no trial beyond the free plan.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">What we will not claim</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          We do not publish another company’s price, star rating, or customer count. We do not say ReputationFlow imports your Google reviews, texts customers, or hides public review buttons after a low rating. It does none of those.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Read the narrower pages</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          {comparisons.map((comparison) => (
            <li key={comparison.slug}>
              <Link className="font-semibold text-indigo-700" href={`/compare/${comparison.slug}`}>
                {comparison.name} alternative
              </Link>
            </li>
          ))}
          <li>
            <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
              Free Google review link generator
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/tools/qr-code">
              Free QR code and table tent
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/how-to-respond-to-negative-google-reviews">
              How to respond to negative Google reviews
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/pricing">
              Pricing and what Stripe checkout includes
            </Link>
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={faqs} />
        </div>
        <p className="mt-10 text-sm leading-7 text-slate-600">
          Comparing vendors? Use the{" "}
          <Link className="font-semibold text-indigo-700" href="/guides/how-to-choose-review-management-software">review software buyer checklist</Link>
          {" "}before you book a demo.
        </p>
      </article>
      <CtaBand
        signupLocation="review_software"
        title="Start with the free review link"
        body="Create an account and add your Google review URL. Upgrade only if you want email requests and the full history."
      />
    </MarketingShell>
  )
}
