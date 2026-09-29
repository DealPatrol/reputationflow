import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import robots from "@/app/robots"
import sitemap from "@/app/sitemap"
import { freeToolJsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo"
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
    expect(PUBLIC_CONTACT_EMAIL).toBe("colecollins763@gmail.com")
  })

  it("does not mention unowned reputationflow domains", () => {
    const banned = [`reputationflow.${"app"}`, `reputationflow.${"com"}`]
    const files = collectTextFiles(process.cwd())
    const hits = files.flatMap((file) => {
      const source = readFileSync(file, "utf8")
      return banned.filter((phrase) => source.includes(phrase)).map((phrase) => `${file}: ${phrase}`)
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
      email: "colecollins763@gmail.com",
      founder: { "@type": "Person", name: "Cole Collins" },
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
