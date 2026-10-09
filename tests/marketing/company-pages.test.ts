import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { indexablePaths } from "@/lib/marketing-content"

describe("company pages", () => {
  it("ship about and contact pages and list them in the sitemap", () => {
    for (const page of ["about", "contact", "privacy", "terms"]) {
      expect(existsSync(join(process.cwd(), "app", page, "page.tsx"))).toBe(true)
    }
    const paths = indexablePaths().map((entry) => entry.path)
    expect(paths).toEqual(expect.arrayContaining(["/about", "/contact", "/privacy", "/terms"]))
  })

  it("links company pages and the support email from the footer", () => {
    const footer = readFileSync(join(process.cwd(), "components/marketing/site-footer.tsx"), "utf8")
    for (const href of ['href="/about"', 'href="/contact"', 'href="/privacy"', 'href="/terms"', "mailto:"]) {
      expect(footer).toContain(href)
    }
  })
})
