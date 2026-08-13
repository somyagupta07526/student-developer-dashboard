import React, { useState } from 'react';
import { FiCheckSquare, FiPlus, FiTrash2, FiCheck, FiClock, FiAlertTriangle, FiTag } from 'react-icons/fi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultTasks } from '../data/dashboard';

export default function TaskWidget({ onAddClick }) {
  const [tasks, setTasks] = useLocalStorage('somya_dev_tasks', defaultTasks);
  const [filter, setFilter] = useState('All');
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newCategory, setNewCategory] = useState('Coding');
  const [newDueDate, setNewDueDate] = useState('Today');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTaskObj = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      priority: newPriority,
      dueDate: newDueDate || 'Today',
      completed: false,
      category: newCategory || 'General'
    };

    setTasks([newTaskObj, ...tasks]);
    setNewTitle('');
    setShowAddForm(false);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'High':
        return (
          <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded font-mono">
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
            Medium
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
            Low
          </span>
        );
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <FiCheckSquare size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Task Manager</h2>
            <p className="text-xs text-zinc-400">
              {tasks.filter(t => !t.completed).length} Active • {tasks.filter(t => t.completed).length} Completed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Filters */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-white/10 text-xs">
            {['All', 'Active', 'Completed'].map((st) => (
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
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl transition-colors"
          >
            <FiPlus size={14} /> New Task
          </button>
        </div>
      </div>

      {/* Add Task Quick Form */}
      {showAddForm && (
        <form onSubmit={handleAddTask} className="mb-4 p-3 rounded-xl bg-zinc-900/90 border border-emerald-500/30 space-y-3">
          <input
            type="text"
            placeholder="Enter task title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            autoFocus
          />

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="bg-zinc-950 border border-white/10 text-zinc-300 rounded-lg px-2 py-1 text-xs focus:outline-none"
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            <input
              type="text"
              placeholder="Due (e.g. Today)"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="bg-zinc-950 border border-white/10 text-zinc-300 rounded-lg px-2 py-1 text-xs focus:outline-none w-28"
            />

            <input
              type="text"
              placeholder="Category (e.g. Coding)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="bg-zinc-950 border border-white/10 text-zinc-300 rounded-lg px-2 py-1 text-xs focus:outline-none w-28"
            />

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-emerald-500 text-zinc-950 font-bold rounded-lg text-xs hover:bg-emerald-400"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                t.completed
                  ? 'bg-white/[0.01] border-white/5 opacity-60'
                  : 'bg-white/[0.03] border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={() => toggleTask(t.id)}
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                    t.completed
                      ? 'bg-emerald-500 border-emerald-500 text-zinc-950 font-bold'
                      : 'border-white/20 hover:border-emerald-400 text-transparent'
                  }`}
                  aria-label="Toggle Complete"
                >
                  <FiCheck size={12} strokeWidth={3} />
                </button>

                <div className="flex flex-col truncate">
                  <span className={`text-xs font-semibold truncate ${t.completed ? 'line-through text-zinc-400' : 'text-zinc-100'}`}>
                    {t.title}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5">
                    <span className="flex items-center gap-1 font-mono">
                      <FiClock size={10} /> {t.dueDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-zinc-400">
                      <FiTag size={10} /> {t.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-2">
                {getPriorityBadge(t.priority)}
                <button
                  onClick={() => deleteTask(t.id)}
                  className="p-1.5 text-zinc-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                  title="Delete Task"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-xs text-zinc-400">
            No tasks found matching "{filter}".
          </div>
        )}
      </div>
    </div>
  );
}
