import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://feedbackr.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Feedbackr | Honest review management for local businesses",
    template: "%s | Feedbackr",
  },
  description:
    "Feedbackr helps local businesses invite honest reviews, learn from customer feedback, and build a consistent reputation workflow.",
  alternates: { canonical: "/" },
  generator: "v0.app",
  keywords: [
    "review management",
    "reputation management",
    "customer feedback",
    "review routing",
    "online reviews",
    "Google reviews",
    "business reviews",
  ],
  authors: [{ name: "Feedbackr" }],
  creator: "Feedbackr",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Feedbackr | Honest review management for local businesses",
    description: "Invite honest reviews, learn from customer feedback, and build a consistent reputation workflow.",
    siteName: "Feedbackr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedbackr | Review management software for local businesses",
    description: "Review management software for local businesses to invite honest feedback, respond to customers, and build trust online.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
