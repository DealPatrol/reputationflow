"use client"

import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"
import { trackSetupCtaClick } from "@/lib/analytics-events"
import { SETUP_CTA_LABEL, SIGNUP_PATH } from "@/lib/signup"

type SetupLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  location: string
  children?: ReactNode
}

export function SetupLink({ location, onClick, children, ...props }: SetupLinkProps) {
  return (
    <Link
      {...props}
      href={SIGNUP_PATH}
      onClick={(event) => {
        trackSetupCtaClick(location)
        if (typeof onClick === "function") onClick(event)
      }}
    >
      {children ?? SETUP_CTA_LABEL}
    </Link>
  )
}
