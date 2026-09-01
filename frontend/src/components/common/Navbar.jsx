import React, { useState } from 'react';
import { useAuthStore } from '../../services/authStore';
import {
  Calendar,
  Sun,
  Moon,
  Send
} from 'lucide-react';

export const Navbar = ({ onOpenMobileMenu }) => {
  const {
    user,
    tenant,
    selectedSession,
    setSelectedSession,
    darkMode,
    toggleDarkMode
  } = useAuthStore();

  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3">
        {/* Left Section: Mobile Toggle & Session Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          >
            <span className="sr-only">Open sidebar</span>
            ☰
          </button>

          {/* Academic Session Selector */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Session:</span>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="bg-transparent border-0 font-bold text-emerald-600 dark:text-emerald-400 focus:outline-none cursor-pointer"
            >
              <option value="2026" className="bg-white dark:bg-slate-900">2026 (Active)</option>
              <option value="2025" className="bg-white dark:bg-slate-900">2025 (Archive)</option>
            </select>
          </div>
        </div>

        {/* Right Section: SMS Balance, Dark Mode, Profile */}
        <div className="flex items-center gap-2.5">
          {/* SMS Balance Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <Send className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>SMS: {tenant?.sms_balance?.toLocaleString() || 4500}</span>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* User Profile Mini */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-500/30"
            />
            <div className="hidden xl:block text-left text-xs">
              <p className="font-bold text-slate-900 dark:text-white leading-tight">{user.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{user.title || user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
