import { reviewToolOutcome, type ReviewToolOutcome } from "@/lib/google-review-link"
import { reviewMessagePageByTrade, reviewMessagePages } from "@/lib/review-message-pages"
import { reviewRequestTemplates, type ReviewRequestTemplate } from "@/lib/review-request-templates"

export const GENERAL_REVIEW_TRADE = "General service"

export const REVIEW_MESSAGE_NOTE =
  "Copy this and send it yourself. ReputationFlow does not text customers, and this page does not send the email."

const GENERAL_REVIEW_TEMPLATE: ReviewRequestTemplate = {
  trade: GENERAL_REVIEW_TRADE,
  inPerson:
    "If you have a minute, a Google review helps the next person find us. I can text you the link. I will not ask again on the way out.",
  sms: "Hi [first name], this is [your name] from [company]. If you have a minute, a Google review helps the next person find us: [link].",
  email:
    "Hi [first name], thank you for the visit with [company]. If you are willing, you can leave a Google review here: [link]. One note is enough. [your name].",
}

const GENERAL_EMAIL_SUBJECT = "How was your visit with [company]"

const SENDER_KEYS = new Set(["your name", "tech name", "stylist", "agent"])
const BUSINESS_KEYS = new Set(["company", "practice", "salon", "restaurant", "shop", "brokerage"])

const SENDER_LABELS: Record<string, string> = {
  Salon: "Stylist name",
  Realtor: "Agent name",
  HVAC: "Tech name",
}

const BUSINESS_LABELS: Record<string, string> = {
  Dentist: "Practice name",
  Salon: "Salon name",
  Restaurant: "Restaurant name",
  "Auto repair": "Shop name",
  Realtor: "Brokerage name",
}

export interface ReviewMessageFields {
  firstName: string
  senderName: string
  businessName: string
  reviewLink: string
}

export type ReviewMessageLink =
  | { status: "empty" }
  | { status: "error"; error: string }
  | { status: "review"; href: string }
  | { status: "plain"; href: string }

export interface ComposedReviewMessages {
  sms: string
  emailSubject: string
  emailBody: string
  emailCopy: string
  inPerson: string
  unresolved: string[]
  link: ReviewMessageLink
  smsCharacters: number
}

export function reviewMessageTradeOptions() {
  return [GENERAL_REVIEW_TRADE, ...reviewRequestTemplates.map((template) => template.trade)]
}

export function resolveReviewMessageTrade(value: string | null | undefined) {
  const raw = value?.trim() ?? ""
  const normalized = raw.toLowerCase()
  if (!normalized) return GENERAL_REVIEW_TRADE
  const byPage = reviewMessagePages.find(
    (page) => page.slug === normalized || page.industrySlug === normalized || page.templateTrade.toLowerCase() === normalized,
  )
  if (byPage) return byPage.templateTrade
  if (normalized === GENERAL_REVIEW_TRADE.toLowerCase()) return GENERAL_REVIEW_TRADE
  return GENERAL_REVIEW_TRADE
}

export function senderFieldLabel(trade: string) {
  return SENDER_LABELS[trade] ?? "Your name"
}

export function businessFieldLabel(trade: string) {
  return BUSINESS_LABELS[trade] ?? "Business name"
}

export function templateForReviewMessage(trade: string): ReviewRequestTemplate {
  return reviewRequestTemplates.find((template) => template.trade === trade) ?? GENERAL_REVIEW_TEMPLATE
}

export function reviewMessageLink(input: string): ReviewMessageLink {
  const outcome = reviewToolOutcome(input, true)
  return linkFromOutcome(outcome)
}

function linkFromOutcome(outcome: ReviewToolOutcome): ReviewMessageLink {
  switch (outcome.status) {
    case "empty":
      return { status: "empty" }
    case "error":
      return { status: "error", error: outcome.error }
    case "review":
      return { status: "review", href: outcome.url }
    case "plain":
      return { status: "plain", href: outcome.url }
    default: {
      const unreachable: never = outcome
      return unreachable
    }
  }
}

export function fillReviewMessage(template: string, fields: ReviewMessageFields) {
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

function linkHref(link: ReviewMessageLink) {
  switch (link.status) {
    case "empty":
    case "error":
      return ""
    case "review":
    case "plain":
      return link.href
    default: {
      const unreachable: never = link
      return unreachable
    }
  }
}

export function composeReviewMessages(input: ReviewMessageFields & { templateTrade: string }): ComposedReviewMessages {
  const template = templateForReviewMessage(input.templateTrade)
  const link = reviewMessageLink(input.reviewLink)
  const fields: ReviewMessageFields = {
    firstName: input.firstName,
    senderName: input.senderName,
    businessName: input.businessName,
    reviewLink: linkHref(link),
  }
  const sms = fillReviewMessage(template.sms, fields)
  const emailBody = fillReviewMessage(template.email, fields)
  const inPerson = fillReviewMessage(template.inPerson, fields)
  const subjectTemplate = reviewMessagePageByTrade(input.templateTrade)?.emailSubject ?? GENERAL_EMAIL_SUBJECT
  const emailSubject = fillReviewMessage(subjectTemplate, fields)
  const unresolved = [...new Set([...sms.unresolved, ...emailBody.unresolved, ...inPerson.unresolved, ...emailSubject.unresolved])]
  return {
    sms: sms.text,
    emailSubject: emailSubject.text,
    emailBody: emailBody.text,
    emailCopy: `Subject: ${emailSubject.text}\n\n${emailBody.text}`,
    inPerson: inPerson.text,
    unresolved,
    link,
    smsCharacters: sms.text.length,
  }
}
