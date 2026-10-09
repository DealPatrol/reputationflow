import Link from "next/link"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { PUBLIC_CONTACT_EMAIL } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Contact ReputationFlow",
  description: "Contact ReputationFlow support about your account, billing, or review page setup.",
  path: "/contact",
})

const topics = [
  { title: "Account and setup", body: "Help adding your Google review link, printing a QR code, or adding a location." },
  { title: "Billing", body: "Questions about Professional, invoices, or canceling. You can also manage billing from Settings." },
  { title: "Privacy requests", body: "Ask for a copy of your data, a correction, or deletion. See the privacy policy for details." },
]

export default function ContactPage() {
  return (
    <MarketingShell>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Company</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Contact support</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Email us and a real person will reply. Include your business name and the email on your account so we can help faster.
        </p>
        <a
          href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
          className="mt-8 inline-flex rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Email {PUBLIC_CONTACT_EMAIL}
        </a>
        <div className="mt-12 grid gap-4">
          {topics.map((topic) => (
            <section key={topic.title} className="rounded-2xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-950">{topic.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{topic.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm text-slate-600">
          Read the <Link className="font-semibold text-indigo-700" href="/privacy">privacy policy</Link> and{" "}
          <Link className="font-semibold text-indigo-700" href="/terms">terms of service</Link>.
        </p>
      </article>
    </MarketingShell>
  )
}
