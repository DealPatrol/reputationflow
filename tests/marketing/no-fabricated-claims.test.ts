import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const bannedPhrases = [
  "50K+",
  "$2.1M",
  "8-12x",
  "12K",
  "$300+",
  "$3,400",
  "500+",
  "Proven ROI",
  "Reviews Collected",
  "Extra Revenue",
  "Active Businesses",
  "The Math Is Simple",
  "sends happy customers",
  "happy customers to Google",
  "frustrated customers",
  "private form instead",
  "No more negative reviews",
  "kept private while positive",
  "smart routing",
  "1-3 star",
]

function collectSourceFiles(directory: string): string[] {
  const entries = readdirSync(directory)
  return entries.flatMap((entry) => {
    const path = join(directory, entry)
    const stats = statSync(path)
    if (stats.isDirectory()) return collectSourceFiles(path)
    if (path.endsWith(".tsx") || path.endsWith(".ts")) return [path]
    return []
  })
}

describe("marketing copy", () => {
  it("does not publish unverifiable stats, testimonials, or customer counts", () => {
    const files = [
      ...collectSourceFiles(join(process.cwd(), "app")),
      ...collectSourceFiles(join(process.cwd(), "components")),
      join(process.cwd(), "lib/marketing-content.ts"),
      join(process.cwd(), "lib/email.ts"),
    ]
    const hits = files.flatMap((file) => {
      const source = readFileSync(file, "utf8")
      return bannedPhrases.filter((phrase) => source.includes(phrase)).map((phrase) => `${file}: ${phrase}`)
    })
    expect(hits).toEqual([])
  })
})
