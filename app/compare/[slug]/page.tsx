import Link from "next/link"
import { notFound } from "next/navigation"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { comparisonBySlug, comparisons } from "@/lib/marketing-content"
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo"

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
  const others = comparisons.filter((item) => item.slug !== comparison.slug)

  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Review software", path: "/review-management-software" },
            { name: comparison.title, path: `/compare/${comparison.slug}` },
          ]),
          faqJsonLd(comparison.faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm text-slate-500">
          <Link href="/review-management-software" className="font-semibold text-indigo-700">
            Review software
          </Link>
          <span> / {comparison.name}</span>
        </p>
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
          This page describes product scope in plain language. It does not quote {comparison.name} pricing, ratings, or customer counts, because those change and we do not publish figures we have not verified. ReputationFlow sells the product described under “What ReputationFlow is for.”
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={comparison.faqs} />
        </div>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Keep comparing</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          {others.map((item) => (
            <li key={item.slug}>
              <Link className="font-semibold text-indigo-700" href={`/compare/${item.slug}`}>
                {item.name} alternative
              </Link>
            </li>
          ))}
          <li>
            <Link className="font-semibold text-indigo-700" href="/review-management-software">
              Best review management software for a small business
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
              Free Google review link generator
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/pricing">
              ReputationFlow pricing
            </Link>
          </li>
        </ul>
      </article>
      <CtaBand signupLocation={`compare_${comparison.slug}`} />
    </MarketingShell>
  )
}
