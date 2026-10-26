import { PricingLink } from "@/components/marketing/pricing-link"
import { SetupLink } from "@/components/marketing/setup-link"
import { SignupLink } from "@/components/marketing/signup-link"
import { SETUP_CTA_NOTE, SIGNUP_PATH } from "@/lib/signup"

export function CtaBand({
  title = "Set up your review link today",
  body = "Create a free account, add your Google review link, and share one page with every customer.",
  signupLocation = "cta",
  signupHref = SIGNUP_PATH,
  signupLabel = "Start free",
  setupLocation,
}: {
  title?: string
  body?: string
  signupLocation?: string
  signupHref?: string
  signupLabel?: string
  setupLocation?: string
}) {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">{body}</p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <SignupLink href={signupHref} location={signupLocation} className="rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-950">
              {signupLabel}
            </SignupLink>
            <PricingLink location={`${signupLocation}_pricing`} className="rounded-lg border border-white/30 px-4 py-2.5 text-center text-sm font-semibold text-white">
              View pricing
            </PricingLink>
          </div>
          {setupLocation ? (
            <p className="text-sm leading-6 text-slate-300">
              <SetupLink location={setupLocation} className="font-semibold text-white underline decoration-white/40 underline-offset-4" />
              . {SETUP_CTA_NOTE}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
