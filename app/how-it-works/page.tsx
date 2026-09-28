import { CtaBand } from "@/components/marketing/cta-band"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "How ReputationFlow works",
  description:
    "See how a ReputationFlow review page works: one link, the same public review buttons for every customer, and optional private feedback.",
  path: "/how-it-works",
})

const stages = [
  {
    title: "You add destinations",
    body: "In Business Profile, paste your Google review link and any Facebook or Yelp URLs. Extra links are for additional locations, and they are shown to every customer.",
  },
  {
    title: "The customer opens one page",
    body: "They pick a star rating, then see every public review button plus a box for a private note. The buttons do not depend on the rating.",
  },
  {
    title: "You follow up from the dashboard",
    body: "Private notes and the rating they selected are stored for you. Reviews they publish on Google stay on Google. You can draft a reply and copy it onto the platform.",
  },
  {
    title: "Email is manual",
    body: "Professional accounts can send a review request to a specific customer. ReputationFlow does not connect to a point of sale or send a drip campaign on its own.",
  },
]

export default function HowItWorksPage() {
  return (
    <MarketingShell>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How it works", path: "/how-it-works" }])} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Product</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">How it works</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          ReputationFlow is a review request page for a local business. It is not a filter that decides who is allowed to review you in public.
        </p>
        <ol className="mt-10 space-y-8">
          {stages.map((stage, index) => (
            <li key={stage.title}>
              <h2 className="text-xl font-semibold text-slate-950">{index + 1}. {stage.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{stage.body}</p>
            </li>
          ))}
        </ol>
      </article>
      <CtaBand />
    </MarketingShell>
  )
}
