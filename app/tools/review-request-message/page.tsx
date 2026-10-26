import Link from "next/link"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { ReviewMessageOffer } from "@/components/marketing/review-message-offer"
import { SetupLink } from "@/components/marketing/setup-link"
import { ReviewMessageGenerator } from "@/components/tools/review-message-generator"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import {
  REVIEW_MESSAGE_TOOL_DESCRIPTION,
  REVIEW_MESSAGE_TOOL_PATH,
  REVIEW_MESSAGE_TOOL_TITLE,
  reviewMessageHeading,
  reviewMessagePages,
  reviewMessagePath,
} from "@/lib/review-message-pages"
import { breadcrumbJsonLd, faqJsonLd, freeToolJsonLd, howToJsonLd, pageMetadata } from "@/lib/seo"
import { SETUP_CTA_NOTE } from "@/lib/signup"

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Free tools", path: "/tools" },
  { name: REVIEW_MESSAGE_TOOL_TITLE, path: REVIEW_MESSAGE_TOOL_PATH },
]

const steps = [
  {
    name: "Pick the trade",
    text: "Choose the trade that matches the visit. General service is the short version when none of the trades fit. Each trade page has the same script with the timing for that job.",
  },
  {
    name: "Add the business name and the review link",
    text: "Type the business name, your name, and the customer’s first name if you have it. Paste a Place ID, a write-a-review link, or the long Maps URL. A short g.page link will not work. The box turns a Place ID into the official review link.",
  },
  {
    name: "Copy one message and send it yourself",
    text: "Copy the text or the email. Send it from your own phone or the mail program you already use. This page does not send it. Use one channel per customer, and do not add a star rating or a discount.",
  },
]

const price = formatPlanPrice(PLANS.pro.price)

const faqs = [
  {
    question: "Does the review request message generator send the text or the email?",
    answer:
      "No. You copy the message and send it. ReputationFlow does not send SMS. On the Professional plan the product can email a review link when you choose the customer. That send happens from your account, not from this page.",
  },
  {
    question: "Do I need an account to copy a review request?",
    answer:
      "No. The generator runs in the browser and does not store the message. A free Starter account is what saves the Google review link and the QR code on one page you can reuse.",
  },
  {
    question: "What should I paste as the Google review link?",
    answer:
      "A Place ID that starts with ChIJ, a write-a-review link that already contains one, or the long Google Maps URL for your listing. Short g.page and maps.app.goo.gl links hide the Place ID. You can also paste another https address, such as a ReputationFlow page, and the message will use that URL.",
  },
  {
    question: "Can I add a star rating or a discount to the message?",
    answer:
      "No. Do not name a star rating, and do not offer a gift, a discount, or a free service for a review. Google’s policies prohibit incentives. The scripts do not include them.",
  },
  {
    question: "What does Professional add after I have the message?",
    answer: `Professional is ${price} per month. It can email a review link when you choose the customer, and it keeps the full feedback history. It does not send texts. Starter is free and does not ask for a card. Choosing Professional opens Stripe checkout as soon as the account exists.`,
  },
]

export const metadata = pageMetadata({
  title: REVIEW_MESSAGE_TOOL_TITLE,
  description: REVIEW_MESSAGE_TOOL_DESCRIPTION,
  path: REVIEW_MESSAGE_TOOL_PATH,
  keywords: [
    "google review request message generator",
    "google review text template",
    "google review email template",
    "how to ask for a google review",
  ],
})

export default function ReviewRequestMessagePage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          freeToolJsonLd({
            name: REVIEW_MESSAGE_TOOL_TITLE,
            description: REVIEW_MESSAGE_TOOL_DESCRIPTION,
            path: REVIEW_MESSAGE_TOOL_PATH,
          }),
          howToJsonLd({
            name: "How to write a Google review request",
            description: REVIEW_MESSAGE_TOOL_DESCRIPTION,
            path: REVIEW_MESSAGE_TOOL_PATH,
            steps,
          }),
          faqJsonLd(faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <p className="mt-3 text-sm font-semibold text-indigo-700">Free tool</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{REVIEW_MESSAGE_TOOL_TITLE}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Type the business name, pick the trade, and paste the Google review link. You get a text and an email you can copy. The tool does not send either one, and it does not need an account.
        </p>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          <SetupLink location="message_tool_intro" className="font-semibold text-indigo-700" />
          . {SETUP_CTA_NOTE}
        </p>
        <div className="mt-8">
          <ReviewMessageGenerator />
        </div>
        <ReviewMessageOffer location="message_tool" />

        <h2 className="mt-12 text-xl font-semibold text-slate-950">How to write a Google review request</h2>
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

        <h2 className="mt-12 text-xl font-semibold text-slate-950">Text templates by trade</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          The generator uses the same scripts on every trade page. Open the trade when you want the timing and the words you should leave out. The{" "}
          <Link className="font-semibold text-indigo-700" href="/google-review-request-templates">
            template pack
          </Link>{" "}
          is the same wording as a file you can download.
        </p>
        <ul className="mt-4 space-y-4">
          {reviewMessagePages.map((page) => (
            <li key={page.slug}>
              <Link className="font-semibold text-indigo-700" href={reviewMessagePath(page)}>
                {reviewMessageHeading(page)}
              </Link>
              <p className="mt-1 text-sm leading-6 text-slate-600">{page.description}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={faqs} />
        </div>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">Related</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          <li>
            <Link className="font-semibold text-indigo-700" href="/tools/qr-code">
              Google review QR code generator
            </Link>
            <span className="text-slate-600"> if you still need the link or a printable code.</span>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
              Google review link generator
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/guides/review-request-text-message-templates">
              Review request text message templates
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/guides/review-request-email-templates">
              Review request email templates
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/industries">
              When to ask, by trade
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/google-review-qr-by-city">
              Google review QR codes by city
            </Link>
          </li>
        </ul>
      </article>
      <CtaBand
        setupLocation="message_tool_band_setup"
        signupLocation="message_tool_band"
        title="Put the message on a link you can reuse"
        body={`Create a free account and the next screen asks for the Google review link. Professional is ${price} per month if you want to email that link yourself from the dashboard.`}
      />
    </MarketingShell>
  )
}
