import Link from "next/link"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { ReviewMessageOffer } from "@/components/marketing/review-message-offer"
import { ReviewReplyGenerator } from "@/components/tools/review-reply-generator"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { REVIEW_REPLY_TOOL_DESCRIPTION, REVIEW_REPLY_TOOL_PATH, REVIEW_REPLY_TOOL_TITLE } from "@/lib/review-reply"
import { breadcrumbJsonLd, faqJsonLd, freeToolJsonLd, howToJsonLd, pageMetadata } from "@/lib/seo"

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Free tools", path: "/tools" },
  { name: REVIEW_REPLY_TOOL_TITLE, path: REVIEW_REPLY_TOOL_PATH },
]

const steps = [
  {
    name: "Pick the star rating and what the review mentions",
    text: "A five-star thank-you and a one-star complaint need different replies. Choose the rating, then the one thing the review talks about most: a person, the work, the wait, the price, updates, or cleanup.",
  },
  {
    name: "Add your business name and a way to reach you",
    text: "Type the business name and, for unhappy customers, a phone number or email where they can reach the owner. Leave the reviewer’s last name out of the reply.",
  },
  {
    name: "Edit the draft so it matches what happened",
    text: "The draft does not read the review. Change any line that does not fit, mention one real detail if it is safe to, and keep it to two or three sentences.",
  },
  {
    name: "Paste it under the review yourself",
    text: "Open your Google Business Profile, choose Reviews, pick the review, and paste the reply. This page does not post anything for you.",
  },
]

const price = formatPlanPrice(PLANS.pro.price)

const faqs = [
  {
    question: "Does this tool read the review or use AI?",
    answer:
      "No. It fills hand-written patterns with the rating, topic, and names you choose, in your browser. Nothing you type is sent to ReputationFlow or to an AI service. Professional accounts can ask for an AI-assisted draft of a reply to private feedback inside the dashboard, and you edit it before you use it.",
  },
  {
    question: "Should I reply to every Google review?",
    answer:
      "Replying to reviews, good and bad, shows the next customer that someone reads them. Keep positive replies short and specific. For a complaint, apologize once, do not argue, and move the details to a phone call or email.",
  },
  {
    question: "Can I offer a discount or refund in the reply?",
    answer:
      "Not in public, and never in exchange for changing the review. The drafts leave out discounts, refunds, and freebies, and they never ask the customer to update or remove the review. If you want to make something right, do it in a private conversation.",
  },
  {
    question: "What about dentists, doctors, lawyers, and accountants?",
    answer:
      "Check the privacy box. The reply then thanks the person without confirming they were a patient or client and without naming the visit. Health privacy rules apply to public review replies too, so keep details out.",
  },
  {
    question: "Does ReputationFlow post replies to Google for me?",
    answer: `No. ReputationFlow does not post to Google. Starter is free and keeps one review link and QR code. Professional is ${price} per month for email review requests, the full feedback history, and AI-assisted drafts for private feedback.`,
  },
]

export const metadata = pageMetadata({
  title: REVIEW_REPLY_TOOL_TITLE,
  description: REVIEW_REPLY_TOOL_DESCRIPTION,
  path: REVIEW_REPLY_TOOL_PATH,
  keywords: [
    "google review reply generator",
    "google review response generator",
    "how to respond to a google review",
    "reply to negative google review template",
  ],
})

export default function ReviewReplyGeneratorPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          freeToolJsonLd({ name: REVIEW_REPLY_TOOL_TITLE, description: REVIEW_REPLY_TOOL_DESCRIPTION, path: REVIEW_REPLY_TOOL_PATH }),
          howToJsonLd({ name: "How to reply to a Google review", description: REVIEW_REPLY_TOOL_DESCRIPTION, path: REVIEW_REPLY_TOOL_PATH, steps }),
          faqJsonLd(faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <p className="mt-3 text-sm font-semibold text-[#4E5E52]">Free tool</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{REVIEW_REPLY_TOOL_TITLE}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          How do you reply to a Google review? Thank the person, mention one real detail, and keep it to two or three sentences. For a complaint, apologize once and give a way to reach the owner. Pick the rating below and copy a draft to edit. No account, and nothing is posted.
        </p>
        <div className="mt-8">
          <ReviewReplyGenerator />
        </div>
        <ReviewMessageOffer
          location="reply_tool"
          heading="Get more reviews to reply to"
          body={`Starter is free and keeps one Google review link and QR code for every customer. Professional is ${price} per month for email review requests, full feedback history, and AI-assisted drafts for private feedback. Neither plan posts to Google or hides the public review buttons.`}
        />

        <h2 className="mt-12 text-xl font-semibold text-slate-950">How to reply to a Google review</h2>
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

        <h2 className="mt-12 text-xl font-semibold text-slate-950">Related</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          <li>
            <Link className="font-semibold text-[#4E5E52]" href="/how-to-respond-to-negative-google-reviews">
              How to respond to negative Google reviews
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-[#4E5E52]" href="/tools/review-request-message">
              Google review request message generator
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-[#4E5E52]" href="/tools/qr-code">
              Google review QR code generator
            </Link>
          </li>
          <li>
            <a className="font-semibold text-[#4E5E52]" href="https://support.google.com/business/answer/3474050" rel="noopener" target="_blank">
              Google Business Profile Help: Manage customer reviews
            </a>
          </li>
        </ul>
      </article>
      <CtaBand
        setupLocation="reply_tool_band_setup"
        signupLocation="reply_tool_band"
        title="Ask every customer the same way"
        body={`Create a free account and the next screen asks for your Google review link. Professional is ${price} per month if you want to email review requests from the dashboard.`}
      />
    </MarketingShell>
  )
}
