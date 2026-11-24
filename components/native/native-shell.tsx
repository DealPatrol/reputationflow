"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import {
  haptic,
  LOCK_PREF_KEY,
  nativePlugin,
  prefGet,
  refreshEntitlements,
  setStatusBarTheme,
  shareDownload,
  syncTransactionsToServer,
} from "@/lib/native/bridge"
import { deepLinkToPath, isNativeAllowedPath, isNativeIos, NATIVE_HOME_PATH, NATIVE_HTML_CLASS } from "@/lib/native/platform"

const DOWNLOAD_HREF = /^(data:|blob:|https?:)/

/**
 * Native iOS integration, mounted once in the root layout. Renders nothing and does nothing on
 * the website. In the app it: keeps the WebView on in-app pages, routes reputationflow:// deep
 * links and reminder taps, hides the splash, themes the status bar, adds haptics, turns
 * <a download> into the share sheet, syncs StoreKit entitlements, and runs the Face ID lock.
 */
export function NativeShell() {
  const router = useRouter()
  const pathname = usePathname()
  const [native, setNative] = useState(false)
  const [locked, setLocked] = useState(false)
  const [lockMessage, setLockMessage] = useState("")
  const lockEnabled = useRef(false)
  const authenticating = useRef(false)
  const unlockRef = useRef<() => Promise<void>>(async () => {})

  useEffect(() => {
    if (!isNativeIos()) return
    setNative(true)
    document.documentElement.classList.add(NATIVE_HTML_CLASS)
  }, [])

  // Stay inside the app's own pages (marketing and pricing pages carry web checkout links).
  useEffect(() => {
    if (!native) return
    if (!isNativeAllowedPath(pathname || "/")) router.replace(NATIVE_HOME_PATH)
    // The WebView sits below the status bar on a dark (#0F172A) background, so use light status bar text.
    setStatusBarTheme("dark")
  }, [native, pathname, router])

  useEffect(() => {
    if (!native) return
    const cleanups: Array<() => void> = []
    let disposed = false

    const unlock = async () => {
      if (authenticating.current) return
      authenticating.current = true
      try {
        const plugin = await nativePlugin()
        const result = await plugin.authenticate({ reason: "Unlock ReputationFlow" })
        if (result.ok) {
          setLocked(false)
          setLockMessage("")
          haptic("success")
        } else {
          setLockMessage("Not unlocked. Tap Unlock to try again.")
        }
      } catch {
        setLockMessage("Face ID is not available. Use your device passcode.")
      } finally {
        authenticating.current = false
      }
    }
    unlockRef.current = unlock

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      const anchor = target?.closest?.("a[download]") as HTMLAnchorElement | null
      if (anchor && DOWNLOAD_HREF.test(anchor.href)) {
        event.preventDefault()
        void shareDownload(anchor.href, anchor.getAttribute("download") || "").catch(() => {})
        return
      }
      if (target?.closest?.("button, [role=button], a")) haptic()
    }
    document.addEventListener("click", onClick, true)
    cleanups.push(() => document.removeEventListener("click", onClick, true))

    // Programmatic downloads (link.click() on a detached anchor) never reach the document listener.
    const originalClick = HTMLAnchorElement.prototype.click
    HTMLAnchorElement.prototype.click = function patchedClick(this: HTMLAnchorElement) {
      if (this.hasAttribute("download") && DOWNLOAD_HREF.test(this.href)) {
        void shareDownload(this.href, this.getAttribute("download") || "").catch(() => {})
        return
      }
      return originalClick.call(this)
    }
    cleanups.push(() => {
      HTMLAnchorElement.prototype.click = originalClick
    })

    void (async () => {
      const [{ App }, { SplashScreen }, { LocalNotifications }] = await Promise.all([
        import("@capacitor/app"),
        import("@capacitor/splash-screen"),
        import("@capacitor/local-notifications"),
      ])
      if (disposed) return
      lockEnabled.current = (await prefGet(LOCK_PREF_KEY)) === "true"
      if (lockEnabled.current) {
        setLocked(true)
        void unlock()
      }

      const go = (raw: string | undefined | null) => {
        const path = deepLinkToPath(raw ?? null)
        if (path) router.push(path)
      }
      const urlHandle = await App.addListener("appUrlOpen", ({ url }) => go(url))
      const stateHandle = await App.addListener("appStateChange", ({ isActive }) => {
        if (!isActive && lockEnabled.current) setLocked(true)
        if (isActive) void refreshEntitlements().catch(() => {})
      })
      const notificationHandle = await LocalNotifications.addListener("localNotificationActionPerformed", (action) => {
        const path = String(action.notification.extra?.path ?? "")
        if (path.startsWith("/dashboard")) router.push(path)
      })
      cleanups.push(() => void urlHandle.remove(), () => void stateHandle.remove(), () => void notificationHandle.remove())

      const launch = await App.getLaunchUrl().catch(() => undefined)
      if (launch?.url) go(launch.url)

      try {
        const plugin = await nativePlugin()
        const updates = await plugin.addListener("transactionsUpdated", ({ transactions }) => {
          void syncTransactionsToServer(transactions).catch(() => {})
        })
        cleanups.push(() => void updates.remove())
        void refreshEntitlements().catch(() => {})
      } catch {
        /* StoreKit unavailable (e.g. simulator without a StoreKit config); the free plan still works */
      }
      await SplashScreen.hide().catch(() => {})
    })()

    const onLockChange = (event: Event) => {
      lockEnabled.current = Boolean((event as CustomEvent<boolean>).detail)
    }
    window.addEventListener("rf-lock-changed", onLockChange)
    cleanups.push(() => window.removeEventListener("rf-lock-changed", onLockChange))

    return () => {
      disposed = true
      cleanups.forEach((fn) => fn())
    }
  }, [native, router])

  if (!native || !locked) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ReputationFlow is locked"
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#0F172A] px-8 text-center text-white"
    >
      <Lock className="h-10 w-10 text-indigo-300" aria-hidden="true" />
      <p className="mt-4 text-xl font-semibold">ReputationFlow is locked</p>
      <p className="mt-2 text-sm text-slate-300">Customer feedback stays hidden until you unlock.</p>
      <button
        type="button"
        onClick={() => void unlockRef.current()}
        className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white"
      >
        Unlock
      </button>
      {lockMessage && (
        <p className="mt-3 text-sm text-slate-300" role="status">
          {lockMessage}
        </p>
      )}
    </div>
  )
}
