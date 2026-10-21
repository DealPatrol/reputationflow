import Link from "next/link"
import { Suspense } from "react"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { PricingLink } from "@/components/marketing/pricing-link"
import { GoogleReviewQrTool } from "@/components/tools/google-review-qr-tool"
import { ReviewRequestComposer } from "@/components/tools/review-request-composer"
import { findPlaceIdSteps } from "@/lib/google-review-link"
import { breadcrumbJsonLd, faqJsonLd, freeToolJsonLd, howToJsonLd, pageMetadata } from "@/lib/seo"

const path = "/tools/google-review-link"
const toolName = "Google review link generator"
const toolDescription =
  "Free Google review link generator. Paste a Place ID or a Maps URL and get the official write-a-review URL, plus a QR code you can download. No account."

const steps = [
  ...findPlaceIdSteps,
  {
    name: "Paste it into the generator",
    text: "Paste the Place ID, the Ask for reviews link, or the long Maps URL. The result is the official write-a-review URL, and a QR code for the same URL. A maps.app.goo.gl short link does not include the Place ID, so this page cannot expand it.",
  },
  {
    name: "Put the URL where customers already are",
    text: "Copy the link into a text you send yourself, an email, or a receipt. Download the PNG on this page if you are handing someone a card. The generator does not post a review. The customer still writes it on Google.",
  },
]

const faqs = [
  {
    question: "Does the Google review link generator need an API key or an account?",
    answer:
      "No. Paste a Place ID or a review link that already contains one. The page builds the write-a-review URL and the QR code in your browser. An account is optional and is only for saving the link on a ReputationFlow page.",
  },
  {
    question: "Will this post a Google review for me?",
    answer:
      "No. The link opens Google’s review form. The customer writes and publishes the review. ReputationFlow does not submit reviews and does not pick the star rating.",
  },
  {
    question: "Why won’t a maps.app.goo.gl link work?",
    answer:
      "Those short links hide the Place ID. Open your Business Profile and choose Ask for reviews, or open Google Maps, click your listing, and paste the long address-bar URL that contains !1sChIJ.",
  },
  {
    question: "Is the Place ID the same thing as the review link?",
    answer:
      "No. The Place ID identifies the location. The review link is the write-a-review URL that contains that ID. This tool turns the ID into that URL.",
  },
  {
    question: "Can I turn the link into a QR code?",
    answer:
      "Yes. The QR code appears under the link on this page. Download the PNG, or a table tent and a review card. The same tool is also on the Google review QR code generator page.",
  },
]

export const metadata = pageMetadata({
  title: toolName,
  description: toolDescription,
  path,
  keywords: [
    "google review link generator",
    "google review link",
    "place id review link",
    "write a review url",
    "free google review link",
  ],
})

export default function GoogleReviewLinkPage() {
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
            name: "How to make a Google review link",
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
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Google review link generator</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Paste a Google Place ID, a review link that already contains one, or the long Maps URL for your listing. You get the official write-a-review URL and a QR code for that URL. The tool does not look your business up, and it does not require an account.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="h-48 rounded-2xl border border-slate-200 bg-slate-50" />}>
            <GoogleReviewQrTool source="google-review-link" ctaLocation="tool_review_link_result" />
          </Suspense>
        </div>

        <div className="mt-10">
          <ReviewRequestComposer heading="Turn that link into a text or email" />
        </div>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">How to make a Google review link</h2>
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

        <h2 className="mt-12 text-xl font-semibold text-slate-950">Use the link</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          <li>
            <Link className="font-semibold text-indigo-700" href="/tools/qr-code">
              Google review QR code generator
            </Link>
            <span className="text-slate-600"> for the same tool, with printing steps and a plain https URL option.</span>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/how-to-get-more-google-reviews">
              How to get more Google reviews
            </Link>
            <span className="text-slate-600">, including when to ask.</span>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/google-review-request-templates">
              Google review request templates
            </Link>
            <span className="text-slate-600"> for in-person, text, and email scripts.</span>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/guides">
              Review guides
            </Link>
            <span className="text-slate-600"> on asking, incentives, fake reviews, and QR codes.</span>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/industries">
              Trade guides
            </Link>
            <span className="text-slate-600"> with a sample message for plumbers, dentists, salons, and other local businesses.</span>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/google-review-qr-by-city">
              Google review QR codes by city
            </Link>
            <span className="text-slate-600"> for plumbers, HVAC, roofers, electricians, landscapers, cleaners, locksmiths, and garage door companies in major metros.</span>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/how-to-respond-to-negative-google-reviews">
              Reply templates for a negative Google review
            </Link>
            <span className="text-slate-600"> after the reviews start coming in.</span>
          </li>
          <li>
            <PricingLink location="tool_review_link_related" className="font-semibold text-indigo-700">
              Starter and Professional pricing
            </PricingLink>
            <span className="text-slate-600"> if you want the link saved on a page, or sent by email.</span>
          </li>
        </ul>
      </article>
      <CtaBand
        signupLocation="tool_review_link_cta"
        title="Save the link to a review page"
        body="Create a free account, paste this URL, and share one page that also includes Facebook, Yelp, and a private note."
      />
    </MarketingShell>
  )
}
