export const REPLY_SITUATIONS = ["thanks", "delay", "fix", "brief"] as const
export type ReplySituation = (typeof REPLY_SITUATIONS)[number]

export const REPLY_SITUATION_LABELS: Record<ReplySituation, string> = {
  thanks: "Thank them for a positive review",
  delay: "Acknowledge a wait",
  fix: "Acknowledge a problem",
  brief: "Short thank-you",
}

export const REPLY_HELPER_NOTE =
  "Copy the draft and paste it on Google, Facebook, or Yelp yourself. It does not post for you, and it does not ask the customer to change the review."

export function replyDraft(input: { situation: ReplySituation; businessName: string; reviewerName: string }): string {
  const reviewer = input.reviewerName.trim()
  const greeting = reviewer ? `Hi ${reviewer},` : "Hi,"
  const business = input.businessName.trim() || "our team"

  switch (input.situation) {
    case "thanks":
      return `${greeting} thank you for taking the time to review ${business}. We are glad the visit was useful, and we will pass this to the person who did the work.`
    case "delay":
      return `${greeting} thank you for the review of ${business}. I am sorry you had to wait. That is on us. If you want to say which part ran long, contact the business and ask for the owner.`
    case "fix":
      return `${greeting} thank you for writing about ${business}. I am sorry the visit did not go the way it should have. Please contact the business and ask for the owner so we can make it right. You do not need to change this review.`
    case "brief":
      return `${greeting} thank you for reviewing ${business}. We read every review.`
    default: {
      const unreachable: never = input.situation
      return unreachable
    }
  }
}
