import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { PricingLink } from "@/components/marketing/pricing-link"
import { SignupLink } from "@/components/marketing/signup-link"
import { comparisonBySlug, comparisons } from "@/lib/marketing-content"
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo"
import { professionalSignupPath, SIGNUP_PATH } from "@/lib/signup"

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
    keywords: [`${comparison.name} alternative`, `${comparison.name} vs ReputationFlow`, "review management software"],
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
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Review software", path: "/review-management-software" },
            { name: comparison.name, path: `/compare/${comparison.slug}` },
          ]}
        />
        <p className="mt-3 text-sm font-semibold text-indigo-700">{comparison.name} alternative</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">{comparison.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{comparison.summary}</p>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          Checked in {comparison.checked} against the{" "}
          <a
            className="font-semibold text-indigo-700"
            href={comparison.sourceUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {comparison.sourceLabel}
          </a>
          . That page can change. We do not publish their ratings or customer counts.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <SignupLink
            href={professionalSignupPath()}
            location={`compare_${comparison.slug}_checkout`}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Create a free account, then checkout
          </SignupLink>
          <PricingLink
            location={`compare_${comparison.slug}_pricing`}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900"
          >
            See the $20 plan
          </PricingLink>
        </div>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Side by side</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Topic
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold">
                  {comparison.name}
                </th>
                <th scope="col" className="py-3 font-semibold">
                  ReputationFlow
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.topic} className="border-b border-slate-100 align-top">
                  <th scope="row" className="py-3 pr-4 font-medium text-slate-800">
                    {row.topic}
                  </th>
                  <td className="py-3 pr-4 text-slate-600">{row.theirs}</td>
                  <td className="py-3 text-slate-600">{row.ours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Who should pick which</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-950">Choose {comparison.name} when</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{comparison.chooseThem}</p>
          </section>
          <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <h3 className="font-semibold text-slate-950">Choose ReputationFlow when</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{comparison.chooseUs}</p>
            <SignupLink
              href={SIGNUP_PATH}
              location={`compare_${comparison.slug}_free`}
              className="mt-4 inline-flex text-sm font-semibold text-indigo-700"
            >
              Start on the free plan
            </SignupLink>
          </section>
        </div>

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
            <Link className="font-semibold text-indigo-700" href="/tools/qr-code">
              Free Google review QR code generator
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
              Free Google review link generator
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/guides/how-to-choose-review-management-software">
              How to choose review management software
            </Link>
          </li>
          <li>
            <PricingLink location={`compare_${comparison.slug}_pricing_list`} className="font-semibold text-indigo-700">
              ReputationFlow pricing
            </PricingLink>
          </li>
        </ul>
      </article>
      <CtaBand
        signupLocation={`compare_${comparison.slug}`}
        signupHref={professionalSignupPath()}
        signupLabel="Create a free account, then checkout"
        title={`Use ReputationFlow instead of ${comparison.name}`}
        body="Starter is free and does not ask for a card. The next screen is Professional checkout at $20 a month. There is no trial. Cancel in the Stripe customer portal."
      />
    </MarketingShell>
  )
}
