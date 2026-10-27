import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { indexablePaths } from "@/lib/marketing-content"
import { reviewRequestTemplates } from "@/lib/review-request-templates"
import {
  composeReviewMessages,
  GENERAL_REVIEW_TRADE,
  resolveReviewMessageTrade,
  reviewMessageTradeOptions,
} from "@/lib/review-message"
import {
  messageToolLinkForPath,
  REVIEW_MESSAGE_TOOL_DESCRIPTION,
  REVIEW_MESSAGE_TOOL_PATH,
  REVIEW_MESSAGE_TOOL_TITLE,
  reviewMessageHeading,
  reviewMessagePages,
  reviewMessagePath,
} from "@/lib/review-message-pages"

const placeId = "ChIJexamplePlaceId123"
const reviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8")
}

describe("review request message generator", () => {
  it("fills the business name, the sender, and an official review link", () => {
    const message = composeReviewMessages({
      templateTrade: "Plumber",
      firstName: "Alex",
      senderName: "Jordan",
      businessName: "River City Plumbing",
      reviewLink: placeId,
    })
    expect(message.sms).toContain("Alex")
    expect(message.sms).toContain("Jordan")
    expect(message.sms).toContain("River City Plumbing")
    expect(message.sms).toContain(reviewUrl)
    expect(message.sms).not.toContain("[link]")
    expect(message.emailBody).toContain(reviewUrl)
    expect(message.emailCopy.startsWith("Subject: The repair at your place is finished")).toBe(true)
    expect(message.link).toEqual({ status: "review", href: reviewUrl })
    expect(message.smsCharacters).toBe(message.sms.length)
  })

  it("keeps the link bracket when a short Google link cannot be expanded", () => {
    const message = composeReviewMessages({
      templateTrade: "Plumber",
      firstName: "",
      senderName: "",
      businessName: "",
      reviewLink: "https://g.page/example",
    })
    expect(message.sms).toContain("[link]")
    expect(message.sms).toContain("[company]")
    expect(message.link.status).toBe("error")
    if (message.link.status === "error") expect(message.link.error.length).toBeGreaterThan(20)
  })

  it("accepts a non-Google https page and leaves the HVAC visit bracket for the owner", () => {
    const pageUrl = "https://reviews.example.com/review/example"
    const message = composeReviewMessages({
      templateTrade: "HVAC",
      firstName: "Alex",
      senderName: "Jordan",
      businessName: "Northwind Comfort",
      reviewLink: pageUrl,
    })
    expect(message.link).toEqual({ status: "plain", href: pageUrl })
    expect(message.sms).toContain(pageUrl)
    expect(message.sms).toContain("Northwind Comfort")
    expect(message.unresolved).toContain("tune-up / no-heat / replacement")
    expect(message.emailCopy).toContain("Subject: Your system is running")
  })

  it("uses a general script that does not name a star rating or a discount", () => {
    const message = composeReviewMessages({
      templateTrade: GENERAL_REVIEW_TRADE,
      firstName: "Alex",
      senderName: "Jordan",
      businessName: "Harbor Services",
      reviewLink: placeId,
    })
    expect(message.sms).toContain("Harbor Services")
    expect(message.sms).toContain(reviewUrl)
    const text = `${message.sms}\n${message.emailCopy}\n${message.inPerson}`.toLowerCase()
    expect(text).not.toMatch(/discount|coupon|five.star|5.star|%/)
    expect(resolveReviewMessageTrade("")).toBe(GENERAL_REVIEW_TRADE)
    expect(resolveReviewMessageTrade("dentists")).toBe("Dentist")
    expect(resolveReviewMessageTrade("not-a-trade")).toBe(GENERAL_REVIEW_TRADE)
    expect(reviewMessageTradeOptions()).toContain(GENERAL_REVIEW_TRADE)
  })
})

describe("review request text pages", () => {
  it("publishes a useful page for every existing trade script", () => {
    expect(reviewMessagePages.length).toBe(reviewRequestTemplates.length)
    expect(new Set(reviewMessagePages.map((page) => page.slug)).size).toBe(reviewMessagePages.length)
    expect(new Set(reviewMessagePages.map((page) => page.title)).size).toBe(reviewMessagePages.length)
    expect(new Set(reviewMessagePages.map((page) => page.description)).size).toBe(reviewMessagePages.length)
    expect(new Set(reviewMessagePages.map((page) => page.intro)).size).toBe(reviewMessagePages.length)
    expect(new Set(reviewMessagePages.map((page) => page.sendWhen)).size).toBe(reviewMessagePages.length)
    expect(new Set(reviewMessagePages.map((page) => page.leaveOut)).size).toBe(reviewMessagePages.length)
    const questions = reviewMessagePages.flatMap((page) => page.faqs.map((faq) => faq.question))
    expect(new Set(questions).size).toBe(questions.length)
    const paths = indexablePaths().map((entry) => entry.path)
    expect(paths).toContain(REVIEW_MESSAGE_TOOL_PATH)
    expect(REVIEW_MESSAGE_TOOL_TITLE.length).toBeLessThanOrEqual(43)
    expect(REVIEW_MESSAGE_TOOL_DESCRIPTION.length).toBeGreaterThan(80)
    expect(REVIEW_MESSAGE_TOOL_DESCRIPTION.length).toBeLessThan(170)

    for (const template of reviewRequestTemplates) {
      expect(reviewMessagePages.some((page) => page.templateTrade === template.trade)).toBe(true)
    }
    for (const page of reviewMessagePages) {
      expect(page.title.length).toBeLessThanOrEqual(43)
      expect(page.description.length).toBeGreaterThan(80)
      expect(page.faqs.length).toBeGreaterThanOrEqual(3)
      expect(page.sendWhen.length).toBeGreaterThan(80)
      expect(page.leaveOut.length).toBeGreaterThan(80)
      expect(paths).toContain(reviewMessagePath(page))
      const text = JSON.stringify(page).toLowerCase()
      expect(text).not.toContain("cullman")
      expect(text).not.toMatch(/\d+%/)
      expect(text).not.toMatch(/five.star|5.star/)
    }
  })

  it("points trade and city pages at the matching template, and other pages at the tool", () => {
    expect(messageToolLinkForPath("/industries/plumber/houston")).toEqual({
      href: "/review-request-text/plumber",
      label: "Plumber review request text template",
    })
    expect(messageToolLinkForPath("/industries/dentists")).toMatchObject({
      href: "/review-request-text/dentist",
    })
    const cleaning = reviewMessagePages.find((page) => page.slug === "cleaning-service")
    expect(cleaning).toBeTruthy()
    if (!cleaning) return
    expect(messageToolLinkForPath("/industries/cleaning-service/chicago").label).toBe(reviewMessageHeading(cleaning))
    expect(messageToolLinkForPath("/industries/roofer/dallas").href).toBe(REVIEW_MESSAGE_TOOL_PATH)
    expect(messageToolLinkForPath("/tools/qr-code").href).toBe(REVIEW_MESSAGE_TOOL_PATH)
    expect(messageToolLinkForPath("/industries").href).toBe(REVIEW_MESSAGE_TOOL_PATH)
  })

  it("wires the tool, the setup link, the Professional signup, and the trade pages", () => {
    const tool = source("app/tools/review-request-message/page.tsx")
    const trade = source("app/review-request-text/[slug]/page.tsx")
    const offer = source("components/marketing/review-message-offer.tsx")
    const generator = source("components/tools/review-message-generator.tsx")
    expect(tool).toContain("pageMetadata")
    expect(tool).toContain("freeToolJsonLd")
    expect(tool).toContain('location="message_tool_intro"')
    expect(tool).toContain('location="message_tool"')
    expect(tool).toContain('setupLocation="message_tool_band_setup"')
    expect(trade).toContain("pageMetadata")
    expect(trade).toContain("articleJsonLd")
    expect(trade).toContain("ReviewMessageGenerator")
    expect(trade).toContain("ReviewMessageOffer")
    expect(offer).toContain("professionalSignupPath()")
    expect(offer).toContain("SetupLink")
    expect(offer).not.toContain("plan=")
    expect(source("components/marketing/setup-link.tsx")).toContain("trackSetupCtaClick")
    expect(source("components/marketing/signup-link.tsx")).toContain("trackSignupClick")
    expect(source("components/marketing/pricing-link.tsx")).toContain("trackPricingClick")
    expect(generator).toContain('trackGeneratorUsed("message")')
    expect(generator).toContain("MessageCopyNext")
    expect(generator).toContain('channel="sms"')
    expect(generator).toContain('channel="email"')
    expect(generator).toContain('channel="inPerson"')
    expect(source("components/tools/message-copy-next.tsx")).toContain("rememberMessageHandoff")
    expect(source("components/tools/message-copy-next.tsx")).toContain("SetupLink")
    expect(source("components/tools/message-copy-next.tsx")).not.toContain("professionalSignupPath")
    expect(source("app/onboarding/page.tsx")).toContain("takePendingReviewLink")
    expect(source("app/onboarding/page.tsx")).toContain("reviewLinkForSetup")
    expect(source("app/auth/signin/page.tsx")).toContain("takePendingBusinessName")
    expect(source("components/marketing/conversion-paths.tsx")).toContain("messageToolLinkForPath")
    expect(source("components/tools/google-review-qr-tool.tsx")).toContain("messageToolLinkForPath")
    expect(source("app/industries/[slug]/page.tsx")).toContain("messageToolLinkForPath")
    expect(source("app/industries/[slug]/[city]/page.tsx")).toContain("messageToolLinkForPath")
    expect(source("lib/analytics-events.ts")).toContain('"message"')
  })
})
