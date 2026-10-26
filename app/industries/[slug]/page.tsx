import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/marketing/breadcrumbs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqList } from "@/components/marketing/faq-list"
import { JsonLd } from "@/components/marketing/json-ld"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { ConversionPaths } from "@/components/marketing/conversion-paths"
import { PlanOffer } from "@/components/marketing/plan-offer"
import { PricingLink } from "@/components/marketing/pricing-link"
import { SignupLink } from "@/components/marketing/signup-link"
import { SIGNUP_PATH } from "@/lib/signup"
import { tradeReplyGuides } from "@/lib/longtail-guides"
import { industries, industryBySlug, relatedIndustries } from "@/lib/marketing-content"
import { messageToolLinkForPath } from "@/lib/review-message-pages"
import { qrCityPagesForTrade, qrCityPath } from "@/lib/qr-city-pages"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industryBySlug(slug)
  if (!industry) return {}
  return pageMetadata({
    title: industry.title,
    description: industry.description,
    path: `/industries/${industry.slug}`,
    keywords: [industry.keyword, industry.guideHeading.toLowerCase(), "google reviews", "review requests"],
  })
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industryBySlug(slug)
  if (!industry) notFound()
  const related = relatedIndustries(industry.slug)
  const cityPages = qrCityPagesForTrade(industry.slug)
  const messageLink = messageToolLinkForPath(`/industries/${industry.slug}`)

  return (
    <MarketingShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: industry.name, path: `/industries/${industry.slug}` },
          ]),
          faqJsonLd(industry.faqs),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: industry.name, path: `/industries/${industry.slug}` },
          ]}
        />
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{industry.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{industry.intro}</p>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          <Link className="font-semibold text-indigo-700" href="/tools/qr-code">
            Make the QR code
          </Link>
          {" "}or{" "}
          <PricingLink location={`industry_intro_${industry.slug}`} className="font-semibold text-indigo-700">
            compare {PLANS.free.name} and {PLANS.pro.name}
          </PricingLink>
          .
          {cityPages.length > 0 ? (
            <>
              {" "}
              City versions are on the{" "}
              <Link className="font-semibold text-indigo-700" href="/google-review-qr-by-city">
                city QR guides
              </Link>
              .
            </>
          ) : null}
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">{industry.guideHeading}</h2>
        <h3 className="mt-6 text-base font-semibold text-slate-950">Best moment to ask</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{industry.bestMoment}</p>

        <h3 className="mt-8 text-base font-semibold text-slate-950">Where to put the link</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
          {industry.moments.map((moment) => (
            <li key={moment}>{moment}</li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Sample review request</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Copy this into a text or an email and replace the brackets. Send it yourself. ReputationFlow does not text customers. On the Professional plan ({formatPlanPrice(PLANS.pro.price)} per month) you can email the same link when you choose the customer. Starter is free and includes the link and QR code.
        </p>
        <blockquote className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-800">
          {industry.sampleMessage}
        </blockquote>
        <PlanOffer
          signupLocation={`industry_offer_${industry.slug}`}
          pricingLocation={`industry_offer_${industry.slug}`}
          heading="Keep the QR code, or email the request"
          body="The free generator builds the link and the PNG in your browser. It does not keep the file, and it does not email customers. An account is optional."
        />

        <div className="mt-10 space-y-8">
          {industry.tips.map((tip) => (
            <section key={tip.title}>
              <h2 className="text-xl font-semibold text-slate-950">{tip.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{tip.body}</p>
            </section>
          ))}
        </div>

        {cityPages.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-950">In a specific city</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              The steps above are the national version of a Google review QR code for this trade. These cities change where the card goes or when you send the text, because the job itself is different there. If your city is not listed, use this page. A new town name is not a separate guide.
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-7">
              {cityPages.map((page) => (
                <li key={page.citySlug}>
                  <Link className="font-semibold text-indigo-700" href={qrCityPath(page)}>
                    {page.heading}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <h2 className="mt-10 text-xl font-semibold text-slate-950">What not to do</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Do not offer a discount, a free visit, or a gift for a review. Google’s policies prohibit incentives, and ReputationFlow does not include coupon-for-review templates. Do not hand someone a star target or a review you wrote. Every customer sees the same Google, Facebook, and Yelp buttons, including after a bad visit. A private note is an extra box on that page. It does not replace those links.
        </p>

        {industry.spokes && industry.spokes.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-slate-950">Specialty trades</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              This page is for a general contractor at the final walkthrough. A single trade asks at a different moment, so use that page for the QR code and the sample message.
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-7">
              {industry.spokes.map((spoke) => (
                <li key={spoke.slug}>
                  <Link className="font-semibold text-indigo-700" href={`/industries/${spoke.slug}`}>
                    {spoke.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {tradeReplyGuides[industry.slug] ? (
          <p className="mt-4 text-sm leading-7 text-slate-600">
            When a review is already public, use the{" "}
            <Link className="font-semibold text-indigo-700" href={tradeReplyGuides[industry.slug].path}>
              {tradeReplyGuides[industry.slug].label.toLowerCase()}
            </Link>
            . Those are reply templates, not the ask.
          </p>
        ) : null}

        {industry.seeAlso ? (
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {industry.seeAlso.lead}{" "}
            <Link className="font-semibold text-indigo-700" href={`/industries/${industry.seeAlso.slug}`}>
              {industry.seeAlso.label}
            </Link>
            .
          </p>
        ) : null}

        <h2 className="mt-10 text-xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4">
          <FaqList items={industry.faqs} />
        </div>

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Make the link and the QR code</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Paste a Place ID or the long Google Maps URL into the{" "}
          <Link className="font-semibold text-indigo-700" href="/tools/qr-code">
            free Google review QR code generator
          </Link>
          . It builds the write-a-review link and a PNG you can download, in the browser, with no API key. The{" "}
          <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
            Google review link generator
          </Link>{" "}
          is the same tool, with the steps written for a text or an email.{" "}
          <SignupLink className="font-semibold text-indigo-700" href={SIGNUP_PATH} location="industry_body">
            Create a free account
          </SignupLink>{" "}
          to keep that link, the QR code, and the customer page together. Copy wording from the{" "}
          <Link className="font-semibold text-indigo-700" href="/google-review-request-templates">
            review request templates
          </Link>
          , fill the names and the link with the{" "}
          <Link className="font-semibold text-indigo-700" href={messageLink.href}>
            {messageLink.label}
          </Link>
          , or read the{" "}
          <Link className="font-semibold text-indigo-700" href="/guides">
            review guides
          </Link>
          . Browse the{" "}
          <Link className="font-semibold text-indigo-700" href="/industries">
            rest of the trades
          </Link>{" "}
          if you run more than one kind of work. The full city list is the{" "}
          <Link className="font-semibold text-indigo-700" href="/google-review-qr-by-city">
            city QR guides
          </Link>
          .
        </p>
        <ConversionPaths current={`/industries/${industry.slug}`} />

        <h2 className="mt-10 text-xl font-semibold text-slate-950">Nearby guides</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          {related.map((item) => (
            <li key={item.slug}>
              <Link className="font-semibold text-indigo-700" href={`/industries/${item.slug}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </article>
      <CtaBand
        signupLocation="industry_cta"
        title={`Set up review requests for your ${industry.businessLabel}`}
        body="Add the Google review link, print the QR code, and use the same page for every customer."
      />
    </MarketingShell>
  )
}
