import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiGithub, 
  FiUsers, 
  FiCode, 
  FiFolder, 
  FiCpu, 
  FiZap,
  FiTrendingUp
} from 'react-icons/fi';

const iconMap = {
  FiGithub: FiGithub,
  FiUsers: FiUsers,
  FiCode: FiCode,
  FiFolder: FiFolder,
  FiCpu: FiCpu,
  FiZap: FiZap,
};

export default function StatCard({ title, value, change, icon, type, onClick }) {
  const IconComponent = iconMap[icon] || FiTrendingUp;

  const getAccentClass = () => {
    switch (type) {
      case 'github': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'leetcode': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="glass-card glass-card-hover p-4 rounded-2xl flex flex-col justify-between cursor-pointer group"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-zinc-400 tracking-wider uppercase truncate">
          {title}
        </span>
        <div className={`p-2 rounded-xl border ${getAccentClass()} transition-transform group-hover:scale-110`}>
          <IconComponent size={18} />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          {value}
        </div>
        <p className="mt-1 text-xs text-zinc-400 font-medium flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {change}
        </p>
      </div>
    </motion.div>
  );
}
