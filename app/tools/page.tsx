import Link from "next/link"
import { PricingLink } from "@/components/marketing/pricing-link"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Free tools", path: "/tools" },
]

export const metadata = pageMetadata({
  title: "Free Google review tools",
  description:
    "Free tools for a Google review link and a QR code, plus a printable card. No account. The template pack and the guides sit next to them.",
  path: "/tools",
  keywords: ["google review qr code generator", "google review link generator", "free review tools"],
})

const tools = [
  {
    href: "/tools/qr-code",
    title: "Google review QR code generator",
    body: "Paste a Place ID or a long Maps URL. Download the review link and a scannable QR code. No API key.",
  },
  {
    href: "/tools/google-review-link",
    title: "Google review link generator",
    body: "The same link and QR code, with the steps written for a text, an email, or a receipt.",
  },
  {
    href: "/google-review-request-templates",
    title: "Review request templates",
    body: "Fill a text or email with your name and review link, then copy it. You send it. Nothing is sent for you.",
  },
]

export default function ToolsIndexPage() {
  return (
    <MarketingShell>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Breadcrumbs items={crumbs} />
        <p className="mt-4 text-sm font-semibold text-indigo-800">No account required</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.08]">Free Google review tools</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Paste a Place ID and download the review link and the QR code on one page. These tools work without an account. A free ReputationFlow account is what saves them on one customer page.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {tools.map((tool, index) => (
            <li key={tool.href}>
              <Link href={tool.href} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-300">
                <p className="font-mono text-sm font-semibold text-indigo-800">0{index + 1}</p>
                <h2 className="mt-3 font-semibold text-slate-950">{tool.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tool.body}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-7 text-slate-600">
          Placement and wording are in the{" "}
          <Link className="font-semibold text-indigo-700" href="/guides">
            guides
          </Link>
          , the{" "}
          <Link className="font-semibold text-indigo-700" href="/industries">
            trade pages
          </Link>
          , and the{" "}
          <Link className="font-semibold text-indigo-700" href="/google-review-qr-by-city">
            city QR guides
          </Link>
          . The{" "}
          <Link className="font-semibold text-indigo-700" href="/resources">
            resource hub
          </Link>{" "}
          lists every public page. Account prices are on{" "}
          <PricingLink location="tools_index" className="font-semibold text-indigo-700">
            pricing
          </PricingLink>
          .
        </p>
      </section>
      <CtaBand
        signupLocation="tools_index"
        title="Save the link on a page you can share"
        body="Create a free account. The next screen asks for the Google review link, then gives you the QR code."
      />
    </MarketingShell>
  )
}
