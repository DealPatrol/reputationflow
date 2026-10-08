"use client"

import { useState, type FormEvent } from "react"
import { templatePackText } from "@/lib/review-request-templates"

function downloadTemplatePack() {
  const blob = new Blob([templatePackText()], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = "google-review-request-templates.txt"
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function TemplatePackForm() {
  const [email, setEmail] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [companyWebsite, setCompanyWebsite] = useState("")
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [message, setMessage] = useState("")

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
          source: "review-templates",
          details: "google-review-request-templates",
          companyWebsite,
        }),
      })
      const data = await response.json()
      if (response.status === 503) {
        setStatus("error")
        setMessage("This environment cannot store the email. Download the file below. It does not need an account.")
        return
      }
      if (!response.ok) {
        setStatus("error")
        setMessage(typeof data.error === "string" ? data.error : "Could not save that email.")
        return
      }
      setStatus("saved")
      setMessage(
        data.emailed
          ? "Saved. The pack is on its way to your inbox. You can download the same file below."
          : "Saved. Outbound email is not configured on this server, so download the file below. We stored the address with the template-pack signups.",
      )
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Could not save that email. The download below still works.")
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-lg font-semibold text-slate-950">Download or email the pack</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        The file is the same scripts on this page, as plain text. The download does not need an email. If you leave an address, we store it in the existing leads list and email the pack when outbound email is configured. There is no separate newsletter.
      </p>
      <button
        type="button"
        onClick={downloadTemplatePack}
        className="mt-4 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white"
      >
        Download the templates
      </button>
      <form onSubmit={submit} className="mt-6 border-t border-slate-200 pt-4">
        <p className="text-sm font-medium text-slate-800">Email me the pack</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <label className="text-xs font-medium text-slate-600">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              autoComplete="email"
            />
          </label>
          <label className="text-xs font-medium text-slate-600">
            Business name
            <input
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
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
          className="mt-3 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 disabled:opacity-60"
        >
          {status === "saving" ? "Saving..." : "Email me the pack"}
        </button>
        {message && (
          <p className={`mt-2 text-sm ${status === "error" ? "text-rose-700" : "text-emerald-700"}`} role="status">
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
