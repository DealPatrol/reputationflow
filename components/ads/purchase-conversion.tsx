"use client"

import { useEffect } from "react"
import { trackPurchase } from "@/lib/ads-events"

const RETRY_MS = 2000
const MAX_ATTEMPTS = 8

export function PurchaseConversion() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("success") !== "true") return

    let cancelled = false
    let attempts = 0

    const tick = async () => {
      if (cancelled || attempts >= MAX_ATTEMPTS) return
      attempts += 1
      try {
        const response = await fetch("/api/stripe/confirmed-purchase")
        if (!response.ok) {
          window.setTimeout(() => {
            void tick()
          }, RETRY_MS)
          return
        }
        const data = await response.json()
        if (data.confirmed && data.report && data.currency === "USD" && typeof data.transactionId === "string" && typeof data.value === "number") {
          trackPurchase({ transactionId: data.transactionId, value: data.value, currency: "USD" })
          return
        }
        if (!data.confirmed) {
          window.setTimeout(() => {
            void tick()
          }, RETRY_MS)
        }
      } catch {
        window.setTimeout(() => {
          void tick()
        }, RETRY_MS)
      }
    }

    void tick()
    return () => {
      cancelled = true
    }
  }, [])

  return null
}
