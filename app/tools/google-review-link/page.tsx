import Link from "next/link"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { ToolUpsell } from "@/components/marketing/tool-upsell"
import { GoogleReviewLinkTool } from "@/components/tools/google-review-link-tool"
import { breadcrumbJsonLd, faqJsonLd, freeToolJsonLd, howToJsonLd, pageMetadata } from "@/lib/seo"

const toolName = "Google review link generator"
const toolDescription =
  "Free Google review link generator. Paste a Place ID and get the official write-a-review URL for a QR code, receipt, or email. No account."

const steps = [
  {
    name: "Open the right Google Business Profile",
    text: "Reviews attach to one location. Open the Business Profile for the shop, truck, or office you want people to review, and confirm the name and address match the door.",
  },
  {
    name: "Copy the Place ID or the Ask for reviews link",
    text: "In the Business Profile manager, open Ask for reviews and copy that link. Or copy the Place ID from advanced settings. A Place ID usually starts with ChIJ.",
  },
  {
    name: "Paste it into the generator",
    text: "Paste the Place ID or the review link into the box on this page. The result is the official write-a-review URL. A maps.app.goo.gl short link does not include the Place ID, so this page cannot expand it.",
  },
  {
    name: "Put the URL where customers already are",
    text: "Use the link on a receipt, a text you send yourself, or the free QR code generator. The generator does not post a review. The customer still writes it on Google.",
  },
]

const faqs = [
  {
    question: "Does the Google review link generator need an API key or an account?",
    answer:
      "No. Paste a Place ID or a review link that already contains one. The page builds the write-a-review URL in your browser. An account is optional and is only for saving the link on a ReputationFlow page.",
  },
  {
    question: "Will this post a Google review for me?",
    answer:
      "No. The link opens Google’s review form. The customer writes and publishes the review. ReputationFlow does not submit reviews and does not pick the star rating.",
  },
  {
    question: "Why won’t a maps.app.goo.gl link work?",
    answer:
      "Those short links hide the Place ID. Open your Business Profile, choose Ask for reviews, and paste that link or the Place ID that starts with ChIJ.",
  },
  {
    question: "Is the Place ID the same thing as the review link?",
    answer:
      "No. The Place ID identifies the location. The review link is the write-a-review URL that contains that ID. This tool turns the ID into that URL.",
  },
  {
    question: "Can I turn the link into a QR code?",
    answer:
      "Yes. After the link appears, choose Make a printable card. That opens the free QR code generator with the URL filled in, including a table tent download.",
  },
]

export const metadata = pageMetadata({
  title: toolName,
  description: toolDescription,
  path: "/tools/google-review-link",
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
            { name: toolName, path: "/tools/google-review-link" },
          ]),
          freeToolJsonLd({
            name: toolName,
            description: toolDescription,
            path: "/tools/google-review-link",
          }),
          howToJsonLd({
            name: "How to make a Google review link",
            description: toolDescription,
            path: "/tools/google-review-link",
            steps,
          }),
          faqJsonLd(faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Free tools", path: "/tools" }, { name: toolName, path: "/tools/google-review-link" }]} />
        <p className="mt-3 text-sm font-semibold text-indigo-700">Free tool</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Google review link generator</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Paste a Google Place ID, or a review link that already contains one. You get the official write-a-review URL. The tool does not look your business up, and it does not require an account.
        </p>
        <div className="mt-8">
          <GoogleReviewLinkTool />
        </div>
        <ToolUpsell
          location="tool_review_link"
          body="This page keeps working if you close the tab. A free ReputationFlow account stores the link on a page that also lists Facebook and Yelp, plus an optional private note. The public buttons stay on that page for every rating."
        />

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
              QR code generator
            </Link>
            <span className="text-slate-600"> for a counter card or table tent.</span>
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
            <Link className="font-semibold text-indigo-700" href="/how-to-respond-to-negative-google-reviews">
              Reply templates for a negative Google review
            </Link>
            <span className="text-slate-600"> after the reviews start coming in.</span>
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
