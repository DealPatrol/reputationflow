"use client"

import { PricingLink } from "@/components/marketing/pricing-link"
import { SetupLink } from "@/components/marketing/setup-link"
import { SignupLink } from "@/components/marketing/signup-link"
import { rememberPendingReviewLink } from "@/lib/message-handoff"
import { formatPlanPrice, PLANS } from "@/lib/plans"
import { professionalSignupPath, SETUP_CTA_NOTE } from "@/lib/signup"

export function PlanOffer({
  signupLocation,
  pricingLocation,
  heading,
  body,
  setupLocation,
  reviewLink = "",
}: {
  signupLocation: string
  pricingLocation: string
  heading: string
  body: string
  setupLocation?: string
  reviewLink?: string
}) {
  const price = formatPlanPrice(PLANS.pro.price)
  const setup = setupLocation || `${signupLocation}_setup`
  const remember = () => rememberPendingReviewLink(reviewLink)

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
        {PLANS.free.name} does not ask for a card. There is no trial on top of {PLANS.free.name}. {PLANS.pro.name} is {price} per month through Stripe. You can cancel it in the Stripe customer portal.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <SetupLink
          location={setup}
          onClick={remember}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500"
        />
        <SignupLink
          href={professionalSignupPath()}
          location={`${signupLocation}_pro`}
          onClick={remember}
          className="inline-flex items-center justify-center rounded-lg border border-indigo-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-900"
        >
          {PLANS.pro.name}, {price}/month
        </SignupLink>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        {SETUP_CTA_NOTE} Choosing {PLANS.pro.name} opens Stripe checkout as soon as the account exists.
        {reviewLink
          ? " The Google review link from this page is filled in on the free setup screen. If checkout comes first, the dashboard asks you to save that same link. This browser keeps it until you do."
          : ""}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        <PricingLink location={pricingLocation} onClick={remember} className="font-semibold text-indigo-700">
          Compare {PLANS.free.name} and {PLANS.pro.name}
        </PricingLink>
        .
      </p>
    </aside>
  )
}
