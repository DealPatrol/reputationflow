import { type NextRequest, NextResponse } from "next/server"
import { getFeedbackByBusinessId } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, rating, feedback, type, platform } = body

    console.log("[v0] Received feedback:", { userId, rating, type, platform })

    // Validation
    if (!userId || !rating) {
      return NextResponse.json({ success: false, error: "User ID and rating required" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // In production, save to database
    // Example with Supabase:
    // const { data, error } = await supabase
    //   .from('feedbacks')
    //   .insert([{ user_id: userId, rating, feedback, type, platform, created_at: new Date() }])

    // For now, just log and return success
    const feedbackData = {
      id: Date.now().toString(),
      userId,
      rating,
      feedback: feedback || "",
      type: type || "neutral",
      platform: platform || "unknown",
      timestamp: new Date().toISOString(),
    }

    console.log("[v0] Feedback stored:", feedbackData)

    // Optional: Send notification to business owner for negative feedback
    if (type === "negative" && rating <= 3) {
      console.log("[v0] Negative feedback alert:", { userId, rating, feedback })
      // TODO: Send email/SMS notification to business owner
    }

    return NextResponse.json({
      success: true,
      data: feedbackData,
    })
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

    // Transform to match frontend format
    const transformedFeedbacks = feedbacks.map((f: any) => ({
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
