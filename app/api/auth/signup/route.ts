import { randomUUID } from "node:crypto"
import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createSession } from "@/lib/auth"
import { createBusiness, createUser, updateBusinessOwnerEmail } from "@/lib/db"
import { isDemoMode } from "@/lib/demo"
import { sendWelcomeEmail } from "@/lib/email"
import { reviewPageUrl } from "@/lib/site"
import { validators } from "@/lib/validators"

export async function POST(request: NextRequest) {
  try {
    const { email, password, businessName } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const normalizedEmail = String(email).trim().toLowerCase()
    if (!validators.email(normalizedEmail).valid) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    if (isDemoMode()) {
      return NextResponse.json(
        { error: "Account creation requires DATABASE_URL. Use the demo account in keyless mode." },
        { status: 503 },
      )
    }

    const userId = randomUUID()
    const passwordHash = await bcrypt.hash(password, 10)
    const createdUser = await createUser(userId, normalizedEmail, passwordHash)
    if (!createdUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    const business = await createBusiness(userId, businessName || "My Business")
    await updateBusinessOwnerEmail(userId, normalizedEmail)

    const user = {
      id: userId,
      email: normalizedEmail,
      businessId: business.id,
    }

    await createSession(user)

    // Send welcome email (non-blocking)
    const reviewLink = reviewPageUrl(business.id)
    sendWelcomeEmail(normalizedEmail, businessName || "My Business", reviewLink).catch(() => {})

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
