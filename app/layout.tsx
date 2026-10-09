import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AdsScripts } from "@/components/ads/ads-scripts"
import { AttributionCapture } from "@/components/ads/attribution-capture"
import { absoluteUrl, getSiteUrl } from "@/lib/site"
import { googleSiteVerificationToken } from "@/lib/site-verification"
import "./globals.css"

const googleSiteVerification = googleSiteVerificationToken()

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
  title: {
    default: "ReputationFlow — review requests for local businesses",
    template: "%s · ReputationFlow",
  },
  description:
    "Ask every customer for an honest public review. One link, a QR code, and optional private feedback. No review gating.",
  keywords: [
    "review management software for small business",
    "how to get more google reviews",
    "google review link",
    "reputation management",
    "review requests",
  ],
  authors: [{ name: "ReputationFlow" }],
  creator: "ReputationFlow",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ReputationFlow",
    title: "ReputationFlow — review requests for local businesses",
    description: "One review link for every customer. The same public review buttons, whatever rating they pick.",
    url: absoluteUrl("/"),
    images: [absoluteUrl("/opengraph-image")],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReputationFlow — review requests for local businesses",
    description: "One review link for every customer. The same public review buttons, whatever rating they pick.",
    images: [absoluteUrl("/opengraph-image")],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} bg-slate-50`}>
      <body className="font-sans antialiased">
        {children}
        <AttributionCapture />
        <AdsScripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
