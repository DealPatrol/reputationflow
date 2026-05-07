"use client"

import { useState } from "react"
import { Star, Copy, Check } from "lucide-react"

interface WidgetBuilderViewProps {
  businessName: string
  isPremium: boolean
}

export const WidgetBuilderView = ({ businessName, isPremium }: WidgetBuilderViewProps) => {
  const [theme, setTheme] = useState("light")
  const [layout, setLayout] = useState("grid")
  const [copied, setCopied] = useState(false)

  const reviews = [
    { id: 1, name: "Sarah Jenkins", text: "Absolutely amazing service! Highly recommend.", stars: 5 },
    { id: 2, name: "Mike T.", text: "Best local business I have found in years.", stars: 5 },
    { id: 3, name: "Emily R.", text: "Professional, timely, and great value.", stars: 5 },
  ]

  const copyCode = () => {
    const code = `<script src="https://reputationflow.app/widget.js?id=123"></script>`
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="max-w-5xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Website Widget</h1>
        <p className="text-slate-500">Showcase your 5-star reviews on your website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit order-2 lg:order-1">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
            <span>Customize</span>
            {!isPremium && (
              <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">FREE</span>
            )}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Layout</label>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setLayout("grid")}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                    layout === "grid" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout("carousel")}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                    layout === "carousel" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
                  }`}
                >
                  Carousel
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Theme</label>
              <div className="flex space-x-3">
                <button
                  onClick={() => setTheme("light")}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    theme === "light"
                      ? "border-indigo-600 bg-white ring-4 ring-indigo-100"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                  title="Light theme"
                />
                <button
                  onClick={() => setTheme("dark")}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    theme === "dark"
                      ? "border-indigo-600 bg-slate-900 ring-4 ring-indigo-100"
                      : "border-slate-200 bg-slate-900 hover:border-slate-300"
                  }`}
                  title="Dark theme"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Embed Code</label>
                <button
                  onClick={copyCode}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    copied ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={12} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 relative">
                <code className="text-xs text-indigo-300 font-mono block break-all leading-relaxed">
                  &lt;script src=&quot;https://reputationflow.app/widget.js?id=123&quot;&gt;&lt;/script&gt;
                </code>
              </div>
              <p className="text-xs text-slate-500 mt-2">Paste this code before the closing &lt;/body&gt; tag</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 md:p-8 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-wider bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm">
              Live Preview
            </div>

            <div
              className={`${
                theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-slate-900"
              } p-6 rounded-xl shadow-2xl w-full max-w-lg transition-all duration-300`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h4 className="font-bold text-lg mb-1">{businessName || "Your Business"}</h4>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="G" />
                  <span>4.9 Rating</span>
                </div>
              </div>

              <div
                className={`${
                  layout === "grid" ? "grid grid-cols-1 gap-3" : "flex space-x-3 overflow-x-auto pb-2 -mx-2 px-2"
                }`}
              >
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className={`${
                      theme === "dark" ? "bg-slate-800" : "bg-slate-50"
                    } p-4 rounded-lg text-sm ${layout === "carousel" ? "min-w-[250px] flex-shrink-0" : ""}`}
                  >
                    <p
                      className={`mb-3 italic leading-relaxed ${
                        theme === "dark" ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      &quot;{r.text}&quot;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs opacity-75">- {r.name}</span>
                      <div className="flex text-amber-400">
                        {[...Array(r.stars)].map((_, i) => (
                          <Star key={i} size={10} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
