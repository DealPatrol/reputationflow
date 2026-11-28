/**
 * Free review request checker for /tools/review-request-checker.
 * Rule-based, runs in the browser. Nothing is sent anywhere and no AI model is called.
 * Rules are paraphrased from Google's Maps user-generated content policy and the FTC
 * Rule on the Use of Consumer Reviews and Testimonials (16 CFR Part 465, effective October 21, 2024).
 */
export const REVIEW_CHECKER_PATH = "/tools/review-request-checker"
export const REVIEW_CHECKER_TITLE = "Review request checker"
export const REVIEW_CHECKER_DESCRIPTION =
  "Paste a review request text or email. Flags incentives, five-star asks, review gating, and pressure that break Google and FTC review rules. Free."

export const GOOGLE_POLICY_URL = "https://support.google.com/contributionpolicy/answer/7400114"
export const FTC_465_4_URL = "https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-465/section-465.4"
export const FTC_RULE_URL =
  "https://www.federalregister.gov/documents/2024/08/22/2024-18519/trade-regulation-rule-on-the-use-of-consumer-reviews-and-testimonials"

export type CheckLevel = "fix" | "review"
export type RuleSource = "google" | "ftc" | "practice"

export interface CheckRule {
  id: string
  level: CheckLevel
  source: RuleSource
  pattern: RegExp
  title: string
  why: string
}

export interface CheckFinding {
  id: string
  level: CheckLevel
  source: RuleSource
  title: string
  why: string
  match: string
}

export const CHECK_RULES: CheckRule[] = [
  {
    id: "incentive",
    level: "fix",
    source: "google",
    pattern:
      /\b(\d+\s?%\s?off|discount|coupon|promo code|gift card|giftcard|free (?:gift|item|drink|dessert|appetizer|month|service|oil change|cleaning)|giveaway|raffle|drawing|entered to win|chance to win|prize|reward|cash back|\$\d+(?:\.\d{2})?\s?(?:off|credit|gift)|credit on your (?:next|account)|in exchange for)\b/i,
    title: "Offers something for the review",
    why: "Google's Maps policy does not allow merchants to offer incentives such as payment, discounts, or free goods or services in exchange for a review. Reviews posted for an incentive can be removed.",
  },
  {
    id: "sentiment",
    level: "fix",
    source: "google",
    pattern: /\b(5|five)[\s-]?stars?\b|\b(positive|good|great|glowing|perfect|nice) (?:review|rating)s?\b|\bonly (?:positive|good)\b|\brate us (?:5|five)\b/i,
    title: "Asks for a specific rating",
    why: "Google does not allow attempts to influence the rating. If anything is offered, the FTC rule (16 CFR 465.4) also bans incentives conditioned on a positive or negative review. Ask for an honest review instead.",
  },
  {
    id: "gating",
    level: "fix",
    source: "google",
    pattern:
      /\bif (?:you (?:were|are)|you're) (?:happy|satisfied|pleased)\b|\bif you (?:had|have had|enjoyed) a (?:great|good|positive|wonderful|5|five)\b|\bif you (?:loved|liked) (?:it|us|our)\b|\b(?:not happy|unhappy|not satisfied|if not)\b[^.?!]{0,60}\b(?:call|text|email|contact|let us know|reach)\b|\bbefore (?:leaving|you leave|posting) a (?:bad|negative|low)\b/i,
    title: "Only asks happy customers (review gating)",
    why: "Google does not allow merchants to discourage negative reviews or selectively ask only for positive ones. Ask every customer the same way and give the same review link to all of them.",
  },
  {
    id: "removal",
    level: "fix",
    source: "google",
    pattern: /\b(?:remove|delete|take down|change|update|edit|revise)\b[^.?!]{0,20}\b(?:your |the |that )?(?:review|rating)\b/i,
    title: "Asks to change or remove a review",
    why: "Google does not allow incentives for revising or removing a negative review. Even without an incentive, asking someone to change a review in a request message reads as pressure. Reply to the review and fix the problem privately.",
  },
  {
    id: "specific-content",
    level: "review",
    source: "google",
    pattern: /\b(?:mention|include|say|write about|name)\b[^.?!]{0,40}\b(?:name|by name|our|my|the tech|technician|stylist|staff|team member|keyword|in your review)\b/i,
    title: "Asks for specific words or staff names",
    why: "Google's policy says merchants should not request specific content, including content that identifies a staff member. Let the customer decide what to write.",
  },
  {
    id: "pressure",
    level: "review",
    source: "google",
    pattern: /\b(?:before you leave|while you(?:'re| are) (?:here|still here|at the counter|in the (?:chair|store|shop|office))|right now|in front of (?:me|us)|required|must leave|have to leave)\b/i,
    title: "Pressures the customer on the spot",
    why: "Google says merchants should not require or pressure customers to leave ratings or write reviews while on the premises. A QR code they can scan later is fine; standing over them is not.",
  },
  {
    id: "quota",
    level: "review",
    source: "google",
    pattern: /\b(?:help (?:me|us) (?:hit|reach|get to)|we need \d+|goal of \d+|\d+ reviews? (?:this|by|before))\b/i,
    title: "Mentions a review quota",
    why: "Google lists merchants asking staff to solicit a certain number of reviews as a policy problem. Keep counts and goals inside the business, not in the message.",
  },
]

const LINK_PATTERN = /(https?:\/\/\S+|g\.page\/\S+|\b[a-z0-9-]+\.[a-z]{2,}\/\S+)/i
const STOP_PATTERN = /\b(?:reply|text) stop\b|\bstop to (?:opt out|unsubscribe|end)\b|\bunsubscribe\b/i

/** GSM-7 texts fit 160 characters in one segment; messages with emoji or other Unicode fit 70. */
export function smsSegmentInfo(text: string): { length: number; unicode: boolean; segments: number } {
  const length = [...text].length
  // Rough GSM-7 check: plain ASCII printable plus newline. Curly quotes and emoji force Unicode.
  const unicode = /[^\x0A\x0D\x20-\x7E£¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ¤¡ÄÖÑÜ§¿äöñüà]/.test(text)
  if (length === 0) return { length, unicode, segments: 0 }
  const single = unicode ? 70 : 160
  const multi = unicode ? 67 : 153
  const segments = length <= single ? 1 : Math.ceil(length / multi)
  return { length, unicode, segments }
}

export interface CheckResult {
  findings: CheckFinding[]
  tips: string[]
  hasLink: boolean
  sms: ReturnType<typeof smsSegmentInfo>
  passed: boolean
}

export function checkReviewRequest(text: string, channel: "text" | "email" = "text"): CheckResult {
  const clean = text.slice(0, 2000)
  const findings: CheckFinding[] = []
  for (const rule of CHECK_RULES) {
    const match = clean.match(rule.pattern)
    if (match) {
      findings.push({ id: rule.id, level: rule.level, source: rule.source, title: rule.title, why: rule.why, match: match[0] })
    }
  }
  const hasLink = LINK_PATTERN.test(clean)
  const sms = smsSegmentInfo(clean)
  const tips: string[] = []
  if (clean.trim() && !hasLink) tips.push("No review link found. Paste your Google review link so the customer can open the form in one tap.")
  if (channel === "text" && sms.segments > 1)
    tips.push(`This text is ${sms.length} characters${sms.unicode ? " with emoji or special characters" : ""}, so it may send as ${sms.segments} segments. Shorter texts are easier to read.`)
  if (channel === "text" && clean.trim() && !STOP_PATTERN.test(clean))
    tips.push("No opt-out line. Many texting tools and carriers expect business texts to say how to stop messages, such as Reply STOP to opt out.")
  if (clean.trim() && !/\b(?:honest|any feedback|your experience|how (?:it|we) did|how was)\b/i.test(clean))
    tips.push("Consider asking for an honest review or about their experience. It makes clear you want every customer's view, good or bad.")
  return { findings, tips, hasLink, sms, passed: clean.trim().length > 0 && findings.every((f) => f.level !== "fix") }
}

/** A plain request that passes every rule. Business name and link come from the user. */
export function compliantRewrite(input: { businessName?: string; link?: string; channel?: "text" | "email" }): string {
  const name = (input.businessName ?? "").trim().slice(0, 60) || "[Business name]"
  const link = (input.link ?? "").trim().slice(0, 200) || "[your Google review link]"
  if (input.channel === "email") {
    return [
      `Subject: How did we do?`,
      "",
      `Thanks for choosing ${name}. Would you share an honest review of your experience on Google? It helps neighbors decide, and we read every one.`,
      "",
      link,
      "",
      "If something was not right, you can also reply to this email and we will make it right.",
    ].join("\n")
  }
  return `Thanks for choosing ${name}! Would you leave an honest Google review of your visit? ${link} Reply STOP to opt out.`
}

export function extractLink(text: string): string {
  const match = text.match(LINK_PATTERN)
  return match ? match[0].replace(/[).,!?]+$/, "") : ""
}

export const reviewCheckerSteps = [
  {
    name: "Paste the review request you send today",
    text: "Copy the text message, email, or card wording you use to ask for reviews and paste it in. Choose text or email.",
  },
  {
    name: "Fix anything marked Fix",
    text: "Incentives, five-star asks, review gating, and requests to change a review break Google's review policy. Remove the flagged words.",
  },
  {
    name: "Review the rest",
    text: "Requests for staff names or keywords, on-the-spot pressure, and review quotas are flagged as Review. Reword them so the customer decides what to write.",
  },
  {
    name: "Copy the compliant version",
    text: "Add your business name and review link to get a short request that asks every customer the same way, then send it yourself.",
  },
]

export const reviewCheckerFaqs = [
  {
    question: "Can I offer a discount for a Google review?",
    answer:
      "No. Google's Maps content policy does not allow merchants to offer payment, discounts, or free goods or services in exchange for a review, and reviews posted for an incentive can be removed. This checker flags discount, coupon, gift card, and giveaway wording.",
  },
  {
    question: "What is review gating?",
    answer:
      "Review gating means asking only happy customers for a public review, or sending unhappy ones somewhere else first. Google does not allow merchants to discourage negative reviews or selectively ask for positive ones. Ask everyone the same way.",
  },
  {
    question: "What does the FTC rule on reviews say?",
    answer:
      "The FTC's Rule on the Use of Consumer Reviews and Testimonials, 16 CFR Part 465, took effect October 21, 2024. Among other things it bans fake reviews, incentives conditioned on a review being positive or negative, and certain review suppression. This page is not legal advice.",
  },
  {
    question: "Can I ask a customer to mention my technician by name?",
    answer:
      "Google's policy says merchants should not request specific content in reviews, including content that identifies a staff member. Thank the tech in your own reply instead, and let the customer write what they want.",
  },
  {
    question: "Does this tool use AI or save my message?",
    answer:
      "No. The checks are fixed rules that run in your browser. Nothing you paste is sent to ReputationFlow or an AI service, and nothing is saved.",
  },
]
