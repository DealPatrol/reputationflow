import { kv } from "@vercel/kv"

const CACHE_TTL = {
  SHORT: 60 * 5, // 5 minutes
  MEDIUM: 60 * 30, // 30 minutes
  LONG: 60 * 60 * 24, // 24 hours
}

// Session storage in Redis
export async function setSession(userId: string, sessionData: any, ttl = 60 * 60 * 24 * 30) {
  try {
    await kv.setex(`session:${userId}`, ttl, JSON.stringify(sessionData))
    return true
  } catch (error) {
    console.error("[v0] Redis session set error:", error)
    return false
  }
}

export async function getSessionFromRedis(userId: string) {
  try {
    const data = await kv.get(`session:${userId}`)
    return data ? (typeof data === "string" ? JSON.parse(data) : data) : null
  } catch (error) {
    console.error("[v0] Redis session get error:", error)
    return null
  }
}

export async function deleteSession(userId: string) {
  try {
    await kv.del(`session:${userId}`)
    return true
  } catch (error) {
    console.error("[v0] Redis session delete error:", error)
    return false
  }
}

// Analytics caching
export async function cacheAnalytics(businessId: number, data: any) {
  try {
    await kv.setex(`analytics:${businessId}`, CACHE_TTL.SHORT, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("[v0] Redis analytics cache error:", error)
    return false
  }
}

export async function getCachedAnalytics(businessId: number) {
  try {
    const data = await kv.get(`analytics:${businessId}`)
    return data ? (typeof data === "string" ? JSON.parse(data) : data) : null
  } catch (error) {
    console.error("[v0] Redis analytics get error:", error)
    return null
  }
}

// Rate limiting
export async function checkRateLimit(identifier: string, limit = 10, window = 60) {
  try {
    const key = `ratelimit:${identifier}`
    const current = await kv.incr(key)

    if (current === 1) {
      await kv.expire(key, window)
    }

    return current <= limit
  } catch (error) {
    console.error("[v0] Redis rate limit error:", error)
    return true // Fail open
  }
}

// Campaign tracking
export async function trackCampaignClick(campaignId: number) {
  try {
    const key = `campaign:${campaignId}:clicks`
    await kv.incr(key)
    return true
  } catch (error) {
    console.error("[v0] Redis campaign tracking error:", error)
    return false
  }
}

export async function getCampaignClicks(campaignId: number): Promise<number> {
  try {
    const clicks = await kv.get(`campaign:${campaignId}:clicks`)
    return typeof clicks === "number" ? clicks : 0
  } catch (error) {
    console.error("[v0] Redis get campaign clicks error:", error)
    return 0
  }
}

// QR code generation cache
export async function cacheQRCode(businessId: number, url: string, qrCodeData: string) {
  try {
    await kv.setex(`qr:${businessId}`, CACHE_TTL.LONG, JSON.stringify({ url, qrCodeData }))
    return true
  } catch (error) {
    console.error("[v0] Redis QR cache error:", error)
    return false
  }
}

export async function getCachedQRCode(businessId: number) {
  try {
    const data = await kv.get(`qr:${businessId}`)
    return data ? (typeof data === "string" ? JSON.parse(data) : data) : null
  } catch (error) {
    console.error("[v0] Redis QR get error:", error)
    return null
  }
}
