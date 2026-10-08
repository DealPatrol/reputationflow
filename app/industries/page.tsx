import Link from "next/link"
import { CtaBand } from "@/components/marketing/cta-band"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { industries } from "@/lib/marketing-content"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Google review QR codes by trade",
  description:
    "Trade guides for local businesses: a Google review QR code, the best moment to ask, and a sample message for plumbers, dentists, salons, restaurants, and more.",
  path: "/industries",
  keywords: ["google review qr code", "how to get more google reviews", "review requests by industry"],
})

export default function IndustriesIndexPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Industries</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950">
          Google review QR codes by trade
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Pick the trade you actually run. Each page covers how to get more Google reviews in that job: when to ask, a message you can copy, and where the QR code belongs. These are instructions, not customer stories. The{" "}
          <Link className="font-semibold text-indigo-700" href="/google-review-request-templates">request templates</Link>
          {" "}and the{" "}
          <Link className="font-semibold text-indigo-700" href="/guides">review guides</Link>
          {" "}are the longer versions.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="rounded-2xl border border-slate-200 p-5 hover:border-indigo-300"
            >
              <h2 className="font-semibold text-slate-950">{industry.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{industry.intro}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand
        signupLocation="industries_index"
        title="Start with a free review link"
        body="Create an account, paste your Google review link, and print the QR code for the counter, the invoice, or the truck."
      />
    </MarketingShell>
  )
}
