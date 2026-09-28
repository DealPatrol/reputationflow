import Link from "next/link"
import { MarketingShell } from "@/components/marketing/marketing-shell"

export const metadata = {
  title: "You're in",
  robots: { index: false, follow: false },
}

export default function SuccessPage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-xl px-4 py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Your account is ready</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Add your Google review link, then share the page. If you just finished checkout, the Professional plan can take a moment to show in billing.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/onboarding" className="rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white">
            Finish setup
          </Link>
          <Link href="/dashboard" className="rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold">
            Open dashboard
          </Link>
        </div>
      </section>
    </MarketingShell>
  )
}
