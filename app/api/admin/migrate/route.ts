import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Safe to run on an existing database — all statements use IF NOT EXISTS
export async function POST() {
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL not configured" }, { status: 503 })
  }

  const results: string[] = []

  try {
    // Create users table (stores hashed passwords)
    await (sql as any)`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    results.push("✓ users table ready")

    await (sql as any)`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`

    // Add owner_email to businesses
    await (sql as any)`
      ALTER TABLE businesses ADD COLUMN IF NOT EXISTS owner_email TEXT
    `
    results.push("✓ businesses.owner_email column ready")

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    console.error("[v0] Migration error:", error)
    return NextResponse.json({ success: false, error: error.message, results }, { status: 500 })
  }
}

export async function GET() {
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL not configured" }, { status: 503 })
  }

  try {
    const tables = await (sql as any)`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name IN ('users', 'businesses', 'feedback', 'campaigns', 'subscriptions', 'follow_up_settings')
      ORDER BY table_name
    ` as any[]

    const cols = await (sql as any)`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'businesses' AND column_name = 'owner_email'
    ` as any[]

    return NextResponse.json({
      tables: tables.map((t: any) => t.table_name),
      owner_email_column: cols.length > 0,
      migration_needed: tables.every((t: any) => t.table_name !== "users") || cols.length === 0,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
