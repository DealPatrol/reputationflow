import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { createFeedback } from "@/lib/db"
import { sanitize, validators } from "@/lib/validators"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user?.businessId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const { rating, feedback_text, customer_email } = body

    const numericRating = Number(rating)
    const ratingValidation = validators.rating(numericRating)
    if (!ratingValidation.valid) {
      return NextResponse.json({ error: ratingValidation.error }, { status: 400 })
    }

    if (feedback_text) {
      const feedbackValidation = validators.feedback(feedback_text)
      if (!feedbackValidation.valid) {
        return NextResponse.json({ error: feedbackValidation.error }, { status: 400 })
      }
    }

    if (customer_email && !validators.email(customer_email).valid) {
      return NextResponse.json({ error: "Invalid customer email" }, { status: 400 })
    }

    const type = numericRating >= 4 ? "positive" : numericRating <= 2 ? "negative" : "neutral"
    const feedback = await createFeedback(user.businessId, {
      rating: numericRating,
      feedback_text: feedback_text ? sanitize.text(feedback_text) : "",
      type,
      customer_email,
    })

    return NextResponse.json({
      id: feedback.id,
      rating: feedback.rating,
      feedback: feedback.feedback_text,
      type: feedback.type,
      timestamp: { seconds: new Date(feedback.created_at).getTime() / 1000 },
    })
  } catch (error) {
    console.error("[v0] Error saving feedback:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
