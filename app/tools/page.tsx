import Link from "next/link"
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
  keywords: ["google review link generator", "google review qr code", "free review tools"],
})

const tools = [
  {
    href: "/tools/google-review-link",
    title: "Google review link generator",
    body: "Paste a Place ID and get the official write-a-review URL. A short maps link cannot be expanded here.",
  },
  {
    href: "/tools/qr-code",
    title: "QR code generator",
    body: "Turn that URL into a PNG, a table tent, or a review card. The file is built in the browser.",
  },
  {
    href: "/google-review-request-templates",
    title: "Review request templates",
    body: "In-person, text, and email scripts by trade. Download the file or have it emailed.",
  },
]

export default function ToolsIndexPage() {
  return (
    <MarketingShell>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950">Free Google review tools</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Make the link, then the code. These pages work without an account. A free ReputationFlow account is what saves them on one customer page.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {tools.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className="block h-full rounded-2xl border border-slate-200 p-5 hover:border-indigo-300">
                <h2 className="font-semibold text-slate-950">{tool.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tool.body}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-7 text-slate-600">
          Placement and wording are in the{" "}
          <Link className="font-semibold text-indigo-700" href="/guides">
            guides
          </Link>{" "}
          and the{" "}
          <Link className="font-semibold text-indigo-700" href="/industries">
            trade pages
          </Link>
          . The{" "}
          <Link className="font-semibold text-indigo-700" href="/resources">
            resource hub
          </Link>{" "}
          lists every public page.
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
