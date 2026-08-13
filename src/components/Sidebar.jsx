import React from 'react';
import { 
  FiHome, 
  FiFolder, 
  FiGithub, 
  FiCpu, 
  FiBookOpen, 
  FiCheckSquare, 
  FiSettings, 
  FiChevronLeft, 
  FiChevronRight,
  FiX
} from 'react-icons/fi';
import { profileData } from '../data/dashboard';

export default function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'projects', label: 'Projects', icon: FiFolder },
    { id: 'github', label: 'GitHub', icon: FiGithub },
    { id: 'skills', label: 'Skills', icon: FiCpu },
    { id: 'learning', label: 'Learning', icon: FiBookOpen },
    { id: 'tasks', label: 'Tasks', icon: FiCheckSquare },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#0b101d] border-r border-white/10 transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header Branding */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold shrink-0">
              SG
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-white tracking-wide truncate">Somya Gupta</span>
                <span className="text-xs text-zinc-400 truncate">Dev Workspace</span>
              </div>
            )}
          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle Sidebar"
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            {collapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close Mobile Sidebar"
            className="lg:hidden text-zinc-400 hover:text-white p-1"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`
                  w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold shadow-sm shadow-emerald-500/10' 
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                  }
                  ${collapsed ? 'justify-center px-0' : ''}
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`size-5 shrink-0 transition-colors ${isActive ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-zinc-200'}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
                
                {/* Subtle active indicator pill when collapsed */}
                {collapsed && isActive && (
                  <span className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Badge at bottom */}
        <div className="p-3 border-t border-white/10">
          <div className={`flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] border border-white/5 ${collapsed ? 'justify-center' : ''}`}>
            <img 
              src={profileData.avatarUrl} 
              alt={profileData.name}
              className="w-8 h-8 rounded-full border border-emerald-500/30 object-cover shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://ui-avatars.com/api/?name=Somya+Gupta&background=0D9488&color=fff";
              }}
            />
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-zinc-200 truncate">{profileData.name}</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for projects
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Quick Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0b101d]/95 backdrop-blur-md border-t border-white/10 px-2 py-2 flex items-center justify-around">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? 'text-emerald-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
