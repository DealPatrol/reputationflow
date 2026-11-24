"use client"

import { useEffect, useState, type ReactNode } from "react"
import { isNativeIos } from "@/lib/native/platform"

/** Renders children on the website only, never inside the iOS app (e.g. ad pixels, web checkout). */
export function WebOnly({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(!isNativeIos())
  }, [])
  return show ? <>{children}</> : null
}
