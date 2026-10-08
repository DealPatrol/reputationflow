import Link from "next/link"
import { comparisons, industries } from "@/lib/marketing-content"
import { PUBLIC_CONTACT_EMAIL } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="text-sm font-semibold text-white">ReputationFlow</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Review requests for local businesses. Every customer sees the same public review links.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Product</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/how-it-works">How it works</Link></li>
            <li><Link className="hover:text-white" href="/pricing">Pricing</Link></li>
            <li><Link className="hover:text-white" href="/faq">FAQ</Link></li>
            <li><Link className="hover:text-white" href="/review-management-software">Review management software</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            <Link className="hover:text-white" href="/industries">Industries</Link>
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link className="hover:text-white" href={`/industries/${industry.slug}`}>{industry.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tools and comparisons</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/guides">Review guides</Link></li>
            <li><Link className="hover:text-white" href="/google-review-request-templates">Review request templates</Link></li>
            <li><Link className="hover:text-white" href="/tools/google-review-link">Google review link generator</Link></li>
            <li><Link className="hover:text-white" href="/tools/qr-code">QR code generator</Link></li>
            <li><Link className="hover:text-white" href="/how-to-get-more-google-reviews">How to get more Google reviews</Link></li>
            <li><Link className="hover:text-white" href="/how-to-respond-to-negative-google-reviews">Reply to a negative review</Link></li>
            <li><Link className="hover:text-white" href="/review-management-software">Review software compared</Link></li>
            {comparisons.map((comparison) => (
              <li key={comparison.slug}>
                <Link className="hover:text-white" href={`/compare/${comparison.slug}`}>{comparison.name} alternative</Link>
              </li>
            ))}
            <li><Link className="hover:text-white" href="/privacy">Privacy</Link></li>
            <li><Link className="hover:text-white" href="/terms">Terms</Link></li>
            <li><a className="hover:text-white" href={`mailto:${PUBLIC_CONTACT_EMAIL}`}>Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500 sm:px-6">
          © {new Date().getFullYear()} ReputationFlow. Reviews are written by customers on the platforms they choose.
        </p>
      </div>
    </footer>
  )
}
