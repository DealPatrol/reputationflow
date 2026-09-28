import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { faqs } from "@/lib/marketing-content"
import { faqJsonLd, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Answers about ReputationFlow pricing, Google review policies, and what the product does not do.",
  path: "/faq",
})

export default function FaqPage() {
  return (
    <MarketingShell>
      <JsonLd data={faqJsonLd(faqs)} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">FAQ</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Straight answers about review requests, public links, and the two plans.
        </p>
        <div className="mt-8">
          <FaqList items={faqs} />
        </div>
      </section>
      <CtaBand />
    </MarketingShell>
  )
}
