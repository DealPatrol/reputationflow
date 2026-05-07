import { type NextRequest, NextResponse } from "next/server"
import { getAnalyticsByBusinessId } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const businessId = searchParams.get("businessId")
    const days = Number.parseInt(searchParams.get("days") || "30", 10)

    if (!businessId) {
      return NextResponse.json({ error: "Business ID required" }, { status: 400 })
    }

    try {
      const analytics = await getAnalyticsByBusinessId(businessId, days)

      // Calculate summary statistics
      const totalFeedback = analytics.feedback.reduce(
        (acc: number, day: any) => acc + Number.parseInt(day.total || 0),
        0,
      )
      const positiveCount = analytics.feedback.reduce(
        (acc: number, day: any) => acc + Number.parseInt(day.positive || 0),
        0,
      )
      const negativeCount = analytics.feedback.reduce(
        (acc: number, day: any) => acc + Number.parseInt(day.negative || 0),
        0,
      )

      // Calculate average rating
      const totalRating = analytics.feedback.reduce(
        (acc: number, day: any) => acc + Number.parseFloat(day.avg_rating || 0) * Number.parseInt(day.total || 0),
        0,
      )
      const averageRating = totalFeedback > 0 ? (totalRating / totalFeedback).toFixed(1) : "0.0"

      // Calculate NPS score (assuming 4-5 stars = positive, 1-3 = negative)
      const npsScore = totalFeedback > 0 ? Math.round(((positiveCount - negativeCount) / totalFeedback) * 100) : 0

      // Calculate campaign stats
      const totalCampaigns = analytics.campaigns.reduce(
        (acc: number, day: any) => acc + Number.parseInt(day.total || 0),
        0,
      )
      const convertedCampaigns = analytics.campaigns.reduce(
        (acc: number, day: any) => acc + Number.parseInt(day.converted || 0),
        0,
      )
      const responseRate = totalCampaigns > 0 ? ((convertedCampaigns / totalCampaigns) * 100).toFixed(1) : "0.0"

      // Calculate trend (last 7 days vs previous 7 days)
      const last7Days = analytics.feedback.slice(0, 7)
      const prev7Days = analytics.feedback.slice(7, 14)

      const thisWeek = last7Days.reduce((acc: number, day: any) => acc + Number.parseInt(day.total || 0), 0)
      const lastWeek = prev7Days.reduce((acc: number, day: any) => acc + Number.parseInt(day.total || 0), 0)
      const change = lastWeek > 0 ? ((thisWeek - lastWeek) / lastWeek) * 100 : 0

      return NextResponse.json({
        success: true,
        data: {
          period: `${days}d`,
          totalFeedback,
          averageRating: Number.parseFloat(averageRating),
          positiveCount,
          negativeCount,
          npsScore,
          campaignsSent: totalCampaigns,
          campaignsConverted: convertedCampaigns,
          responseRate: Number.parseFloat(responseRate),
          trend: {
            thisWeek,
            lastWeek,
            change: Math.round(change),
          },
          dailyFeedback: analytics.feedback,
          dailyCampaigns: analytics.campaigns,
        },
      })
    } catch (dbError) {
      console.error("[v0] Database error in analytics:", dbError)
      // Return empty analytics on error
      return NextResponse.json({
        success: true,
        data: {
          period: `${days}d`,
          totalFeedback: 0,
          averageRating: 0,
          positiveCount: 0,
          negativeCount: 0,
          npsScore: 0,
          campaignsSent: 0,
          campaignsConverted: 0,
          responseRate: 0,
          trend: {
            thisWeek: 0,
            lastWeek: 0,
            change: 0,
          },
          dailyFeedback: [],
          dailyCampaigns: [],
        },
      })
    }
  } catch (error) {
    console.error("[v0] Error fetching analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
