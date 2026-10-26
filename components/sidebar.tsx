"use client"

import { LayoutDashboard, Settings, LinkIcon, CreditCard, Zap, Code, Users, BarChart3, Eye } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isPremium: boolean
}

export const Sidebar = ({ activeTab, setActiveTab, isPremium }: SidebarProps) => (
  <div className="w-64 bg-[#0F172A] text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 hidden md:flex z-50">
    <div className="flex items-center border-b border-slate-800 px-6 py-5">
      <div className="flex flex-col">
        <span className="text-lg font-semibold tracking-tight leading-none">
          Reputation<span className="text-indigo-300">Flow</span>
        </span>
        <span className="mt-1 text-[11px] font-medium tracking-wide text-slate-400">Local reviews</span>
      </div>
    </div>

    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2 mt-2">Main</div>
      <SidebarItem
        icon={<LayoutDashboard size={18} />}
        label="Overview"
        active={activeTab === "dashboard"}
        onClick={() => setActiveTab("dashboard")}
      />
      <SidebarItem
        icon={<Users size={18} />}
        label="Review requests"
        active={activeTab === "campaigns"}
        onClick={() => setActiveTab("campaigns")}
      />
      <SidebarItem
        icon={<BarChart3 size={18} />}
        label="Analytics"
        active={activeTab === "analytics"}
        onClick={() => setActiveTab("analytics")}
      />
      <SidebarItem
        icon={<Eye size={18} />}
        label="Review Monitoring"
        active={activeTab === "monitoring"}
        onClick={() => setActiveTab("monitoring")}
      />

      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2 mt-6">Growth Tools</div>
      <SidebarItem
        icon={<Code size={18} />}
        label="Website Widget"
        active={activeTab === "widgets"}
        onClick={() => setActiveTab("widgets")}
      />
      <SidebarItem
        icon={<LinkIcon size={18} />}
        label="Collection Links"
        active={activeTab === "links"}
        onClick={() => setActiveTab("links")}
      />

      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2 mt-6">Settings</div>
      <SidebarItem
        icon={<Settings size={18} />}
        label="Business Profile"
        active={activeTab === "settings"}
        onClick={() => setActiveTab("settings")}
      />
      <SidebarItem
        icon={<CreditCard size={18} />}
        label="Billing & Plan"
        active={activeTab === "billing"}
        onClick={() => setActiveTab("billing")}
      />
    </nav>

    <div className="p-4 bg-[#0B1120]">
      <div
        className={`p-4 rounded-xl border ${
          isPremium ? "bg-indigo-500/10 border-indigo-500/20" : "bg-slate-800/50 border-slate-700/50"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</span>
          {isPremium ? (
            <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm shadow-indigo-500/20">
              PRO ACTIVE
            </span>
          ) : (
            <span className="bg-slate-600 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
              FREE TIER
            </span>
          )}
        </div>
        {!isPremium && (
          <button
            onClick={() => setActiveTab("billing")}
            className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-indigo-700 py-2 text-xs font-semibold text-white hover:bg-indigo-600"
          >
            <Zap size={12} fill="currentColor" />
            <span>Upgrade to Pro</span>
          </button>
        )}
      </div>
    </div>
  </div>
)

const SidebarItem = ({ icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
      active
        ? "bg-indigo-700 text-white"
        : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
    }`}
  >
    <div className={`transition-colors ${active ? "text-white" : "text-slate-500 group-hover:text-white"}`}>{icon}</div>
    <span className="font-medium text-sm">{label}</span>
  </button>
)
