"use client"

import { useState } from "react"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export function MigrateButton() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [results, setResults] = useState<string[]>([])

  const run = async () => {
    setState("loading")
    try {
      const res = await fetch("/api/admin/migrate", { method: "POST" })
      const data = await res.json()
      setResults(data.results || [])
      setState(data.success ? "success" : "error")
    } catch {
      setState("error")
    }
  }

  return (
    <div>
      <button
        onClick={run}
        disabled={state === "loading" || state === "success"}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          state === "success"
            ? "bg-emerald-100 text-emerald-700 cursor-default"
            : state === "error"
              ? "bg-red-100 text-red-700 hover:bg-red-200"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {state === "loading" && <Loader2 size={14} className="animate-spin" />}
        {state === "success" && <CheckCircle size={14} />}
        {state === "error" && <XCircle size={14} />}
        {state === "idle" && "Run Migration"}
        {state === "loading" && "Running..."}
        {state === "success" && "Migration complete"}
        {state === "error" && "Retry Migration"}
      </button>
      {results.length > 0 && (
        <ul className="mt-3 space-y-1">
          {results.map((r, i) => (
            <li key={i} className="text-xs text-slate-600 font-mono">{r}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
