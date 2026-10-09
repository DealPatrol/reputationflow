import Link from "next/link"
import { CtaBand } from "@/components/marketing/cta-band"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { PUBLIC_CONTACT_EMAIL } from "@/lib/site"

export const metadata = pageMetadata({
  title: "About ReputationFlow",
  description:
    "ReputationFlow helps local businesses ask every customer for a review with one link and QR code, without review gating.",
  path: "/about",
})

const principles = [
  {
    title: "Every customer gets the same ask",
    body: "The public review buttons never change with the star rating. That keeps your profile within Google policy and FTC guidance.",
  },
  {
    title: "Plain pricing",
    body: "Starter is free. Professional is a flat monthly price on the pricing page, billed through Stripe, with no setup fee or contract.",
  },
  {
    title: "Your data, used for your account",
    body: "Customer feedback is stored for your business only and shared just with the service providers listed in the privacy policy.",
  },
]

export default function AboutPage() {
  return (
    <MarketingShell>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Company</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">About ReputationFlow</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Local businesses win on Google reviews, but asking for them is easy to forget. ReputationFlow gives every shop, clinic, and
          crew one review link and QR code to hand to every customer, plus a dashboard for the notes they send back.
        </p>
        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-slate-950">What we stand for</h2>
        <div className="mt-6 grid gap-4">
          {principles.map((item) => (
            <section key={item.title} className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm leading-6 text-slate-600">
          Questions about the product or your account? Email{" "}
          <a className="font-semibold text-indigo-700" href={`mailto:${PUBLIC_CONTACT_EMAIL}`}>{PUBLIC_CONTACT_EMAIL}</a> or visit the{" "}
          <Link className="font-semibold text-indigo-700" href="/contact">contact page</Link>.
        </p>
      </article>
      <CtaBand />
    </MarketingShell>
  )
}
