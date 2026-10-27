import { describe, expect, it } from "vitest"
import { PLANS, formatPlanPrice } from "@/lib/plans"
import {
  PENDING_BUSINESS_NAME_KEY,
  PENDING_REVIEW_LINK_KEY,
  businessNameToCarry,
  clearPendingBusinessName,
  clearPendingReviewLink,
  messageCopyLocation,
  messageCopyNextStep,
  readPendingBusinessName,
  readPendingReviewLink,
  reviewLinkForSetup,
  reviewLinkToCarry,
  writeMessageHandoff,
  type MessageHandoffStorage,
} from "@/lib/message-handoff"

const placeId = "ChIJexamplePlaceId123"
const reviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`

function memoryStorage(initial: Record<string, string> = {}): MessageHandoffStorage & { data: Map<string, string> } {
  const data = new Map(Object.entries(initial))
  return {
    data,
    getItem(key) {
      return data.get(key) ?? null
    },
    setItem(key, value) {
      data.set(key, value)
    },
    removeItem(key) {
      data.delete(key)
    },
  }
}

describe("message copy handoff", () => {
  it("carries an official review link and a business name, and drops anything setup cannot save", () => {
    expect(reviewLinkToCarry(`  ${placeId}  `)).toBe(reviewUrl)
    expect(reviewLinkToCarry(reviewUrl)).toBe(reviewUrl)
    expect(reviewLinkToCarry("https://g.page/example")).toBe("")
    expect(reviewLinkToCarry("https://reviews.example.com/review")).toBe("")
    expect(reviewLinkToCarry("")).toBe("")
    expect(businessNameToCarry("  River   City Plumbing  ")).toBe("River City Plumbing")
    expect(businessNameToCarry("A")).toBe("")
    expect(businessNameToCarry("   ")).toBe("")
    expect(businessNameToCarry("x".repeat(120))).toHaveLength(80)

    const storage = memoryStorage({
      [PENDING_REVIEW_LINK_KEY]: "https://g.page/old",
      [PENDING_BUSINESS_NAME_KEY]: "Old Name",
    })
    writeMessageHandoff(storage, { reviewLink: placeId, businessName: "Harbor Services" })
    expect(readPendingReviewLink(storage)).toBe(reviewUrl)
    expect(readPendingBusinessName(storage)).toBe("Harbor Services")
    expect(reviewLinkForSetup("", storage.getItem(PENDING_REVIEW_LINK_KEY) ?? "")).toBe(reviewUrl)
    expect(reviewLinkForSetup("https://search.google.com/local/writereview?placeid=ChIJalreadySaved1", reviewUrl)).toBe(
      "https://search.google.com/local/writereview?placeid=ChIJalreadySaved1",
    )

    writeMessageHandoff(storage, { reviewLink: "not a link", businessName: " " })
    expect(storage.data.has(PENDING_REVIEW_LINK_KEY)).toBe(false)
    expect(storage.data.has(PENDING_BUSINESS_NAME_KEY)).toBe(false)
    expect(reviewLinkForSetup("", "https://maps.app.goo.gl/abc")).toBe("")

    storage.setItem(PENDING_REVIEW_LINK_KEY, reviewUrl)
    storage.setItem(PENDING_BUSINESS_NAME_KEY, "Harbor Services")
    clearPendingReviewLink(storage)
    clearPendingBusinessName(storage)
    expect(readPendingReviewLink(storage)).toBe("")
    expect(readPendingBusinessName(storage)).toBe("")
  })

  it("tells the copier to save the link free, then see Professional after that save", () => {
    const price = formatPlanPrice(PLANS.pro.price)
    expect(price).toBe("$20")
    const withLink = messageCopyNextStep({ channel: "sms", carriedLink: true })
    const withoutLink = messageCopyNextStep({ channel: "email", carriedLink: false })
    const inPerson = messageCopyNextStep({ channel: "inPerson", carriedLink: false })

    expect(withLink.heading).toBe("You copied the text")
    expect(withoutLink.heading).toBe("You copied the email")
    expect(inPerson.heading).toBe("You copied the in-person line")
    for (const step of [withLink, withoutLink, inPerson]) {
      expect(step.body).toContain(price)
      expect(step.body).toContain("After you save the link")
      expect(step.body).toContain("You still send any text yourself")
      expect(step.body.toLowerCase()).not.toMatch(/discount|coupon|five.star|5.star|\d+%/)
    }
    expect(withLink.body).toContain("filled in on the setup screen")
    expect(withoutLink.body).toContain("[link]")
    expect(messageCopyLocation("sms", "setup")).toBe("message_copy_sms_setup")
    expect(messageCopyLocation("email", "pricing")).toBe("message_copy_email_pricing")
    expect(messageCopyLocation("inPerson", "setup")).toBe("message_copy_in_person_setup")
  })
})
