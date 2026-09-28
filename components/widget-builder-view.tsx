"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { getShareBaseUrl } from "@/lib/site"

interface WidgetBuilderViewProps {
  businessId: string | number
  businessName: string
}

export const WidgetBuilderView = ({ businessId, businessName }: WidgetBuilderViewProps) => {
  const [copied, setCopied] = useState(false)
  const embedUrl = `${getShareBaseUrl()}/embed/${businessId}`
  const code = `<iframe src="${embedUrl}" title="Leave a review for ${businessName || "this business"}" style="width:100%;max-width:420px;height:280px;border:0;"></iframe>`

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Website widget</h1>
        <p className="text-slate-500">Embed a button that opens your review page. It does not display sample reviews or a rating you have not earned.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Embed code</h2>
            <button type="button" onClick={copyCode} className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold">
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs text-indigo-100">{code}</pre>
          <p className="mt-3 text-xs text-slate-500">Paste this where you want the button. Visitors go to the same review page as your QR code.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Preview</p>
          <iframe title={`Review widget for ${businessName || "your business"}`} src={`/embed/${businessId}`} className="h-72 w-full rounded-xl border border-slate-200 bg-white" />
        </div>
      </div>
    </div>
  )
}
