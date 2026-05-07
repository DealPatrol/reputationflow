import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function generateAIResponse(feedback: string, context?: string) {
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

    const completion = await groq.chat.completions.create({
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

    return completion.choices[0]?.message?.content || null
  } catch (error) {
    console.error("Groq AI error:", error)
    return null
  }
}

export async function generateReviewTemplate(
  businessType: string,
  tone: "professional" | "friendly" | "casual" = "professional",
) {
  try {
    const prompt = `Generate a review request template for a ${businessType} business with a ${tone} tone. Keep it short (2-3 sentences) and natural.`

    const completion = await groq.chat.completions.create({
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
