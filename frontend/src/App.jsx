import React, { useState } from 'react';
import { useAuthStore } from './services/authStore';

// Super Admin
import { SuperAdminDashboard } from './pages/superadmin/SuperAdminDashboard';

// School Admin – 10 Modules
import { DashboardOverview }       from './pages/schooladmin/DashboardOverview';
import { AcademicManagement }      from './pages/schooladmin/AcademicManagement';
import { StudentManagement }        from './pages/schooladmin/StudentManagement';
import { AttendanceLeaves }         from './pages/schooladmin/AttendanceLeaves';
import { ExaminationResults }       from './pages/schooladmin/ExaminationResults';
import { FeesAccounts }             from './pages/schooladmin/FeesAccounts';
import { HRPayroll, CommunicationSMS } from './pages/schooladmin/HRPayroll';
import { LibraryTransport }         from './pages/schooladmin/LibraryTransport';
import { SettingsCustomization }    from './pages/schooladmin/SettingsCustomization';

// ─────────────────────────────────────────────
//  Sidebar menu definitions
// ─────────────────────────────────────────────
const SCHOOL_MENU = [
  {
    group: 'Main',
    items: [
      { id: 'dashboard',  icon: '📊', label: 'Dashboard Overview' },
    ]
  },
  {
    group: 'Academic',
    items: [
      { id: 'academic',   icon: '🏛️', label: 'Academic Management' },
      { id: 'students',   icon: '👥', label: 'Student Management' },
      { id: 'attendance', icon: '📅', label: 'Attendance & Leaves' },
      { id: 'exams',      icon: '🎓', label: 'Examination & Results' },
    ]
  },
  {
    group: 'Finance & HR',
    items: [
      { id: 'fees',       icon: '💳', label: 'Fees & Accounts (POS)' },
      { id: 'hr',         icon: '💰', label: 'HR & Payroll' },
    ]
  },
  {
    group: 'Communication',
    items: [
      { id: 'sms',        icon: '📱', label: 'SMS & Notice Board' },
    ]
  },
  {
    group: 'Add-on Services',
    items: [
      { id: 'library',    icon: '📚', label: 'Library & Transport' },
    ]
  },
  {
    group: 'System',
    items: [
      { id: 'settings',   icon: '⚙️', label: 'Settings & Permissions' },
    ]
  }
];

const SUPER_ADMIN_MENU = [
  {
    group: 'SaaS Management',
    items: [
      { id: 'superadmin', icon: '⚡', label: 'SaaS Platform Overview' },
    ]
  }
];

// ─────────────────────────────────────────────
//  Demo tenants for switcher
// ─────────────────────────────────────────────
const DEMO_TENANTS = [
  { id: 1, name: 'Mane School and College', short_name: 'MANE', eiin: '107985', subdomain: 'maneschool', domain: 'maneschool.site.je', sms_balance: 4500 },
  { id: 2, name: 'Dhaka Residential Model College', short_name: 'DRMC', eiin: '108277', subdomain: 'drmc', domain: 'drmc.edu.bd', sms_balance: 3200 },
  { id: 3, name: 'Ideal School and College', short_name: 'ISC', eiin: '104044', subdomain: 'idealschool', domain: 'idealschool.edu.bd', sms_balance: 1200 }
];

// ─────────────────────────────────────────────
//  App Root
// ─────────────────────────────────────────────
export default function App() {
  const [activeTab,    setActiveTab]    = useState('dashboard');
  const [role,         setRole]         = useState('school_admin');
  const [darkMode,     setDarkMode]     = useState(false);
  const [tenant,       setTenant]       = useState(DEMO_TENANTS[0]);
  const [sidebarOpen,  setSidebarOpen]  = useState(true);

  // Sync role → default tab
  const switchRole = (newRole) => {
    setRole(newRole);
    setActiveTab(newRole === 'super_admin' ? 'superadmin' : 'dashboard');
  };

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark', !darkMode);
    setDarkMode(!darkMode);
  };

  const menu = role === 'super_admin' ? SUPER_ADMIN_MENU : SCHOOL_MENU;

  // ── Shared context object passed to store ──
  const ctx = { tenant, setTenant, activeTab, setActiveTab, selectedSession: '2026' };
  // Inject into global store shim
  Object.assign(useAuthStore.getState?.() ?? {}, ctx);

  // ── Page renderer ──
  const renderPage = () => {
    if (role === 'super_admin') return <SuperAdminDashboard />;
    switch (activeTab) {
      case 'dashboard':   return <DashboardOverview />;
      case 'academic':    return <AcademicManagement />;
      case 'students':    return <StudentManagement />;
      case 'attendance':  return <AttendanceLeaves />;
      case 'exams':       return <ExaminationResults />;
      case 'fees':        return <FeesAccounts />;
      case 'hr':          return <HRPayroll />;
      case 'sms':         return <CommunicationSMS />;
      case 'library':     return <LibraryTransport />;
      case 'settings':    return <SettingsCustomization />;
      default:            return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">

      {/* ═══════════════  TOP NAVBAR  ═══════════════ */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between gap-3">

        {/* Left: Logo + Tenant name */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Hamburger */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs shadow"
                 style={{ backgroundColor: '#059669' }}>
              {tenant.short_name.slice(0, 2)}
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="font-extrabold text-xs text-slate-900 dark:text-white truncate max-w-[200px]">{tenant.name}</p>
              <p className="text-[10px] text-slate-400 font-mono">{tenant.domain}</p>
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Institution switcher */}
          <select
            value={tenant.id}
            onChange={(e) => setTenant(DEMO_TENANTS.find(t => t.id === Number(e.target.value)))}
            className="hidden lg:block text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
          >
            {DEMO_TENANTS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>

          {/* Role switcher */}
          <select
            value={role}
            onChange={(e) => switchRole(e.target.value)}
            className="text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-xl px-2.5 py-1.5"
          >
            <option value="school_admin">👑 Principal / Admin</option>
            <option value="super_admin">⚡ Super Admin (SaaS)</option>
            <option value="teacher">👨‍🏫 Teacher Portal</option>
            <option value="accountant">💰 Accountant (POS)</option>
            <option value="student">🎓 Student View</option>
          </select>

          {/* SMS balance pill */}
          <div className="hidden md:flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 px-3 py-1.5 rounded-full">
            📱 SMS: {tenant.sms_balance}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-base"
            title="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* ═══════════════  BODY  ═══════════════ */}
      <div className="flex flex-1 overflow-hidden">

        {/* ─── SIDEBAR ─── */}
        <aside className={`${sidebarOpen ? 'w-56' : 'w-0 overflow-hidden'} shrink-0 transition-all duration-300 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col py-3 overflow-y-auto`}>
          {menu.map((group) => (
            <div key={group.group} className="mb-2">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-4 py-1.5">
                {group.group}
              </p>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-2.5 transition-all ${
                    activeTab === item.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold border-r-2 border-emerald-600'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="text-base leading-none">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          ))}

          {/* Bottom: logged-in user stub */}
          <div className="mt-auto mx-3 mb-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <p className="font-bold text-slate-900 dark:text-white truncate">
              {role === 'super_admin' ? 'Super Administrator' : 'Prof. Kazi Faruq Ahmed'}
            </p>
            <p className="text-slate-400 text-[10px] capitalize">{role.replace('_', ' ')}</p>
          </div>
        </aside>

        {/* ─── MAIN CONTENT ─── */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          {/* Provide shared context via a simple wrapper so all child pages can call useAuthStore() */}
          <AuthStoreProvider tenant={tenant} setTenant={setTenant} setActiveTab={setActiveTab} selectedSession="2026">
            {renderPage()}
          </AuthStoreProvider>
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Tiny context bridge so child components that
//  call useAuthStore() get live values without
//  needing a real Redux / Zustand setup.
// ─────────────────────────────────────────────
import { createContext, useContext } from 'react';
export const AuthCtx = createContext(null);
export const useAuthStore = () => useContext(AuthCtx);

function AuthStoreProvider({ children, tenant, setTenant, setActiveTab, selectedSession }) {
  return (
    <AuthCtx.Provider value={{ tenant, setTenant, setActiveTab, selectedSession }}>
      {children}
    </AuthCtx.Provider>
  );
}
