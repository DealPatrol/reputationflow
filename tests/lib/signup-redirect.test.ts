import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { beforeEach, describe, expect, it, vi } from "vitest"
import robots from "@/app/robots"
import SignupPage from "@/app/signup/page"
import { indexablePaths } from "@/lib/marketing-content"
import { SIGNUP_PATH, signupDestination } from "@/lib/signup"

const redirectTo = vi.hoisted(() => vi.fn())

vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    redirectTo(url)
    throw new Error(`NEXT_REDIRECT ${url}`)
  },
}))

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    if (entry === "node_modules" || entry === ".next") return []
    const path = join(directory, entry)
    const stats = statSync(path)
    if (stats.isDirectory()) return collectSourceFiles(path)
    if (path.endsWith(".ts") || path.endsWith(".tsx")) return [path]
    return []
  })
}

describe("signup entry", () => {
  beforeEach(() => {
    redirectTo.mockClear()
  })

  it("sends /signup to the account form and keeps ad click ids", () => {
    const destination = signupDestination(
      new URLSearchParams("utm_source=google&utm_medium=cpc&gclid=abc&fbclid=xyz&signup=0"),
    )
    const url = new URL(destination, "https://reviews.example.com")
    expect(url.pathname).toBe("/auth/signin")
    expect(url.searchParams.get("signup")).toBe("1")
    expect(url.searchParams.getAll("signup")).toEqual(["1"])
    expect(url.searchParams.get("gclid")).toBe("abc")
    expect(url.searchParams.get("fbclid")).toBe("xyz")
    expect(url.searchParams.get("utm_source")).toBe("google")
    expect(url.searchParams.get("utm_medium")).toBe("cpc")
  })

  it("redirects the public /signup page without dropping the query string", async () => {
    await expect(
      SignupPage({
        searchParams: Promise.resolve({
          utm_campaign: "reviews",
          gclid: "click-1",
          signup: "0",
        }),
      }),
    ).rejects.toThrow("NEXT_REDIRECT")
    const destination = String(redirectTo.mock.calls[0]?.[0])
    const location = new URL(destination, "https://reviews.example.com")
    expect(location.pathname).toBe("/auth/signin")
    expect(location.searchParams.get("signup")).toBe("1")
    expect(location.searchParams.getAll("signup")).toEqual(["1"])
    expect(location.searchParams.get("gclid")).toBe("click-1")
    expect(location.searchParams.get("utm_campaign")).toBe("reviews")
  })

  it("keeps /signup out of the sitemap and robots index", () => {
    expect(SIGNUP_PATH).toBe("/signup")
    expect(indexablePaths().map((entry) => entry.path)).not.toContain("/signup")
    const rules = robots().rules
    const ruleList = Array.isArray(rules) ? rules : [rules]
    const disallow = ruleList.flatMap((rule) => {
      if (!rule.disallow) return []
      return Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow]
    })
    expect(disallow).toContain("/signup")
  })

  it("points every public signup call to action at /signup", () => {
    const files = [
      ...collectSourceFiles(join(process.cwd(), "app")),
      ...collectSourceFiles(join(process.cwd(), "components")),
    ]
    const stale = files.filter((file) => readFileSync(file, "utf8").includes("/auth/signin?signup=1"))
    expect(stale).toEqual([])
  })
})
