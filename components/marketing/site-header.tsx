"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Star, X } from "lucide-react"
import { trackSignupClick } from "@/lib/analytics-events"
import { SIGNUP_PATH } from "@/lib/signup"

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/industries", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/guides", label: "Guides" },
  { href: "/tools", label: "Free tools" },
  { href: "/resources", label: "Resources" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Star className="h-4 w-4" fill="currentColor" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight text-slate-950">ReputationFlow</span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-600 md:flex lg:gap-6" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/auth/signin" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Sign in
          </Link>
          <Link
            href={SIGNUP_PATH}
            className="rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            onClick={() => trackSignupClick("header")}
          >
            Start free
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/auth/signin" className="rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
              Sign in
            </Link>
            <Link
              href={SIGNUP_PATH}
              className="mt-1 rounded-lg bg-indigo-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => {
                trackSignupClick("header_mobile")
                setOpen(false)
              }}
            >
              Start free
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
