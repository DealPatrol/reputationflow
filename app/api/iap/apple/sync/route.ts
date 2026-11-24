import { type NextRequest, NextResponse } from "next/server"
import { AppStoreVerificationError, entitlementFromTransaction, verifyAppleJws, type AppleTransaction } from "@/lib/app-store"
import { getCurrentUser } from "@/lib/auth"
import { applyAppStoreEntitlement, getBusinessByUserId, refreshAppStorePlan, type AppStoreSyncResult } from "@/lib/db"
import { isDemoMode } from "@/lib/demo"

/**
 * Called by the iOS app after a StoreKit 2 purchase, restore, launch, or Transaction.updates event.
 * Body: { transactions: string[] } where each item is a Transaction.jwsRepresentation.
 * Each JWS is verified against Apple Root CA - G3 before access changes.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    if (isDemoMode()) return NextResponse.json({ error: "App Store purchases need a database." }, { status: 503 })

    const body = (await request.json().catch(() => ({}))) as { transactions?: unknown }
    const transactions = Array.isArray(body.transactions)
      ? body.transactions.filter((t): t is string => typeof t === "string").slice(0, 20)
      : []

    const business = await getBusinessByUserId(user.id)
    if (!business || business.id !== user.businessId) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }
    const businessId = Number(business.id)

    let result: AppStoreSyncResult = "inactive"
    let rejected = 0
    let linkedElsewhere = false
    for (const jws of transactions) {
      try {
        const entitlement = entitlementFromTransaction(verifyAppleJws<AppleTransaction>(jws))
        if (entitlement.appAccountToken && entitlement.appAccountToken !== user.id.toLowerCase()) {
          linkedElsewhere = true
          continue
        }
        const applied = await applyAppStoreEntitlement(businessId, entitlement)
        if (applied === "linked_elsewhere") linkedElsewhere = true
        else if (applied === "active") result = "active"
      } catch (error) {
        if (!(error instanceof AppStoreVerificationError)) throw error
        rejected += 1
      }
    }
    if (result !== "active") result = await refreshAppStorePlan(businessId)

    const refreshed = await getBusinessByUserId(user.id)
    return NextResponse.json({
      status: result,
      isPremium: Boolean(refreshed?.is_premium),
      rejected,
      linkedElsewhere,
    })
  } catch (error) {
    console.error("[iap] App Store sync error:", error)
    return NextResponse.json({ error: "Could not sync App Store purchase" }, { status: 500 })
  }
}
