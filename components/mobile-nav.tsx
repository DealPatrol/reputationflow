"use client"

import {
  Star,
  LayoutDashboard,
  Users,
  Menu,
  X,
  Settings,
  Code,
  LinkIcon,
  CreditCard,
  BarChart3,
  Eye,
} from "lucide-react"
import { useState } from "react"

interface MobileNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isPremium?: boolean
}

export const MobileNav = ({ activeTab, setActiveTab, isPremium }: MobileNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "campaigns", label: "Campaigns", icon: <Users size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { id: "monitoring", label: "Monitoring", icon: <Eye size={20} /> },
    { id: "widgets", label: "Widget", icon: <Code size={20} /> },
    { id: "links", label: "Links", icon: <LinkIcon size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    { id: "billing", label: "Billing", icon: <CreditCard size={20} /> },
  ]

  const handleNavClick = (tab: string) => {
    setActiveTab(tab)
    setIsMenuOpen(false)
  }

  return (
    <>
      <div className="md:hidden bg-[#0F172A] text-white p-4 flex justify-between items-center sticky top-0 z-50 border-b border-slate-800 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-tr from-indigo-500 to-violet-500 p-1.5 rounded-lg shadow-sm">
            <Star size={16} fill="currentColor" />
          </div>
          <span className="font-bold text-base">ReputationFlow</span>
        </div>
        <div className="flex items-center space-x-2">
          {!isPremium && (
            <button
              onClick={() => handleNavClick("billing")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
            >
              Upgrade
            </button>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="md:hidden fixed top-[73px] right-0 bottom-0 w-64 bg-[#0F172A] border-l border-slate-800 z-40 animate-in slide-in-from-right duration-300">
            <nav className="p-4 space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Menu</div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <div className={activeTab === item.id ? "text-white" : "text-slate-500"}>{item.icon}</div>
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
              <div
                className={`p-3 rounded-lg border ${
                  isPremium ? "bg-indigo-500/10 border-indigo-500/20" : "bg-slate-800/50 border-slate-700/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</span>
                  {isPremium ? (
                    <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
                  ) : (
                    <span className="bg-slate-600 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      FREE
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
