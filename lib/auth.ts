import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

const SESSION_COOKIE = "rf_session"

export interface User {
  id: string
  email: string
  businessId?: number
}

// Session management
export async function createSession(user: User) {
  const cookieStore = await cookies()
  const sessionData = JSON.stringify(user)
  cookieStore.set(SESSION_COOKIE, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(SESSION_COOKIE)

    if (!session?.value) {
      return null
    }

    return JSON.parse(session.value)
  } catch (error) {
    console.error("[v0] Error getting session:", error)
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getCurrentUser(request?: NextRequest): Promise<User | null> {
  // If called from API route with request object
  if (request) {
    try {
      const session = request.cookies.get(SESSION_COOKIE)
      if (!session?.value) {
        return null
      }
      return JSON.parse(session.value)
    } catch (error) {
      console.error("[v0] Error parsing session from request:", error)
      return null
    }
  }

  // If called from Server Component
  return getSession()
}

export async function requireAuth(request?: NextRequest): Promise<User> {
  const user = await getCurrentUser(request)
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}
