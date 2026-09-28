import Link from "next/link"
import { MarketingShell } from "@/components/marketing/marketing-shell"

export default function NotFound() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-sm font-semibold text-indigo-700">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">That page is not here</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The link may be out of date. The homepage, pricing, and free review tools are still available.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Home</Link>
          <Link href="/tools/google-review-link" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold">
            Review link tool
          </Link>
        </div>
      </section>
    </MarketingShell>
  )
}
