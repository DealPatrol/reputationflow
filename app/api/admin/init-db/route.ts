import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: Request) {
  try {
    // Check if tables exist
    const existingTables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('businesses', 'feedback', 'campaigns', 'subscriptions', 'follow_up_settings')
    `

    if (existingTables.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Tables already exist. Use the SQL script to recreate if needed.",
        existing: existingTables.map((t: any) => t.table_name),
      })
    }

    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS businesses (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        business_name TEXT NOT NULL,
        google_link TEXT,
        facebook_link TEXT,
        yelp_link TEXT,
        is_premium BOOLEAN DEFAULT FALSE,
        stripe_customer_id TEXT,
        stripe_subscription_id TEXT,
        subscription_status TEXT DEFAULT 'inactive',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id)`
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_businesses_user_id_unique ON businesses(user_id)`

    await sql`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
        plan_type TEXT DEFAULT 'free',
        status TEXT DEFAULT 'active',
        stripe_subscription_id TEXT,
        current_period_end TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(business_id)
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_subscriptions_business_id ON subscriptions(business_id)`

    await sql`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        feedback_text TEXT,
        type TEXT NOT NULL,
        customer_email TEXT,
        responded BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_feedback_business_id ON feedback(business_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC)`

    await sql`
      CREATE TABLE IF NOT EXISTS campaigns (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
        customer_name TEXT NOT NULL,
        contact TEXT NOT NULL,
        status TEXT DEFAULT 'sent',
        follow_up_count INTEGER DEFAULT 0,
        last_sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_campaigns_business_id ON campaigns(business_id)`

    await sql`
      CREATE TABLE IF NOT EXISTS follow_up_settings (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
        enabled BOOLEAN DEFAULT false,
        intervals TEXT DEFAULT '[3,7]',
        max_followups INTEGER DEFAULT 2,
        stop_on_response BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(business_id)
      )
    `

    return NextResponse.json({
      success: true,
      message: "Database tables created successfully!",
    })
  } catch (error: any) {
    console.error("[v0] Database initialization error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        hint: "You may need to run the SQL script manually in your Neon database console.",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('businesses', 'feedback', 'campaigns', 'subscriptions', 'follow_up_settings')
      ORDER BY table_name
    `

    const tableNames = tables.map((t: any) => t.table_name)
    const allTablesExist = ["businesses", "campaigns", "feedback", "follow_up_settings", "subscriptions"].every((t) =>
      tableNames.includes(t),
    )

    return NextResponse.json({
      initialized: allTablesExist,
      existing: tableNames,
      missing: ["businesses", "campaigns", "feedback", "follow_up_settings", "subscriptions"].filter(
        (t) => !tableNames.includes(t),
      ),
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
