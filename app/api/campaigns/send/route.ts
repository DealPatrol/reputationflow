import { type NextRequest, NextResponse } from "next/server"

export async function POST(_request: NextRequest) {
  return NextResponse.json(
    {
      success: false,
      error: "Send a review request from the dashboard. This endpoint does not start a campaign.",
    },
    { status: 410 },
  )
}
