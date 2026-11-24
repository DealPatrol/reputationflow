import { describe, expect, it } from "vitest"
import { BANNED_REPLY_PHRASES, REPLY_STARS, REPLY_TOPICS, REVIEW_REPLY_TOOL_DESCRIPTION, reviewReplyDrafts } from "@/lib/review-reply"

describe("review reply drafts", () => {
  it("never offers an incentive or asks the reviewer to change the review", () => {
    for (const stars of REPLY_STARS) {
      for (const topic of REPLY_TOPICS) {
        for (const privacySensitive of [false, true]) {
          for (const draft of reviewReplyDrafts({ stars, topic, reviewerName: "Dana Smith", businessName: "Acme HVAC", privacySensitive })) {
            const lower = draft.toLowerCase()
            for (const phrase of BANNED_REPLY_PHRASES) expect(lower).not.toContain(phrase)
            expect(draft).not.toContain("Smith")
          }
        }
      }
    }
  })

  it("keeps privacy-sensitive replies free of details about the visit", () => {
    const [full] = reviewReplyDrafts({ stars: 1, topic: "quality", businessName: "Main St Dental", privacySensitive: true })
    expect(full).toContain("privacy")
    expect(full).not.toContain("work did not meet")
  })

  it("moves low ratings offline with the contact given", () => {
    const [full] = reviewReplyDrafts({ stars: 2, topic: "wait", contact: "(256) 555-0100", businessName: "Acme" })
    expect(full).toContain("(256) 555-0100")
    expect(full).toContain("You do not need to change this review.")
  })

  it("has a description that fits a search snippet", () => {
    expect(REVIEW_REPLY_TOOL_DESCRIPTION.length).toBeLessThanOrEqual(160)
  })
})
