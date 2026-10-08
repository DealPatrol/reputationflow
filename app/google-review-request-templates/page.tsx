import Link from "next/link"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { GuideResources } from "@/components/marketing/guide-resources"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { TemplatePackForm } from "@/components/marketing/template-pack-form"
import { reviewRequestTemplates } from "@/lib/review-request-templates"
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo"

const title = "Google review request templates"
const description =
  "Free in-person, text, and email scripts for asking customers for a Google review, organized by trade. Download the pack or have it emailed. No star target and no discount."
const path = "/google-review-request-templates"

const faqs = [
  {
    question: "Does ReputationFlow send these texts?",
    answer:
      "No. Send the text from your own phone. ReputationFlow does not send SMS. On the Professional plan you can email a review link when you choose the customer. Starter is free and does not send email. You can still paste the email script into the mail program you already use.",
  },
  {
    question: "Do I have to sign up to get the templates?",
    answer:
      "No. Download the text file on this page without an account. An email is optional. If you leave one, it is stored with other lead signups and the pack is emailed when outbound email is configured.",
  },
  {
    question: "Can I add a discount or a star rating to the script?",
    answer:
      "No. Do not offer a gift, a discount, or a free service for a review, and do not tell the customer which star to pick. Google’s policies prohibit incentives. The scripts on this page do not include them.",
  },
  {
    question: "What replaces the [link] bracket?",
    answer:
      "Paste the write-a-review URL from your Google Business Profile, or build it with the free Google review link generator. A normal Maps search URL is not a review link.",
  },
]

export const metadata = pageMetadata({
  title,
  description,
  path,
  keywords: [
    "google review request templates",
    "how to ask customers for reviews",
    "google review text script",
    "google review email template",
  ],
})

export default function ReviewRequestTemplatesPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: title, path },
          ]),
          articleJsonLd({ title, description, path }),
          faqJsonLd(faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Templates</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Use one channel per customer. Replace the brackets, send it yourself, and stop. These scripts ask for a Google review. They do not name a star rating, and they do not offer anything in return.
        </p>
        <TemplatePackForm />
        <div className="mt-12 space-y-10">
          {reviewRequestTemplates.map((template) => (
            <section key={template.trade}>
              <h2 className="text-xl font-semibold text-slate-950">{template.trade}</h2>
              <h3 className="mt-4 text-sm font-semibold text-slate-950">In person</h3>
              <p className="mt-1 text-sm leading-7 text-slate-700">{template.inPerson}</p>
              <h3 className="mt-4 text-sm font-semibold text-slate-950">Text</h3>
              <p className="mt-1 text-sm leading-7 text-slate-700">{template.sms}</p>
              <h3 className="mt-4 text-sm font-semibold text-slate-950">Email</h3>
              <p className="mt-1 text-sm leading-7 text-slate-700">{template.email}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm leading-7 text-slate-600">
          Timing for each trade is on the{" "}
          <Link className="font-semibold text-indigo-700" href="/industries">
            industry pages
          </Link>
          . The rules on incentives are in{" "}
          <Link className="font-semibold text-indigo-700" href="/guides/incentivizing-reviews-ftc-rules">
            is it legal to incentivize Google reviews
          </Link>
          .
        </p>
        <h2 className="mt-10 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={faqs} />
        </div>
        <GuideResources signupLocation="template_pack" includePack={false} />
      </article>
      <CtaBand
        signupLocation="template_pack_cta"
        title="Put the script on a link you can reuse"
        body="Create a free account, paste your Google review link, and download the QR code before you leave setup."
      />
    </MarketingShell>
  )
}
