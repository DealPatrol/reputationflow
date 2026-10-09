import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard", "/auth/", "/signup", "/onboarding", "/demo", "/settings", "/review/", "/feedback/", "/embed/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
