import { NextResponse } from "next/server"
import { getBusinessById } from "@/lib/db"
import { toPublicBusiness } from "@/lib/public-business"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get("id")

    if (!businessId) {
      return NextResponse.json({ error: "Business ID required" }, { status: 400 })
    }

    const business = await getBusinessById(businessId)
    const publicBusiness = toPublicBusiness(business as Record<string, unknown> | null)
    if (!publicBusiness) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    return NextResponse.json({ business: publicBusiness })
  } catch (error) {
    console.error("[v0] Public business fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch business" }, { status: 500 })
  }
}
