import { NextResponse } from "next/server"
import { createFeedback, getBusinessById, getBusinessOwnerEmail } from "@/lib/db"
import { sendNegativeFeedbackAlert } from "@/lib/email"
import { sanitize, validators } from "@/lib/validators"

export async function POST(request: Request) {
  try {
    const { businessId, rating, feedback_text, customer_email } = await request.json()

    if (!businessId || rating === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

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

    const business = await getBusinessById(businessId)
    if (!business) return NextResponse.json({ error: "Business not found" }, { status: 404 })

    const feedbackType = numericRating >= 4 ? "positive" : numericRating <= 2 ? "negative" : "neutral"
    const feedback = await createFeedback(businessId, {
      rating: numericRating,
      feedback_text: feedback_text ? sanitize.text(feedback_text) : undefined,
      type: feedbackType,
      customer_email,
    })

    if (numericRating <= 3 && feedback_text) {
      getBusinessOwnerEmail(businessId)
        .then((owner) => {
          if (owner?.owner_email) {
            return sendNegativeFeedbackAlert(
              owner.owner_email,
              owner.business_name,
              numericRating,
              feedback_text,
            )
          }
        })
        .catch(() => {})
    }

    return NextResponse.json({ success: true, feedback })
  } catch (error) {
    console.error("[v0] Public feedback submission error:", error)
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}
