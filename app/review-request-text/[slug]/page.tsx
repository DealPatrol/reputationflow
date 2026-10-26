import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { ReviewMessageOffer } from "@/components/marketing/review-message-offer"
import { SetupLink } from "@/components/marketing/setup-link"
import { ReviewMessageGenerator } from "@/components/tools/review-message-generator"
import { industryBySlug } from "@/lib/industries"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { qrCityPagesForTrade, qrCityPath } from "@/lib/qr-city-pages"
import {
  REVIEW_MESSAGE_TOOL_PATH,
  REVIEW_MESSAGE_TOOL_TITLE,
  relatedReviewMessagePages,
  reviewMessageHeading,
  reviewMessagePageBySlug,
  reviewMessagePages,
  reviewMessagePath,
} from "@/lib/review-message-pages"
import { templateForReviewMessage } from "@/lib/review-message"
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo"
import { SETUP_CTA_NOTE } from "@/lib/signup"

export const dynamicParams = false

export function generateStaticParams() {
  return reviewMessagePages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = reviewMessagePageBySlug(slug)
  if (!page) return {}
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: reviewMessagePath(page),
    keywords: [page.keyword, "google review text template", "google review email template"],
  })
}

export default async function ReviewRequestTextPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = reviewMessagePageBySlug(slug)
  if (!page) notFound()

  const heading = reviewMessageHeading(page)
  const path = reviewMessagePath(page)
  const template = templateForReviewMessage(page.templateTrade)
  const industry = industryBySlug(page.industrySlug)
  const cities = qrCityPagesForTrade(page.industrySlug)
  const related = relatedReviewMessagePages(page.slug)
  const price = formatPlanPrice(PLANS.pro.price)
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Free tools", path: "/tools" },
    { name: REVIEW_MESSAGE_TOOL_TITLE, path: REVIEW_MESSAGE_TOOL_PATH },
    { name: heading, path },
  ]

  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          articleJsonLd({ title: heading, description: page.description, path }),
          faqJsonLd(page.faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <p className="mt-3 text-sm font-semibold text-indigo-700">Text template</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{heading}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{page.intro}</p>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          <SetupLink location={`message_${page.slug}_intro`} className="font-semibold text-indigo-700" />
          . {SETUP_CTA_NOTE}
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">When to send it</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">{page.sendWhen}</p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Text</h2>
        <blockquote className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-800">
          {template.sms}
        </blockquote>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Email</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">Subject: {page.emailSubject}</p>
        <blockquote className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-800">
          {template.email}
        </blockquote>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">What to leave out</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">{page.leaveOut}</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Do not offer a discount, a gift, or a free service for a review, and do not name a star rating. Google&apos;s policies prohibit incentives. The script does not include them.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Which channel</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">{page.channelNote}</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">In person: {template.inPerson}</p>

        <div className="mt-10">
          <ReviewMessageGenerator
            key={page.slug}
            initialSlug={page.slug}
            heading={`Fill the ${page.templateTrade === "HVAC" ? "HVAC" : page.templateTrade.toLowerCase()} message`}
          />
        </div>
        <ReviewMessageOffer location={`message_${page.slug}`} />

        <h2 className="mt-10 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={page.faqs} />
        </div>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Related</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          {industry ? (
            <li>
              <Link className="font-semibold text-indigo-700" href={`/industries/${industry.slug}`}>
                {industry.title}
              </Link>
              <span className="text-slate-600"> for where the QR code goes.</span>
            </li>
          ) : null}
          {cities.map((city) => (
            <li key={city.citySlug}>
              <Link className="font-semibold text-indigo-700" href={qrCityPath(city)}>
                {city.heading}
              </Link>
            </li>
          ))}
          <li>
            <Link className="font-semibold text-indigo-700" href={REVIEW_MESSAGE_TOOL_PATH}>
              {REVIEW_MESSAGE_TOOL_TITLE}
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/tools/qr-code">
              Google review QR code generator
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/google-review-request-templates">
              All review request templates
            </Link>
          </li>
          {related.map((item) => (
            <li key={item.slug}>
              <Link className="font-semibold text-indigo-700" href={reviewMessagePath(item)}>
                {reviewMessageHeading(item)}
              </Link>
            </li>
          ))}
        </ul>
      </article>
      <CtaBand
        setupLocation={`message_${page.slug}_band_setup`}
        signupLocation={`message_${page.slug}_band`}
        title={`Set up the link behind this ${page.templateTrade === "HVAC" ? "HVAC" : page.templateTrade.toLowerCase()} text`}
        body={`Starter is free. Professional is ${price} per month if you want to email a review link when you choose the customer. You still send any text yourself.`}
      />
    </MarketingShell>
  )
}
