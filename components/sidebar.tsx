"use client"

import { Star, LayoutDashboard, Settings, LinkIcon, CreditCard, Zap, Code, Users, BarChart3, Eye } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isPremium: boolean
}

export const Sidebar = ({ activeTab, setActiveTab, isPremium }: SidebarProps) => (
  <div className="w-64 bg-[#0F172A] text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 hidden md:flex z-50">
    <div className="p-6 flex items-center space-x-3 border-b border-slate-800/50">
      <div className="bg-gradient-to-tr from-indigo-500 to-violet-500 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
        <Star className="text-white h-5 w-5" fill="currentColor" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg tracking-tight leading-none">
          Reputation<span className="text-indigo-400">Flow</span>
        </span>
        <span className="text-[10px] text-slate-400 font-medium tracking-wider mt-1">ENTERPRISE</span>
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
        label="Share Link"
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
            className="w-full mt-2 text-xs bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-bold transition-all flex items-center justify-center space-x-1 shadow-lg shadow-indigo-900/20"
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
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
        : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
    }`}
  >
    <div className={`transition-colors ${active ? "text-white" : "text-slate-500 group-hover:text-white"}`}>{icon}</div>
    <span className="font-medium text-sm">{label}</span>
  </button>
)
