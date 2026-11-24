/**
 * Free Google review reply drafts for /tools/review-reply-generator.
 * Hand-written patterns filled in the browser. Nothing is sent anywhere.
 * Rules: no incentives, no request to change or remove the review, no customer details,
 * and in privacy-sensitive mode no confirmation that the reviewer was a customer or patient.
 */
export const REVIEW_REPLY_TOOL_PATH = "/tools/review-reply-generator"
export const REVIEW_REPLY_TOOL_TITLE = "Google review reply generator"
export const REVIEW_REPLY_TOOL_DESCRIPTION =
  "Free Google review reply generator. Pick the star rating and what the review mentions, and copy two replies to edit. No account. Nothing is posted."

export const REPLY_STARS = [5, 4, 3, 2, 1] as const
export type ReplyStars = (typeof REPLY_STARS)[number]

export const REPLY_TOPICS = ["none", "staff", "quality", "wait", "price", "communication", "cleanliness"] as const
export type ReplyTopic = (typeof REPLY_TOPICS)[number]

export const REPLY_TOPIC_LABELS: Record<ReplyTopic, string> = {
  none: "Nothing specific",
  staff: "A person on the team",
  quality: "The quality of the work",
  wait: "Waiting or scheduling",
  price: "Price or the bill",
  communication: "Calls or updates",
  cleanliness: "Cleanup or cleanliness",
}

export interface ReviewReplyInput {
  stars: ReplyStars
  topic: ReplyTopic
  reviewerName?: string
  businessName?: string
  signOff?: string
  contact?: string
  /** Health, legal, and financial businesses: never confirm the person was a client. */
  privacySensitive?: boolean
}

const praise: Record<ReplyTopic, string> = {
  none: "",
  staff: " We will pass your words to the person who helped you.",
  quality: " We are glad the work is holding up the way it should.",
  wait: " Thank you for noticing that we kept to the time.",
  price: " We try to keep the bill clear before we start, and we are glad it felt fair.",
  communication: " We are glad the updates helped you know what was happening.",
  cleanliness: " Leaving the place clean matters to us, so thank you for saying so.",
}

const concern: Record<ReplyTopic, string> = {
  none: "I am sorry this did not go the way it should have.",
  staff: "I am sorry about how you were treated. That is not how we want anyone to feel.",
  quality: "I am sorry the work did not meet the standard you expected.",
  wait: "I am sorry about the wait. Your time matters, and that is on us.",
  price: "I am sorry the bill was not what you expected. You should know the cost before the work starts.",
  communication: "I am sorry we did not keep you updated. You should not have had to chase us.",
  cleanliness: "I am sorry about the mess that was left. That should not have happened.",
}

function clean(value: string | undefined, max: number) {
  return (value ?? "").replace(/\s+/g, " ").trim().slice(0, max)
}

function contactLine(contact: string, fallbackBusiness: string) {
  return contact
    ? `Please reach out at ${contact} and ask for me, so I can hear the details and see what we can do.`
    : `Please contact ${fallbackBusiness} and ask for the owner, so I can hear the details and see what we can do.`
}

/** Two drafts: a fuller one and a short one. */
export function reviewReplyDrafts(input: ReviewReplyInput): [string, string] {
  const name = clean(input.reviewerName, 40).split(" ")[0] ?? ""
  const business = clean(input.businessName, 80) || "our team"
  const sign = clean(input.signOff, 60)
  const contact = clean(input.contact, 80)
  const hi = name ? `Hi ${name},` : "Hi,"
  const end = sign ? `\n\n${sign}` : ""
  const privacy = Boolean(input.privacySensitive)

  if (input.stars >= 4) {
    const extra = privacy ? "" : praise[input.topic]
    const four = input.stars === 4 ? " If anything could have made it a better experience, we would like to hear it." : ""
    return [
      `${hi} thank you for taking the time to review ${business}.${extra}${four}${end}`,
      `${hi} thank you for the kind words about ${business}. We read every review.${end}`,
    ]
  }

  if (input.stars === 3) {
    const line = privacy ? "Thank you for the honest feedback." : `Thank you for the honest feedback. ${concern[input.topic]}`
    return [
      `${hi} ${line} We want every visit to be a five-star one, and we would like to know what would have made the difference. ${contactLine(contact, business)}${end}`,
      `${hi} thank you for the feedback. ${contactLine(contact, business)}${end}`,
    ]
  }

  // 1 and 2 stars: acknowledge once, take it offline, no argument, no incentive, no ask to change the review.
  const apology = privacy
    ? "Thank you for sharing this. We take every concern seriously, and privacy rules keep us from discussing details here."
    : concern[input.topic]
  return [
    `${hi} ${apology} ${contactLine(contact, business)} You do not need to change this review.${end}`,
    `${hi} ${privacy ? "Thank you for the feedback." : "I am sorry about your experience."} ${contactLine(contact, business)}${end}`,
  ]
}

/** Words a reply must never contain. Used by the tests. */
export const BANNED_REPLY_PHRASES = [
  "discount",
  "coupon",
  "free ",
  "gift card",
  "refund",
  "update your review",
  "change your review",
  "remove your review",
  "take down",
  "%",
]
