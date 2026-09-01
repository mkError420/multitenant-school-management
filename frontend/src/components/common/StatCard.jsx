import React from 'react';

// ─────────────────────────────────────────────
//  StatCard
// ─────────────────────────────────────────────
export const StatCard = ({ title, value, change, isPositive, icon: Icon, color = 'emerald', subtext }) => {
  const palette = {
    emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', icon: 'text-emerald-600', ring: 'ring-emerald-200 dark:ring-emerald-900', badge: 'bg-emerald-100 text-emerald-700' },
    blue:    { bg: 'bg-blue-50 dark:bg-blue-950/40',    icon: 'text-blue-600',    ring: 'ring-blue-200 dark:ring-blue-900',    badge: 'bg-blue-100 text-blue-700' },
    indigo:  { bg: 'bg-indigo-50 dark:bg-indigo-950/40',icon: 'text-indigo-600',  ring: 'ring-indigo-200 dark:ring-indigo-900',badge: 'bg-indigo-100 text-indigo-700' },
    rose:    { bg: 'bg-rose-50 dark:bg-rose-950/40',    icon: 'text-rose-600',    ring: 'ring-rose-200 dark:ring-rose-900',    badge: 'bg-rose-100 text-rose-700' },
    purple:  { bg: 'bg-purple-50 dark:bg-purple-950/40',icon: 'text-purple-600',  ring: 'ring-purple-200 dark:ring-purple-900',badge: 'bg-purple-100 text-purple-700' },
    amber:   { bg: 'bg-amber-50 dark:bg-amber-950/40',  icon: 'text-amber-600',   ring: 'ring-amber-200 dark:ring-amber-900',  badge: 'bg-amber-100 text-amber-700' },
  };
  const c = palette[color] || palette.emerald;

  return (
    <div className={`${c.bg} ring-1 ${c.ring} rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">{title}</p>
        {Icon && (
          <div className={`w-8 h-8 rounded-xl bg-white dark:bg-slate-900 shadow flex items-center justify-center ${c.icon}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{value}</p>

      <div className="flex items-center justify-between">
        {subtext && <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{subtext}</p>}
        {change && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
            isPositive ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                       : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
          }`}>
            {isPositive ? '▲' : '▼'} {change}
          </span>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  Badge
// ─────────────────────────────────────────────
export const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200',
    success: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300',
    danger:  'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300',
    warning: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300',
    info:    'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300',
    purple:  'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
};

// ─────────────────────────────────────────────
//  Modal
// ─────────────────────────────────────────────
export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className={`bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full ${maxWidth} my-4`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition-all"
          >
            ✕
          </button>
        </div>
        {/* Body */}
        <div className="px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
