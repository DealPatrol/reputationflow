"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import Checkout from "@/components/checkout"
import { PRODUCTS } from "@/lib/products"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("plan") || "pro-monthly"
  const product = PRODUCTS.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-foreground mb-4">Product not found</h1>
          <Link href="/pricing" className="text-purple-600 font-semibold hover:underline">
            Back to pricing
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-purple-600 to-red-500 p-2 rounded-lg">
              <Star className="text-white h-6 w-6" fill="currentColor" />
            </div>
            <span className="font-bold text-xl">Feedbackr</span>
          </div>
          <Link
            href="/pricing"
            className="flex items-center space-x-2 text-foreground/60 hover:text-foreground font-semibold text-sm"
          >
            <ArrowLeft size={16} />
            <span>Back to pricing</span>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-foreground mb-2">Complete Your Purchase</h1>
          <p className="text-foreground/60 font-medium">
            {product.name} - ${(product.priceInCents / 100).toFixed(2)}
            {product.mode === "subscription" ? `/${product.interval}` : ""}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-border">
          <Checkout productId={productId} />
        </div>

        <div className="mt-8 text-center text-sm text-foreground/50">
          <p>Secure payment powered by Stripe. Cancel anytime.</p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-foreground/60 font-medium">Loading checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
