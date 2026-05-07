import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get("id")

    if (!businessId) {
      return NextResponse.json({ error: "Business ID required" }, { status: 400 })
    }

    const businesses = await sql`
      SELECT 
        id,
        business_name,
        google_link,
        facebook_link,
        yelp_link
      FROM businesses
      WHERE id = ${businessId}
      LIMIT 1
    `

    if (businesses.length === 0) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    return NextResponse.json({ business: businesses[0] })
  } catch (error: any) {
    console.error("[v0] Public business fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch business" }, { status: 500 })
  }
}
