"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardClient from "@/components/dashboard-client"
import { DashboardSkeleton } from "@/components/ui/skeleton"
import type { User } from "@/lib/auth"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [business, setBusiness] = useState<any>(null)
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
        setLoading(false)
      })
      .catch(() => {
        router.replace("/auth/signin")
      })
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <DashboardSkeleton />
      </div>
    )
  }

  if (!user || !business) {
    return null
  }

  return <DashboardClient business={business} user={user} />
}
