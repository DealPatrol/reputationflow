"use client"

import Link from "next/link"
import type { ComponentProps } from "react"
import { trackPricingClick } from "@/lib/analytics-events"

type PricingLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  location: string
  href?: ComponentProps<typeof Link>["href"]
}

export function PricingLink({ location, href = "/pricing", onClick, ...props }: PricingLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        trackPricingClick(location)
        if (typeof onClick === "function") onClick(event)
      }}
    />
  )
}
