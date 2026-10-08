import Link from "next/link"
import { CtaBand } from "@/components/marketing/cta-band"
import { GuideResources } from "@/components/marketing/guide-resources"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { guideCluster, guideGroups } from "@/lib/guides"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Google review guides",
  description:
    "Practical guides for local businesses: how to ask for Google reviews, what the FTC and Google allow, how to report a fake review, and where a QR code belongs.",
  path: "/guides",
  keywords: ["google review guides", "how to get more google reviews", "google review scripts"],
})

export default function GuidesIndexPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ])}
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }]} />
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950">
          Google review guides
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Guides for asking, replying, and staying inside Google’s and the FTC’s rules. They do not invent review counts, rankings, or case results.
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          <Link className="font-semibold text-indigo-700" href="/google-review-request-templates">
            Download the Google review request templates
          </Link>
          <span> if you want the scripts in one file.</span>
        </p>
        <div className="mt-10 space-y-12">
          {guideGroups.map((group) => (
            <section key={group.id}>
              <h2 className="text-xl font-semibold text-slate-950">{group.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{group.description}</p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {guideCluster
                  .filter((guide) => guide.cluster === group.id)
                  .map((guide) => (
                    <li key={guide.path}>
                      <Link href={guide.path} className="block h-full rounded-2xl border border-slate-200 p-5 hover:border-indigo-300">
                        <h3 className="font-semibold text-slate-950">{guide.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{guide.description}</p>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
        <GuideResources signupLocation="guides_index" />
      </section>
      <CtaBand
        signupLocation="guides_index_cta"
        title="Turn a guide into a link"
        body="Create a free account and the next screen asks for your Google review link, then gives you the QR code."
      />
    </MarketingShell>
  )
}
