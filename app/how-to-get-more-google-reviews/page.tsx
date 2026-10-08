import Link from "next/link"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { GuideResources } from "@/components/marketing/guide-resources"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "How to get more Google reviews",
  description:
    "A practical guide to getting more Google reviews: claim your profile, use a direct review link, ask every customer the same way, and reply in public.",
  path: "/how-to-get-more-google-reviews",
  keywords: [
    "how to get more google reviews",
    "google review link",
    "ask customers for google reviews",
    "google business profile reviews",
  ],
})

const faqs = [
  {
    question: "How many Google reviews do I need before I ask?",
    answer:
      "Google does not publish a minimum. Ask after a finished visit, the same way, every time. A quota is the wrong target. The guide on how many reviews it takes to rank explains what Google does publish.",
  },
  {
    question: "Can I offer a discount for the review?",
    answer:
      "No. Google’s policies prohibit incentives for reviews. Do not add a gift or a coupon to the ask. The guide on incentivizing reviews covers the FTC rule and Google’s rule together, and it is not legal advice.",
  },
  {
    question: "Does ReputationFlow send the text for me?",
    answer:
      "No. You send texts from your own phone. On the Professional plan you can email the review link when you choose the customer. Starter is free and does not send email.",
  },
]

const steps = [
  {
    title: "Claim and finish your Google Business Profile",
    body: "Reviews attach to the profile customers see on Maps. Confirm the name, category, hours, and phone number match the storefront before you ask anyone to review it.",
  },
  {
    title: "Copy a direct review link",
    body: "In the Business Profile manager, open Ask for reviews and copy the short link. You can also paste a Place ID into the free generator on this site. A normal Maps search URL is not a review link.",
  },
  {
    title: "Ask at the end of the visit",
    body: "The useful moment is checkout, the final walkthrough, or the receipt email. One sentence is enough: “If you have a minute, a Google review helps other people find us.”",
  },
  {
    title: "Make the page short",
    body: "A QR code on the counter or a button in an email should open the review form, not your homepage. ReputationFlow’s public page lists Google, Facebook, and Yelp and then gets out of the way.",
  },
  {
    title: "Ask every customer the same way",
    body: "Show every customer the same Google, Facebook, and Yelp links. A private note can sit on that page as an extra option. The public buttons stay on the page for a 1-star tap and a 5-star tap.",
  },
  {
    title: "Do not pay, gift, or pre-write the review",
    body: "Incentives and reviews written by the business violate Google’s policies. Do not hand someone a script or a star target.",
  },
  {
    title: "Reply to the reviews you already have",
    body: "A public reply shows the next customer that a person is reading. Draft it yourself or start from an AI draft, then edit anything that is too generic before you post it on Google.",
  },
]

export default function GoogleReviewsGuidePage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "How to get more Google reviews", path: "/how-to-get-more-google-reviews" },
          ]),
          articleJsonLd({
            title: "How to get more Google reviews",
            description:
              "A practical guide to getting more Google reviews: claim your profile, use a direct review link, ask every customer the same way, and reply in public.",
            path: "/how-to-get-more-google-reviews",
          }),
          faqJsonLd(faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Guide</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">How to get more Google reviews</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          More reviews come from asking more customers at the right moment, with a link that opens the review form. This is the workflow local businesses can actually run.
        </p>
        <ol className="mt-10 space-y-8">
          {steps.map((step, index) => (
            <li key={step.title}>
              <h2 className="text-xl font-semibold text-slate-950">{index + 1}. {step.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
        <h2 className="mt-10 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={faqs} />
        </div>
        <p className="mt-10 text-sm leading-7 text-slate-600">
          For a bad review that is already public, use the{" "}
          <Link className="font-semibold text-indigo-700" href="/how-to-respond-to-negative-google-reviews">response templates</Link>
          . Scripts by trade are in the{" "}
          <Link className="font-semibold text-indigo-700" href="/guides/how-to-ask-customers-for-reviews">ask scripts</Link>
          . Read{" "}
          <Link className="font-semibold text-indigo-700" href="/guides/how-many-google-reviews-to-rank">how many Google reviews it takes to rank</Link>
          {" "}and{" "}
          <Link className="font-semibold text-indigo-700" href="/guides/incentivizing-reviews-ftc-rules">whether incentives are allowed</Link>
          {" "}before you change the ask.
        </p>
        <GuideResources signupLocation="more_reviews" />
      </article>
      <CtaBand title="Turn the guide into a link you can share" body="Create a free account and paste your Google review link. The QR code is ready as soon as you save it." />
    </MarketingShell>
  )
}
