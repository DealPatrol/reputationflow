import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { SignupLink } from "@/components/marketing/signup-link"
import { GoogleReviewQrTool } from "@/components/tools/google-review-qr-tool"
import { industryBySlug } from "@/lib/industries"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import {
  otherQrCities,
  otherTradesInQrCity,
  qrCityHub,
  qrCityPage,
  qrCityPages,
  qrCityPath,
} from "@/lib/qr-city-pages"
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo"
import { SIGNUP_PATH } from "@/lib/signup"

export const dynamicParams = false

export function generateStaticParams() {
  return qrCityPages.map((page) => ({ slug: page.tradeSlug, city: page.citySlug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; city: string }> }) {
  const { slug, city } = await params
  const page = qrCityPage(slug, city)
  if (!page) return {}
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: qrCityPath(page),
    keywords: [page.query, "google review qr code", page.cityName.toLowerCase()],
  })
}

export default async function QrCityPage({ params }: { params: Promise<{ slug: string; city: string }> }) {
  const { slug, city } = await params
  const page = qrCityPage(slug, city)
  const trade = page ? industryBySlug(page.tradeSlug) : null
  if (!page || !trade) notFound()

  const path = qrCityPath(page)
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: trade.name, path: `/industries/${trade.slug}` },
    { name: page.cityName, path },
  ]
  const otherCities = otherQrCities(page)
  const otherTrades = otherTradesInQrCity(page)

  return (
    <MarketingShell>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(page.faqs)]} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <p className="mt-3 text-sm font-semibold text-indigo-700">{page.cityName}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{page.heading}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{page.intro}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <SignupLink
            href={SIGNUP_PATH}
            location={`qr_city_${page.tradeSlug}_${page.citySlug}`}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Start free
          </SignupLink>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800"
          >
            View pricing
          </Link>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Starter is free and includes the review link and the QR code. Professional is {formatPlanPrice(PLANS.pro.price)} per month when you want to email the request from ReputationFlow. There is no trial on top of Starter. You can cancel Professional in the Stripe customer portal.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Where to put the QR code</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
          {page.placements.map((placement) => (
            <li key={placement}>{placement}</li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">What to say</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Copy this into a text you send yourself. Replace the brackets. ReputationFlow does not text customers. Do not add a star target, a sentence for them to paste, or a discount.
        </p>
        <blockquote className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-800">
          {page.script}
        </blockquote>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">When to follow up</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">{page.timing}</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Use the Google profile you already have. This page is not a reason to open a listing in {page.cityName} if you do not have a real location there. A service-area business with one profile gets one review link.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Make the QR code</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Paste a Place ID or the long Google Maps URL. The code is created in your browser. The longer printing steps are on the{" "}
          <Link className="font-semibold text-indigo-700" href="/tools/qr-code">
            Google review QR code generator
          </Link>
          . The national version, including the best moment to ask, is{" "}
          <Link className="font-semibold text-indigo-700" href={`/industries/${trade.slug}`}>
            {trade.title}
          </Link>
          .
        </p>
        <div className="mt-6">
          <Suspense fallback={<div className="h-48 rounded-2xl border border-slate-200 bg-slate-50" />}>
            <GoogleReviewQrTool
              source="qr-code"
              allowPlainUrl
              ctaLocation={`qr_city_tool_${page.tradeSlug}_${page.citySlug}`}
              usagePage={path}
            />
          </Suspense>
        </div>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={page.faqs} />
        </div>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Other cities for {trade.name}</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          {otherCities.map((item) => (
            <li key={item.citySlug}>
              <Link className="font-semibold text-indigo-700" href={qrCityPath(item)}>
                {item.heading}
              </Link>
            </li>
          ))}
        </ul>

        {otherTrades.length > 0 ? (
          <>
            <h2 className="mt-10 text-xl font-semibold text-slate-950">Other trades in {page.cityName}</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7">
              {otherTrades.map((item) => (
                <li key={item.tradeSlug}>
                  <Link className="font-semibold text-indigo-700" href={qrCityPath(item)}>
                    {item.heading}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <p className="mt-8 text-sm leading-7 text-slate-600">
          Every city page is listed on{" "}
          <Link className="font-semibold text-indigo-700" href={qrCityHub.path}>
            {qrCityHub.title}
          </Link>
          . More wording is in the{" "}
          <Link className="font-semibold text-indigo-700" href="/google-review-request-templates">
            review request templates
          </Link>
          .
        </p>
      </article>
      <CtaBand
        signupLocation={`qr_city_band_${page.tradeSlug}_${page.citySlug}`}
        title={`Start free and print the ${page.cityName} QR code`}
        body={`Save the Google review link for your ${trade.businessLabel}. Starter is free. Professional is ${formatPlanPrice(PLANS.pro.price)} per month if you want email requests.`}
      />
    </MarketingShell>
  )
}
