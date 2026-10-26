import { PricingLink } from "@/components/marketing/pricing-link"
import { SetupLink } from "@/components/marketing/setup-link"
import { SignupLink } from "@/components/marketing/signup-link"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { professionalSignupPath, SETUP_CTA_NOTE } from "@/lib/signup"

export function TradeGuideCta({ location }: { location: string }) {
  const price = formatPlanPrice(PLANS.pro.price)
  return (
    <aside aria-label="Set up your Google review link" className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
      <h2 className="text-lg font-semibold text-slate-950">Set up the link, or email the ask</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Starter is free. It keeps the Google review link and the QR code. Professional is {price} per month and can email that link when you choose the customer. Neither plan sends texts, and neither plan hides Google, Facebook, or Yelp after a low rating.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <SetupLink
          location={`${location}_setup`}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500"
        />
        <SignupLink
          href={professionalSignupPath()}
          location={`${location}_pro`}
          className="inline-flex items-center justify-center rounded-lg border border-indigo-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-900"
        >
          Professional, {price}/month
        </SignupLink>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        {SETUP_CTA_NOTE} Choosing Professional opens Stripe checkout as soon as the account exists.
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        <PricingLink location={`${location}_pricing`} className="font-semibold text-indigo-700">
          Compare Starter and Professional
        </PricingLink>
        .
      </p>
    </aside>
  )
}
