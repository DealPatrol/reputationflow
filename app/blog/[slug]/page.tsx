import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { ARTICLES, getArticle } from "../content"

export function generateStaticParams() { return ARTICLES.map((article) => ({ slug: article.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return { title: article.title, description: article.description, alternates: { canonical: `/blog/${article.slug}` }, openGraph: { type: "article", title: article.title, description: article.description, publishedTime: article.publishedAt } }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, datePublished: article.publishedAt, author: { "@type": "Organization", name: "Feedbackr" }, publisher: { "@type": "Organization", name: "Feedbackr" } }
  return <main className="min-h-screen bg-background text-foreground"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><header className="border-b border-border/70"><nav className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5"><Link href="/" className="text-xl font-black tracking-tight">Feedbackr</Link><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground"><ArrowLeft className="size-4" /> All guides</Link></nav></header><article className="mx-auto max-w-3xl px-5 pb-20 pt-14 sm:pt-20"><div className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{article.category} · {article.readTime}</div><h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-6xl">{article.title}</h1><p className="mt-6 text-xl leading-9 text-muted-foreground">{article.intro}</p><div className="mt-6 text-sm text-muted-foreground">Published September 13, 2026 · By Feedbackr</div><div className="mt-12 space-y-12">{article.sections.map((section) => <section key={section.heading}><h2 className="text-2xl font-black sm:text-3xl">{section.heading}</h2><div className="mt-4 space-y-4 text-lg leading-8 text-muted-foreground">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{section.bullets && <ul className="mt-5 space-y-3">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-muted-foreground"><CheckCircle2 className="mt-1 size-5 shrink-0 text-accent" />{bullet}</li>)}</ul>}</section>)}</div><section className="mt-14 border-t border-border pt-10"><h2 className="text-2xl font-black">Common questions</h2><div className="mt-6 space-y-6">{article.faqs.map((faq) => <div key={faq.question}><h3 className="font-bold">{faq.question}</h3><p className="mt-2 leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section><div className="mt-14 rounded-3xl bg-primary p-7 text-primary-foreground"><h2 className="text-2xl font-black">Make honest feedback part of your routine.</h2><p className="mt-3 text-primary-foreground/70">Explore a straightforward review and feedback workflow for your business.</p><Link href="/pricing" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground">See pricing <ArrowRight className="size-4" /></Link></div></article></main>
}
