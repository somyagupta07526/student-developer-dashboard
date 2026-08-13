import React from 'react';
import { FiCpu, FiCheck, FiBookOpen, FiAward, FiMinusCircle } from 'react-icons/fi';
import { initialSkills } from '../data/dashboard';

export default function SkillsWidget({ skills = initialSkills }) {
  const getLevelBadge = (level) => {
    switch (level) {
      case 'Comfortable':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
            <FiAward size={10} /> Comfortable
          </span>
        );
      case 'Intermediate':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
            <FiCheck size={10} /> Intermediate
          </span>
        );
      case 'Learning':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
            <FiBookOpen size={10} /> Learning
          </span>
        );
      case 'Not Learned':
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-zinc-400 bg-zinc-500/10 border border-zinc-500/20 px-2 py-0.5 rounded-md">
            <FiMinusCircle size={10} /> Not Learned
          </span>
        );
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <FiCpu size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Technical Skills</h2>
            <p className="text-xs text-zinc-400">Categorized Proficiency Levels</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 flex-wrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span>Comfortable</span>
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block ml-1" />
          <span>Intermediate</span>
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block ml-1" />
          <span>Learning</span>
          <span className="w-2 h-2 rounded-full bg-zinc-500 inline-block ml-1" />
          <span>Not Learned</span>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((categoryGroup, index) => (
          <div 
            key={index}
            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
          >
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5 pb-1 border-b border-white/5 flex items-center justify-between">
              <span>{categoryGroup.category}</span>
              <span className="text-[10px] font-mono text-zinc-500">{categoryGroup.items.length} items</span>
            </h3>

            <div className="space-y-2">
              {categoryGroup.items.map((skill, sIdx) => (
                <div 
                  key={sIdx}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/5 transition-colors"
                >
                  <span className="text-xs font-medium text-zinc-200">{skill.name}</span>
                  {getLevelBadge(skill.level)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
