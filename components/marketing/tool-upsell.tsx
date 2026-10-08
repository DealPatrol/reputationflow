import Link from "next/link"
import { SignupLink } from "@/components/marketing/signup-link"
import { formatPlanPrice, PLANS } from "@/lib/plans"

export function ToolUpsell({ location, body }: { location: string; body: string }) {
  return (
    <aside className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
      <h2 className="text-lg font-semibold text-slate-950">Save it only if you want to</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Starter is free and does not ask for a card. Professional is {formatPlanPrice(PLANS.pro.price)} per month for email requests, and there is no trial on top of Starter. You can cancel Professional in the Stripe customer portal.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <SignupLink
          href="/auth/signin?signup=1"
          location={location}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Create a free account
        </SignupLink>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-lg border border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800"
        >
          See pricing
        </Link>
      </div>
    </aside>
  )
}
