import { PricingLink } from "@/components/marketing/pricing-link"
import { SignupLink } from "@/components/marketing/signup-link"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { SIGNUP_PATH } from "@/lib/signup"

export function PlanOffer({
  signupLocation,
  pricingLocation,
  heading,
  body,
}: {
  signupLocation: string
  pricingLocation: string
  heading: string
  body: string
}) {
  return (
    <aside aria-label={heading} className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
      <p className="text-lg font-semibold text-slate-950">{heading}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {(["free", "pro"] as const).map((key) => {
          const plan = PLANS[key]
          return (
            <div key={key} className="rounded-xl border border-indigo-100 bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{plan.name}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                {formatPlanPrice(plan.price)}
                {plan.price > 0 && <span className="text-base font-medium text-slate-500">/month</span>}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{plan.description}</p>
            </div>
          )
        })}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        {PLANS.free.name} does not ask for a card. There is no trial on top of {PLANS.free.name}. {PLANS.pro.name} is billed monthly through Stripe. You can cancel it in the Stripe customer portal.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <SignupLink
          href={SIGNUP_PATH}
          location={signupLocation}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Create a free {PLANS.free.name} account
        </SignupLink>
        <PricingLink
          location={pricingLocation}
          className="inline-flex items-center justify-center rounded-lg border border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800"
        >
          See {PLANS.pro.name} pricing
        </PricingLink>
      </div>
    </aside>
  )
}
