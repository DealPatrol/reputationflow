"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Check, Loader2, RotateCcw, Zap } from "lucide-react"
import { ENTITLEMENTS_EVENT, haptic, nativePlugin, syncTransactionsToServer, type NativeProduct, type ServerEntitlement } from "@/lib/native/bridge"
import { IOS_PRO_MONTHLY, IOS_PRO_PRODUCT_IDS, IOS_PRO_YEARLY } from "@/lib/native/products"
import { PLANS } from "@/lib/plans"

interface NativeBillingViewProps {
  isPremium: boolean
  userId: string
  onPremiumChange: (isPremium: boolean) => void
  showToast: (message: string, type: "success" | "error" | "info") => void
}

const PERIOD_LABEL: Record<string, string> = { day: "day", week: "week", month: "month", year: "year" }

/**
 * iPhone billing: Professional is sold only as an auto-renewing App Store subscription
 * (StoreKit 2, App Review Guideline 3.1.1 / 3.1.2). No Stripe or web checkout links appear here.
 */
export function NativeBillingView({ isPremium, userId, onPremiumChange, showToast }: NativeBillingViewProps) {
  const [products, setProducts] = useState<NativeProduct[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)
  const [appStoreManaged, setAppStoreManaged] = useState(false)

  // Keep the latest callbacks in refs so the StoreKit load effect runs once per mount.
  const callbacks = useRef({ onPremiumChange, showToast })
  useEffect(() => {
    callbacks.current = { onPremiumChange, showToast }
  })
  const apply = useCallback((result: ServerEntitlement | null) => {
    if (!result) return
    callbacks.current.onPremiumChange(result.isPremium)
    if (result.linkedElsewhere) {
      callbacks.current.showToast("This App Store subscription is linked to a different ReputationFlow account.", "error")
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const plugin = await nativePlugin()
        const [{ products: list }, { transactions }] = await Promise.all([
          plugin.getProducts({ productIds: [...IOS_PRO_PRODUCT_IDS] }),
          plugin.currentEntitlements(),
        ])
        if (cancelled) return
        const order = (id: string) => (id === IOS_PRO_MONTHLY ? 0 : id === IOS_PRO_YEARLY ? 1 : 2)
        setProducts([...list].sort((a, b) => order(a.id) - order(b.id)))
        setAppStoreManaged(transactions.some((t) => (IOS_PRO_PRODUCT_IDS as readonly string[]).includes(t.productId)))
      } catch {
        /* products stay empty: the purchase buttons explain the App Store is unavailable */
      } finally {
        if (!cancelled) setLoadingProducts(false)
      }
    })()
    const onEntitlements = (event: Event) => apply((event as CustomEvent<ServerEntitlement>).detail)
    window.addEventListener(ENTITLEMENTS_EVENT, onEntitlements)
    return () => {
      cancelled = true
      window.removeEventListener(ENTITLEMENTS_EVENT, onEntitlements)
    }
  }, [apply])

  const buy = async (product: NativeProduct) => {
    setBusy(product.id)
    try {
      const plugin = await nativePlugin()
      // appAccountToken ties the Apple transaction to this ReputationFlow account (user ids are UUIDs).
      const result = await plugin.purchase({ productId: product.id, appAccountToken: userId })
      if (result.status === "purchased" && result.transaction) {
        apply(await syncTransactionsToServer([result.transaction]))
        setAppStoreManaged(true)
        haptic("success")
        showToast("Professional is active. Thank you!", "success")
      } else if (result.status === "pending") {
        showToast("Purchase is waiting for approval. Professional turns on when Apple approves it.", "info")
      } else if (result.status === "cancelled") {
        showToast("Purchase cancelled. You were not charged.", "info")
      } else {
        showToast("The purchase did not finish. Please try again.", "error")
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : "The purchase did not finish.", "error")
    } finally {
      setBusy(null)
    }
  }

  const restore = async () => {
    setBusy("restore")
    try {
      const plugin = await nativePlugin()
      const { transactions } = await plugin.restore()
      const result = await syncTransactionsToServer(transactions)
      apply(result)
      setAppStoreManaged(transactions.length > 0)
      showToast(
        result?.isPremium ? "Purchases restored. Professional is active." : "No active App Store subscription was found for this Apple Account.",
        result?.isPremium ? "success" : "info",
      )
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Could not restore purchases.", "error")
    } finally {
      setBusy(null)
    }
  }

  const manage = async () => {
    try {
      await (await nativePlugin()).manageSubscriptions()
    } catch {
      showToast("Open Settings > Apple Account > Subscriptions to manage your plan.", "info")
    }
  }

  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Plan</h1>
        <p className="text-slate-500">Starter is free. Professional adds email requests, full history, export, and reply drafts.</p>
      </div>

      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-xl">
        <div className="flex items-center gap-2">
          <Zap size={16} fill="currentColor" aria-hidden="true" />
          <h2 className="text-xl font-bold">{PLANS.pro.name}</h2>
        </div>
        <ul className="mt-4 space-y-2">
          {PLANS.pro.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check size={18} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        {isPremium ? (
          <div className="mt-6 space-y-3">
            <div className="rounded-xl bg-white/10 py-3 text-center font-bold">Professional is active ✓</div>
            {appStoreManaged ? (
              <button type="button" onClick={() => void manage()} className="w-full rounded-xl bg-white/15 py-3 font-semibold">
                Manage subscription
              </button>
            ) : (
              <p className="text-sm text-indigo-100">This plan was purchased outside the app. It works here on your iPhone too.</p>
            )}
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {loadingProducts && (
              <div className="flex items-center justify-center gap-2 py-3 text-sm">
                <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Loading App Store prices…
              </div>
            )}
            {!loadingProducts && products.length === 0 && (
              <p className="rounded-xl bg-white/10 p-3 text-sm">
                The App Store is not available right now. Check your connection and try again. Starter keeps working.
              </p>
            )}
            {products.map((product) => (
              <button
                key={product.id}
                type="button"
                disabled={busy !== null}
                onClick={() => void buy(product)}
                className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-4 text-left font-bold text-indigo-700 shadow-lg disabled:opacity-60"
              >
                <span>
                  {product.displayName || (product.id === IOS_PRO_YEARLY ? "Professional yearly" : "Professional monthly")}
                  {product.introductoryOffer ? <span className="block text-xs font-medium text-indigo-500">{product.introductoryOffer}</span> : null}
                </span>
                <span className="flex items-center gap-2">
                  {busy === product.id && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
                  {product.displayPrice}
                  {product.period ? ` / ${PERIOD_LABEL[product.period] ?? product.period}` : ""}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => void restore()}
          disabled={busy !== null}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-800 disabled:opacity-60"
        >
          {busy === "restore" ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <RotateCcw size={16} aria-hidden="true" />}
          Restore Purchases
        </button>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Payment is charged to your Apple Account when you confirm the purchase. The subscription renews automatically at the same price for
        each period unless you cancel at least 24 hours before the period ends. Manage or cancel any time in Settings &gt; Apple Account &gt;
        Subscriptions. Deleting your ReputationFlow account does not cancel an App Store subscription.{" "}
        <Link href="/terms" className="font-semibold underline">
          Terms of Use
        </Link>{" "}
        ·{" "}
        <Link href="/privacy" className="font-semibold underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}
