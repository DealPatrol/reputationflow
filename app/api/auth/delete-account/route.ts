import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { destroySession, getCurrentUser } from "@/lib/auth"
import { deleteUserAccount, getAccountBillingRefs, getUserById } from "@/lib/db"
import { isDemoMode } from "@/lib/demo"
import { getStripeClient } from "@/lib/stripe"
import { DELETE_CONFIRMATION } from "@/lib/account"

/**
 * Permanently deletes the signed-in account (App Review Guideline 5.1.1(v)).
 * Requires the account password and the typed confirmation "DELETE".
 * Active Stripe subscriptions are cancelled first so a deleted account is never billed again.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) return NextResponse.json({ error: "Sign in to delete your account." }, { status: 401 })

    const body = (await request.json().catch(() => ({}))) as { password?: unknown; confirmation?: unknown }
    if (body.confirmation !== DELETE_CONFIRMATION) {
      return NextResponse.json({ error: `Type ${DELETE_CONFIRMATION} to confirm.` }, { status: 400 })
    }

    if (isDemoMode()) {
      return NextResponse.json(
        { error: "The keyless demo account cannot be deleted. Accounts created with a database can be." },
        { status: 400 },
      )
    }

    const account = await getUserById(user.id)
    if (!account) {
      await destroySession()
      return NextResponse.json({ success: true, alreadyDeleted: true })
    }
    const password = typeof body.password === "string" ? body.password : ""
    if (!password || !account.password_hash || !(await bcrypt.compare(password, account.password_hash))) {
      return NextResponse.json({ error: "That password is not correct." }, { status: 403 })
    }

    const billing = await getAccountBillingRefs(user.id)
    if (billing.stripeSubscriptionIds.length > 0 || billing.stripeCustomerId) {
      const stripe = getStripeClient()
      if (!stripe) {
        return NextResponse.json(
          { error: "Billing is temporarily unavailable, so the account was not deleted. Please try again or contact support." },
          { status: 503 },
        )
      }
      try {
        for (const id of billing.stripeSubscriptionIds) {
          const subscription = await stripe.subscriptions.retrieve(id).catch(() => null)
          if (subscription && subscription.status !== "canceled" && subscription.status !== "incomplete_expired") {
            await stripe.subscriptions.cancel(id)
          }
        }
        if (billing.stripeCustomerId) {
          await stripe.customers.del(billing.stripeCustomerId).catch((error: { code?: string }) => {
            if (error?.code !== "resource_missing") throw error
          })
        }
      } catch (stripeError) {
        console.error("[account] Stripe cancellation failed during deletion:", stripeError)
        return NextResponse.json(
          { error: "We could not cancel your subscription, so nothing was deleted. Please try again or contact support." },
          { status: 502 },
        )
      }
    }

    await deleteUserAccount(user.id, account.email || user.email)
    await destroySession()

    return NextResponse.json({
      success: true,
      // Apple bills App Store subscriptions. The app shows how to cancel in iOS Settings.
      appStoreSubscriptionActive: billing.hasAppStoreSubscription,
    })
  } catch (error) {
    console.error("[account] Delete account error:", error)
    return NextResponse.json({ error: "Failed to delete account. Nothing was changed." }, { status: 500 })
  }
}
