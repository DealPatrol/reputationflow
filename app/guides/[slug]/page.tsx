import Link from "next/link"
import { notFound } from "next/navigation"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { GuideResources } from "@/components/marketing/guide-resources"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { guideBySlug, guides, relatedGuides } from "@/lib/guides"
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = guideBySlug(slug)
  if (!guide) return {}
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: [guide.title.toLowerCase(), "google reviews", "review requests"],
  })
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = guideBySlug(slug)
  if (!guide) notFound()
  const path = `/guides/${guide.slug}`
  const related = relatedGuides(guide.slug)

  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path },
          ]),
          articleJsonLd({ title: guide.title, description: guide.description, path }),
          faqJsonLd(guide.faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm text-slate-500">
          <Link href="/guides" className="font-semibold text-indigo-700">
            Guides
          </Link>
          <span> / {guide.title}</span>
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{guide.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{guide.intro}</p>
        <div className="mt-10 space-y-8">
          {guide.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-slate-950">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-sm leading-7 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        <h2 className="mt-10 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={guide.faqs} />
        </div>
        <GuideResources signupLocation={`guide_${guide.slug}`} />
        <h2 className="mt-10 text-xl font-semibold text-slate-950">More guides</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          <li>
            <Link className="font-semibold text-indigo-700" href="/how-to-get-more-google-reviews">
              How to get more Google reviews
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-indigo-700" href="/how-to-respond-to-negative-google-reviews">
              How to respond to negative Google reviews
            </Link>
          </li>
          {related.map((item) => (
            <li key={item.slug}>
              <Link className="font-semibold text-indigo-700" href={`/guides/${item.slug}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </article>
      <CtaBand
        signupLocation={`guide_${guide.slug}_cta`}
        title="Make the link, then the QR code"
        body="After signup, paste a Place ID or review URL. The next step is the QR code for your review page."
      />
    </MarketingShell>
  )
}
