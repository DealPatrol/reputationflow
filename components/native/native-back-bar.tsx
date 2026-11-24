"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"

/** Minimal top bar for legal/support pages inside the iOS app (the marketing header is web-only). */
export function NativeBackBar() {
  return (
    <div className="native-only sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 pb-3 pt-3 backdrop-blur">
      <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-700">
        <ChevronLeft size={18} aria-hidden="true" />
        Dashboard
      </Link>
    </div>
  )
}
