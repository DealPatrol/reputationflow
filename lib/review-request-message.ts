import { reviewRequestTemplates, type ReviewRequestTemplate } from "@/lib/review-request-templates"

export const REQUEST_CHANNELS = ["sms", "email", "inPerson"] as const
export type RequestChannel = (typeof REQUEST_CHANNELS)[number]

export const REQUEST_COMPOSER_NOTE =
  "Copy this and send it yourself. ReputationFlow does not text customers and does not send this message."

const SENDER_KEYS = new Set(["your name", "tech name", "stylist", "agent"])
const BUSINESS_KEYS = new Set(["company", "practice", "salon", "restaurant", "shop", "brokerage"])

export interface ReviewRequestFields {
  firstName: string
  senderName: string
  businessName: string
  reviewLink: string
}

export function templateByTrade(trade: string): ReviewRequestTemplate {
  return reviewRequestTemplates.find((template) => template.trade === trade) ?? reviewRequestTemplates[0]
}

export function channelScript(template: ReviewRequestTemplate, channel: RequestChannel): string {
  switch (channel) {
    case "sms":
      return template.sms
    case "email":
      return template.email
    case "inPerson":
      return template.inPerson
    default: {
      const unreachable: never = channel
      return unreachable
    }
  }
}

export function emailSubject(businessName: string): string {
  const name = businessName.trim() || "us"
  return `A Google review for ${name}`
}

export function fillReviewRequest(template: string, fields: ReviewRequestFields): { text: string; unresolved: string[] } {
  const unresolved = new Set<string>()
  const text = template.replace(/\[([^\]]+)\]/g, (full, raw: string) => {
    const key = raw.trim().toLowerCase()
    if (key === "first name") return fields.firstName.trim() || full
    if (key === "link") return fields.reviewLink.trim() || full
    if (SENDER_KEYS.has(key)) return fields.senderName.trim() || full
    if (BUSINESS_KEYS.has(key)) return fields.businessName.trim() || full
    unresolved.add(raw.trim())
    return full
  })
  return { text, unresolved: [...unresolved] }
}

export function composeReviewRequest(input: ReviewRequestFields & { trade: string; channel: RequestChannel }): {
  text: string
  unresolved: string[]
  subject: string | null
} {
  const template = templateByTrade(input.trade)
  const script = channelScript(template, input.channel)
  const filled = fillReviewRequest(script, input)
  if (input.channel === "email") {
    const subject = emailSubject(input.businessName)
    return {
      text: `Subject: ${subject}\n\n${filled.text}`,
      unresolved: filled.unresolved,
      subject,
    }
  }
  return { text: filled.text, unresolved: filled.unresolved, subject: null }
}
