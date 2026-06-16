import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getBusinessByUserId, createCampaign } from "@/lib/db"
import { sendReviewRequest } from "@/lib/email"
import { validators } from "@/lib/validators"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const business = await getBusinessByUserId(user.id)
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    // Gate to Pro plan
    if (!business.is_premium && business.plan_type !== "pro") {
      return NextResponse.json(
        {
          error: "Email review requests require a Pro plan",
          upgrade_required: true,
        },
        { status: 403 },
      )
    }

    const { customerEmail, customerName } = await request.json()

    if (!customerEmail) {
      return NextResponse.json({ error: "Customer email is required" }, { status: 400 })
    }

    const emailValidation = validators.email(customerEmail)
    if (!emailValidation.valid) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 })
    }

    const name = customerName?.trim() || "Valued Customer"
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://reputationflow.com"
    const reviewLink = `${appUrl}/review/${business.id}`

    // Send the email (non-blocking on error)
    await sendReviewRequest(customerEmail, name, business.business_name, reviewLink)

    // Record in campaigns table
    const campaign = await createCampaign(business.id, {
      customer_name: name,
      contact: customerEmail,
      status: "sent",
    })

    return NextResponse.json({ success: true, campaign })
  } catch (error) {
    console.error("[v0] Error sending review request:", error)
    return NextResponse.json({ error: "Failed to send review request" }, { status: 500 })
  }
}
