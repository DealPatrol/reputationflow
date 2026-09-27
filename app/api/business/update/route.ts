import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { updateBusiness } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req)
    if (!user?.businessId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()

    const updates: any = {}
    if (body.business_name) updates.business_name = body.business_name.trim()
    if (body.google_link !== undefined) updates.google_link = body.google_link.trim()
    if (body.facebook_link !== undefined) updates.facebook_link = body.facebook_link.trim()
    if (body.yelp_link !== undefined) updates.yelp_link = body.yelp_link.trim()

    const updated = await updateBusiness(user.businessId, updates)

    if (!updated) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 })
    }

    return NextResponse.json({ business: updated, success: true })
  } catch (error: any) {
    console.error("[v0] Error updating business:", error)
    return NextResponse.json({ error: error.message || "Failed to update" }, { status: 500 })
  }
}
