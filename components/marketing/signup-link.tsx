"use client"

import Link from "next/link"
import type { ComponentProps } from "react"
import { trackSignupClick } from "@/lib/analytics-events"

type SignupLinkProps = ComponentProps<typeof Link> & {
  location: string
}

export function SignupLink({ location, onClick, ...props }: SignupLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackSignupClick(location)
        if (typeof onClick === "function") onClick(event)
      }}
    />
  )
}
