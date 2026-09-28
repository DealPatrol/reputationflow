import { CtaBand } from "@/components/marketing/cta-band"
import { MarketingShell } from "@/components/marketing/marketing-shell"
import { QrCodeTool } from "@/components/tools/qr-code-tool"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "QR code generator for review links",
  description:
    "Free QR code generator for a Google review link or any https URL. Download a PNG for a counter card, receipt, or window sign.",
  path: "/tools/qr-code",
  keywords: ["qr code generator", "google review qr code", "review qr code"],
})

export default function QrCodePage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-indigo-700">Free tool</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">QR code generator</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Paste a review link and download a QR code. The image is created in your browser. Nothing is uploaded to generate it.
        </p>
        <div className="mt-8">
          <QrCodeTool />
        </div>
      </section>
      <CtaBand
        title="Use the QR code on your ReputationFlow page"
        body="A free account hosts the customer page, so the QR code can include Google, Facebook, Yelp, and a private note."
      />
    </MarketingShell>
  )
}
