import { type NextRequest, NextResponse } from "next/server"
import {
  AppStoreVerificationError,
  entitlementFromTransaction,
  verifyAppleJws,
  type AppleNotificationPayload,
  type AppleTransaction,
} from "@/lib/app-store"
import { applyAppStoreEntitlement, findBusinessForAppStoreTransaction } from "@/lib/db"
import { IOS_BUNDLE_ID } from "@/lib/native/products"

/**
 * App Store Server Notifications V2 endpoint. Set this URL in App Store Connect
 * (App Information -> App Store Server Notifications) for Production and Sandbox:
 *   https://tryreputationflow.com/api/iap/apple/notifications
 * Renewals, expirations, refunds and revocations update access even when the app is closed.
 */
export async function POST(request: NextRequest) {
  let payload: AppleNotificationPayload
  try {
    const body = (await request.json()) as { signedPayload?: unknown }
    payload = verifyAppleJws<AppleNotificationPayload>(String(body.signedPayload ?? ""))
  } catch (error) {
    if (error instanceof AppStoreVerificationError || error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid notification" }, { status: 400 })
    }
    throw error
  }

  try {
    if (payload.data?.bundleId !== IOS_BUNDLE_ID || !payload.data?.signedTransactionInfo) {
      // TEST notifications and other apps: acknowledge so Apple stops retrying.
      return NextResponse.json({ received: true, ignored: true })
    }
    const entitlement = entitlementFromTransaction(verifyAppleJws<AppleTransaction>(payload.data.signedTransactionInfo))
    const businessId = await findBusinessForAppStoreTransaction(entitlement.originalTransactionId, entitlement.appAccountToken)
    if (!businessId) return NextResponse.json({ received: true, ignored: true })
    const status = await applyAppStoreEntitlement(businessId, entitlement)
    return NextResponse.json({ received: true, status, type: payload.notificationType ?? null })
  } catch (error) {
    if (error instanceof AppStoreVerificationError) {
      return NextResponse.json({ received: true, ignored: true })
    }
    console.error("[iap] App Store notification error:", error)
    // 500 makes Apple retry later.
    return NextResponse.json({ error: "Notification not processed" }, { status: 500 })
  }
}
