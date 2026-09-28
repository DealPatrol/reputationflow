import { notFound } from "next/navigation"
import { CtaBand } from "@/components/marketing/cta-band"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { industries, industryBySlug } from "@/lib/marketing-content"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industryBySlug(slug)
  if (!industry) return {}
  return pageMetadata({
    title: industry.title,
    description: industry.description,
    path: `/industries/${industry.slug}`,
    keywords: [industry.keyword, "google reviews", "review requests"],
  })
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industryBySlug(slug)
  if (!industry) notFound()

  return (
    <MarketingShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ])}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">{industry.name}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{industry.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{industry.intro}</p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">When to ask</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
          {industry.moments.map((moment) => (
            <li key={moment}>{moment}</li>
          ))}
        </ul>

        <div className="mt-10 space-y-8">
          {industry.tips.map((tip) => (
            <section key={tip.title}>
              <h2 className="text-xl font-semibold text-slate-950">{tip.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{tip.body}</p>
            </section>
          ))}
        </div>
      </article>
      <CtaBand
        title={`Set up review requests for your ${industry.name.toLowerCase()} business`}
        body="Add the Google review link, print the QR code, and use the same page for every customer."
      />
    </MarketingShell>
  )
}
