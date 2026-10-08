import type { Metadata } from "next"
import { absoluteUrl, PUBLIC_CONTACT_EMAIL } from "@/lib/site"

interface PageMetaInput {
  title: string
  description: string
  path: string
  keywords?: string[]
}

export function pageMetadata({ title, description, path, keywords }: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "ReputationFlow",
      type: "website",
      locale: "en_US",
      images: [absoluteUrl("/opengraph-image")],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ReputationFlow",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/apple-icon"),
    description:
      "Review request software for local businesses. Every customer sees the same public review links.",
    email: PUBLIC_CONTACT_EMAIL,
    founder: {
      "@type": "Person",
      name: "Cole Collins",
    },
  }
}

export function freeToolJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: input.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl(input.path),
    description: input.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }
}

export function softwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ReputationFlow",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/"),
    description:
      "Send review requests, share a QR code, and collect optional private feedback without hiding public review options.",
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Professional",
        price: "20",
        priceCurrency: "USD",
        url: absoluteUrl("/pricing"),
      },
    ],
  }
}

export const CONTENT_DATE = "2026-10-08"

export function articleJsonLd(input: { title: string; description: string; path: string }) {
  const url = absoluteUrl(input.path)
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: CONTENT_DATE,
    dateModified: CONTENT_DATE,
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: "ReputationFlow",
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: "ReputationFlow",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/apple-icon"),
      },
    },
  }
}

export function howToJsonLd(input: {
  name: string
  description: string
  path: string
  steps: { name: string; text: string }[]
}) {
  const pageUrl = absoluteUrl(input.path)
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    url: pageUrl,
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${pageUrl}#step-${index + 1}`,
    })),
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
