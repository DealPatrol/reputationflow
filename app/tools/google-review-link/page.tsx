import { CtaBand } from "@/components/marketing/cta-band"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { GoogleReviewLinkTool } from "@/components/tools/google-review-link-tool"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Google review link generator",
  description:
    "Free Google review link generator. Paste a Place ID and get the official write-a-review URL you can put on a QR code, receipt, or email.",
  path: "/tools/google-review-link",
  keywords: ["google review link generator", "google review link", "place id review link", "write a review url"],
})

export default function GoogleReviewLinkPage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Free tool</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Google review link generator</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Paste a Google Place ID, or a review link that already contains one. The tool builds the official write-a-review URL. It does not look your business up, and it does not require an account.
        </p>
        <div className="mt-8">
          <GoogleReviewLinkTool />
        </div>
        <div className="mt-10 space-y-4 text-sm leading-7 text-slate-600">
          <h2 className="text-xl font-semibold text-slate-950">Where to find the Place ID</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Open your Google Business Profile.</li>
            <li>Choose Ask for reviews and copy the link Google gives you.</li>
            <li>Or copy the Place ID from the Business Profile advanced settings. It usually starts with ChIJ.</li>
          </ol>
          <p>
            Short links from maps.app.goo.gl do not include the Place ID in the address, so this page cannot expand them. Use the link from Ask for reviews instead.
          </p>
        </div>
      </section>
      <CtaBand
        title="Save the link to a review page"
        body="Create a free ReputationFlow account, paste this URL, and share one page that also includes Facebook, Yelp, and a private note."
      />
    </MarketingShell>
  )
}
