import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      success: false,
      error: "Campaign sending has been removed. Please share your review link directly with customers.",
    },
    { status: 410 },
  )
}
