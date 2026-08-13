import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiSettings } from 'react-icons/fi';
import { profileData, defaultStats } from '../data/dashboard';
import StatCard from '../components/StatCard';
import GitHubWidget from '../components/GitHubWidget';
import ProjectWidget from '../components/ProjectWidget';
import SkillsWidget from '../components/SkillsWidget';
import LearningWidget from '../components/LearningWidget';
import TaskWidget from '../components/TaskWidget';
import ActivityWidget from '../components/ActivityWidget';

export default function Dashboard({ activeTab, setActiveTab, onOpenQuickActions }) {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [customProjects, setCustomProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectTech, setNewProjectTech] = useState('');
  const [newProjectStatus, setNewProjectStatus] = useState('In Progress');

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newProj = {
      id: Date.now(),
      name: newProjectName.trim(),
      description: newProjectDesc.trim() || 'Personal development project',
      techStack: newProjectTech.split(',').map(s => s.trim()).filter(Boolean),
      status: newProjectStatus,
      githubUrl: profileData.githubUrl,
      demoUrl: profileData.portfolioUrl,
      category: 'Web App'
    };

    setCustomProjects([newProj, ...customProjects]);
    setNewProjectName('');
    setNewProjectDesc('');
    setNewProjectTech('');
    setShowAddProjectModal(false);
  };

  return (
    <div className="space-y-6 pb-16 lg:pb-8">
      {/* 1. Welcome Card Header (Shown on Dashboard Home) */}
      {(activeTab === 'dashboard' || activeTab === 'overview') && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden glass-card rounded-2xl p-6 lg:p-8 border border-white/10"
        >
          {/* Subtle gradient accent background */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-semibold text-emerald-400 tracking-wider uppercase">
                STUDENT DEVELOPER WORKSPACE
              </span>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                {profileData.greeting}
              </h1>
              <p className="text-sm text-zinc-400 max-w-xl">
                {profileData.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenQuickActions}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-95"
              >
                + Quick Action
              </button>
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <FiGithub size={16} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. Stat Cards Grid (Shown on Dashboard Home) */}
      {(activeTab === 'dashboard' || activeTab === 'overview') && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          {defaultStats.map((stat) => (
            <StatCard 
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              type={stat.type}
              onClick={() => {
                if (stat.id.includes('github')) setActiveTab('github');
                else if (stat.id.includes('projects')) setActiveTab('projects');
                else if (stat.id.includes('skills')) setActiveTab('skills');
              }}
            />
          ))}
        </motion.div>
      )}

      {/* 3. Tab-based Layout or Main Unified Overview */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* GitHub & Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GitHubWidget />
            </div>
            <div>
              <ActivityWidget />
            </div>
          </div>

          {/* Projects & Tasks Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProjectWidget onAddProjectClick={() => setShowAddProjectModal(true)} />
            </div>
            <div>
              <TaskWidget />
            </div>
          </div>

          {/* Skills & Learning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkillsWidget />
            <LearningWidget />
          </div>
        </div>
      )}

      {/* Dedicated Section Tabs */}
      {activeTab === 'projects' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <ProjectWidget onAddProjectClick={() => setShowAddProjectModal(true)} />
        </motion.div>
      )}

      {activeTab === 'github' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <GitHubWidget />
        </motion.div>
      )}

      {activeTab === 'skills' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <SkillsWidget />
        </motion.div>
      )}

      {activeTab === 'learning' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <LearningWidget />
        </motion.div>
      )}

      {activeTab === 'tasks' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <TaskWidget />
        </motion.div>
      )}

      {activeTab === 'settings' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="glass-card rounded-2xl p-6 border border-white/10 max-w-2xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FiSettings size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Dashboard Preferences</h2>
              <p className="text-xs text-zinc-400">Configure profile links and local workspace defaults</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Developer Name</label>
              <input type="text" value={profileData.name} readOnly className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-400" />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">GitHub Username</label>
              <input type="text" value={profileData.githubUsername} readOnly className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-400" />
            </div>

            <div className="pt-2">
              <p className="text-xs text-emerald-400 font-mono bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                ✓ System setup: No backend required. Safe local storage configured for tasks.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0b101d] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Add New Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1">Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. AI Portfolio Generator"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1">Description</label>
                <textarea
                  placeholder="Short summary of project features..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Tailwind CSS, Python"
                  value={newProjectTech}
                  onChange={(e) => setNewProjectTech(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1">Status</label>
                <select
                  value={newProjectStatus}
                  onChange={(e) => setNewProjectStatus(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Planned">Planned</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-500 text-zinc-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
