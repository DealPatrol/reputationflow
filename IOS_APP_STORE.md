# ReputationFlow for iPhone — App Store checklist

The iPhone app is a Capacitor 8 shell around the live ReputationFlow product at https://tryreputationflow.com, plus native iOS features and a **bundled offline Counter Kit** (QR code, request scripts, reply templates) that works with no signal. The web app, its Stripe billing, and every public page are unchanged for browsers: everything iOS-specific is gated by `isNativeIos()` (`lib/native/platform.ts`) and the `ReputationFlowIOS` user-agent token.

## Identity

| Field | Value |
|---|---|
| App name | ReputationFlow: Get More Reviews (30 chars max) |
| Subtitle | Review requests & QR for shops |
| Bundle ID | `com.colecollins.reputationflow` |
| URL scheme | `reputationflow://` (`dashboard`, `counter`, `links`, `campaigns`, `analytics`, `monitoring`, `settings`, `billing`, `widgets`) |
| SKU | `reputationflow-ios-001` |
| Version / build | 1.0.0 / 1 (`MARKETING_VERSION` / `CURRENT_PROJECT_VERSION`) |
| Primary category | Business · secondary: Productivity |
| Devices | iPhone only, portrait, iOS 15+ |
| Age rating | 4+ (business tool; customer feedback is private to the account owner, not public UGC) |
| Price | Free download; optional auto-renewing subscription |
| Subscriptions | Group **ReputationFlow Professional**: `com.colecollins.reputationflow.pro.monthly` (suggested $19.99/mo) and `com.colecollins.reputationflow.pro.yearly` (suggested $199.99/yr), same level |
| Encryption export | `ITSAppUsesNonExemptEncryption = NO` already in Info.plist |

## Architecture (what ships in the binary)

- `capacitor.config.ts` — `server.url = https://tryreputationflow.com`, `appStartPath = dashboard`, `errorPath = index.html` (the bundled offline kit in `ios-offline/`), `appendUserAgent = ReputationFlowIOS/1.0`. Same-origin cookies (`rf_session`, `SameSite=Strict`) keep working because pages load from the real origin; off-origin links open in Safari.
- An inline `<head>` boot script (`nativeBootScript()`) adds `html.native-ios` before paint and sends marketing/SEO pages back to `/dashboard`, so the app is never a brochure site. `.web-only` (marketing header/footer, ads scripts, Stripe billing, web banners) is hidden; `.native-only` is shown.
- `components/native/native-shell.tsx` — route guard, deep links (`appUrlOpen`, cold-start `getLaunchUrl`), notification taps, haptics, status bar, Face ID lock overlay, download → share-sheet bridge (WKWebView ignores `<a download>`), StoreKit `transactionsUpdated` → server sync.
- `ios/App/App/ReputationFlowNativePlugin.swift` (registered in `ReputationFlowViewController.swift`) — StoreKit 2, LocalAuthentication, CoreImage QR, `UIActivityViewController`.
- `ios/App/App/SceneDelegate.swift` — app-switcher privacy cover.
- Native plugins: `@capacitor/app`, `haptics`, `local-notifications`, `preferences`, `splash-screen`, `status-bar` (all free, Capacitor 8, SPM — no CocoaPods).

## Why this should pass App Review

| Guideline | How ReputationFlow meets it |
|---|---|
| **4.2 Minimum Functionality** | Not a bookmark: a native **Counter Kit** tab (on-device CoreImage QR, full-screen "Show customer" QR, iOS share sheet for link + QR image, copy/share SMS, email and in-person scripts, reply templates) that is cached in native Preferences and also available fully offline from the bundled `ios-offline/` page; daily/weekly local-notification reminders (customer data is never put in notification text); Face ID / passcode app lock; app-switcher privacy cover; haptics; native status bar; `reputationflow://` deep links; StoreKit 2 billing with Restore Purchases. Marketing pages, ads and web banners are suppressed in the app. |
| **3.1.1 In-App Purchase** | In the app, Professional is sold **only** through StoreKit 2 (own Swift plugin, no RevenueCat). Restore Purchases and Manage Subscription (Apple sheet) are on the Plan tab. Stripe checkout and portal routes return 403 for the iOS user agent, and no Stripe button, price, or "buy on the web" text renders in the app. Accounts that already pay on the web see "Purchased outside the app" with no link (allowed: 3.1.3(b) multiplatform). The web keeps Stripe. |
| **3.1.2 Subscriptions** | Price, period, auto-renew disclosure, and Terms + Privacy links are shown next to the purchase buttons. Terms include Apple's Standard EULA link. |
| **4.8 Sign in with Apple** | Not required: the only login is email + password; there is no Google/Facebook/other third-party login. |
| **5.1.1(v) Account deletion** | Settings → Account → **Delete account** (password + typed `DELETE`) permanently deletes the user, business, feedback, requests, campaigns and leads (`POST /api/auth/delete-account`), cancels any Stripe subscription first, and opens Apple's Manage Subscriptions sheet if an App Store subscription exists (Apple subscriptions can only be cancelled by the user). Sign out is also there. |
| **5.1.2 Privacy** | `PrivacyInfo.xcprivacy` (no tracking; UserDefaults reason CA92.1), Face ID usage string, Privacy Policy section "6a. The ReputationFlow iPhone app". No ad/attribution SDKs run in the app. |
| **2.3 Accurate metadata** | Screenshots must come from the iPhone build. Don't mention Android, "web app" or Stripe in metadata. |

## Guideline 2.1 completeness — known gaps (be honest with yourself before submitting)

Fixed in this branch: no sign-out anywhere (added), no account deletion (added), CSV/QR downloads were dead in WKWebView (bridged to the share sheet), "Print QR" used `window.open` (hidden in the app), onboarding linked to a marketing page (hidden in the app).

Still open:
1. **No "forgot password" / reset flow.** Reviewers rarely test it, but a user who forgets a password is locked out. Recommended before or soon after 1.0.
2. **Demo account required.** Create a real account on production (not the keyless local demo) with a business, a few feedback entries and requests, and put it in Review Notes. Do not delete it.
3. **Email sending** needs `RESEND_API_KEY` and a verified `EMAIL_FROM` in production, or "Send request by email" fails in review.
4. **QR fallback** in `components/qr-code-generator.tsx` calls `api.qrserver.com` when local generation fails; the Counter Kit uses on-device QR only.
5. **Hybrid risk.** The main screens load from the live site. The native features above and the offline kit are the 4.2 mitigation; if Apple rejects under 4.2 anyway, reply with the Review Notes below and a screen recording of the offline Counter Kit, Face ID lock, reminders and StoreKit sheet.
6. Swift was reviewed against Capacitor 8.6 sources but **not compiled on this Linux box** — first Xcode build is the real check.

## One-time production setup (do before submitting)

1. `npm run migrate` against the production `DATABASE_URL` (adds `subscriptions.billing_source` and `app_store_subscriptions`; idempotent). Until then the `/api/iap/apple/*` routes return 500; web and Stripe are unaffected.
2. Deploy `main` after merging so the live site contains the native gating, delete-account, and IAP routes — **the app loads the live site**, so the build in review depends on this deploy.

## App Store Connect steps

1. Certificates, IDs & Profiles → Identifiers → App ID `com.colecollins.reputationflow` with capability **In-App Purchase** (no other capabilities needed; Sign in with Apple is not used).
2. Agreements, Tax, and Banking → accept the **Paid Apps** agreement, add bank + tax. Enroll in the **App Store Small Business Program** (15% commission).
3. My Apps → New App (iOS, name above, bundle ID, SKU).
4. Monetization → Subscriptions → group **ReputationFlow Professional** → add `…pro.monthly` (1 month) and `…pro.yearly` (1 year) with display names, descriptions, prices, and a review screenshot of the Plan tab. Optional free trial as an introductory offer (the app shows it automatically when eligible).
5. App Information → **App Store Server Notifications** → Version 2 → Production and Sandbox URL `https://tryreputationflow.com/api/iap/apple/notifications`.
6. App Privacy (nutrition label): see below. Privacy Policy URL `https://tryreputationflow.com/privacy`; Support URL `https://tryreputationflow.com/contact`.
7. Attach both subscriptions to the first version before submitting.

## App Privacy answers

| Data type | Collected | Linked to user | Tracking | Purpose |
|---|---|---|---|---|
| Contact info → Email address | Yes | Yes | No | App Functionality |
| User content → Other (customer feedback, business details) | Yes | Yes | No | App Functionality |
| Purchases → Purchase history | Yes | Yes | No | App Functionality |
| Usage data → Product interaction | Yes | No | No | Analytics |

"Do you or your third-party partners use data for tracking?" → **No**. (Ads/attribution scripts are web-only and do not load in the app.)

## Metadata draft

**Promotional text:** Turn happy customers into Google reviews — QR at the counter, a text in one tap, and private feedback on the same page.

**Description:**
ReputationFlow helps local businesses get more Google reviews without chasing customers.
• Counter Kit: show a QR code on your phone, or share your review link and QR image by Messages, Mail or AirDrop — works even with no signal.
• Ready-to-send scripts for text, email and in person, plus reply templates for good and bad reviews.
• One review page with Google, Facebook and Yelp buttons for every customer, plus optional private feedback to you.
• Daily or weekly reminders to ask, Face ID lock, and analytics on requests and ratings.
Professional (optional subscription): email review requests, full feedback history, AI-assisted response drafts, extra location links and CSV export. Payment is charged to your Apple ID and renews automatically unless cancelled at least 24 hours before the end of the period. Manage in Settings → Apple ID → Subscriptions. Terms: https://tryreputationflow.com/terms · Privacy: https://tryreputationflow.com/privacy

**Keywords:** google reviews,review request,qr code,reputation,feedback,small business,customer reviews,ratings

**Screenshots (6.9" and 6.5" required):** Dashboard, Counter Kit with QR, Show-customer full-screen QR, share sheet, Feedback inbox, Plan tab (StoreKit prices).

## App Review notes (paste into App Store Connect)

> Sign in with the demo account: **email** `<demo email>` / **password** `<demo password>`.
> ReputationFlow is a tool for local businesses to request Google reviews from customers. Native features: Counter Kit tab (on-device QR via CoreImage, full-screen QR to show a customer, iOS share sheet for the link and QR image), offline mode (enable Airplane Mode and relaunch — the cached Counter Kit still works), daily/weekly reminder notifications (Settings → On this iPhone → Review check-in reminders), Face ID app lock (Settings → On this iPhone → Lock with Face ID), and `reputationflow://counter` deep links.
> Professional is sold only via In-App Purchase (Plan tab), with Restore Purchases and Manage Subscription. Accounts can be deleted in Settings → Account → Delete account. The app uses email/password only, so Sign in with Apple is not required.

## Build & ship (free path)

1. `npm ci && npm run ios:sync` (runs `cap sync ios`; copies `ios-offline/` and the config into the project), then `npm run ios:open`.
2. In Xcode: select team, confirm bundle ID, signing "Automatically manage". The shared **App** scheme uses `App/ReputationFlow.storekit` for local purchase tests.
3. **Xcode Cloud** (25 free compute hours/month with the Developer Program): Product → Xcode Cloud → Create Workflow on the `App` scheme, Archive → TestFlight. `ios/App/ci_scripts/ci_post_clone.sh` installs Node 22, runs `npm ci`, type-check, tests, and `cap sync ios`.
4. TestFlight: test purchase, restore, and refund with a **Sandbox** Apple ID. Note: purchases made against the local `.storekit` file are not signed by Apple's root, so the server sync correctly rejects them — use TestFlight sandbox for the end-to-end entitlement check.
5. Submit for review with the notes above.

## Developer notes

- Detect the app with `isNativeIos()` (client) or `isNativeIosUserAgent(ua)` (server). Wrap web-only UI in `<WebOnly>` or `className="web-only"`.
- `NATIVE_ALLOWED_PREFIXES` in `lib/native/platform.ts` lists the pages allowed in the app; anything else redirects to `/dashboard`.
- Purchases: the app sets `appAccountToken` = user id; `/api/iap/apple/sync` verifies each JWS (x5c chain pinned to Apple Root CA – G3, Apple marker OIDs, ES256) in `lib/app-store.ts` and never applies a purchase made for another account. An active Stripe subscription is never downgraded by App Store events; App Store expiry downgrades only `billing_source = 'app_store'` plans.
- Assets: `python3 scripts/ios-assets.py` regenerates the opaque 1024 icon and splash from `public/icon-512.png`.
- Tests: `tests/native/*` (platform, Counter Kit, JWS verification with a generated chain) and `tests/routes/{delete-account,iap-sync,stripe-native-guard}.test.ts`.
- Do not add review gating (showing review buttons only to happy customers); every customer sees every review button.
