import { type NextRequest, NextResponse } from "next/server"
import { list } from "@vercel/blob"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)

    // List all blobs and filter by business
    const { blobs } = await list()

    const businessQRCodes = blobs
      .filter((blob) => blob.pathname.includes(`qr-${user.businessId}-`))
      .map((blob) => ({
        url: blob.url,
        filename: blob.pathname.split("/").pop() || "unknown",
        uploadedAt: blob.uploadedAt,
        size: blob.size,
      }))
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

    return NextResponse.json({ qrCodes: businessQRCodes })
  } catch (error) {
    console.error("[v0] QR list error:", error)
    return NextResponse.json({ error: "Failed to list QR codes" }, { status: 500 })
  }
}
