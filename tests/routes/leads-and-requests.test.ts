import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  createLead: vi.fn(),
  isDemoMode: vi.fn(),
  getCurrentUser: vi.fn(),
  getBusinessByUserId: vi.fn(),
  createCampaign: vi.fn(),
  sendReviewRequest: vi.fn(),
  sendTemplatePack: vi.fn(),
  saveFeedbackResponse: vi.fn(),
}))

vi.mock("@/lib/db", () => ({
  createLead: mocks.createLead,
  getCurrentUser: mocks.getCurrentUser,
  getBusinessByUserId: mocks.getBusinessByUserId,
  createCampaign: mocks.createCampaign,
  saveFeedbackResponse: mocks.saveFeedbackResponse,
}))
vi.mock("@/lib/demo", () => ({ isDemoMode: mocks.isDemoMode }))
vi.mock("@/lib/auth", () => ({ getCurrentUser: mocks.getCurrentUser }))
vi.mock("@/lib/email", () => ({
  sendReviewRequest: mocks.sendReviewRequest,
  sendTemplatePack: mocks.sendTemplatePack,
}))

import type { NextRequest } from "next/server"
import { POST as createLeadRoute } from "@/app/api/leads/route"
import { POST as sendReviewRequestRoute } from "@/app/api/email/send-review-request/route"
import { POST as saveResponseRoute } from "@/app/api/feedback/response/route"

function asNextRequest(request: Request) {
  return request as NextRequest
}

describe("POST /api/leads", () => {
  beforeEach(() => {
    mocks.isDemoMode.mockReturnValue(false)
    mocks.createLead.mockReset()
    mocks.createLead.mockResolvedValue({ id: 1 })
    mocks.sendTemplatePack.mockReset()
  })

  it("rejects an invalid email", async () => {
    const response = await createLeadRoute(new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({ email: "not-an-email", source: "qr-code" }),
    }))
    expect(response.status).toBe(400)
    expect(mocks.createLead).not.toHaveBeenCalled()
  })

  it("stores a valid tool lead", async () => {
    const response = await createLeadRoute(new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({
        email: "owner@example.com",
        source: "google-review-link",
        businessName: "Northside",
        details: "https://search.google.com/local/writereview?placeid=ChIJexample",
      }),
    }))
    expect(response.status).toBe(200)
    expect(mocks.createLead).toHaveBeenCalledWith(expect.objectContaining({
      email: "owner@example.com",
      source: "google-review-link",
    }))
  })

  it("stores a template-pack signup and reports whether the email was sent", async () => {
    mocks.sendTemplatePack.mockResolvedValue({ sent: true })
    const response = await createLeadRoute(new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({
        email: "owner@example.com",
        source: "review-templates",
        businessName: "Northside",
      }),
    }))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: true, emailed: true })
    expect(mocks.createLead).toHaveBeenCalledWith(expect.objectContaining({
      email: "owner@example.com",
      source: "review-templates",
    }))
    expect(mocks.sendTemplatePack).toHaveBeenCalledWith("owner@example.com")
  })

  it("keeps a template-pack signup when email is not configured", async () => {
    mocks.sendTemplatePack.mockResolvedValue({ sent: false, reason: "Email is not configured. Add RESEND_API_KEY and EMAIL_FROM." })
    const response = await createLeadRoute(new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({ email: "owner@example.com", source: "review-templates" }),
    }))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: true, emailed: false })
    expect(mocks.createLead).toHaveBeenCalled()
  })

  it("does not email the pack for a tool lead", async () => {
    const response = await createLeadRoute(new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({ email: "owner@example.com", source: "qr-code" }),
    }))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: true, emailed: false })
    expect(mocks.sendTemplatePack).not.toHaveBeenCalled()
  })

  it("ignores the honeypot without storing a lead", async () => {
    const response = await createLeadRoute(new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({ email: "owner@example.com", source: "qr-code", companyWebsite: "https://spam.example" }),
    }))
    expect(response.status).toBe(200)
    expect(mocks.createLead).not.toHaveBeenCalled()
  })
})

describe("POST /api/email/send-review-request", () => {
  beforeEach(() => {
    mocks.getCurrentUser.mockResolvedValue({ id: "user-1", businessId: 7 })
    mocks.getBusinessByUserId.mockResolvedValue({
      id: 7,
      business_name: "Northside Dental",
      is_premium: true,
      plan_type: "pro",
    })
  })

  it("does not record a sent request when email is not configured", async () => {
    mocks.sendReviewRequest.mockResolvedValue({ sent: false, reason: "Email is not configured. Add RESEND_API_KEY and EMAIL_FROM." })
    const response = await sendReviewRequestRoute(asNextRequest(new Request("http://localhost/api/email/send-review-request", {
      method: "POST",
      body: JSON.stringify({ customerEmail: "guest@example.com", customerName: "Ada" }),
    })))
    expect(response.status).toBe(503)
    expect(mocks.createCampaign).not.toHaveBeenCalled()
  })
})

describe("POST /api/feedback/response", () => {
  it("requires a professional plan", async () => {
    mocks.getCurrentUser.mockResolvedValue({ id: "user-1", businessId: 7 })
    mocks.getBusinessByUserId.mockResolvedValue({ plan_type: "free", is_premium: false })
    const response = await saveResponseRoute(asNextRequest(new Request("http://localhost/api/feedback/response", {
      method: "POST",
      body: JSON.stringify({ feedbackId: 3, response: "Thanks for telling us." }),
    })))
    expect(response.status).toBe(403)
    expect(mocks.saveFeedbackResponse).not.toHaveBeenCalled()
  })
})
