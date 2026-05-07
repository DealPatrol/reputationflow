// Database initialization script for Neon PostgreSQL
// Run this to create all required tables

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

async function initializeDatabase() {
  console.log("Starting database initialization...")

  try {
    // Create businesses table
    await sql`
      CREATE TABLE IF NOT EXISTS businesses (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL UNIQUE,
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
    console.log("Created businesses table")

    // Create subscriptions table
    await sql`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE UNIQUE,
        plan_type TEXT DEFAULT 'free',
        status TEXT DEFAULT 'active',
        stripe_subscription_id TEXT,
        current_period_end TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log("Created subscriptions table")

    // Create feedback table
    await sql`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL,
        feedback_text TEXT,
        type TEXT NOT NULL,
        customer_email TEXT,
        responded BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log("Created feedback table")

    // Create campaigns table
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
    console.log("Created campaigns table")

    // Create follow_up_settings table
    await sql`
      CREATE TABLE IF NOT EXISTS follow_up_settings (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE UNIQUE,
        enabled BOOLEAN DEFAULT false,
        intervals TEXT DEFAULT '[3,7]',
        max_followups INTEGER DEFAULT 2,
        stop_on_response BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log("Created follow_up_settings table")

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_feedback_business_id ON feedback(business_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC)`
    await sql`CREATE INDEX IF NOT EXISTS idx_campaigns_business_id ON campaigns(business_id)`
    console.log("Created indexes")

    // Insert demo user
    await sql`
      INSERT INTO businesses (user_id, business_name, google_link, facebook_link, is_premium)
      VALUES ('demo-user', 'Demo Restaurant', 'https://g.page/demo', 'https://facebook.com/demo', false)
      ON CONFLICT (user_id) DO NOTHING
    `
    console.log("Created demo user")

    console.log("Database initialization complete!")
    return { success: true }
  } catch (error) {
    console.error("Database initialization failed:", error)
    return { success: false, error }
  }
}

initializeDatabase()
