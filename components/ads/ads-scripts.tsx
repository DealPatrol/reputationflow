import Script from "next/script"
import { adsConfig } from "@/lib/ads-config"

export function AdsScripts() {
  const config = adsConfig()
  const gtagId = config.ga4Id || config.googleAdsId
  const configs = [config.ga4Id, config.googleAdsId].filter((id): id is string => Boolean(id))

  return (
    <>
      {gtagId ? (
        <>
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gtagId)}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${configs.map((id) => `gtag('config',${JSON.stringify(id)});`).join("")}`}
          </Script>
        </>
      ) : null}
      {config.metaPixelId ? (
        <>
          <link rel="preconnect" href="https://connect.facebook.net" />
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(config.metaPixelId)});fbq('track','PageView');`}
          </Script>
        </>
      ) : null}
    </>
  )
}
