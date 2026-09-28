import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/site"

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ReputationFlow",
    url: absoluteUrl("/"),
    description:
      "Review request software for local businesses. Every customer sees the same public review links.",
    email: "support@reputationflow.app",
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
