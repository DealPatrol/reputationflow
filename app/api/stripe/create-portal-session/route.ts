import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: Request) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment variables." },
        { status: 503 },
      )
    }

    // Dynamically import Stripe only when needed
    const Stripe = (await import("stripe")).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-11-17.clover" as any,
    })

    const { businessId } = await request.json()

    const businesses = await (sql as any)`
      SELECT stripe_customer_id FROM businesses
      WHERE id = ${businessId}
      LIMIT 1
    ` as any[]

    if (businesses.length === 0 || !businesses[0].stripe_customer_id) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: businesses[0].stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("[v0] Portal session error:", error)
    return NextResponse.json({ error: error.message || "Failed to create portal session" }, { status: 500 })
  }
}
