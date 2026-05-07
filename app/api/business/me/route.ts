import { type NextRequest, NextResponse } from "next/server"
import { getBusinessByUserId, createBusiness } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") || `user-${Date.now()}`

    let business = await getBusinessByUserId(userId)

    if (!business || !business.id) {
      try {
        const newBusiness = await createBusiness(userId, "My Business")
        business = {
          ...newBusiness,
          plan_type: "free",
          subscription_status: "active",
          is_premium: false,
        }
      } catch (error) {
        // If table doesn't exist, return mock data
        console.error("[v0] Could not create business, using mock:", error)
        business = {
          id: 1,
          user_id: userId,
          business_name: "My Business",
          google_link: "",
          facebook_link: "",
          yelp_link: "",
          plan_type: "free",
          subscription_status: "active",
          is_premium: false,
        }
      }
    }

    return NextResponse.json({ business })
  } catch (error: any) {
    console.error("[v0] Error in /api/business/me:", error)
    return NextResponse.json({
      business: {
        id: 1,
        user_id: "demo-user",
        business_name: "My Business",
        google_link: "",
        facebook_link: "",
        yelp_link: "",
        plan_type: "free",
        subscription_status: "active",
        is_premium: false,
      },
    })
  }
}
