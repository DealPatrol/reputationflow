"use client"

import type React from "react"

// Simple stub file - all toast functionality is in lib/use-toast.ts
export type ToastProps = Record<string, never>
export type ToastActionElement = never

export const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const ToastViewport = () => null
export const Toast = () => null
export const ToastTitle = () => null
export const ToastDescription = () => null
export const ToastClose = () => null
export const ToastAction = () => null
