import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Feedbackr - Smart Review Management for Local Businesses",
  description:
    "Intelligent review router that directs happy customers to Google, Facebook, and Yelp—while capturing unhappy feedback privately before it becomes a public problem.",
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
    title: "Feedbackr - Smart Review Management",
    description: "Intelligent review routing platform for local businesses",
    siteName: "Feedbackr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedbackr - Smart Review Management",
    description: "Intelligent review routing platform for local businesses",
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
