"use client"

import { useState, type FormEvent } from "react"
import { trackLead } from "@/lib/ads-events"
import { readStoredAttribution } from "@/lib/attribution"

export function LeadCaptureForm({ source, details }: { source: string; details: string }) {
  const [email, setEmail] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [message, setMessage] = useState("")
  const [companyWebsite, setCompanyWebsite] = useState("")

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus("saving")
    setMessage("")
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          businessName,
          source,
          details,
          companyWebsite,
          attribution: readStoredAttribution(),
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setStatus("error")
        setMessage(data.error || "Could not save that email.")
        return
      }
      setStatus("saved")
      trackLead(source)
      setMessage("Saved. We will use this only to follow up about ReputationFlow.")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Could not save that email.")
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 border-t border-slate-200 pt-4">
      <p className="text-sm font-medium text-slate-800">Email me this result</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">
        Optional. The tool works without it. We store the address so we can send the link and a note about the product.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="text-xs font-medium text-slate-600">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            autoComplete="email"
          />
        </label>
        <label className="text-xs font-medium text-slate-600">
          Business name
          <input
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
      </div>
      <input
        type="text"
        name="companyWebsite"
        value={companyWebsite}
        onChange={(event) => setCompanyWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={status === "saving"}
        className="mt-3 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 disabled:opacity-60"
      >
        {status === "saving" ? "Saving..." : "Save my email"}
      </button>
      {message && (
        <p className={`mt-2 text-sm ${status === "error" ? "text-rose-700" : "text-emerald-700"}`} role="status">
          {message}
        </p>
      )}
    </form>
  )
}
