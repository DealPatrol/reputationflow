import { NextResponse } from "next/server"
import { sanitizeAttribution } from "@/lib/attribution"
import { createLead } from "@/lib/db"
import { isDemoMode } from "@/lib/demo"
import { sendTemplatePack } from "@/lib/email"
import { validators, sanitize } from "@/lib/validators"

const SOURCES = new Set(["google-review-link", "qr-code", "review-templates"])

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (typeof body.companyWebsite === "string" && body.companyWebsite.trim()) {
      return NextResponse.json({ success: true })
    }

    const email = String(body.email || "").trim().toLowerCase()
    const emailValidation = validators.email(email)
    if (!emailValidation.valid) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 })
    }

    const source = String(body.source || "")
    if (!SOURCES.has(source)) {
      return NextResponse.json({ error: "Unknown lead source" }, { status: 400 })
    }

    if (isDemoMode()) {
      return NextResponse.json(
        { error: "Lead storage requires DATABASE_URL. Download or copy the result on the page. It does not require an account." },
        { status: 503 },
      )
    }

    const businessName = body.businessName ? sanitize.text(String(body.businessName)).slice(0, 100) : undefined
    const details = body.details ? sanitize.text(String(body.details)).slice(0, 500) : undefined
    const attribution = sanitizeAttribution(body.attribution)
    const lead = await createLead({ email, source, businessName, details, attribution })
    if (!lead) {
      return NextResponse.json({ error: "Could not save that email." }, { status: 503 })
    }

    if (source !== "review-templates") {
      return NextResponse.json({ success: true, emailed: false })
    }

    try {
      const delivery = await sendTemplatePack(email)
      return NextResponse.json({ success: true, emailed: delivery.sent })
    } catch (deliveryError) {
      console.error("[v0] Template pack email error:", deliveryError)
      return NextResponse.json({ success: true, emailed: false })
    }
  } catch (error) {
    console.error("[v0] Lead capture error:", error)
    return NextResponse.json({ error: "Could not save that email." }, { status: 500 })
  }
}
