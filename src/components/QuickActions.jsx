import React from 'react';
import { 
  FiPlus, 
  FiCheckSquare, 
  FiGithub, 
  FiDownload, 
  FiGlobe,
  FiX
} from 'react-icons/fi';
import { profileData } from '../data/dashboard';

export default function QuickActionsModal({ isOpen, onClose, onAddProject, onAddTask }) {
  if (!isOpen) return null;

  const actions = [
    {
      id: 'add-task',
      title: 'Add New Task',
      subtitle: 'Create a priority-scheduled developer task',
      icon: FiCheckSquare,
      color: 'emerald',
      onClick: () => { onClose(); onAddTask(); }
    },
    {
      id: 'add-project',
      title: 'Add Project',
      subtitle: 'Register a new project showcase',
      icon: FiPlus,
      color: 'blue',
      onClick: () => { onClose(); onAddProject(); }
    },
    {
      id: 'open-github',
      title: 'Open GitHub Profile',
      subtitle: `https://github.com/${profileData.githubUsername}`,
      icon: FiGithub,
      color: 'purple',
      onClick: () => window.open(profileData.githubUrl, '_blank')
    },
    {
      id: 'download-resume',
      title: 'Download Resume',
      subtitle: 'PDF Resume & Technical CV',
      icon: FiDownload,
      color: 'cyan',
      onClick: () => {
        alert("Downloading Somya Gupta's Resume (PDF placeholder)");
      }
    },
    {
      id: 'view-portfolio',
      title: 'View Portfolio',
      subtitle: 'Live portfolio showcase link',
      icon: FiGlobe,
      color: 'rose',
      onClick: () => window.open(profileData.portfolioUrl, '_blank')
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#0d1322] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white">Quick Actions</h2>
            <p className="text-xs text-zinc-400">Shortcuts to common developer workflows</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Action buttons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={act.onClick}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-emerald-500/30 transition-all text-left group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Icon size={18} />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                    {act.title}
                  </span>
                  <span className="text-[10px] text-zinc-400 truncate mt-0.5">
                    {act.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
