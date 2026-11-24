import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { isNativeIosUserAgent } from "@/lib/native/platform"
import { getBusinessByUserId } from "@/lib/db"
import { getStripeClient } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    // The iOS app sells Professional with StoreKit only (App Review Guideline 3.1.1).
    if (isNativeIosUserAgent(request.headers.get("user-agent"))) {
      return NextResponse.json({ error: "In the iPhone app, Professional is available through the App Store." }, { status: 403 })
    }
    const user = await getCurrentUser(request)
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

    const stripe = getStripeClient()
    if (!stripe || !process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Billing is unavailable in demo mode." }, { status: 503 })
    }

    const business = await getBusinessByUserId(user.id)
    if (!business || business.id !== user.businessId || !business.stripe_customer_id) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: business.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[v0] Portal session error:", error)
    return NextResponse.json({ error: "Failed to create portal session" }, { status: 500 })
  }
}
