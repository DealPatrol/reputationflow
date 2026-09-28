import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { csvRow } from "@/lib/csv"
import { getBusinessByUserId, getFeedbackByBusinessId, getCampaignsByBusinessId } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user?.businessId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const business = await getBusinessByUserId(user.id)
    if (!business?.is_premium) {
      return NextResponse.json({ error: "CSV export is included with Professional." }, { status: 403 })
    }

    const searchParams = request.nextUrl.searchParams
    const businessId = user.businessId
    const type = searchParams.get("type") || "feedback"

    let csvContent = ""

    if (type === "feedback") {
      const feedback = await getFeedbackByBusinessId(businessId)

      // CSV header
      csvContent = `${csvRow(["ID", "Date", "Rating", "Type", "Feedback", "Customer Email"])}\n`

      feedback.forEach((f: any) => {
        const date = f.created_at ? new Date(f.created_at).toISOString() : ""
        csvContent += `${csvRow([f.id, date, f.rating, f.type, f.feedback_text || "", f.customer_email || ""])}\n`
      })
    } else if (type === "campaigns") {
      const campaigns = await getCampaignsByBusinessId(businessId)

      // CSV header
      csvContent = `${csvRow(["ID", "Date", "Customer Name", "Contact", "Status", "Follow-ups"])}\n`

      campaigns.forEach((c: any) => {
        const date = c.created_at ? new Date(c.created_at).toISOString() : ""
        csvContent += `${csvRow([c.id, date, c.customer_name, c.contact, c.status, c.follow_up_count || 0])}\n`
      })
    }

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="reputationflow-${type}-${Date.now()}.csv"`,
      },
    })
  } catch (error) {
    console.error("[v0] Error exporting data:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}
