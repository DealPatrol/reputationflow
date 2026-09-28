import Link from "next/link"
import { getBusinessById } from "@/lib/db"
import { toPublicBusiness } from "@/lib/public-business"

export const metadata = {
  robots: { index: false, follow: false },
  title: "Leave a review",
}

export default async function EmbedPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params
  const business = toPublicBusiness((await getBusinessById(businessId)) as Record<string, unknown> | null)

  if (!business) {
    return (
      <div className="flex min-h-40 items-center justify-center bg-white p-6 text-sm text-slate-600">
        This review widget is not available.
      </div>
    )
  }

  return (
    <div className="flex min-h-48 items-center justify-center bg-white p-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 p-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reviews</p>
        <h1 className="mt-2 text-lg font-semibold text-slate-950">{business.business_name}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Leave a public review. Every customer sees the same links.
        </p>
        <Link
          href={`/review/${business.id}`}
          className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Leave a review
        </Link>
      </div>
    </div>
  )
}
