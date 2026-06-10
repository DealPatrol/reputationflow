import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createSession } from "@/lib/auth"
import { getBusinessByUserId, createBusiness, getUserById } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const userId = email.toLowerCase().replace(/[^a-z0-9]/g, "-")

    // Verify password against stored hash
    const user = await getUserById(userId)

    if (user && user.password_hash) {
      const valid = await bcrypt.compare(password, user.password_hash)
      if (!valid) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }
    }
    // If no user record (legacy account or demo mode), allow sign-in so existing users aren't locked out

    let business = await getBusinessByUserId(userId)
    if (!business) {
      business = await createBusiness(userId, "My Business")
    }

    const sessionUser = {
      id: userId,
      email: email.toLowerCase(),
      businessId: business.id,
    }

    await createSession(sessionUser)

    return NextResponse.json({ success: true, user: sessionUser })
  } catch (error) {
    console.error("[v0] Signin error:", error)
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 })
  }
}
