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

    if (!aiResponse) {
      // Fallback to mock responses if AI fails
      const responses = {
        positive: [
          `Thank you so much for your wonderful ${rating}-star review! We're thrilled that you had such a positive experience with us. Your feedback means the world to our team, and we can't wait to serve you again soon!`,
          `We're absolutely delighted to hear about your great experience! Thank you for taking the time to share your ${rating}-star review. Our team works hard to provide exceptional service, and your kind words motivate us every day. We look forward to seeing you again!`,
        ],
        negative: [
          `We sincerely apologize for not meeting your expectations. Your feedback is incredibly valuable to us, and we take it very seriously. We'd love the opportunity to make this right. Please contact us directly so we can address your concerns personally.`,
          `Thank you for bringing this to our attention. We're truly sorry for the experience you had. This isn't the standard we hold ourselves to, and we want to do better. Could you please reach out to us directly?`,
        ],
      }

      const responseType = rating >= 4 ? "positive" : "negative"
      const fallbackResponse = responses[responseType][Math.floor(Math.random() * responses[responseType].length)]

      return NextResponse.json({
        response: fallbackResponse,
        sentiment: responseType,
        source: "fallback",
      })
    }

    return NextResponse.json({
      response: aiResponse,
      sentiment: rating >= 4 ? "positive" : "negative",
      source: "groq-ai",
    })
  } catch (error) {
    console.error("[v0] AI Response Error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
