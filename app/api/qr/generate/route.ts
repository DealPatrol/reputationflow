import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { requireAuth } from "@/lib/auth"
import { getCachedQRCode, cacheQRCode } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { url, businessName, size = 500 } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Check Redis cache first
    const cached = await getCachedQRCode(user.businessId!)
    if (cached && cached.url === url) {
      return NextResponse.json({
        qrCodeUrl: cached.qrCodeData,
        cached: true,
      })
    }

    // Generate QR code using QR Server API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&format=png`

    // Fetch the QR code image
    const response = await fetch(qrUrl)
    if (!response.ok) {
      throw new Error("Failed to generate QR code")
    }

    const blob = await response.blob()

    // Upload to Vercel Blob with business-specific naming
    const filename = `qr-${user.businessId}-${Date.now()}.png`
    const uploadedBlob = await put(filename, blob, {
      access: "public",
      contentType: "image/png",
    })

    // Cache the result in Redis
    await cacheQRCode(user.businessId!, url, uploadedBlob.url)

    return NextResponse.json({
      qrCodeUrl: uploadedBlob.url,
      filename: filename,
      size: blob.size,
      cached: false,
    })
  } catch (error) {
    console.error("[v0] QR generation error:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}
