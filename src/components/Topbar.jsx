import React from 'react';
import { FiMenu, FiSearch, FiSun, FiMoon, FiPlus, FiGithub, FiExternalLink } from 'react-icons/fi';
import { profileData } from '../data/dashboard';

export default function Topbar({ 
  activeTab, 
  setMobileOpen, 
  onOpenSearch, 
  onOpenQuickActions,
  darkMode,
  setDarkMode 
}) {
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'projects': return 'Project Portfolio';
      case 'github': return 'GitHub Activity & Repos';
      case 'skills': return 'Technical Skills';
      case 'learning': return 'Learning Tracker';
      case 'tasks': return 'Task Manager';
      case 'settings': return 'Dashboard Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#090d16]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left section: Mobile menu + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open Navigation Menu"
          className="lg:hidden p-2 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white"
        >
          <FiMenu size={20} />
        </button>
        <div>
          <h1 className="text-lg lg:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {getTitle()}
          </h1>
          <p className="text-xs text-zinc-400 hidden sm:block">
            Somya Gupta • {activeTab.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Center Search Input Trigger */}
      <div className="flex-1 max-w-md mx-2 hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:border-emerald-500/40 hover:text-zinc-200 transition-all text-sm group"
        >
          <FiSearch size={16} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
          <span className="flex-1 text-left text-xs sm:text-sm">Search projects, skills, tasks...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 rounded">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right actions: Quick Action, Search button (mobile), Theme toggle, Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          aria-label="Open Search"
          className="md:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white"
        >
          <FiSearch size={18} />
        </button>

        {/* Quick Actions Trigger */}
        <button
          onClick={onOpenQuickActions}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-95"
        >
          <FiPlus size={16} />
          <span className="hidden sm:inline">Actions</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Theme"
          className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-emerald-400 transition-colors"
          title={darkMode ? "Switch to Light Mode (Dark recommended)" : "Switch to Dark Mode"}
        >
          {darkMode ? <FiMoon size={18} /> : <FiSun size={18} />}
        </button>

        {/* GitHub Direct Link */}
        <a
          href={profileData.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-medium transition-colors"
        >
          <FiGithub size={15} />
          <span>GitHub</span>
          <FiExternalLink size={12} className="text-zinc-500" />
        </a>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <img
            src={profileData.avatarUrl}
            alt={profileData.name}
            className="w-8 h-8 rounded-full border border-emerald-500/40 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://ui-avatars.com/api/?name=Somya+Gupta&background=0D9488&color=fff";
            }}
          />
        </div>
      </div>
    </header>
  );
}
