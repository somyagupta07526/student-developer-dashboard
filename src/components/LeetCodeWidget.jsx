import React, { useState, useEffect } from 'react';
import { FiCode, FiExternalLink, FiAward, FiCheckCircle } from 'react-icons/fi';
import { profileData, fallbackLeetCodeStats } from '../data/dashboard';

export default function LeetCodeWidget() {
  const [stats, setStats] = useState(fallbackLeetCodeStats);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchLeetCodeStats = async () => {
      try {
        // Attempt to fetch from public LeetCode API stats proxy
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${profileData.leetcodeUsername}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.status === 'success' && isMounted) {
            setStats({
              totalSolved: data.totalSolved ?? fallbackLeetCodeStats.totalSolved,
              easySolved: data.easySolved ?? fallbackLeetCodeStats.easySolved,
              mediumSolved: data.mediumSolved ?? fallbackLeetCodeStats.mediumSolved,
              hardSolved: data.hardSolved ?? fallbackLeetCodeStats.hardSolved,
              ranking: data.ranking ? data.ranking.toLocaleString() : fallbackLeetCodeStats.ranking,
              acceptanceRate: data.acceptanceRate ? `${data.acceptanceRate}%` : fallbackLeetCodeStats.acceptanceRate
            });
            setIsLive(true);
          }
        }
      } catch (err) {
        // Silently use structured fallback baseline without breaking UI
        console.info('Using offline LeetCode baseline stats');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLeetCodeStats();
    return () => { isMounted = false; };
  }, []);

  const easyPct = Math.round((stats.easySolved / (stats.totalSolved || 1)) * 100);
  const mediumPct = Math.round((stats.mediumSolved / (stats.totalSolved || 1)) * 100);
  const hardPct = Math.round((stats.hardSolved / (stats.totalSolved || 1)) * 100);

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <FiCode size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-white tracking-tight">LeetCode Progress</h2>
              {isLive && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-medium">
                  Live
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400">@{profileData.leetcodeUsername}</p>
          </div>
        </div>
        <a
          href={profileData.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20"
        >
          <span>Profile</span>
          <FiExternalLink size={12} />
        </a>
      </div>

      {/* Main Content */}
      <div className="space-y-4 flex-1 flex flex-col justify-between">
        {/* Total Solved Overview */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <div>
            <span className="text-xs text-zinc-400 font-medium block">Total Solved</span>
            <span className="text-2xl font-black text-white tracking-tight">{stats.totalSolved}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-zinc-400 font-medium block flex items-center justify-end gap-1">
              <FiAward className="text-amber-400" size={12} /> Global Rank
            </span>
            <span className="text-sm font-bold text-amber-400 font-mono">#{stats.ranking}</span>
          </div>
        </div>

        {/* Difficulty Breakdown Bars */}
        <div className="space-y-3">
          {/* Easy */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium">
              <span className="text-emerald-400 flex items-center gap-1">
                <FiCheckCircle size={12} /> Easy
              </span>
              <span className="text-zinc-300 font-mono">{stats.easySolved} ({easyPct}%)</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${easyPct}%` }}
              />
            </div>
          </div>

          {/* Medium */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium">
              <span className="text-amber-400 flex items-center gap-1">
                <FiCheckCircle size={12} /> Medium
              </span>
              <span className="text-zinc-300 font-mono">{stats.mediumSolved} ({mediumPct}%)</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${mediumPct}%` }}
              />
            </div>
          </div>

          {/* Hard */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium">
              <span className="text-rose-400 flex items-center gap-1">
                <FiCheckCircle size={12} /> Hard
              </span>
              <span className="text-zinc-300 font-mono">{stats.hardSolved} ({hardPct}%)</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-rose-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${hardPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
