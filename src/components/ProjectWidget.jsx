import React, { useState } from 'react';
import { FiFolder, FiGithub, FiExternalLink, FiPlus, FiCheckCircle, FiClock, FiCalendar } from 'react-icons/fi';
import { initialProjects } from '../data/dashboard';

export default function ProjectWidget({ projects = initialProjects, onAddProjectClick }) {
  const [filter, setFilter] = useState('All');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            <FiCheckCircle size={10} /> Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
            <FiClock size={10} /> In Progress
          </span>
        );
      case 'Planned':
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold bg-zinc-500/15 text-zinc-400 border border-zinc-500/30 px-2.5 py-0.5 rounded-full">
            <FiCalendar size={10} /> Planned
          </span>
        );
    }
  };

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.status === filter);

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
      {/* Header with Title & Filter buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <FiFolder size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Projects</h2>
            <p className="text-xs text-zinc-400">Personal & Academic Showcase</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Filters */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-white/10 text-xs">
            {['All', 'Completed', 'In Progress', 'Planned'].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filter === st
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={onAddProjectClick}
            className="flex items-center gap-1 text-xs font-semibold bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 px-3 py-1.5 rounded-xl transition-colors"
          >
            <FiPlus size={14} /> Add Project
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {project.name}
                  </h3>
                  {getStatusBadge(project.status)}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Links */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                <span className="text-[11px] font-medium text-zinc-500">
                  {project.category || 'Development'}
                </span>
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                      title="View Source Code"
                    >
                      <FiGithub size={14} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors ml-2"
                      title="Live Demo"
                    >
                      <span>Live Demo</span>
                      <FiExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-xs text-zinc-400">
            No projects found matching filter "{filter}".
          </div>
        )}
      </div>
    </div>
  );
}
