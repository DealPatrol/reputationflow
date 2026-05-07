import { Suspense } from "react"
import { NegativeFeedbackClient } from "@/components/negative-feedback-client"
import { Skeleton } from "@/components/ui/skeleton"

interface FeedbackPageProps {
  params: Promise<{ businessId: string }>
}

function FeedbackSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-50 flex flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Skeleton className="h-64 rounded-3xl" />
      </div>
    </div>
  )
}

export default async function FeedbackPage({ params }: FeedbackPageProps) {
  const { businessId } = await params

  return (
    <Suspense fallback={<FeedbackSkeleton />}>
      <NegativeFeedbackClient businessId={businessId} />
    </Suspense>
  )
}
