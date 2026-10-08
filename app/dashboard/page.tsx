"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PurchaseConversion } from "@/components/ads/purchase-conversion"
import DashboardClient from "@/components/dashboard-client"
import { DashboardSkeleton } from "@/components/ui/skeleton"
import type { User } from "@/lib/auth"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [business, setBusiness] = useState<any>(null)
  const [demoMode, setDemoMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch account")
        return res.json()
      })
      .then((data) => {
        if (!data.user) {
          router.replace("/auth/signin")
          return
        }
        setUser(data.user)
        setBusiness(data.user.business)
        setDemoMode(Boolean(data.demoMode))
        setLoading(false)
      })
      .catch(() => {
        router.replace("/auth/signin")
      })
  }, [router])

  return (
    <>
      <PurchaseConversion />
      {loading || !user || !business ? (
        <div className="min-h-screen bg-slate-50 p-8">
          <DashboardSkeleton />
        </div>
      ) : (
        <DashboardClient business={business} user={user} demoMode={demoMode} />
      )}
    </>
  )
}
