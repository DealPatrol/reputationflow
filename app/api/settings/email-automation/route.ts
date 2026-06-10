import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getFollowUpSettings, updateFollowUpSettings } from "@/lib/db"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const settings = await getFollowUpSettings(user.businessId!)

    // Also get campaign stats
    let campaignCount = 0
    try {
      if (sql) {
        const result = await (sql as any)`
          SELECT COUNT(*) as count FROM campaigns WHERE business_id = ${user.businessId!}
        ` as any[]
        campaignCount = Number(result[0]?.count || 0)
      }
    } catch {}

    return NextResponse.json({
      settings: settings || { enabled: false, intervals: "[3,7]", max_followups: 2, stop_on_response: true },
      stats: { campaign_count: campaignCount },
    })
  } catch (error) {
    console.error("[v0] Error fetching email automation settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { enabled, send_timing, template } = body

    // Ensure follow_up_settings row exists
    if (sql) {
      try {
        await (sql as any)`
          INSERT INTO follow_up_settings (business_id, enabled)
          VALUES (${user.businessId!}, ${enabled ?? false})
          ON CONFLICT (business_id) DO NOTHING
        `
      } catch {}
    }

    const settings = await updateFollowUpSettings(user.businessId!, {
      enabled: enabled ?? false,
      intervals: send_timing ? JSON.stringify([send_timing]) : undefined,
    })

    return NextResponse.json({ success: true, settings })
  } catch (error) {
    console.error("[v0] Error saving email automation settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
