import { notFound } from "next/navigation"
import { CtaBand } from "@/components/marketing/cta-band"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { comparisonBySlug, comparisons } from "@/lib/marketing-content"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const comparison = comparisonBySlug(slug)
  if (!comparison) return {}
  return pageMetadata({
    title: comparison.title,
    description: comparison.description,
    path: `/compare/${comparison.slug}`,
    keywords: [`${comparison.name} alternative`, "review management software", "small business reviews"],
  })
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const comparison = comparisonBySlug(slug)
  if (!comparison) notFound()

  return (
    <MarketingShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: comparison.title, path: `/compare/${comparison.slug}` },
        ])}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Comparison</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{comparison.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{comparison.summary}</p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">What {comparison.name} is for</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
          {comparison.theyAre.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">What ReputationFlow is for</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
          {comparison.weAre.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-950">Choose {comparison.name} when</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{comparison.chooseThem}</p>
          </section>
          <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <h2 className="font-semibold text-slate-950">Choose ReputationFlow when</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{comparison.chooseUs}</p>
          </section>
        </div>
        <p className="mt-8 text-sm leading-6 text-slate-500">
          This page describes product scope. It does not quote {comparison.name} pricing, ratings, or customers, because those change and we do not publish figures we have not verified.
        </p>
      </article>
      <CtaBand />
    </MarketingShell>
  )
}
