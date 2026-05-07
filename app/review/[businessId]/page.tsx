import { notFound } from "next/navigation"
import { PublicReviewClient } from "@/components/public-review-client"

async function getBusinessData(businessId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/business/public?id=${businessId}`,
      { cache: "no-store" },
    )

    if (!res.ok) return null

    const data = await res.json()
    return data.business
  } catch (error) {
    console.error("[v0] Failed to fetch business:", error)
    return null
  }
}

export default async function PublicReviewPage({
  params,
}: {
  params: Promise<{ businessId: string }>
}) {
  const { businessId } = await params
  const business = await getBusinessData(businessId)

  if (!business) {
    notFound()
  }

  return <PublicReviewClient business={business} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ businessId: string }>
}) {
  const { businessId } = await params
  const business = await getBusinessData(businessId)

  if (!business) {
    return {
      title: "Business Not Found",
    }
  }

  return {
    title: `Leave a Review - ${business.business_name}`,
    description: `Share your experience with ${business.business_name}`,
  }
}
