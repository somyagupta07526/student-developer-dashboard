import React, { useState, useEffect } from 'react';
import { FiSearch, FiX, FiFolder, FiCpu, FiCheckSquare, FiBookOpen } from 'react-icons/fi';
import { initialProjects, initialSkills, initialLearning, defaultTasks } from '../data/dashboard';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function SearchModal({ isOpen, onClose, onSelectTab }) {
  const [query, setQuery] = useState('');
  const [tasks] = useLocalStorage('somya_dev_tasks', defaultTasks);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search filtering
  const matchingProjects = q 
    ? initialProjects.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.techStack.some(t => t.toLowerCase().includes(q))
      )
    : [];

  const matchingSkills = q 
    ? initialSkills.flatMap(c => c.items.map(s => ({ ...s, category: c.category })))
        .filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.level.toLowerCase().includes(q))
    : [];

  const matchingTasks = q 
    ? tasks.filter(t => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
    : [];

  const matchingLearning = q 
    ? initialLearning.filter(l => l.technology.toLowerCase().includes(q) || l.notes.toLowerCase().includes(q))
    : [];

  const totalMatches = matchingProjects.length + matchingSkills.length + matchingTasks.length + matchingLearning.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#0b101d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-zinc-900/50">
          <FiSearch size={20} className="text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="Search projects, skills, tasks, learning..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-zinc-500 hover:text-zinc-300">
              <FiX size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white px-2 py-1 bg-white/5 rounded border border-white/10"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="py-8 text-center text-xs text-zinc-400 space-y-1">
              <p className="font-semibold text-zinc-300">Type a keyword to search across your workspace</p>
              <p>Try searching "React", "Python", "Dashboard", or "High"</p>
            </div>
          ) : totalMatches === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-400">
              No results found for "{query}".
            </div>
          ) : (
            <>
              {/* Projects Results */}
              {matchingProjects.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    <FiFolder size={14} /> Projects ({matchingProjects.length})
                  </div>
                  {matchingProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => { onClose(); onSelectTab('projects'); }}
                      className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] cursor-pointer border border-white/5 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">{p.name}</span>
                        <span className="text-[11px] text-zinc-400">{p.description}</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Results */}
              {matchingSkills.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider">
                    <FiCpu size={14} /> Skills ({matchingSkills.length})
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {matchingSkills.map((s, idx) => (
                      <div
                        key={idx}
                        onClick={() => { onClose(); onSelectTab('skills'); }}
                        className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] cursor-pointer border border-white/5 flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-white">{s.name}</span>
                        <span className="text-[10px] text-zinc-400">{s.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks Results */}
              {matchingTasks.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <FiCheckSquare size={14} /> Tasks ({matchingTasks.length})
                  </div>
                  {matchingTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => { onClose(); onSelectTab('tasks'); }}
                      className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] cursor-pointer border border-white/5 flex items-center justify-between text-xs"
                    >
                      <span className={`font-semibold ${t.completed ? 'line-through text-zinc-400' : 'text-white'}`}>
                        {t.title}
                      </span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                        {t.priority}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Learning Results */}
              {matchingLearning.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider">
                    <FiBookOpen size={14} /> Learning ({matchingLearning.length})
                  </div>
                  {matchingLearning.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => { onClose(); onSelectTab('learning'); }}
                      className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] cursor-pointer border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-white block">{l.technology}</span>
                        <span className="text-[11px] text-zinc-400">{l.notes}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        {l.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
