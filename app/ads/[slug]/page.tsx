import Link from "next/link"
import { notFound } from "next/navigation"
import { SignupLink } from "@/components/marketing/signup-link"
import { adLandingBySlug, adLandings } from "@/lib/ad-landings"
import { pageMetadata } from "@/lib/seo"
import { PUBLIC_CONTACT_EMAIL } from "@/lib/site"

export function generateStaticParams() {
  return adLandings.map((landing) => ({ slug: landing.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const landing = adLandingBySlug(slug)
  if (!landing) return {}
  return pageMetadata({
    title: landing.title,
    description: landing.description,
    path: `/ads/${landing.slug}`,
    canonicalPath: landing.canonicalPath,
    index: false,
  })
}

export default async function AdLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const landing = adLandingBySlug(slug)
  if (!landing) notFound()

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-3xl items-center px-4 py-4 sm:px-6">
          <Link href="/" className="text-base font-semibold tracking-tight text-slate-950">
            ReputationFlow
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">{landing.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{landing.headline}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{landing.lede}</p>
        <ul className="mt-8 space-y-3 text-sm leading-7 text-slate-700">
          {landing.points.map((point) => (
            <li key={point} className="rounded-2xl border border-slate-200 px-5 py-4">
              {point}
            </li>
          ))}
        </ul>
        <SignupLink
          href="/auth/signin?signup=1"
          location={`ad_${landing.slug}`}
          className="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Start free
        </SignupLink>
      </main>
      <footer className="border-t border-slate-200">
        <p className="mx-auto flex max-w-3xl flex-wrap gap-x-4 gap-y-2 px-4 py-6 text-xs text-slate-500 sm:px-6">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href={`mailto:${PUBLIC_CONTACT_EMAIL}`}>Contact</a>
        </p>
      </footer>
    </div>
  )
}
