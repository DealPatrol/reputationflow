import { neon } from "@neondatabase/serverless"

let sql: ReturnType<typeof neon> | null = null
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
export async function getBusinessByUserId(userId: string) {
  const hasDb = await checkTablesExist()

  if (!hasDb) {
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

export async function createBusiness(userId: string, businessName: string) {
  const hasDb = await checkTablesExist()

  if (!hasDb) {
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
    return {
      id: 1,
      user_id: userId,
      business_name: businessName,
      plan_type: "free",
      subscription_status: "active",
      is_premium: false,
    }
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
    const setParts: string[] = []

    if (data.business_name !== undefined) {
      setParts.push(`business_name = '${data.business_name.replace(/'/g, "''")}'`)
    }
    if (data.google_link !== undefined) {
      setParts.push(`google_link = ${data.google_link ? `'${data.google_link.replace(/'/g, "''")}'` : "NULL"}`)
    }
    if (data.facebook_link !== undefined) {
      setParts.push(`facebook_link = ${data.facebook_link ? `'${data.facebook_link.replace(/'/g, "''")}'` : "NULL"}`)
    }
    if (data.yelp_link !== undefined) {
      setParts.push(`yelp_link = ${data.yelp_link ? `'${data.yelp_link.replace(/'/g, "''")}'` : "NULL"}`)
    }
    if (data.google_links_2 !== undefined) {
      setParts.push(`google_links_2 = ARRAY[${data.google_links_2.map((l) => `'${l.replace(/'/g, "''")}'`).join(",")}]`)
    }
    if (data.facebook_links_2 !== undefined) {
      setParts.push(
        `facebook_links_2 = ARRAY[${data.facebook_links_2.map((l) => `'${l.replace(/'/g, "''")}'`).join(",")}]`
      )
    }
    if (data.yelp_links_2 !== undefined) {
      setParts.push(`yelp_links_2 = ARRAY[${data.yelp_links_2.map((l) => `'${l.replace(/'/g, "''")}'`).join(",")}]`)
    }
    if (data.negative_review_link !== undefined) {
      setParts.push(
        `negative_review_link = ${data.negative_review_link ? `'${data.negative_review_link.replace(/'/g, "''")}'` : "NULL"}`
      )
    }

    if (setParts.length === 0) return null

    const result = await sql!(`
      UPDATE businesses
      SET ${setParts.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${businessId}
      RETURNING *
    `)

    return result[0]
  } catch (error) {
    console.error("[v0] Error updating business:", error)
    throw error
  }
}

export async function getFeedbackByBusinessId(businessId: string | number) {
  const hasDb = await checkTablesExist()

  if (!hasDb) {
    console.log("[v0] Using demo feedback data")
    return DEMO_FEEDBACK
  }

  try {
    return await sql!`
      SELECT * FROM feedback
      WHERE business_id = ${businessId}
      ORDER BY created_at DESC
    `
  } catch (error) {
    console.error("[v0] Error fetching feedback:", error)
    return DEMO_FEEDBACK
  }
}

export async function createFeedback(
  businessId: string | number,
  data: {
    rating: number
    feedback_text?: string
    type: "positive" | "negative"
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
  const hasDb = await checkTablesExist()

  if (!hasDb) {
    console.log("[v0] Using demo campaigns data")
    return DEMO_CAMPAIGNS
  }

  try {
    return await sql!`
      SELECT * FROM campaigns
      WHERE business_id = ${businessId}
      ORDER BY created_at DESC
    `
  } catch (error) {
    console.error("[v0] Error fetching campaigns:", error)
    return DEMO_CAMPAIGNS
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
    const setParts: string[] = []

    if (data.plan_type) setParts.push(`plan_type = '${data.plan_type}'`)
    if (data.status) setParts.push(`status = '${data.status}'`)
    if (data.stripe_subscription_id) setParts.push(`stripe_subscription_id = '${data.stripe_subscription_id}'`)
    if (data.current_period_end) setParts.push(`current_period_end = '${data.current_period_end.toISOString()}'`)

    if (setParts.length === 0) return null

    const result = await sql!(`
      UPDATE subscriptions
      SET ${setParts.join(", ")}
      WHERE business_id = ${businessId}
      RETURNING *
    `)

    return result[0]
  } catch (error) {
    console.error("[v0] Error updating subscription:", error)
    throw error
  }
}

export async function getAnalyticsByBusinessId(businessId: string | number, days = 30) {
  const hasDb = await checkTablesExist()

  if (!hasDb) {
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
    const setParts: string[] = []

    if (data.enabled !== undefined) setParts.push(`enabled = ${data.enabled}`)
    if (data.intervals) setParts.push(`intervals = '${data.intervals}'`)
    if (data.max_followups !== undefined) setParts.push(`max_followups = ${data.max_followups}`)
    if (data.stop_on_response !== undefined) setParts.push(`stop_on_response = ${data.stop_on_response}`)

    if (setParts.length === 0) return null

    const result = await sql!(`
      UPDATE follow_up_settings
      SET ${setParts.join(", ")}
      WHERE business_id = ${businessId}
      RETURNING *
    `)

    return result[0]
  } catch (error) {
    console.error("[v0] Error updating follow-up settings:", error)
    throw error
  }
}
