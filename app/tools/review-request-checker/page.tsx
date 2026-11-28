import Link from "next/link"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { ReviewMessageOffer } from "@/components/marketing/review-message-offer"
import { ReviewRequestChecker } from "@/components/tools/review-request-checker"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import {
  FTC_RULE_URL,
  GOOGLE_POLICY_URL,
  REVIEW_CHECKER_DESCRIPTION,
  REVIEW_CHECKER_PATH,
  REVIEW_CHECKER_TITLE,
  reviewCheckerFaqs,
  reviewCheckerSteps,
} from "@/lib/review-request-checker"
import { breadcrumbJsonLd, faqJsonLd, freeToolJsonLd, howToJsonLd, pageMetadata } from "@/lib/seo"

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Free tools", path: "/tools" },
  { name: REVIEW_CHECKER_TITLE, path: REVIEW_CHECKER_PATH },
]

const price = formatPlanPrice(PLANS.pro.price)

export const metadata = pageMetadata({
  title: "Review Request Checker: Google & FTC Rules",
  description: REVIEW_CHECKER_DESCRIPTION,
  path: REVIEW_CHECKER_PATH,
  keywords: [
    "review gating",
    "can i offer a discount for a google review",
    "ftc review rule",
    "google review policy incentives",
    "review request text compliance",
  ],
})

export default function ReviewRequestCheckerPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          freeToolJsonLd({ name: REVIEW_CHECKER_TITLE, description: REVIEW_CHECKER_DESCRIPTION, path: REVIEW_CHECKER_PATH }),
          howToJsonLd({ name: "How to check a review request against Google's review rules", description: REVIEW_CHECKER_DESCRIPTION, path: REVIEW_CHECKER_PATH, steps: reviewCheckerSteps }),
          faqJsonLd(reviewCheckerFaqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <p className="mt-3 text-sm font-semibold text-[#4E5E52]">Free tool</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{REVIEW_CHECKER_TITLE}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Is your review request allowed? Google does not allow discounts or freebies for reviews, asking for five stars, or asking only happy customers. The FTC rule in effect since October 21, 2024 also bans incentives tied to a positive review. Paste your text or email below to see what to change, then copy a version that asks every customer the same way.
        </p>
        <div className="mt-8">
          <ReviewRequestChecker />
        </div>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">What the checker flags</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
          <li><strong>Fix:</strong> discounts, coupons, gift cards, giveaways, or credit for a review.</li>
          <li><strong>Fix:</strong> asking for a five-star, positive, or good review.</li>
          <li><strong>Fix:</strong> review gating, such as “if you were happy, leave a review; if not, call us.”</li>
          <li><strong>Fix:</strong> asking someone to change, update, or remove a review.</li>
          <li><strong>Review:</strong> asking for staff names or specific words, pressure while the customer is still on site, and review quotas.</li>
          <li><strong>Tips:</strong> a missing review link, a text long enough to split into several segments, and a missing opt-out line.</li>
        </ul>
        <p className="mt-3 text-xs leading-6 text-slate-500">
          Rules paraphrased from{" "}
          <a className="underline" href={GOOGLE_POLICY_URL} target="_blank" rel="noopener">Google Maps prohibited and restricted content</a> and the{" "}
          <a className="underline" href={FTC_RULE_URL} target="_blank" rel="noopener">FTC Rule on the Use of Consumer Reviews and Testimonials</a>, both read 28 November 2026. Word matching can miss things or flag safe wording. This is not legal advice.
        </p>

        <ReviewMessageOffer
          location="checker_tool"
          heading="Send the same honest ask to every customer"
          body={`ReputationFlow shows the same Google, Facebook, and Yelp buttons at every star rating, so the page itself never gates reviews. Starter is free with one review link and QR code. Professional is ${price} per month for email review requests and full feedback history.`}
        />

        <h2 className="mt-12 text-xl font-semibold text-slate-950">How to check your review request</h2>
        <ol className="mt-4 space-y-6">
          {reviewCheckerSteps.map((step, index) => (
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
          <FaqList items={reviewCheckerFaqs} />
        </div>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">Related</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          <li>
            <Link className="font-semibold text-[#4E5E52]" href="/tools/review-request-message">
              Google review request message generator
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-[#4E5E52]" href="/google-review-request-templates">
              Review request templates
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-[#4E5E52]" href="/tools/review-reply-generator">
              Google review reply generator
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-[#4E5E52]" href="/how-to-get-more-google-reviews">
              How to get more Google reviews
            </Link>
          </li>
        </ul>
      </article>
      <CtaBand
        setupLocation="checker_tool_band_setup"
        signupLocation="checker_tool_band"
        title="One review link for every customer"
        body={`Create a free account and the next screen asks for your Google review link. Professional is ${price} per month if you want to email review requests from the dashboard.`}
      />
    </MarketingShell>
  )
}
