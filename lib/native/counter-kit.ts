import { COUNTER_CACHE_VERSION, type CounterCache, type CounterScript } from "@/lib/native/counter-cache"
import { REPLY_SITUATIONS, REPLY_SITUATION_LABELS, replyDraft } from "@/lib/reply-templates"
import { composeReviewRequest, REQUEST_CHANNELS, type RequestChannel } from "@/lib/review-request-message"
import { reviewRequestTemplates } from "@/lib/review-request-templates"

export const COUNTER_TRADES = reviewRequestTemplates.map((t) => t.trade)

const CHANNEL_LABELS: Record<RequestChannel, string> = {
  sms: "Text message",
  email: "Email",
  inPerson: "Say it at the counter",
}

/** Builds the request scripts and reply templates the Counter Kit shows and caches for offline use. */
export function buildCounterCache(input: {
  businessName: string
  reviewUrl: string
  trade: string
  senderName: string
  qrDataUrl: string | null
  now?: Date
}): CounterCache {
  const trade = COUNTER_TRADES.includes(input.trade) ? input.trade : COUNTER_TRADES[0]
  const requestScripts: CounterScript[] = REQUEST_CHANNELS.map((channel) => {
    const composed = composeReviewRequest({
      trade,
      channel,
      firstName: "",
      senderName: input.senderName,
      businessName: input.businessName,
      reviewLink: input.reviewUrl,
    })
    const text = composed.subject ? composed.text.replace(/^Subject: [^\n]*\n\n/, "") : composed.text
    // Unfilled [first name] reads naturally as "there" when the owner shares without editing.
    return { id: channel, label: CHANNEL_LABELS[channel], text: text.replace(/\[first name\]/gi, "there"), subject: composed.subject }
  })
  const replyTemplates: CounterScript[] = REPLY_SITUATIONS.map((situation) => ({
    id: situation,
    label: REPLY_SITUATION_LABELS[situation],
    text: replyDraft({ situation, businessName: input.businessName, reviewerName: "" }),
    subject: null,
  }))
  return {
    version: COUNTER_CACHE_VERSION,
    businessName: input.businessName,
    reviewUrl: input.reviewUrl,
    qrDataUrl: input.qrDataUrl,
    trade,
    senderName: input.senderName,
    requestScripts,
    replyTemplates,
    savedAt: (input.now ?? new Date()).toISOString(),
  }
}
