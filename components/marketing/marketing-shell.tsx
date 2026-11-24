import type { ReactNode } from "react"
import { SiteFooter } from "@/components/marketing/site-footer"
import { SiteHeader } from "@/components/marketing/site-header"
import { NativeBackBar } from "@/components/native/native-back-bar"

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f5f1] text-slate-950">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
      <div className="web-only contents">
        <SiteHeader />
      </div>
      <NativeBackBar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <div className="web-only contents">
        <SiteFooter />
      </div>
    </div>
  )
}
