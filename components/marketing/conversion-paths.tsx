import Link from "next/link"
import { PricingLink } from "@/components/marketing/pricing-link"
import { messageToolLinkForPath, REVIEW_MESSAGE_TOOL_PATH } from "@/lib/review-message-pages"

const links = [
  { href: "/tools/qr-code", label: "Google review QR code generator" },
  { href: "/tools/google-review-link", label: "Google review link generator" },
  { href: REVIEW_MESSAGE_TOOL_PATH, label: "Review request message generator" },
  { href: "/industries", label: "Google review QR codes by trade" },
  { href: "/google-review-qr-by-city", label: "Google review QR codes by city" },
  { href: "/pricing", label: "Starter and Professional pricing" },
] as const

function locationFor(current: string) {
  const slug = current.replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")
  return `paths_${slug || "home"}`.slice(0, 80)
}

export function ConversionPaths({ current }: { current: string }) {
  const specific = messageToolLinkForPath(current)
  const withTrade =
    specific.href === REVIEW_MESSAGE_TOOL_PATH ? links : [...links, { href: specific.href, label: specific.label }]
  const items = withTrade.filter((item) => item.href !== current)
  return (
    <nav aria-label="Tools, trades, and pricing" className="mt-10">
      <h2 className="text-xl font-semibold text-slate-950">Tools, trades, and pricing</h2>
      <ul className="mt-3 space-y-2 text-sm leading-7">
        {items.map((item) => (
          <li key={item.href}>
            {item.href === "/pricing" ? (
              <PricingLink location={locationFor(current)} className="font-semibold text-indigo-700">
                {item.label}
              </PricingLink>
            ) : (
              <Link className="font-semibold text-indigo-700" href={item.href}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
