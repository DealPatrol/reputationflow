import Link from "next/link"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { industryBySlug } from "@/lib/industries"
import { qrCityHub, qrCityPagesForTrade, qrCityPath, qrCityTradeOrder } from "@/lib/qr-city-pages"
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo"

const crumbs = [
  { name: "Home", path: "/" },
  { name: qrCityHub.title, path: qrCityHub.path },
]

export const metadata = pageMetadata({
  title: qrCityHub.title,
  description: qrCityHub.description,
  path: qrCityHub.path,
  keywords: ["google review qr code by city", "google review qr code for plumbers", "hvac google review qr code"],
})

export default function QrCityHubPage() {
  const trades = qrCityTradeOrder().flatMap((slug) => {
    const trade = industryBySlug(slug)
    if (!trade) return []
    return [{ trade, pages: qrCityPagesForTrade(slug) }]
  })

  return (
    <MarketingShell>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(qrCityHub.faqs)]} />
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950">{qrCityHub.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          The trade pages already cover a Google review QR code for plumbers, HVAC companies, roofers, and electricians. These city pages are the visits where the city changes the card and the timing. A missing city should use the national trade page. Renaming a page is not a new guide.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          Make the code with the{" "}
          <Link className="font-semibold text-indigo-700" href="/tools/qr-code">
            free Google review QR code generator
          </Link>
          . The{" "}
          <Link className="font-semibold text-indigo-700" href="/industries">
            full trade list
          </Link>{" "}
          includes jobs that do not have a city page, such as cleaning, dental, and salons, because the counter or the invoice does not change enough from one city to another.
        </p>

        <div className="mt-12 space-y-12">
          {trades.map(({ trade, pages }) => (
            <section key={trade.slug}>
              <h2 className="text-xl font-semibold text-slate-950">
                <Link className="hover:text-indigo-700" href={`/industries/${trade.slug}`}>
                  {trade.title}
                </Link>
              </h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {pages.map((page) => (
                  <li key={page.citySlug}>
                    <Link href={qrCityPath(page)} className="block h-full rounded-2xl border border-slate-200 p-5 hover:border-indigo-300">
                      <h3 className="font-semibold text-slate-950">{page.heading}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{page.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4 max-w-3xl">
          <FaqList items={qrCityHub.faqs} />
        </div>
      </article>
      <CtaBand
        signupLocation="qr_city_hub"
        title="Start free and save the review link"
        body="Create the QR code in the browser, then keep it on a free ReputationFlow page with Google, Facebook, and Yelp."
      />
    </MarketingShell>
  )
}
