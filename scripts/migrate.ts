import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { neon } from "@neondatabase/serverless"

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) throw new Error("DATABASE_URL is required")

  const migrationPath = fileURLToPath(new URL("./migrate.sql", import.meta.url))
  const migration = await readFile(migrationPath, "utf8")
  const statements = migration
    .split(";")
    .map((statement) => statement.trim())
    .filter(Boolean)

  const sql = neon(databaseUrl)
  await sql.transaction(statements.map((statement) => sql.query(statement)))
  console.log(`Applied ${statements.length} migration statements.`)
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
