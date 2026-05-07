import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "DATABASE_URL not configured" }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL)

    // Drop existing tables
    await sql`DROP TABLE IF EXISTS feedback CASCADE`
    await sql`DROP TABLE IF EXISTS campaigns CASCADE`
    await sql`DROP TABLE IF EXISTS follow_up_settings CASCADE`
    await sql`DROP TABLE IF EXISTS subscriptions CASCADE`
    await sql`DROP TABLE IF EXISTS businesses CASCADE`

    // Create businesses table with new multi-link fields
    await sql`
      CREATE TABLE businesses (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL UNIQUE,
        business_name TEXT NOT NULL,
        google_link TEXT,
        facebook_link TEXT,
        yelp_link TEXT,
        google_links_2 TEXT[] DEFAULT ARRAY[]::TEXT[],
        facebook_links_2 TEXT[] DEFAULT ARRAY[]::TEXT[],
        yelp_links_2 TEXT[] DEFAULT ARRAY[]::TEXT[],
        negative_review_link TEXT,
        is_premium BOOLEAN DEFAULT FALSE,
        stripe_customer_id TEXT,
        stripe_subscription_id TEXT,
        subscription_status TEXT DEFAULT 'inactive',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`CREATE INDEX idx_businesses_user_id ON businesses(user_id)`

    // Create subscriptions table
    await sql`
      CREATE TABLE subscriptions (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
        plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'pro')),
        status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled', 'past_due')),
        stripe_subscription_id TEXT,
        current_period_end TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(business_id)
      )
    `

    await sql`CREATE INDEX idx_subscriptions_business_id ON subscriptions(business_id)`
    await sql`CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id)`

    // Create feedback table
    await sql`
      CREATE TABLE feedback (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        feedback_text TEXT,
        type TEXT NOT NULL CHECK (type IN ('positive', 'negative', 'neutral')),
        customer_email TEXT,
        responded BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`CREATE INDEX idx_feedback_business_id ON feedback(business_id)`
    await sql`CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC)`
    await sql`CREATE INDEX idx_feedback_type ON feedback(type)`

    // Create campaigns table
    await sql`
      CREATE TABLE campaigns (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
        customer_name TEXT NOT NULL,
        contact TEXT NOT NULL,
        status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'opened', 'review_left', 'failed')),
        follow_up_count INTEGER DEFAULT 0,
        last_sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`CREATE INDEX idx_campaigns_business_id ON campaigns(business_id)`
    await sql`CREATE INDEX idx_campaigns_created_at ON campaigns(created_at DESC)`
    await sql`CREATE INDEX idx_campaigns_status ON campaigns(status)`

    // Create follow_up_settings table
    await sql`
      CREATE TABLE follow_up_settings (
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

    await sql`CREATE INDEX idx_follow_up_settings_business_id ON follow_up_settings(business_id)`

    return NextResponse.json({ message: "Database initialized successfully!" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Database initialization error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Database initialization failed" },
      { status: 500 }
    )
  }
}
