export interface AdsConfig {
  metaPixelId: string | null
  ga4Id: string | null
  googleAdsId: string | null
  leadLabel: string | null
  signupLabel: string | null
  purchaseLabel: string | null
}

function matching(value: string | undefined, pattern: RegExp) {
  const trimmed = value?.trim()
  if (!trimmed || !pattern.test(trimmed)) return null
  return trimmed
}

export function adsConfig(): AdsConfig {
  return {
    metaPixelId: matching(process.env.NEXT_PUBLIC_META_PIXEL_ID, /^\d{5,20}$/),
    ga4Id: matching(process.env.NEXT_PUBLIC_GA4_ID, /^G-[A-Z0-9]+$/),
    googleAdsId: matching(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID, /^AW-\d+$/),
    leadLabel: matching(process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL, /^[A-Za-z0-9_-]{1,40}$/),
    signupLabel: matching(process.env.NEXT_PUBLIC_GOOGLE_ADS_SIGNUP_LABEL, /^[A-Za-z0-9_-]{1,40}$/),
    purchaseLabel: matching(process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL, /^[A-Za-z0-9_-]{1,40}$/),
  }
}

export function googleAdsSendTo(adsId: string | null, label: string | null) {
  if (!adsId || !label) return null
  return `${adsId}/${label}`
}
