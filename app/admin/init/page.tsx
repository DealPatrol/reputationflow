"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertTriangle, Loader2, Database } from "lucide-react"

export default function DatabaseInitPage() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [initializing, setInitializing] = useState(false)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    checkStatus()
  }, [])

  const checkStatus = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/init-db")
      const data = await res.json()
      setStatus(data)
    } catch (error) {
      console.error("Error checking status:", error)
    }
    setLoading(false)
  }

  const initialize = async () => {
    setInitializing(true)
    setResult(null)
    try {
      const res = await fetch("/api/admin/init-db", { method: "POST" })
      const data = await res.json()
      setResult(data)
      if (data.success) {
        await checkStatus()
      }
    } catch (error: any) {
      setResult({ success: false, error: error.message })
    }
    setInitializing(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-8">
            <Database size={32} className="text-indigo-600" />
            <h1 className="text-3xl font-bold text-slate-900">Database Initialization</h1>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-indigo-600" />
            </div>
          ) : (
            <>
              {/* Status */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Current Status</h2>
                <div className="bg-slate-50 rounded-lg p-6">
                  {status?.initialized ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle size={20} />
                      <span className="font-medium">Database is initialized</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-amber-600">
                      <AlertTriangle size={20} />
                      <span className="font-medium">Database needs initialization</span>
                    </div>
                  )}

                  {status?.existing && status.existing.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-slate-600 mb-2">Existing tables:</p>
                      <div className="flex flex-wrap gap-2">
                        {status.existing.map((table: string) => (
                          <span
                            key={table}
                            className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {table}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {status?.missing && status.missing.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-slate-600 mb-2">Missing tables:</p>
                      <div className="flex flex-wrap gap-2">
                        {status.missing.map((table: string) => (
                          <span
                            key={table}
                            className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {table}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {!status?.initialized && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-slate-800 mb-4">Initialize Database</h2>
                  <p className="text-slate-600 mb-4">
                    This will create all required tables for Feedbackr. Make sure you have the correct database
                    connection configured.
                  </p>
                  <button
                    onClick={initialize}
                    disabled={initializing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {initializing ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Initializing...</span>
                      </>
                    ) : (
                      <>
                        <Database size={20} />
                        <span>Initialize Database</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Result */}
              {result && (
                <div
                  className={`p-6 rounded-lg ${result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                >
                  <div className="flex items-start space-x-3">
                    {result.success ? (
                      <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle size={24} className="text-red-600 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <h3 className={`font-bold mb-2 ${result.success ? "text-green-800" : "text-red-800"}`}>
                        {result.success ? "Success!" : "Error"}
                      </h3>
                      <p className={result.success ? "text-green-700" : "text-red-700"}>
                        {result.message || result.error}
                      </p>
                      {result.hint && <p className="text-sm text-red-600 mt-2">{result.hint}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Manual Instructions */}
              <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-3">Manual Initialization</h3>
                <p className="text-sm text-slate-600 mb-3">
                  If automatic initialization fails, you can run the SQL script manually in your Neon database console:
                </p>
                <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2">
                  <li>Go to your Neon project dashboard</li>
                  <li>Open the SQL Editor</li>
                  <li>
                    Copy and paste the contents of{" "}
                    <code className="bg-slate-200 px-2 py-1 rounded text-xs">scripts/initialize-production.sql</code>
                  </li>
                  <li>Execute the script</li>
                  <li>Refresh this page to check status</li>
                </ol>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
