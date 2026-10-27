"use client"

import { PricingLink } from "@/components/marketing/pricing-link"
import { SetupLink } from "@/components/marketing/setup-link"
import {
  messageCopyLocation,
  messageCopyNextStep,
  rememberMessageHandoff,
  reviewLinkToCarry,
  type MessageCopyChannel,
} from "@/lib/message-handoff"
import { SETUP_CTA_NOTE } from "@/lib/signup"

export function MessageCopyNext({
  channel,
  reviewLink,
  businessName,
}: {
  channel: MessageCopyChannel
  reviewLink: string
  businessName: string
}) {
  const carriedLink = reviewLinkToCarry(reviewLink).length > 0
  const next = messageCopyNextStep({ channel, carriedLink })
  const remember = () => rememberMessageHandoff({ reviewLink, businessName })

  return (
    <div role="status" className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
      <h3 className="text-base font-semibold text-slate-950">{next.heading}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{next.body}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <SetupLink
          location={messageCopyLocation(channel, "setup")}
          onClick={remember}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500"
        />
        <PricingLink
          location={messageCopyLocation(channel, "pricing")}
          onClick={remember}
          className="inline-flex items-center justify-center rounded-lg border border-indigo-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-900"
        >
          Compare Starter and Professional
        </PricingLink>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        {SETUP_CTA_NOTE} The Professional upgrade is on the screen after that link is saved.
      </p>
    </div>
  )
}
