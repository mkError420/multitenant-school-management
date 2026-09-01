import React, { useState } from 'react';
import { useAuthStore } from '../../services/authStore';
import {
  Building2,
  Calendar,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  Sparkles,
  UserCheck,
  ShieldAlert,
  Send
} from 'lucide-react';

export const Navbar = ({ onOpenMobileMenu }) => {
  const {
    user,
    tenant,
    availableTenants,
    switchTenantById,
    switchRole,
    selectedSession,
    setSelectedSession,
    darkMode,
    toggleDarkMode
  } = useAuthStore();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showTenantMenu, setShowTenantMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3">
        {/* Left Section: Mobile Toggle & Tenant Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          >
            <span className="sr-only">Open sidebar</span>
            ☰
          </button>

          {/* Tenant Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTenantMenu(!showTenantMenu)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-emerald-600 text-white font-bold text-xs">
                {tenant?.short_name || 'BD'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900 dark:text-white truncate max-w-[170px]">
                    {tenant?.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  EIIN: {tenant?.eiin_number} • {tenant?.subdomain}.edumanage.bd
                </span>
              </div>
            </button>

            {showTenantMenu && (
              <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  🏢 Switch School / College (Multi-Tenant)
                </div>
                {availableTenants.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      switchTenantById(t.id);
                      setShowTenantMenu(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                      tenant?.id === t.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      {t.short_name}
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-slate-900 dark:text-white">{t.name}</p>
                      <p className="text-[11px] text-slate-400">EIIN: {t.eiin_number} • {t.plan_name}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

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

        {/* Right Section: Role Simulator, SMS Balance, Dark Mode, Notifications, Profile */}
        <div className="flex items-center gap-2.5">
          {/* SMS Balance Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <Send className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>SMS: {tenant?.sms_balance?.toLocaleString() || 4500}</span>
          </div>

          {/* Role Preview Switcher (Interactive Evaluation) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all shadow-sm"
              title="Test application from different roles"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
              <span className="capitalize hidden sm:inline">Role:</span>
              <span className="uppercase">{user.role.replace('_', ' ')}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Role to Test
                </div>
                {[
                  { role: 'super_admin', label: '👑 Super Admin (SaaS Portal)' },
                  { role: 'school_admin', label: '🏫 School Admin (Principal)' },
                  { role: 'teacher', label: '👨‍🏫 Teacher (Math/Senior)' },
                  { role: 'accountant', label: '💰 Accountant (Fees POS)' },
                  { role: 'student', label: '🎓 Student / Guardian (Roll 1)' }
                ].map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      switchRole(item.role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      user.role === item.role
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    {user.role === item.role && <UserCheck className="w-4 h-4 text-indigo-600" />}
                  </button>
                ))}
              </div>
            )}
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
