import { notFound } from "next/navigation"
import { PublicReviewClient } from "@/components/public-review-client"
import { getBusinessById } from "@/lib/db"
import { toPublicBusiness } from "@/lib/public-business"
import { pageMetadata } from "@/lib/seo"

async function loadBusiness(businessId: string) {
  const business = await getBusinessById(businessId)
  return toPublicBusiness(business as Record<string, unknown> | null)
}

export default async function PublicReviewPage({
  params,
}: {
  params: Promise<{ businessId: string }>
}) {
  const { businessId } = await params
  const business = await loadBusiness(businessId)
  if (!business) notFound()
  return <PublicReviewClient business={business} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ businessId: string }>
}) {
  const { businessId } = await params
  const business = await loadBusiness(businessId)
  if (!business) {
    return { title: "Business not found", robots: { index: false, follow: false } }
  }

  return {
    ...pageMetadata({
      title: `Leave a review for ${business.business_name}`,
      description: `Leave a public review for ${business.business_name}. Every rating sees the same review links.`,
      path: `/review/${businessId}`,
    }),
    robots: { index: false, follow: false },
  }
}
