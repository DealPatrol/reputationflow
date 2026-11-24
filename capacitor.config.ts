import type { CapacitorConfig } from "@capacitor/cli"

/**
 * ReputationFlow iOS app (Capacitor 8, Swift Package Manager).
 *
 * The signed-in dashboard is the live Next.js app (it needs the server: accounts, feedback, email
 * requests). Native value lives in the binary: the ReputationFlowNative Swift plugin (StoreKit 2,
 * Face ID, CoreImage QR, share sheet), local reminders, Preferences storage, and the bundled offline
 * Counter Kit in ios-offline/ that opens whenever the site cannot be reached (server.errorPath).
 */
const config: CapacitorConfig = {
  appId: "com.colecollins.reputationflow",
  appName: "ReputationFlow",
  webDir: "ios-offline",
  // The web app detects the iOS app with this token (lib/native/platform.ts) to hide web checkout,
  // ad pixels, and marketing pages. Keep in sync with NATIVE_IOS_UA_TOKEN.
  appendUserAgent: "ReputationFlowIOS/1.0",
  backgroundColor: "#0F172A",
  server: {
    // Origin only: Capacitor treats any URL that starts with server.url as in-app navigation.
    url: "https://tryreputationflow.com",
    appStartPath: "dashboard",
    errorPath: "index.html",
  },
  ios: {
    scheme: "ReputationFlow",
    contentInset: "always",
    backgroundColor: "#0F172A",
    preferredContentMode: "mobile",
    limitsNavigationsToAppBoundDomains: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: "#F7F9FC",
      showSpinner: false,
    },
    LocalNotifications: { iconColor: "#4F46E5" },
  },
}

export default config
