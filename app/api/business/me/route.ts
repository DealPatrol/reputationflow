import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getBusinessByUserId } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const business = await getBusinessByUserId(user.id)
    if (!business) return NextResponse.json({ error: "Business not found" }, { status: 404 })
    return NextResponse.json({ business })
  } catch (error) {
    console.error("[v0] Error in /api/business/me:", error)
    return NextResponse.json({ error: "Failed to load business" }, { status: 500 })
  }
}
