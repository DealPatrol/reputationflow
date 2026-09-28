import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { updateBusiness } from "@/lib/db"
import { validators } from "@/lib/validators"

function cleanLinks(value: unknown): { links: string[]; error?: undefined } | { links?: undefined; error: string } {
  if (!Array.isArray(value)) return { error: "Links must be a list" }
  const links = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
  for (const link of links) {
    const validation = validators.url(link)
    if (!validation.valid) return { error: validation.error || "Invalid link" }
  }
  return { links }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req)
    if (!user?.businessId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()

    const updates: Record<string, string | string[]> = {}
    if (body.business_name) updates.business_name = String(body.business_name).trim()
    for (const field of ["google_link", "facebook_link", "yelp_link"] as const) {
      if (body[field] !== undefined) {
        const value = String(body[field] || "").trim()
        if (value && !validators.url(value).valid) {
          return NextResponse.json({ error: validators.url(value).error }, { status: 400 })
        }
        updates[field] = value
      }
    }
    for (const field of ["google_links_2", "facebook_links_2", "yelp_links_2"] as const) {
      if (body[field] !== undefined) {
        const cleaned = cleanLinks(body[field])
        if (cleaned.error) return NextResponse.json({ error: cleaned.error }, { status: 400 })
        updates[field] = cleaned.links || []
      }
    }

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
