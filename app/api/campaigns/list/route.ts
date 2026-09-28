import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getCampaignsByBusinessId } from "@/lib/db"
import { isDemoMode } from "@/lib/demo"

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user?.businessId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const campaigns = await getCampaignsByBusinessId(user.businessId)
  return NextResponse.json({
    campaigns,
    sampleData: isDemoMode(),
  })
}
