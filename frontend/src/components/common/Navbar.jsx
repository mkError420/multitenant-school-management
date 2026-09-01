import React from 'react';
import { useAuthStore } from '../../services/authStore';
import { Sun, Moon } from 'lucide-react';

export const Navbar = ({ onOpenMobileMenu }) => {
  const { darkMode, toggleDarkMode } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3">
        {/* Left Section: Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          >
            <span className="sr-only">Open sidebar</span>
            ☰
          </button>
        </div>

        {/* Right Section: Dark Mode Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
