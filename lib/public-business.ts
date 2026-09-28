export interface PublicBusiness {
  id: string | number
  business_name: string
  google_link: string
  facebook_link: string
  yelp_link: string
  google_links_2: string[]
  facebook_links_2: string[]
  yelp_links_2: string[]
}

function asLinkList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
}

/** Fields safe to show on a public review page. Omits account, billing, and owner data. */
export function toPublicBusiness(business: Record<string, unknown> | null | undefined): PublicBusiness | null {
  if (!business || (business.id !== 0 && !business.id)) return null
  return {
    id: business.id as string | number,
    business_name: typeof business.business_name === "string" && business.business_name.trim()
      ? business.business_name
      : "This business",
    google_link: typeof business.google_link === "string" ? business.google_link : "",
    facebook_link: typeof business.facebook_link === "string" ? business.facebook_link : "",
    yelp_link: typeof business.yelp_link === "string" ? business.yelp_link : "",
    google_links_2: asLinkList(business.google_links_2),
    facebook_links_2: asLinkList(business.facebook_links_2),
    yelp_links_2: asLinkList(business.yelp_links_2),
  }
}
