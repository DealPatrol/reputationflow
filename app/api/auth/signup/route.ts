import { type NextRequest, NextResponse } from "next/server"
import { createSession } from "@/lib/auth"
import { createBusiness, getBusinessByUserId } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password, businessName } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Create user ID from email
    const userId = email.toLowerCase().replace(/[^a-z0-9]/g, "-")

    let business = await getBusinessByUserId(userId)

    if (!business || business.id === 1) {
      // Create new business (or get mock data in demo mode)
      business = await createBusiness(userId, businessName || "My Business")
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
    console.error("[v0] Signup error:", error)
    return NextResponse.json(
      {
        error: "Failed to create account",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
