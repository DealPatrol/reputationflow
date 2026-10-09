import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import robots from "@/app/robots"
import sitemap from "@/app/sitemap"
import { articleJsonLd, freeToolJsonLd, howToJsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo"
import { PUBLIC_CONTACT_EMAIL } from "@/lib/site"

const textExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".md", ".json", ".css", ".txt", ".example"])

function collectTextFiles(directory: string): string[] {
  const entries = readdirSync(directory)
  return entries.flatMap((entry) => {
    if (entry === "node_modules" || entry === ".next" || entry === ".git" || entry === "out") return []
    const path = join(directory, entry)
    const stats = statSync(path)
    if (stats.isDirectory()) return collectTextFiles(path)
    const extension = path.includes(".env") ? ".example" : path.slice(path.lastIndexOf("."))
    if (textExtensions.has(extension) || path.endsWith(".env.example")) return [path]
    return []
  })
}

describe("public contact and owned domains", () => {
  it("publishes the gmail contact address", () => {
    expect(PUBLIC_CONTACT_EMAIL).toBe("support@tryreputationflow.com")
  })

  it("does not mention unowned reputationflow domains", () => {
    const banned = [new RegExp(`(?<![a-z0-9-])reputationflow\\.${"app"}`), new RegExp(`(?<![a-z0-9-])reputationflow\\.${"com"}`)]
    const files = collectTextFiles(process.cwd())
    const hits = files.flatMap((file) => {
      const source = readFileSync(file, "utf8")
      return banned.filter((phrase) => phrase.test(source)).map((phrase) => `${file}: ${phrase.source}`)
    })
    expect(hits).toEqual([])
  })
})

describe("seo metadata", () => {
  const originalSite = process.env.NEXT_PUBLIC_SITE_URL
  const originalApp = process.env.NEXT_PUBLIC_APP_URL

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = originalSite
    process.env.NEXT_PUBLIC_APP_URL = originalApp
  })

  it("adds a canonical, open graph url, and image on each marketing page", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://reviews.example.com"
    const metadata = pageMetadata({
      title: "Pricing",
      description: "Plans",
      path: "/pricing",
    })
    expect(metadata.alternates).toEqual({ canonical: "https://reviews.example.com/pricing" })
    expect(metadata.openGraph).toMatchObject({
      url: "https://reviews.example.com/pricing",
      images: ["https://reviews.example.com/opengraph-image"],
    })
  })

  it("describes the organization with a logo, founder, and contact email", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://reviews.example.com"
    expect(organizationJsonLd()).toMatchObject({
      logo: "https://reviews.example.com/apple-icon",
      email: "support@tryreputationflow.com",
      founder: { "@type": "Person", name: "Cole Collins" },
    })
  })

  it("describes a how-to with one step url per instruction", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://reviews.example.com"
    const data = howToJsonLd({
      name: "Make a review link",
      description: "Paste a Place ID",
      path: "/tools/google-review-link",
      steps: [
        { name: "Copy the ID", text: "Open the Business Profile." },
        { name: "Paste it", text: "Use the box on the page." },
      ],
    })
    expect(data).toMatchObject({
      "@type": "HowTo",
      url: "https://reviews.example.com/tools/google-review-link",
    })
    expect(data.step).toHaveLength(2)
    expect(data.step[1]).toMatchObject({
      position: 2,
      url: "https://reviews.example.com/tools/google-review-link#step-2",
    })
  })

  it("describes an article with a publisher and a stable date", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://reviews.example.com"
    expect(articleJsonLd({
      title: "How to ask",
      description: "Scripts",
      path: "/guides/how-to-ask-customers-for-reviews",
    })).toMatchObject({
      "@type": "Article",
      headline: "How to ask",
      datePublished: "2026-10-08",
      dateModified: "2026-10-08",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://reviews.example.com/guides/how-to-ask-customers-for-reviews",
      },
      author: { "@type": "Organization", name: "ReputationFlow" },
      publisher: { "@type": "Organization", name: "ReputationFlow" },
    })
  })

  it("marks free tools as a zero-price web application", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://reviews.example.com"
    expect(
      freeToolJsonLd({
        name: "QR code generator",
        description: "Free QR codes",
        path: "/tools/qr-code",
      }),
    ).toMatchObject({
      "@type": ["SoftwareApplication", "WebApplication"],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })
  })

  it("omits the non-standard robots host and stamps sitemap dates", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://reviews.example.com"
    expect(robots()).not.toHaveProperty("host")
    const entries = sitemap()
    expect(entries.length).toBeGreaterThan(0)
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date)
      expect(entry.url.startsWith("https://reviews.example.com")).toBe(true)
    }
  })
})
