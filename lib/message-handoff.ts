import { buildGoogleReviewLink } from "@/lib/google-review-link"
import { formatPlanPrice, PLANS } from "@/lib/plans"

export const PENDING_REVIEW_LINK_KEY = "rf_pending_review_link"
export const PENDING_BUSINESS_NAME_KEY = "rf_pending_business_name"

const BUSINESS_NAME_MAX = 80

export type MessageCopyChannel = "sms" | "email" | "inPerson"

export type MessageHandoffStorage = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export function reviewLinkToCarry(input: string): string {
  const built = buildGoogleReviewLink(input)
  return built.ok ? built.url : ""
}

export function businessNameToCarry(input: string): string {
  const trimmed = input.trim().replace(/\s+/g, " ")
  if (trimmed.length < 2) return ""
  return trimmed.slice(0, BUSINESS_NAME_MAX)
}

function channelSlug(channel: MessageCopyChannel): string {
  switch (channel) {
    case "sms":
      return "sms"
    case "email":
      return "email"
    case "inPerson":
      return "in_person"
    default: {
      const unreachable: never = channel
      return unreachable
    }
  }
}

export function messageCopyLocation(channel: MessageCopyChannel, action: "setup" | "pricing"): string {
  return `message_copy_${channelSlug(channel)}_${action}`
}

export function messageCopyHeading(channel: MessageCopyChannel): string {
  switch (channel) {
    case "sms":
      return "You copied the text"
    case "email":
      return "You copied the email"
    case "inPerson":
      return "You copied the in-person line"
    default: {
      const unreachable: never = channel
      return unreachable
    }
  }
}

export function messageCopyNextStep(input: { channel: MessageCopyChannel; carriedLink: boolean }): {
  heading: string
  body: string
} {
  const price = formatPlanPrice(PLANS.pro.price)
  const afterSave = `After you save the link, Professional is ${price} a month if you want to email a review request when you choose the customer. You still send any text yourself. Starter does not send email.`
  const heading = messageCopyHeading(input.channel)
  if (input.carriedLink) {
    return {
      heading,
      body: `This page does not keep what you copied. The Google review link from this box will be filled in on the setup screen. ${afterSave}`,
    }
  }
  return {
    heading,
    body: `This page does not keep what you copied. If the message still has a [link] bracket, paste a Place ID before you send it. A free account saves the Google review link and the QR code. ${afterSave}`,
  }
}

export function reviewLinkForSetup(savedLink: string, pendingLink: string): string {
  const saved = savedLink.trim()
  if (saved) return saved
  return reviewLinkToCarry(pendingLink)
}

export function writeMessageHandoff(
  storage: MessageHandoffStorage,
  input: { reviewLink: string; businessName: string },
) {
  const link = reviewLinkToCarry(input.reviewLink)
  const name = businessNameToCarry(input.businessName)
  if (link) storage.setItem(PENDING_REVIEW_LINK_KEY, link)
  else storage.removeItem(PENDING_REVIEW_LINK_KEY)
  if (name) storage.setItem(PENDING_BUSINESS_NAME_KEY, name)
  else storage.removeItem(PENDING_BUSINESS_NAME_KEY)
}

export function readPendingReviewLink(storage: MessageHandoffStorage): string {
  return reviewLinkToCarry(storage.getItem(PENDING_REVIEW_LINK_KEY) ?? "")
}

export function readPendingBusinessName(storage: MessageHandoffStorage): string {
  return businessNameToCarry(storage.getItem(PENDING_BUSINESS_NAME_KEY) ?? "")
}

export function clearPendingReviewLink(storage: MessageHandoffStorage) {
  storage.removeItem(PENDING_REVIEW_LINK_KEY)
}

export function clearPendingBusinessName(storage: MessageHandoffStorage) {
  storage.removeItem(PENDING_BUSINESS_NAME_KEY)
}

function browserStorage(): MessageHandoffStorage | null {
  if (typeof window === "undefined") return null
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export function rememberMessageHandoff(input: { reviewLink: string; businessName: string }) {
  const storage = browserStorage()
  if (!storage) return
  try {
    writeMessageHandoff(storage, input)
  } catch {
    // A blocked session store must not stop the free signup link.
  }
}

export function writePendingReviewLink(storage: MessageHandoffStorage, reviewLink: string): boolean {
  const link = reviewLinkToCarry(reviewLink)
  if (!link) return false
  storage.setItem(PENDING_REVIEW_LINK_KEY, link)
  return true
}

export function rememberPendingReviewLink(reviewLink: string) {
  const storage = browserStorage()
  if (!storage) return
  try {
    writePendingReviewLink(storage, reviewLink)
  } catch {
    // A blocked session store must not stop the signup link.
  }
}

export function takePendingReviewLink(): string {
  const storage = browserStorage()
  if (!storage) return ""
  try {
    return readPendingReviewLink(storage)
  } catch {
    return ""
  }
}

export function takePendingBusinessName(): string {
  const storage = browserStorage()
  if (!storage) return ""
  try {
    return readPendingBusinessName(storage)
  } catch {
    return ""
  }
}

export function dropPendingReviewLink() {
  const storage = browserStorage()
  if (!storage) return
  try {
    clearPendingReviewLink(storage)
  } catch {
    // Ignore a blocked session store.
  }
}

export function dropPendingBusinessName() {
  const storage = browserStorage()
  if (!storage) return
  try {
    clearPendingBusinessName(storage)
  } catch {
    // Ignore a blocked session store.
  }
}
