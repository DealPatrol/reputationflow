import { createHmac, randomUUID, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

const SESSION_COOKIE = "rf_session"
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7
const DEMO_SESSION_SECRET = "reputationflow-keyless-demo-session"

export interface User {
  id: string
  email: string
  businessId?: number
}

interface SessionPayload extends User {
  expiresAt: number
  sessionId: string
}

function getSessionSecret() {
  const secret = process.env.AUTH_SECRET
  if (secret && secret.length >= 32) return secret
  if (secret) throw new Error("AUTH_SECRET must be at least 32 characters")
  if (!process.env.DATABASE_URL) return DEMO_SESSION_SECRET
  throw new Error("AUTH_SECRET is required when DATABASE_URL is configured")
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url")
}

function encodeSession(user: User) {
  const payload: SessionPayload = {
    ...user,
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
    sessionId: randomUUID(),
  }
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url")
  return `${encoded}.${sign(encoded)}`
}

export function verifySession(value: string): User | null {
  try {
    const [encoded, signature] = value.split(".")
    if (!encoded || !signature) return null

    const expected = Buffer.from(sign(encoded))
    const actual = Buffer.from(signature)
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null

    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString()) as SessionPayload
    if (!payload.id || !payload.email || payload.expiresAt <= Date.now()) return null

    return { id: payload.id, email: payload.email, businessId: payload.businessId }
  } catch {
    return null
  }
}

export async function createSession(user: User) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, encodeSession(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    priority: "high",
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(SESSION_COOKIE)

    if (!session?.value) {
      return null
    }

    return verifySession(session.value)
  } catch (error) {
    console.error("[v0] Error getting session:", error)
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })
}

export async function getCurrentUser(request?: NextRequest): Promise<User | null> {
  // If called from API route with request object
  if (request) {
    try {
      const session = request.cookies.get(SESSION_COOKIE)
      if (!session?.value) {
        return null
      }
      return verifySession(session.value)
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
