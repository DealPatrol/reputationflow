import Groq from "groq-sdk"

let groq: Groq | null = null

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) return null
  groq ??= new Groq({ apiKey })
  return groq
}

export function getDemoResponse(feedback: string) {
  const topic = feedback.trim().split(/\s+/).slice(0, 8).join(" ")
  return `Thank you for sharing your feedback${topic ? ` about “${topic}”` : ""}. We appreciate the opportunity to improve and would be glad to discuss your experience directly.`
}

export async function generateAIResponse(feedback: string, context?: string) {
  const client = getGroqClient()
  if (!client) return { text: getDemoResponse(feedback), source: "demo" as const }

  try {
    const prompt = `You are a professional business owner responding to customer feedback. Generate a thoughtful, professional response.

Customer Feedback: "${feedback}"
${context ? `Business Context: ${context}` : ""}

Generate a response that:
- Thanks the customer for their feedback
- Addresses their specific concerns
- Is professional and empathetic
- Keeps the response to 2-3 sentences

Response:`

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    })

    return { text: completion.choices[0]?.message?.content || getDemoResponse(feedback), source: "groq" as const }
  } catch (error) {
    console.error("Groq AI error:", error)
    return { text: getDemoResponse(feedback), source: "demo" as const }
  }
}

export async function generateReviewTemplate(
  businessType: string,
  tone: "professional" | "friendly" | "casual" = "professional",
) {
  const client = getGroqClient()
  if (!client) {
    return `We value your experience with our ${businessType} team. Would you share an honest review and, optionally, private feedback so we can keep improving?`
  }

  try {
    const prompt = `Generate a review request template for a ${businessType} business with a ${tone} tone. Keep it short (2-3 sentences) and natural.`

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 150,
    })

    return completion.choices[0]?.message?.content || null
  } catch (error) {
    console.error("Groq AI error:", error)
    return null
  }
}
