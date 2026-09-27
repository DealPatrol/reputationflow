import { type NextRequest, NextResponse } from "next/server"
import { generateAIResponse } from "@/lib/groq-ai"

export async function POST(request: NextRequest) {
  try {
    const { feedback, rating, businessName } = await request.json()

    if (!feedback || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const context = businessName ? `Business: ${businessName}, Rating: ${rating}/5` : `Rating: ${rating}/5`
    const aiResponse = await generateAIResponse(feedback, context)

    return NextResponse.json({
      response: aiResponse.text,
      sentiment: rating >= 4 ? "positive" : "negative",
      source: aiResponse.source,
    })
  } catch (error) {
    console.error("[v0] AI Response Error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
