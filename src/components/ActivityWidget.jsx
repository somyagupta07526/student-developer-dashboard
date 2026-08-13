import React from 'react';
import { FiActivity, FiFolder, FiCode, FiCheckSquare, FiGithub } from 'react-icons/fi';
import { initialActivities } from '../data/dashboard';

export default function ActivityWidget({ activities = initialActivities }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'project':
        return <FiFolder className="text-emerald-400" size={14} />;
      case 'leetcode':
        return <FiCode className="text-amber-400" size={14} />;
      case 'task':
        return <FiCheckSquare className="text-blue-400" size={14} />;
      case 'github':
      default:
        return <FiGithub className="text-purple-400" size={14} />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <FiActivity size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Recent Activity</h2>
            <p className="text-xs text-zinc-400">Timeline & Commit Log</p>
          </div>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="relative pl-3 border-l border-white/10 space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[19px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center group-hover:border-emerald-400 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] group-hover:bg-white/[0.04] border border-white/5 transition-all">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  {getTypeIcon(act.type)}
                  <span className="text-xs font-bold text-white">{act.title}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">{act.time}</span>
              </div>
              <p className="text-xs text-zinc-400 leading-normal">
                {act.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
