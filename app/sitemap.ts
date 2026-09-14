import type { MetadataRoute } from "next"
import { ARTICLES } from "./blog/content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://feedbackr.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/pricing", "/case-studies", "/guides", "/blog", "/industries/restaurants", "/industries/salons", "/industries/dental-practices"]
  const articleRoutes = ARTICLES.map((article) => `/blog/${article.slug}`)

  return [...staticRoutes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.8 })), ...articleRoutes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 }))]
}
