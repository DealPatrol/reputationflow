import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createSession } from "@/lib/auth"
import { createBusiness, getBusinessByUserId, createUser, updateBusinessOwnerEmail } from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/email"

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

    const userId = email.toLowerCase().replace(/[^a-z0-9]/g, "-")

    // Hash password before storing
    const passwordHash = await bcrypt.hash(password, 10)

    // Store user credentials
    await createUser(userId, email.toLowerCase(), passwordHash)

    let business = await getBusinessByUserId(userId)

    if (!business || business.id === 1) {
      business = await createBusiness(userId, businessName || "My Business")
    }

    // Persist owner email for notifications
    await updateBusinessOwnerEmail(userId, email.toLowerCase())

    const user = {
      id: userId,
      email: email.toLowerCase(),
      businessId: business.id,
    }

    await createSession(user)

    // Send welcome email (non-blocking)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://reputationflow.com"
    const reviewLink = `${appUrl}/review/${business.id}`
    sendWelcomeEmail(email.toLowerCase(), businessName || "My Business", reviewLink).catch(() => {})

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
