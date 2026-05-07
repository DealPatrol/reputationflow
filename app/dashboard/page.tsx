"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardClient from "@/components/dashboard-client"
import { DashboardSkeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [business, setBusiness] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")

    // If no user, create a demo user for preview
    const parsedUser = userData
      ? JSON.parse(userData)
      : {
          id: "demo-user",
          email: "demo@example.com",
          name: "Demo User",
        }

    setUser(parsedUser)

    // Fetch or create business
    fetch("/api/business/me")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch business")
        return res.json()
      })
      .then((data) => {
        setBusiness(data.business)
        setLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Failed to fetch business:", err)
        // Create a demo business if fetch fails
        setBusiness({
          id: parsedUser.id,
          user_id: parsedUser.id,
          business_name: "My Business",
          google_link: "",
          facebook_link: "",
          yelp_link: "",
          plan_type: "free",
          subscription_status: "active",
        })
        setLoading(false)
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
