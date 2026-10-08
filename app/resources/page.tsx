import Link from "next/link"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { guideCluster, guideGroups } from "@/lib/guides"
import { comparisons, industries } from "@/lib/marketing-content"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
]

const staticLinks = [
  { href: "/tools", title: "Free tools" },
  { href: "/tools/google-review-link", title: "Google review link generator" },
  { href: "/tools/qr-code", title: "QR code generator" },
  { href: "/google-review-request-templates", title: "Review request templates" },
  { href: "/how-to-get-more-google-reviews", title: "How to get more Google reviews" },
  { href: "/how-to-respond-to-negative-google-reviews", title: "How to respond to negative Google reviews" },
  { href: "/review-management-software", title: "Review management software" },
  { href: "/pricing", title: "Pricing" },
  { href: "/how-it-works", title: "How it works" },
  { href: "/faq", title: "FAQ" },
]

export const metadata = pageMetadata({
  title: "Google review resources",
  description:
    "Every public ReputationFlow guide, trade page, free tool, and comparison in one list. No city pages and no invented review counts.",
  path: "/resources",
  keywords: ["google review resources", "review request guides", "google review tools"],
})

export default function ResourcesPage() {
  return (
    <MarketingShell>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Google review resources</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Start with a tool if you need a link today. Read a guide if you need the words. The trade pages say when to ask in that job.
        </p>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">Start here</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {staticLinks.map((item) => (
            <li key={item.href}>
              <Link className="font-semibold text-indigo-700" href={item.href}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {guideGroups.map((group) => (
          <section key={group.id} className="mt-12">
            <h2 className="text-xl font-semibold text-slate-950">{group.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{group.description}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {guideCluster
                .filter((guide) => guide.cluster === group.id)
                .map((guide) => (
                  <li key={guide.path}>
                    <Link className="font-semibold text-indigo-700" href={guide.path}>
                      {guide.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <h2 className="mt-12 text-xl font-semibold text-slate-950">
          <Link href="/industries">Trades</Link>
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <Link className="font-semibold text-indigo-700" href={`/industries/${industry.slug}`}>
                {industry.title}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">Comparisons</h2>
        <ul className="mt-4 space-y-2">
          {comparisons.map((comparison) => (
            <li key={comparison.slug}>
              <Link className="font-semibold text-indigo-700" href={`/compare/${comparison.slug}`}>
                {comparison.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </MarketingShell>
  )
}
