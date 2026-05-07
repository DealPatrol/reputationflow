import { type NextRequest, NextResponse } from "next/server"
import { createSession } from "@/lib/auth"
import { getBusinessByUserId, createBusiness } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create user ID from email
    const userId = email.toLowerCase().replace(/[^a-z0-9]/g, "-")

    // Get or create business
    let business = await getBusinessByUserId(userId)
    if (!business) {
      business = await createBusiness(userId, "My Business")
    }

    // Create session
    const user = {
      id: userId,
      email,
      businessId: business.id,
    }

    await createSession(user)

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("[v0] Signin error:", error)
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 })
  }
}
