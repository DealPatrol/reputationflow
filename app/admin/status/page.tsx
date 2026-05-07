import { CheckCircle, XCircle, AlertCircle, Database, Cpu, HardDrive, Zap } from "lucide-react"

async function checkIntegrations() {
  const integrations = {
    database: !!process.env.DATABASE_URL,
    redis: !!process.env.KV_REST_API_URL,
    groq: !!process.env.GROQ_API_KEY,
    blob: !!process.env.BLOB_READ_WRITE_TOKEN,
    stripe: !!process.env.STRIPE_SECRET_KEY,
  }

  return integrations
}

async function checkDatabaseTables() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/admin/init-db`, {
      method: "GET",
      cache: "no-store",
    })
    const data = await response.json()
    return data
  } catch (error) {
    return { error: "Unable to check database status" }
  }
}

export default async function StatusPage() {
  const integrations = await checkIntegrations()
  const dbStatus = await checkDatabaseTables()

  const StatusBadge = ({ status }: { status: boolean }) =>
    status ? <CheckCircle className="text-emerald-500" size={20} /> : <XCircle className="text-red-500" size={20} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Production Status Dashboard</h1>
          <p className="text-slate-600">Monitor system health and integration status</p>
        </div>

        <div className="grid gap-6">
          {/* Integrations Status */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Zap className="text-indigo-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Integrations</h2>
                <p className="text-sm text-slate-500">Third-party service connections</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Database size={20} className="text-slate-600" />
                  <div>
                    <div className="font-medium text-slate-900">Neon Database</div>
                    <div className="text-xs text-slate-500">PostgreSQL connection</div>
                  </div>
                </div>
                <StatusBadge status={integrations.database} />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Cpu size={20} className="text-slate-600" />
                  <div>
                    <div className="font-medium text-slate-900">Upstash Redis</div>
                    <div className="text-xs text-slate-500">Caching and sessions</div>
                  </div>
                </div>
                <StatusBadge status={integrations.redis} />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-slate-600" />
                  <div>
                    <div className="font-medium text-slate-900">Groq AI</div>
                    <div className="text-xs text-slate-500">AI response generation</div>
                  </div>
                </div>
                <StatusBadge status={integrations.groq} />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <HardDrive size={20} className="text-slate-600" />
                  <div>
                    <div className="font-medium text-slate-900">Vercel Blob</div>
                    <div className="text-xs text-slate-500">QR code storage</div>
                  </div>
                </div>
                <StatusBadge status={integrations.blob} />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Database size={20} className="text-slate-600" />
                  <div>
                    <div className="font-medium text-slate-900">Stripe</div>
                    <div className="text-xs text-slate-500">Payment processing</div>
                  </div>
                </div>
                <StatusBadge status={integrations.stripe} />
              </div>
            </div>
          </div>

          {/* Database Tables Status */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Database className="text-emerald-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Database Schema</h2>
                <p className="text-sm text-slate-500">Table initialization status</p>
              </div>
            </div>

            {dbStatus.error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-medium text-red-900">Unable to check database</div>
                  <div className="text-sm text-red-700 mt-1">{dbStatus.error}</div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {dbStatus.initialized ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="text-emerald-600" size={20} />
                    <div>
                      <div className="font-medium text-emerald-900">Database Initialized</div>
                      <div className="text-sm text-emerald-700">
                        All {dbStatus.existing?.length || 0} required tables exist
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <div className="font-medium text-amber-900">Database Not Initialized</div>
                      <div className="text-sm text-amber-700 mt-1">Missing tables: {dbStatus.missing?.join(", ")}</div>
                      <a
                        href="/admin/init"
                        className="inline-block mt-3 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Initialize Database
                      </a>
                    </div>
                  </div>
                )}

                {dbStatus.existing && dbStatus.existing.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Existing Tables
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {dbStatus.existing.map((table: string) => (
                        <div key={table} className="flex items-center gap-2 p-2 bg-slate-50 rounded text-sm">
                          <CheckCircle size={14} className="text-emerald-500" />
                          <span className="font-mono text-slate-700">{table}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="/admin/init"
                className="p-4 border-2 border-slate-200 hover:border-indigo-500 rounded-lg text-center transition-all group"
              >
                <Database className="mx-auto mb-2 text-slate-600 group-hover:text-indigo-600" size={24} />
                <div className="font-medium text-slate-900">Initialize DB</div>
              </a>
              <a
                href="/dashboard"
                className="p-4 border-2 border-slate-200 hover:border-indigo-500 rounded-lg text-center transition-all group"
              >
                <Cpu className="mx-auto mb-2 text-slate-600 group-hover:text-indigo-600" size={24} />
                <div className="font-medium text-slate-900">Dashboard</div>
              </a>
              <a
                href="/"
                className="p-4 border-2 border-slate-200 hover:border-indigo-500 rounded-lg text-center transition-all group"
              >
                <Zap className="mx-auto mb-2 text-slate-600 group-hover:text-indigo-600" size={24} />
                <div className="font-medium text-slate-900">Home</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
