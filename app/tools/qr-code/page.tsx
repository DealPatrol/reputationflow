import Link from "next/link"
import { Suspense } from "react"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { ToolUpsell } from "@/components/marketing/tool-upsell"
import { QrCodeTool } from "@/components/tools/qr-code-tool"
import { breadcrumbJsonLd, faqJsonLd, freeToolJsonLd, howToJsonLd, pageMetadata } from "@/lib/seo"

const toolName = "QR code generator for review links"
const toolDescription =
  "Free QR code generator for a Google review link. Download a PNG, a review card, or a letter-size table tent. Nothing is uploaded."

const steps = [
  {
    name: "Start with a direct review link",
    text: "Copy the link from Google’s Ask for reviews screen, or make one with the free Google review link generator. A normal Maps search URL is not a review link.",
  },
  {
    name: "Paste the https URL",
    text: "The QR code is drawn in your browser from that URL. The image is not uploaded to create it. If the URL is invalid, the page says so instead of drawing a code that goes nowhere.",
  },
  {
    name: "Add the business name",
    text: "Type the name customers should see on the card. Leave it blank and the file says “Your business.” The name is only printed on the download.",
  },
  {
    name: "Download the table tent or the review card",
    text: "The table tent is a letter-size PNG with a dashed fold line. Fold it so the code stands on the counter. The review card is about 3.5 by 2 inches. You can also download the QR code by itself.",
  },
]

const faqs = [
  {
    question: "Is the QR code stored on a server?",
    answer:
      "No. The code is created in your browser when you paste an https URL. The printable card is built the same way, when you click download.",
  },
  {
    question: "What should the QR code open?",
    answer:
      "A direct Google review link, or your ReputationFlow page if you want Google, Facebook, and Yelp on one screen. A homepage URL makes people hunt for the review button.",
  },
  {
    question: "How large should I print the code?",
    answer:
      "Keep the QR code at least about an inch wide. The letter-size table tent is large enough for a counter. Don’t shrink the review card until the code is a speck.",
  },
  {
    question: "Do I need an account to download the table tent?",
    answer:
      "No. The download works without signing up. An account is useful later if you want one hosted page for every customer instead of a single Google URL.",
  },
  {
    question: "Can I put a discount on the card?",
    answer:
      "Don’t. Google’s policies prohibit incentives for reviews. The card says to scan and leave a review. It does not mention a gift or a coupon.",
  },
]

export const metadata = pageMetadata({
  title: toolName,
  description: toolDescription,
  path: "/tools/qr-code",
  keywords: [
    "qr code generator",
    "google review qr code",
    "review qr code",
    "printable google review card",
    "review table tent",
  ],
})

export default function QrCodePage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "QR code generator", path: "/tools/qr-code" },
          ]),
          freeToolJsonLd({
            name: toolName,
            description: toolDescription,
            path: "/tools/qr-code",
          }),
          howToJsonLd({
            name: "How to make a Google review QR code",
            description: toolDescription,
            path: "/tools/qr-code",
            steps,
          }),
          faqJsonLd(faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Free tool</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">QR code generator for Google reviews</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Paste a review link and download a QR code, a review card, or a table tent. The image is created in your browser. Nothing is uploaded to generate it, and you do not need an account.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="h-48 rounded-2xl border border-slate-200 bg-slate-50" />}>
            <QrCodeTool />
          </Suspense>
        </div>
        <ToolUpsell
          location="tool_qr"
          body="A printed card can point at Google alone. A free account hosts one page for Google, Facebook, and Yelp, with a private note beside those buttons. Use the printed code either way."
        />

        <h2 className="mt-12 text-xl font-semibold text-slate-950">How to print a Google review QR code</h2>
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
            <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
              Google review link generator
            </Link>
            <span className="text-slate-600"> if you still need the write-a-review URL.</span>
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
