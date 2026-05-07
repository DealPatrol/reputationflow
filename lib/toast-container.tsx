"use client"

import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export type ToastType = "success" | "error" | "info"

export interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContainerProps {
  toasts: Toast[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "bg-white border rounded-lg shadow-lg p-4 flex items-start justify-between gap-3 animate-in slide-in-from-top duration-300",
            {
              "border-emerald-200 bg-emerald-50": toast.type === "success",
              "border-red-200 bg-red-50": toast.type === "error",
              "border-blue-200 bg-blue-50": toast.type === "info",
            },
          )}
        >
          <p
            className={cn("text-sm font-medium flex-1", {
              "text-emerald-800": toast.type === "success",
              "text-red-800": toast.type === "error",
              "text-blue-800": toast.type === "info",
            })}
          >
            {toast.message}
          </p>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
