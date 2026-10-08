import Link from "next/link"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { breadcrumbJsonLd, faqJsonLd, howToJsonLd, pageMetadata } from "@/lib/seo"

const steps = [
  {
    name: "Read the review before you answer",
    text: "Check the name, the date, and whether the visit actually happened. A reply posted in anger is public for as long as the review is.",
  },
  {
    name: "Reply on Google yourself",
    text: "Open the review in your Business Profile and write a short public reply. ReputationFlow does not post it for you. On the Professional plan you can generate a draft, then edit it before you paste it into Google.",
  },
  {
    name: "Keep the public reply short and move the details offline",
    text: "Say who you are, acknowledge the experience, and give a phone number or an email. Do not argue the whole story in public, and do not repeat private details such as a medical note, a card number, or a home address.",
  },
  {
    name: "Do not pay anyone to change the review",
    text: "A discount, a gift, or a refund offered in exchange for editing or deleting a review is an incentive. You can fix the problem and let them decide whether to update the review.",
  },
]

const templates = [
  {
    title: "The visit went wrong and you can fix it",
    body: "Hi [name], I’m [your name] at [business]. I’m sorry the [visit or job] missed the mark. Please call me at [phone] and I will look at it myself. Thank you for telling us.",
  },
  {
    title: "You remember the visit differently",
    body: "Hi [name], I’m [your name] at [business]. I read this and I remember the visit differently. I don’t want to argue the details on a public page. If you are willing, call [phone] and I will go through it with you.",
  },
  {
    title: "The review may be for a different business",
    body: "Hi [name], I’m [your name] at [business] on [street]. I can’t find a visit under this name. If you meant another business, no action is needed. If you were here, call [phone] and I will find the visit.",
  },
  {
    title: "A billing complaint",
    body: "Hi [name], I’m [your name] at [business]. I want to sort out the charge with you. Please call [phone] and have the invoice handy. I won’t discuss the amount on this public page.",
  },
  {
    title: "A low rating with no comment",
    body: "Hi [name], I’m [your name] at [business]. I’m sorry this was a bad experience. A sentence about what happened helps me fix it. You can reply here or call [phone].",
  },
]

const faqs = [
  {
    question: "Should I ask the customer to delete the review?",
    answer:
      "You can fix the problem and tell them they are welcome to update the review if they want to. Do not offer money, a free service, or a gift in exchange for a change. Google’s policies prohibit incentives for reviews.",
  },
  {
    question: "Should the reply include what went wrong in detail?",
    answer:
      "No. A public reply is not the place for a diagnosis, a full argument, or an account number. Invite them to call. If you need a record, keep it in your own notes.",
  },
  {
    question: "Can ReputationFlow post the reply on Google?",
    answer: `No. You paste the reply into Google yourself. Professional (${formatPlanPrice(PLANS.pro.price)} per month) can draft a reply for you to edit. Starter does not include drafts. There is no trial on top of the free plan.`,
  },
  {
    question: "What if the review breaks Google’s rules?",
    answer:
      "Use Google’s own report flow for spam, hate, or a review of a business the person never visited. A policy report is separate from your public reply. ReputationFlow does not file that report for you.",
  },
]

export const metadata = pageMetadata({
  title: "How to respond to negative Google reviews",
  description:
    "How to respond to a negative Google review, with templates you can edit. Reply in public, move the details offline, and do not offer a reward for changing the review.",
  path: "/how-to-respond-to-negative-google-reviews",
  keywords: [
    "how to respond to negative google reviews",
    "google review response templates",
    "reply to a bad google review",
    "negative review response examples",
  ],
})

export default function NegativeReviewRepliesPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "How to respond to negative Google reviews", path: "/how-to-respond-to-negative-google-reviews" },
          ]),
          howToJsonLd({
            name: "How to respond to a negative Google review",
            description:
              "Write a short public reply, move the details to a phone call, and do not offer an incentive to change the review.",
            path: "/how-to-respond-to-negative-google-reviews",
            steps,
          }),
          faqJsonLd(faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Templates</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
          How to respond to negative Google reviews
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          A public reply shows the next customer that a person is reading. These templates are starting points. Replace the brackets, cut anything that is not true, and post the reply on Google yourself.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">How to reply</h2>
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

        <h2 className="mt-12 text-xl font-semibold text-slate-950">Google review response templates</h2>
        <div className="mt-4 space-y-4">
          {templates.map((template) => (
            <section key={template.title} className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-950">{template.title}</h3>
              <blockquote className="mt-3 text-sm leading-7 text-slate-700">{template.body}</blockquote>
            </section>
          ))}
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Professional can draft a reply from a private note a customer left in ReputationFlow. Treat that draft the same way: edit it, then paste it into Google. The product does not publish the reply for you.
        </p>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={faqs} />
        </div>

        <p className="mt-10 text-sm leading-7 text-slate-600">
          Asking for the next review is a separate job. Use the{" "}
          <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
            Google review link generator
          </Link>{" "}
          and the{" "}
          <Link className="font-semibold text-indigo-700" href="/how-to-get-more-google-reviews">
            guide to getting more Google reviews
          </Link>
          . Read{" "}
          <Link className="font-semibold text-indigo-700" href="/pricing">
            pricing
          </Link>{" "}
          before you turn on reply drafts.
        </p>
      </article>
      <CtaBand
        signupLocation="negative_reviews"
        title="Draft a reply, then post it yourself"
        body="Starter is free. Professional adds a draft you can edit. Google still gets the reply from you."
      />
    </MarketingShell>
  )
}
