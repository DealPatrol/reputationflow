import { type NextRequest, NextResponse } from "next/server"
import { getFeedbackByBusinessId, getCampaignsByBusinessId } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const businessId = searchParams.get("businessId")
    const type = searchParams.get("type") || "feedback"

    if (!businessId) {
      return NextResponse.json({ error: "Business ID required" }, { status: 400 })
    }

    let csvContent = ""

    if (type === "feedback") {
      const feedback = await getFeedbackByBusinessId(businessId)

      // CSV header
      csvContent = "ID,Date,Rating,Type,Feedback,Customer Email\n"

      // CSV rows
      feedback.forEach((f: any) => {
        const date = new Date(f.created_at).toLocaleDateString()
        const text = (f.feedback_text || "").replace(/"/g, '""')
        csvContent += `${f.id},${date},${f.rating},${f.type},"${text}",${f.customer_email || ""}\n`
      })
    } else if (type === "campaigns") {
      const campaigns = await getCampaignsByBusinessId(businessId)

      // CSV header
      csvContent = "ID,Date,Customer Name,Contact,Status,Follow-ups\n"

      // CSV rows
      campaigns.forEach((c: any) => {
        const date = new Date(c.created_at).toLocaleDateString()
        csvContent += `${c.id},${date},${c.customer_name},${c.contact},${c.status},${c.follow_up_count || 0}\n`
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
