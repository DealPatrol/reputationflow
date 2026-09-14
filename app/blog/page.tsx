import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react"
import { ARTICLES } from "./content"

export const metadata: Metadata = {
  title: "Review Management Resources",
  description: "Practical guides for getting honest reviews, learning from customer feedback, and improving your local business reputation.",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/90">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5" aria-label="Main navigation">
          <Link href="/" className="text-xl font-black tracking-tight">Feedbackr</Link>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Link href="/guides" className="hidden rounded-full px-3 py-2 text-muted-foreground hover:text-foreground sm:block">Guides</Link>
            <Link href="/pricing" className="rounded-full bg-primary px-4 py-2 text-primary-foreground">See pricing</Link>
          </div>
        </nav>
      </header>
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:pt-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-accent">The Feedbackr library</p>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">Better reviews start with better conversations.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Practical, plain-English guidance for local businesses that want more honest reviews and a customer experience worth talking about.</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-muted-foreground"><span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-accent" /> No review gating</span><span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-accent" /> Built for small teams</span></div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-20 md:grid-cols-3" aria-label="Articles">
        {ARTICLES.map((article) => <article key={article.slug} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="mb-8 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground"><span>{article.category}</span><BookOpen className="size-4 text-accent" /></div><h2 className="text-2xl font-black leading-tight">{article.title}</h2><p className="mt-4 flex-1 leading-7 text-muted-foreground">{article.description}</p><div className="mt-8 flex items-center justify-between border-t border-border pt-5 text-sm"><span className="text-muted-foreground">{article.readTime}</span><Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-2 font-bold text-accent">Read guide <ArrowRight className="size-4" /></Link></div></article>)}
      </section>
      <section className="mx-5 mb-16 rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-12"><div className="mx-auto max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground/60">Put it into practice</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Create a feedback loop your team can actually use.</h2><Link href="/pricing" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground">Explore Feedbackr <ArrowRight className="size-4" /></Link></div></section>
    </main>
  )
}
