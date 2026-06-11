import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ReputationFlow - Enterprise Review Management",
  description:
    "Intelligent review gatekeeper that routes positive reviews to public platforms and captures negative feedback privately. Boost your online reputation effortlessly.",
  generator: "v0.app",
  keywords: [
    "review management",
    "reputation management",
    "customer feedback",
    "review gatekeeper",
    "online reviews",
    "Google reviews",
    "business reviews",
  ],
  authors: [{ name: "ReputationFlow" }],
  creator: "ReputationFlow",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "ReputationFlow - Enterprise Review Management",
    description: "Intelligent review management platform for businesses",
    siteName: "ReputationFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReputationFlow - Enterprise Review Management",
    description: "Intelligent review management platform for businesses",
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
