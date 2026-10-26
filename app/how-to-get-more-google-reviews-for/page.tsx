import Link from "next/link"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { TradeGuideCta } from "@/components/marketing/trade-guide-cta"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { tradeReviewGuideHub, tradeReviewGuidePath, tradeReviewGuides } from "@/lib/trade-review-guides"

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Guides by trade", path: tradeReviewGuideHub.path },
]

export const metadata = pageMetadata({
  title: tradeReviewGuideHub.title,
  description: tradeReviewGuideHub.description,
  path: tradeReviewGuideHub.path,
  keywords: [
    "how to get more google reviews",
    "google reviews for plumbers",
    "google reviews by trade",
    "google review scripts",
  ],
})

export default function TradeReviewGuideHubPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          faqJsonLd(tradeReviewGuideHub.faqs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: tradeReviewGuideHub.title,
            itemListElement: tradeReviewGuides.map((guide, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: guide.title,
              url: absoluteUrl(tradeReviewGuidePath(guide)),
            })),
          },
        ]}
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950">{tradeReviewGuideHub.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{tradeReviewGuideHub.intro}</p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          The general workflow is{" "}
          <Link className="font-semibold text-indigo-700" href="/how-to-get-more-google-reviews">
            how to get more Google reviews
          </Link>
          . Where the card goes, including cities, starts at{" "}
          <Link className="font-semibold text-indigo-700" href="/google-review-qr-by-city">
            Google review QR codes by city
          </Link>{" "}
          and the{" "}
          <Link className="font-semibold text-indigo-700" href="/industries">
            trade QR pages
          </Link>
          .
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {tradeReviewGuides.map((guide) => (
            <li key={guide.slug}>
              <Link href={tradeReviewGuidePath(guide)} className="block h-full rounded-2xl border border-slate-200 p-5 hover:border-indigo-300">
                <h2 className="font-semibold text-slate-950">{guide.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{guide.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mt-12 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4 max-w-3xl">
          <FaqList items={tradeReviewGuideHub.faqs} />
        </div>
        <TradeGuideCta location="reviews_for_hub" />
      </section>
      <CtaBand
        signupLocation="reviews_for_hub_band"
        setupLocation="reviews_for_hub_band_setup"
        title="Turn a trade guide into a link"
        body={`Starter keeps the Google review link and the QR code. Professional is ${formatPlanPrice(PLANS.pro.price)} per month when you want to email the request.`}
      />
    </MarketingShell>
  )
}
