import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { TradeGuideCta } from "@/components/marketing/trade-guide-cta"
import { industryBySlug } from "@/lib/industries"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { qrCityPagesForTrade, qrCityPath } from "@/lib/qr-city-pages"
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd, pageMetadata } from "@/lib/seo"
import {
  relatedTradeReviewGuides,
  tradeReviewGuideBySlug,
  tradeReviewGuideHub,
  tradeReviewGuidePath,
  tradeReviewGuides,
} from "@/lib/trade-review-guides"

export const dynamicParams = false

export function generateStaticParams() {
  return tradeReviewGuides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = tradeReviewGuideBySlug(slug)
  if (!guide) return {}
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: tradeReviewGuidePath(guide),
    keywords: [guide.title.toLowerCase(), "google reviews", guide.queryName, "review request template"],
  })
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((paragraph) => (
        <p key={paragraph} className="mt-2 text-sm leading-7 text-slate-600">
          {paragraph}
        </p>
      ))}
    </>
  )
}

export default async function TradeReviewGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = tradeReviewGuideBySlug(slug)
  if (!guide) notFound()
  const industry = industryBySlug(guide.industrySlug)
  if (!industry) notFound()
  const path = tradeReviewGuidePath(guide)
  const cities = qrCityPagesForTrade(guide.industrySlug)
  const related = relatedTradeReviewGuides(guide.slug)
  const price = formatPlanPrice(PLANS.pro.price)
  const locationBase = `reviews_for_${guide.slug.replace(/-/g, "_")}`
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides by trade", path: tradeReviewGuideHub.path },
    { name: guide.name, path },
  ]

  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          articleJsonLd({ title: guide.title, description: guide.description, path }),
          howToJsonLd({ name: guide.title, description: guide.description, path, steps: guide.steps }),
          faqJsonLd(guide.faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <p className="mt-3 text-sm font-semibold text-indigo-700">Guide</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{guide.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{guide.intro}</p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">The short version</h2>
        <ol className="mt-4 list-decimal space-y-4 pl-5">
          {guide.steps.map((step, index) => (
            <li key={step.name} id={`step-${index + 1}`} className="text-sm leading-7 text-slate-600">
              <span className="font-semibold text-slate-950">{step.name}. </span>
              {step.text}
            </li>
          ))}
        </ol>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">When to ask</h2>
        <Paragraphs items={guide.whenToAsk} />

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Where the link goes</h2>
        <Paragraphs items={guide.placement} />
        <p className="mt-2 text-sm leading-7 text-slate-600">
          The QR-code page for this trade, including the best surface for the card, is{" "}
          <Link className="font-semibold text-indigo-700" href={`/industries/${industry.slug}`}>
            {industry.title}
          </Link>
          .
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">What to say</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Copy one script and replace the brackets. Send the text from your own phone. ReputationFlow does not send SMS. On Professional ({price} per month) you can email the same link when you choose the customer. Starter is free and does not send email. Use one channel per customer. Do not add a star rating or a sentence for them to paste.
        </p>
        <div className="mt-4 space-y-4">
          {guide.templates.map((template) => (
            <section key={template.label}>
              <h3 className="text-base font-semibold text-slate-950">{template.label}</h3>
              <blockquote className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-800">
                {template.body}
              </blockquote>
            </section>
          ))}
        </div>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">When to follow up</h2>
        <Paragraphs items={guide.followUp} />

        <h2 className="mt-10 text-xl font-semibold text-slate-950">When a review is already public</h2>
        <Paragraphs items={guide.badReview} />
        <p className="mt-2 text-sm leading-7 text-slate-600">
          {guide.reply ? (
            <>
              Edit a template, then post it on Google yourself:{" "}
              <Link className="font-semibold text-indigo-700" href={guide.reply.path}>
                {guide.reply.label}
              </Link>
              .{" "}
            </>
          ) : null}
          The general process is{" "}
          <Link className="font-semibold text-indigo-700" href="/how-to-respond-to-negative-google-reviews">
            how to respond to negative Google reviews
          </Link>
          . A review that describes a visit you cannot find is covered in{" "}
          <Link className="font-semibold text-indigo-700" href="/guides/how-to-remove-a-fake-google-review">
            how to remove a fake Google review
          </Link>
          . That page does not promise a removal.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">What to leave out</h2>
        <Paragraphs items={guide.avoid} />
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Every customer sees the same Google, Facebook, and Yelp links, including after a bad visit. A private note is an extra box on that page. It does not replace those links. Incentives are covered in{" "}
          <Link className="font-semibold text-indigo-700" href="/guides/incentivizing-reviews-ftc-rules">
            whether it is allowed to incentivize Google reviews
          </Link>
          . That page is general information, not legal advice.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">In a specific city</h2>
        {cities.length > 0 ? (
          <>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              These cities change where the card goes or when you send the text, because the job is different there. The ask on this page is the national version. If your city is missing, use this page.
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-7">
              {cities.map((city) => (
                <li key={city.citySlug}>
                  <Link className="font-semibold text-indigo-700" href={qrCityPath(city)}>
                    {city.heading}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-2 text-sm leading-7 text-slate-600">
            This trade does not have separate city pages. Use the ask above in every town you serve. A city name on its own is not a different script. Placement for the card is on{" "}
            <Link className="font-semibold text-indigo-700" href={`/industries/${industry.slug}`}>
              {industry.title}
            </Link>
            .
          </p>
        )}

        <TradeGuideCta location={locationBase} />

        <h2 className="mt-10 text-xl font-semibold text-slate-950">More for this trade</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          <li>
            <Link className="font-semibold text-indigo-700" href={tradeReviewGuideHub.path}>
              {tradeReviewGuideHub.title}
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/google-review-request-templates">
              Google review request templates
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
              Google review link generator
            </Link>
          </li>
          {related.map((item) => (
            <li key={item.slug}>
              <Link className="font-semibold text-indigo-700" href={tradeReviewGuidePath(item)}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={guide.faqs} />
        </div>
      </article>
      <CtaBand
        signupLocation={`${locationBase}_band`}
        setupLocation={`${locationBase}_band_setup`}
        title={`Set up review requests for your ${industry.businessLabel}`}
        body={`Starter keeps the link and the QR code. Professional is ${price} per month when you want to email the request.`}
      />
    </MarketingShell>
  )
}
