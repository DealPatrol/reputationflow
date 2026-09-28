import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getBusinessByUserId, saveFeedbackResponse } from "@/lib/db"
import { sanitize } from "@/lib/validators"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user?.businessId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const business = await getBusinessByUserId(user.id)
    const isPro = Boolean(business?.is_premium) || business?.plan_type === "pro"
    if (!isPro) {
      return NextResponse.json({ error: "AI response drafts require a Professional plan" }, { status: 403 })
    }

    const { feedbackId, response } = await request.json()
    const text = typeof response === "string" ? sanitize.text(response) : ""
    if (!feedbackId || text.length < 2 || text.length > 2000) {
      return NextResponse.json({ error: "A response between 2 and 2000 characters is required" }, { status: 400 })
    }

    const saved = await saveFeedbackResponse(user.businessId, feedbackId, text)
    if (!saved) return NextResponse.json({ error: "Feedback not found" }, { status: 404 })

    return NextResponse.json({ success: true, feedback: saved })
  } catch (error) {
    console.error("[v0] Save response error:", error)
    return NextResponse.json({ error: "Failed to save response" }, { status: 500 })
  }
}
