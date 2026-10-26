import { describe, expect, it } from "vitest"
import { normalizeHexColor } from "@/lib/card-style"
import { composeReviewRequest, REQUEST_COMPOSER_NOTE } from "@/lib/review-request-message"
import { REPLY_HELPER_NOTE, replyDraft } from "@/lib/reply-templates"
import { goalRatio, monthKey, parseReviewGoal, withAsked, withTarget } from "@/lib/review-goal"

describe("review card colors", () => {
  it("accepts a 6-digit hex color and rejects everything else", () => {
    expect(normalizeHexColor("#142033")).toBe("#142033")
    expect(normalizeHexColor("3730A3")).toBe("#3730a3")
    expect(normalizeHexColor("#fff")).toBeNull()
    expect(normalizeHexColor("red")).toBeNull()
    expect(normalizeHexColor("")).toBeNull()
  })
})

describe("review request composer", () => {
  it("fills a text script and leaves brackets the owner still has to edit", () => {
    const result = composeReviewRequest({
      trade: "Plumber",
      channel: "sms",
      firstName: "Alex",
      senderName: "Jordan",
      businessName: "Northside Plumbing",
      reviewLink: "https://search.google.com/local/writereview?placeid=ChIJexample",
    })
    expect(result.subject).toBeNull()
    expect(result.text).toContain("Alex")
    expect(result.text).toContain("Jordan")
    expect(result.text).toContain("Northside Plumbing")
    expect(result.text).toContain("placeid=ChIJexample")
    expect(result.text).not.toContain("[link]")
    expect(result.unresolved).toEqual([])
  })

  it("keeps an HVAC job type in brackets and adds an email subject", () => {
    const result = composeReviewRequest({
      trade: "HVAC",
      channel: "email",
      firstName: "",
      senderName: "",
      businessName: "Harbor Air",
      reviewLink: "",
    })
    expect(result.subject).toBe("A Google review for Harbor Air")
    expect(result.text.startsWith("Subject: A Google review for Harbor Air")).toBe(true)
    expect(result.unresolved).toContain("tune-up / no-heat / replacement")
    expect(result.text).toContain("[first name]")
    expect(result.text).toContain("[link]")
  })

  it("tells the owner to send the message", () => {
    expect(REQUEST_COMPOSER_NOTE).toMatch(/does not text/i)
    expect(REQUEST_COMPOSER_NOTE).toMatch(/does not send/i)
  })
})

describe("reply templates", () => {
  it("writes a copyable reply that does not ask for a change or a discount", () => {
    const draft = replyDraft({ situation: "fix", businessName: "Harbor Air", reviewerName: "Sam" })
    expect(draft.startsWith("Hi Sam,")).toBe(true)
    expect(draft).toContain("Harbor Air")
    expect(draft.toLowerCase()).not.toContain("discount")
    expect(draft.toLowerCase()).not.toContain("remove")
    expect(draft).toContain("do not need to change this review")
    expect(REPLY_HELPER_NOTE).toMatch(/does not post/i)
  })

  it("omits a name when the reviewer field is blank", () => {
    expect(replyDraft({ situation: "brief", businessName: "", reviewerName: "  " })).toBe(
      "Hi, thank you for reviewing our team. We read every review.",
    )
  })
})

describe("review goal", () => {
  it("resets the count when the month changes and keeps the target", () => {
    const stored = JSON.stringify({ month: "2026-09", target: 40, asked: 12 })
    expect(parseReviewGoal(stored, "2026-10")).toEqual({ month: "2026-10", target: 40, asked: 0 })
  })

  it("clamps bad values and ignores broken storage", () => {
    expect(parseReviewGoal("not-json", "2026-10")).toEqual({ month: "2026-10", target: 0, asked: 0 })
    const goal = withTarget({ month: "2026-10", target: 0, asked: 0 }, 900)
    expect(goal.target).toBe(500)
    expect(withAsked(goal, -4).asked).toBe(0)
    expect(goalRatio({ month: "2026-10", target: 10, asked: 4 })).toBe(0.4)
    expect(goalRatio({ month: "2026-10", target: 0, asked: 3 })).toBe(0)
    expect(monthKey(new Date(2026, 9, 21))).toBe("2026-10")
  })
})
