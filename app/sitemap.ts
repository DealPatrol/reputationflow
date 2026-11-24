import type { MetadataRoute } from "next"
import { indexablePaths } from "@/lib/marketing-content"
import { absoluteUrl } from "@/lib/site"

/**
 * One date for every URL. It used to be the request time, so each crawl saw every page as changed
 * and search engines learn to ignore a lastmod that always moves. Bump it when pages change.
 */
export const SITE_CONTENT_UPDATED = new Date("2026-11-24T12:00:00.000Z")

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = SITE_CONTENT_UPDATED
  return indexablePaths().map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
