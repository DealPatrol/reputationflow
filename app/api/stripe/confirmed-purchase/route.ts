import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { claimAdsPurchase } from "@/lib/db"
import { PLANS } from "@/lib/plans"

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user?.businessId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const claim = await claimAdsPurchase(user.businessId)
  switch (claim.state) {
    case "pending":
      return NextResponse.json({ confirmed: false })
    case "already":
      return NextResponse.json({ confirmed: true, report: false })
    case "ready":
      return NextResponse.json({
        confirmed: true,
        report: true,
        transactionId: claim.transactionId,
        value: PLANS.pro.price / 100,
        currency: "USD",
      })
    default: {
      const unreachable: never = claim
      return unreachable
    }
  }
}
