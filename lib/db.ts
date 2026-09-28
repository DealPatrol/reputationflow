import { neon } from "@neondatabase/serverless"
import type { NeonQueryFunction } from "@neondatabase/serverless"

let sql: NeonQueryFunction<false, false> | null = null
let tablesChecked = false
let tablesExist = false

try {
  if (process.env.DATABASE_URL) {
    sql = neon(process.env.DATABASE_URL)
  }
} catch (error) {
  console.log("[v0] Database not configured, using demo mode")
}

export { sql }

async function checkTablesExist(): Promise<boolean> {
  if (tablesChecked) return tablesExist
  if (!sql) return false

  try {
    await sql`SELECT 1 FROM businesses LIMIT 1`
    tablesChecked = true
    tablesExist = true
    return true
  } catch (error) {
    console.log("[v0] Database tables not initialized, using demo mode")
    tablesChecked = true
    tablesExist = false
    return false
  }
}

const DEMO_FEEDBACK = [
  {
    id: 1,
    business_id: 1,
    rating: 5,
    feedback_text: "Great service! Will definitely come back.",
    type: "positive",
    customer_email: "happy@example.com",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 2,
    business_id: 1,
    rating: 5,
    feedback_text: "Excellent experience from start to finish.",
    type: "positive",
    customer_email: "satisfied@example.com",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 3,
    business_id: 1,
    rating: 4,
    feedback_text: "Good quality, fast delivery.",
    type: "positive",
    customer_email: "customer@example.com",
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 4,
    business_id: 1,
    rating: 2,
    feedback_text: "Had some issues with my order.",
    type: "negative",
    customer_email: "concern@example.com",
    created_at: new Date(Date.now() - 345600000).toISOString(),
  },
]

const DEMO_CAMPAIGNS = [
  {
    id: 1,
    business_id: 1,
    customer_name: "John Smith",
    contact: "john@example.com",
    status: "review_left",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 2,
    business_id: 1,
    customer_name: "Sarah Johnson",
    contact: "sarah@example.com",
    status: "clicked",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 3,
    business_id: 1,
    customer_name: "Mike Davis",
    contact: "mike@example.com",
    status: "sent",
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
]

// Database helper functions with error handling

export async function createUser(id: string, email: string, passwordHash: string) {
  if (!sql) return { id, email }
  const result = await sql`
    INSERT INTO users (id, email, password_hash)
    VALUES (${id}, ${email}, ${passwordHash})
    ON CONFLICT (email) DO NOTHING
    RETURNING id, email, created_at
  `
  return result[0] || null
}

export async function getUserByEmail(email: string) {
  if (!sql) return null
  const result = await sql`
    SELECT id, email, password_hash FROM users WHERE email = ${email} LIMIT 1
  `
  return result[0] || null
}

export async function updateBusinessOwnerEmail(userId: string, email: string) {
  if (!sql) return null
  try {
    await sql!`
      UPDATE businesses SET owner_email = ${email} WHERE user_id = ${userId}
    `
  } catch (error) {
    console.error("[v0] Error updating owner email:", error)
  }
}

export async function updateBusinessStripeCustomer(businessId: string | number, customerId: string) {
  if (!sql) return null
  const result = await sql`
    UPDATE businesses
    SET stripe_customer_id = ${customerId}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${businessId}
    RETURNING *
  `
  return result[0] || null
}

export async function getBusinessOwnerEmail(businessId: string | number): Promise<{ owner_email: string | null; business_name: string } | null> {
  if (!sql) return null
  try {
    const result = await sql!`
      SELECT owner_email, business_name FROM businesses WHERE id = ${businessId} LIMIT 1
    ` as any[]
    return result[0] || null
  } catch (error) {
    console.error("[v0] Error fetching business owner email:", error)
    return null
  }
}

export async function getCampaignCountByBusinessId(businessId: string | number): Promise<number> {
  if (!sql) return 0
  try {
    const result = await sql!`
      SELECT COUNT(*) as count FROM campaigns WHERE business_id = ${businessId}
    ` as any[]
    return Number(result[0]?.count || 0)
  } catch (error) {
    return 0
  }
}

function isKeylessDemo() {
  return !process.env.DATABASE_URL
}

export async function getBusinessByUserId(userId: string) {
  if (!isKeylessDemo()) {
    const hasDb = await checkTablesExist()
    if (!hasDb) return null
  } else {
    return {
      id: 1,
      user_id: userId,
      business_name: "My Business (Demo)",
      google_link: "https://g.page/review/mybusiness",
      facebook_link: "",
      yelp_link: "",
      google_links_2: [],
      facebook_links_2: [],
      yelp_links_2: [],
      negative_review_link: "",
      plan_type: "free",
      subscription_status: "active",
      is_premium: false,
    }
  }

  try {
    const result = await sql!`
      SELECT b.*, 
             COALESCE(s.plan_type, 'free') as plan_type, 
             COALESCE(s.status, 'active') as subscription_status,
             CASE WHEN s.plan_type = 'pro' AND s.status = 'active' THEN true ELSE false END as is_premium
      FROM businesses b
      LEFT JOIN subscriptions s ON b.id = s.business_id
      WHERE b.user_id = ${userId}
      LIMIT 1
    `
    return result[0] || null
  } catch (error) {
    console.error("[v0] Error in getBusinessByUserId:", error)
    return null
  }
}

export async function getBusinessById(businessId: string | number) {
  if (isKeylessDemo()) return String(businessId) === "1" ? getBusinessByUserId("demo-user") : null
  const hasDb = await checkTablesExist()
  if (!hasDb) return null

  const result = await sql!`SELECT * FROM businesses WHERE id = ${businessId} LIMIT 1`
  return result[0] || null
}

export async function createBusiness(userId: string, businessName: string) {
  if (!isKeylessDemo()) {
    const hasDb = await checkTablesExist()
    if (!hasDb) {
      throw new Error("Database tables are missing. Run npm run migrate.")
    }
  } else {
    return {
      id: 1,
      user_id: userId,
      business_name: businessName,
      google_link: "",
      facebook_link: "",
      yelp_link: "",
      google_links_2: [],
      facebook_links_2: [],
      yelp_links_2: [],
      negative_review_link: "",
      plan_type: "free",
      subscription_status: "active",
      is_premium: false,
    }
  }

  try {
    const result = await sql!`
      INSERT INTO businesses (user_id, business_name)
      VALUES (${userId}, ${businessName})
      RETURNING *
    `

    try {
      await sql!`INSERT INTO subscriptions (business_id, plan_type, status) VALUES (${result[0].id}, 'free', 'active')`
    } catch (e) {
      /* subscriptions table may not exist */
    }

    try {
      await sql!`INSERT INTO follow_up_settings (business_id) VALUES (${result[0].id})`
    } catch (e) {
      /* follow_up_settings table may not exist */
    }

    return result[0]
  } catch (error) {
    console.error("[v0] Error creating business:", error)
    throw error
  }
}

export async function updateBusiness(
  businessId: string | number,
  data: {
    business_name?: string
    google_link?: string
    facebook_link?: string
    yelp_link?: string
    google_links_2?: string[]
    facebook_links_2?: string[]
    yelp_links_2?: string[]
    negative_review_link?: string
  },
) {
  if (!sql) {
    console.log("[v0] No database connection, returning null")
    return null
  }

  try {
    const hasUpdates = Object.values(data).some((value) => value !== undefined)
    if (!hasUpdates) return null

    const result = await sql`
      UPDATE businesses
      SET business_name = CASE WHEN ${data.business_name !== undefined} THEN ${data.business_name || ""} ELSE business_name END,
          google_link = CASE WHEN ${data.google_link !== undefined} THEN ${data.google_link || null} ELSE google_link END,
          facebook_link = CASE WHEN ${data.facebook_link !== undefined} THEN ${data.facebook_link || null} ELSE facebook_link END,
          yelp_link = CASE WHEN ${data.yelp_link !== undefined} THEN ${data.yelp_link || null} ELSE yelp_link END,
          google_links_2 = CASE WHEN ${data.google_links_2 !== undefined} THEN ${data.google_links_2 || []} ELSE google_links_2 END,
          facebook_links_2 = CASE WHEN ${data.facebook_links_2 !== undefined} THEN ${data.facebook_links_2 || []} ELSE facebook_links_2 END,
          yelp_links_2 = CASE WHEN ${data.yelp_links_2 !== undefined} THEN ${data.yelp_links_2 || []} ELSE yelp_links_2 END,
          negative_review_link = CASE WHEN ${data.negative_review_link !== undefined} THEN ${data.negative_review_link || null} ELSE negative_review_link END,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${businessId}
      RETURNING *
    `

    return result[0]
  } catch (error) {
    console.error("[v0] Error updating business:", error)
    throw error
  }
}

export async function getFeedbackByBusinessId(businessId: string | number) {
  if (isKeylessDemo()) return DEMO_FEEDBACK
  const hasDb = await checkTablesExist()
  if (!hasDb) return []

  try {
    return await sql!`
      SELECT * FROM feedback
      WHERE business_id = ${businessId}
      ORDER BY created_at DESC
    `
  } catch (error) {
    console.error("[v0] Error fetching feedback:", error)
    return []
  }
}

export async function createFeedback(
  businessId: string | number,
  data: {
    rating: number
    feedback_text?: string
    type: "positive" | "negative" | "neutral"
    customer_email?: string
  },
) {
  if (!sql) {
    console.log("[v0] No database connection, returning mock feedback")
    return {
      id: 1,
      business_id: businessId,
      rating: data.rating,
      feedback_text: data.feedback_text || "",
      type: data.type,
      customer_email: data.customer_email || "",
      created_at: new Date().toISOString(),
    }
  }

  try {
    const result = await sql!`
      INSERT INTO feedback (business_id, rating, feedback_text, type, customer_email, created_at)
      VALUES (${businessId}, ${data.rating}, ${data.feedback_text || null}, ${data.type}, ${data.customer_email || null}, CURRENT_TIMESTAMP)
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("[v0] Error creating feedback:", error)
    throw error
  }
}

export async function getCampaignsByBusinessId(businessId: string | number) {
  if (isKeylessDemo()) return DEMO_CAMPAIGNS
  const hasDb = await checkTablesExist()
  if (!hasDb) return []

  try {
    return await sql!`
      SELECT * FROM campaigns
      WHERE business_id = ${businessId}
      ORDER BY created_at DESC
    `
  } catch (error) {
    console.error("[v0] Error fetching campaigns:", error)
    return []
  }
}

export async function createCampaign(
  businessId: string | number,
  data: {
    customer_name: string
    contact: string
    status?: string
  },
) {
  if (!sql) {
    console.log("[v0] No database connection, returning mock campaign")
    return {
      id: 1,
      business_id: businessId,
      customer_name: data.customer_name,
      contact: data.contact,
      status: data.status || "sent",
      created_at: new Date().toISOString(),
    }
  }

  try {
    const result = await sql!`
      INSERT INTO campaigns (business_id, customer_name, contact, status, created_at)
      VALUES (${businessId}, ${data.customer_name}, ${data.contact}, ${data.status || "sent"}, CURRENT_TIMESTAMP)
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("[v0] Error creating campaign:", error)
    throw error
  }
}

export async function getSubscriptionByBusinessId(businessId: string | number) {
  if (!sql) {
    console.log("[v0] No database connection, returning null")
    return null
  }

  try {
    const result = await sql!`
      SELECT * FROM subscriptions
      WHERE business_id = ${businessId}
      LIMIT 1
    `
    return result[0] || null
  } catch (error) {
    console.error("[v0] Error fetching subscription:", error)
    return null
  }
}

export async function updateSubscription(
  businessId: string | number,
  data: {
    plan_type?: string
    status?: string
    stripe_subscription_id?: string
    current_period_end?: Date
  },
) {
  if (!sql) {
    console.log("[v0] No database connection, returning null")
    return null
  }

  try {
    const result = await sql`
      UPDATE subscriptions
      SET plan_type = COALESCE(${data.plan_type || null}, plan_type),
          status = COALESCE(${data.status || null}, status),
          stripe_subscription_id = COALESCE(${data.stripe_subscription_id || null}, stripe_subscription_id),
          current_period_end = COALESCE(${data.current_period_end?.toISOString() || null}, current_period_end),
          updated_at = CURRENT_TIMESTAMP
      WHERE business_id = ${businessId}
      RETURNING *
    `

    return result[0]
  } catch (error) {
    console.error("[v0] Error updating subscription:", error)
    throw error
  }
}

export async function updateSubscriptionByStripeId(
  stripeSubscriptionId: string,
  data: { status: string; current_period_end?: Date },
) {
  if (!sql) return null
  const result = await sql`
    UPDATE subscriptions
    SET status = ${data.status},
        current_period_end = COALESCE(${data.current_period_end?.toISOString() || null}, current_period_end),
        updated_at = CURRENT_TIMESTAMP
    WHERE stripe_subscription_id = ${stripeSubscriptionId}
    RETURNING *
  `
  return result[0] || null
}

export async function claimWebhookEvent(eventId: string, eventType: string) {
  if (!sql) return true
  const result = await sql`
    INSERT INTO stripe_webhook_events (event_id, event_type)
    VALUES (${eventId}, ${eventType})
    ON CONFLICT (event_id) DO NOTHING
    RETURNING event_id
  `
  return result.length === 1
}

export async function releaseWebhookEvent(eventId: string) {
  if (!sql) return
  await sql`DELETE FROM stripe_webhook_events WHERE event_id = ${eventId}`
}

export async function getAnalyticsByBusinessId(businessId: string | number, days = 30) {
  if (!isKeylessDemo()) {
    const hasDb = await checkTablesExist()
    if (!hasDb) return { feedback: [], campaigns: [] }
  } else {
    return {
      feedback: [{ date: new Date().toISOString().split("T")[0], total: 4, positive: 3, negative: 1, avg_rating: 4.0 }],
      campaigns: [{ date: new Date().toISOString().split("T")[0], total: 3, converted: 1 }],
    }
  }

  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const feedback = await sql!`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as total,
        COUNT(CASE WHEN type = 'positive' THEN 1 END) as positive,
        COUNT(CASE WHEN type = 'negative' THEN 1 END) as negative,
        AVG(rating) as avg_rating
      FROM feedback
      WHERE business_id = ${businessId}
        AND created_at >= ${cutoffDate.toISOString()}
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `

    const campaigns = await sql!`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'review_left' THEN 1 END) as converted
      FROM campaigns
      WHERE business_id = ${businessId}
        AND created_at >= ${cutoffDate.toISOString()}
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `

    return { feedback, campaigns }
  } catch (error) {
    console.error("[v0] Error fetching analytics:", error)
    return { feedback: [], campaigns: [] }
  }
}

export async function getFollowUpSettings(businessId: string | number) {
  if (!sql) {
    console.log("[v0] No database connection, returning null")
    return null
  }

  try {
    const result = await sql!`
      SELECT * FROM follow_up_settings
      WHERE business_id = ${businessId}
      LIMIT 1
    `
    return result[0] || null
  } catch (error) {
    console.error("[v0] Error fetching follow-up settings:", error)
    return null
  }
}

export async function updateFollowUpSettings(
  businessId: string | number,
  data: {
    enabled?: boolean
    intervals?: string
    max_followups?: number
    stop_on_response?: boolean
  },
) {
  if (!sql) {
    console.log("[v0] No database connection, returning null")
    return null
  }

  try {
    const result = await sql`
      UPDATE follow_up_settings
      SET enabled = CASE WHEN ${data.enabled !== undefined} THEN ${data.enabled ?? false} ELSE enabled END,
          intervals = COALESCE(${data.intervals || null}, intervals),
          max_followups = CASE WHEN ${data.max_followups !== undefined} THEN ${data.max_followups ?? 0} ELSE max_followups END,
          stop_on_response = CASE WHEN ${data.stop_on_response !== undefined} THEN ${data.stop_on_response ?? false} ELSE stop_on_response END
      WHERE business_id = ${businessId}
      RETURNING *
    `

    return result[0]
  } catch (error) {
    console.error("[v0] Error updating follow-up settings:", error)
    throw error
  }
}

export async function saveFeedbackResponse(
  businessId: string | number,
  feedbackId: string | number,
  responseText: string,
) {
  if (!sql) {
    return {
      id: feedbackId,
      business_id: businessId,
      response_text: responseText,
      responded: true,
    }
  }

  const result = await sql!`
    UPDATE feedback
    SET response_text = ${responseText}, responded = TRUE
    WHERE id = ${feedbackId} AND business_id = ${businessId}
    RETURNING *
  `
  return result[0] || null
}

export async function createLead(data: { email: string; source: string; businessName?: string; details?: string }) {
  if (!sql) return null
  const result = await sql!`
    INSERT INTO leads (email, source, business_name, details)
    VALUES (${data.email}, ${data.source}, ${data.businessName || null}, ${data.details || null})
    RETURNING id, email, source, created_at
  `
  return result[0]
}
