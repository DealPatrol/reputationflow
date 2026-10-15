import Link from "next/link"
import { Suspense } from "react"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { ToolUpsell } from "@/components/marketing/tool-upsell"
import { GoogleReviewQrTool } from "@/components/tools/google-review-qr-tool"
import { findPlaceIdSteps } from "@/lib/google-review-link"
import { industryBySlug } from "@/lib/industries"
import { qrCityHub, qrCityPagesForTrade, qrCityPath, qrCityTradeOrder } from "@/lib/qr-city-pages"
import { breadcrumbJsonLd, faqJsonLd, freeToolJsonLd, howToJsonLd, pageMetadata } from "@/lib/seo"

const path = "/tools/qr-code"
const toolName = "Google review QR code generator"
const toolDescription =
  "Free Google review QR code generator. Paste a Place ID or a Maps URL and download a scannable QR code plus the official review link. No API key and no account."

const steps = [
  ...findPlaceIdSteps,
  {
    name: "Paste it and check the review link",
    text: "The box builds the official write-a-review URL in your browser: search.google.com/local/writereview?placeid= and your Place ID. Open that link once and confirm the name and address are yours before you print.",
  },
  {
    name: "Download the QR code",
    text: "Download the PNG, or a letter-size table tent or a smaller review card with your business name on it. The image is created on this device. Nothing is uploaded to draw it.",
  },
]

const faqs = [
  {
    question: "Does the Google review QR code generator need an API key or an account?",
    answer:
      "No. Paste a Place ID, a review link that already contains one, or the long Google Maps URL for your listing. The page builds the write-a-review URL and the QR code in your browser. An account is optional and is only for saving the link on a ReputationFlow page.",
  },
  {
    question: "What do I paste if I do not know my Place ID?",
    answer:
      "Use Ask for reviews in your Business Profile if that link contains placeid= or ChIJ. If Google only gives you a short g.page or maps.app.goo.gl link, open maps.google.com, click your listing, and paste the long address-bar URL. This page does not search Google for your business name, because that lookup uses the paid Places API.",
  },
  {
    question: "Why won’t a maps.app.goo.gl or g.page link work?",
    answer:
      "Those short links hide the Place ID. This page cannot expand them. Copy the long Maps URL that contains !1sChIJ, or the Ask for reviews link when it already includes the Place ID.",
  },
  {
    question: "Is the QR code stored on a server?",
    answer:
      "No. The code is created in your browser from the link. The printable card is built the same way, when you click download. The PNG is 640 pixels wide and includes a quiet zone so a phone can scan it.",
  },
  {
    question: "Will scanning this post a Google review for me?",
    answer:
      "No. The code opens Google’s review form for that Place ID. The customer writes and publishes the review. ReputationFlow does not submit reviews and does not pick the star rating.",
  },
  {
    question: "Can the code open my ReputationFlow page instead of Google?",
    answer:
      "Yes. Paste that https URL and the code opens it. Use that when you want Google, Facebook, and Yelp on one screen. A homepage URL makes people hunt for the review button.",
  },
]

export const metadata = pageMetadata({
  title: toolName,
  description: toolDescription,
  path,
  keywords: [
    "google review qr code generator",
    "google review qr code",
    "google review link generator",
    "place id qr code",
    "free google review qr code",
  ],
})

export default function QrCodePage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Free tools", path: "/tools" },
            { name: toolName, path },
          ]),
          freeToolJsonLd({
            name: toolName,
            description: toolDescription,
            path,
          }),
          howToJsonLd({
            name: "How to make a Google review QR code",
            description: toolDescription,
            path,
            steps,
          }),
          faqJsonLd(faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Free tools", path: "/tools" }, { name: toolName, path }]} />
        <p className="mt-3 text-sm font-semibold text-indigo-700">Free tool</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Google review QR code generator</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Paste a Place ID, a review link, or the long Google Maps URL for your listing. You get the official write-a-review link and a QR code you can download. The tool runs in your browser. It does not need an API key or an account.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="h-48 rounded-2xl border border-slate-200 bg-slate-50" />}>
            <GoogleReviewQrTool source="qr-code" allowPlainUrl ctaLocation="tool_qr_result" />
          </Suspense>
        </div>
        <ToolUpsell
          location="tool_qr"
          body="A printed card can point at Google alone. A free account hosts one page for Google, Facebook, and Yelp, with a private note beside those buttons. Use the printed code either way."
        />

        <h2 className="mt-12 text-xl font-semibold text-slate-950">How to make a Google review QR code</h2>
        <ol className="mt-4 space-y-6">
          {steps.map((step, index) => (
            <li id={`step-${index + 1}`} key={step.name}>
              <h3 className="text-base font-semibold text-slate-950">
                {index + 1}. {step.name}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={faqs} />
        </div>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">Where to put it, by trade and city</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          The generator is the same in every city. The card and the timing are not. These guides cover the jobs where a Houston slab leak, a Chicago freeze, a Phoenix attic, or a Dallas hail roof changes the ask. Other cities use the{" "}
          <Link className="font-semibold text-indigo-700" href="/industries">
            trade page
          </Link>
          . The full list is the{" "}
          <Link className="font-semibold text-indigo-700" href={qrCityHub.path}>
            {qrCityHub.title.toLowerCase()}
          </Link>{" "}
          hub.
        </p>
        <div className="mt-4 space-y-4">
          {qrCityTradeOrder().map((tradeSlug) => {
            const trade = industryBySlug(tradeSlug)
            if (!trade) return null
            return (
              <section key={tradeSlug}>
                <h3 className="text-base font-semibold text-slate-950">
                  <Link className="text-indigo-700" href={`/industries/${trade.slug}`}>
                    {trade.name}
                  </Link>
                </h3>
                <ul className="mt-2 space-y-1 text-sm leading-7">
                  {qrCityPagesForTrade(tradeSlug).map((page) => (
                    <li key={page.citySlug}>
                      <Link className="font-semibold text-indigo-700" href={qrCityPath(page)}>
                        {page.heading}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">Related</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          <li>
            <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
              Google review link generator
            </Link>
            <span className="text-slate-600"> if you want the same link with the wording focused on email and text.</span>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/how-to-get-more-google-reviews">
              How to get more Google reviews
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/guides/review-qr-code-ideas">
              Review QR code ideas
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/google-review-request-templates">
              Review request templates
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/industries">
              Where to put the card, by trade
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/pricing">
              Starter and Professional pricing
            </Link>
          </li>
        </ul>
      </article>
      <CtaBand
        signupLocation="tool_qr_cta"
        title="Use the QR code on your ReputationFlow page"
        body="A free account hosts the customer page, so the QR code can include Google, Facebook, Yelp, and a private note."
      />
    </MarketingShell>
  )
}
