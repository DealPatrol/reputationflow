import { type NextRequest, NextResponse } from "next/server"
import { getFeedbackByBusinessId, createFeedback } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { validators, sanitize } from "@/lib/validators"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { rating, feedback_text, type, customer_email } = body

    if (!rating) {
      return NextResponse.json({ success: false, error: "Rating is required" }, { status: 400 })
    }

    const ratingValidation = validators.rating(rating)
    if (!ratingValidation.valid) {
      return NextResponse.json({ success: false, error: ratingValidation.error }, { status: 400 })
    }

    const feedbackType: "positive" | "negative" =
      type === "positive" || type === "negative"
        ? type
        : Number(rating) >= 4
          ? "positive"
          : "negative"

    const sanitizedText = feedback_text ? sanitize.html(feedback_text) : undefined

    const feedback = await createFeedback(user.businessId!, {
      rating: Number(rating),
      feedback_text: sanitizedText,
      type: feedbackType,
      customer_email: customer_email || undefined,
    })

    return NextResponse.json({ success: true, data: feedback })
  } catch (error) {
    console.error("[v0] Error saving feedback:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const businessId = searchParams.get("businessId")

    if (!businessId) {
      return NextResponse.json({ error: "Business ID required" }, { status: 400 })
    }

    const feedbacks = await getFeedbackByBusinessId(businessId)

    const transformedFeedbacks = (feedbacks as any[]).map((f: any) => ({
      id: f.id,
      rating: f.rating,
      feedback: f.feedback_text,
      type: f.type,
      timestamp: { seconds: new Date(f.created_at).getTime() / 1000 },
      responded: f.responded,
    }))

    return NextResponse.json({
      feedbacks: transformedFeedbacks,
    })
  } catch (error) {
    console.error("[v0] Error fetching feedback:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
