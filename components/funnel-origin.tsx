"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { rememberFunnelOrigin } from "@/lib/funnel-client"

export function FunnelOrigin() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) rememberFunnelOrigin(pathname)
  }, [pathname])

  return null
}
