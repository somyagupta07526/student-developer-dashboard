import React from 'react';
import { FiBookOpen, FiClock, FiActivity, FiCheckCircle } from 'react-icons/fi';
import { initialLearning } from '../data/dashboard';

export default function LearningWidget({ items = initialLearning }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
            <FiActivity size={10} className="animate-pulse" /> Active
          </span>
        );
      case 'Completed':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full font-mono">
            <FiCheckCircle size={10} /> Completed
          </span>
        );
      case 'Learning':
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">
            <FiBookOpen size={10} /> Learning
          </span>
        );
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <FiBookOpen size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Learning Tracker</h2>
            <p className="text-xs text-zinc-400">Course & Skill Milestones</p>
          </div>
        </div>
      </div>

      {/* Learning Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-all group"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                {item.technology}
              </span>
              {getStatusBadge(item.status)}
            </div>

            {/* Progress bar */}
            <div className="space-y-1 mb-2">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>Progress</span>
                <span className="text-emerald-400 font-bold">{item.progress}%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
              <span className="truncate max-w-[200px]">{item.notes || 'Skill development'}</span>
              <span className="flex items-center gap-1 shrink-0 font-mono text-zinc-400">
                <FiClock size={10} /> {item.lastUpdated}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
