import type { MetadataRoute } from "next"
import { indexablePaths } from "@/lib/marketing-content"
import { absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths().map((entry) => ({
    url: absoluteUrl(entry.path),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
