import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createSession } from "@/lib/auth"
import { getBusinessByUserId, getUserByEmail } from "@/lib/db"
import { DEMO_USER, isDemoMode } from "@/lib/demo"
import { validators } from "@/lib/validators"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const normalizedEmail = String(email).trim().toLowerCase()
    if (!validators.email(normalizedEmail).valid) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (isDemoMode()) {
      if (normalizedEmail !== DEMO_USER.email || password !== DEMO_USER.password) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }

      await createSession({
        id: DEMO_USER.id,
        email: DEMO_USER.email,
        businessId: DEMO_USER.businessId,
      })
      return NextResponse.json({
        success: true,
        user: { id: DEMO_USER.id, email: DEMO_USER.email, businessId: DEMO_USER.businessId },
        demo: true,
      })
    }

    const user = await getUserByEmail(normalizedEmail)
    if (!user?.password_hash || !(await bcrypt.compare(password, user.password_hash))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const business = await getBusinessByUserId(user.id)
    if (!business) return NextResponse.json({ error: "Account setup is incomplete" }, { status: 409 })

    const sessionUser = {
      id: user.id,
      email: normalizedEmail,
      businessId: business.id,
    }

    await createSession(sessionUser)

    return NextResponse.json({ success: true, user: sessionUser })
  } catch (error) {
    console.error("[v0] Signin error:", error)
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 })
  }
}
