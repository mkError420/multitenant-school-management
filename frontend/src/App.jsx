import React, { useState } from 'react';
import { AuthCtx } from './context/AuthContext';
import { Login } from './pages/Login';

// ── Role-based dashboards ─────────────────────────────────
import { SuperAdminDashboard }         from './pages/superadmin/SuperAdminDashboard';
import { SuperAdminPlatformDashboard } from './pages/superadmin/SuperAdminPlatformDashboard';
import { SchoolAdminDashboard }        from './pages/schooladmin/SchoolAdminDashboard';

// ── School Admin – 10 Modules ────────────────────────────
import { DashboardOverview }      from './pages/schooladmin/DashboardOverview';
import { AcademicManagement }     from './pages/schooladmin/AcademicManagement';
import { StudentManagement }      from './pages/schooladmin/StudentManagement';
import { AttendanceLeaves }       from './pages/schooladmin/AttendanceLeaves';
import { ExaminationResults }     from './pages/schooladmin/ExaminationResults';
import { FeesAccounts }           from './pages/schooladmin/FeesAccounts';
import { HRPayroll, CommunicationSMS } from './pages/schooladmin/HRPayroll';
import { LibraryTransport }       from './pages/schooladmin/LibraryTransport';
import { SettingsCustomization }  from './pages/schooladmin/SettingsCustomization';

// ─────────────────────────────────────────────
//  Static data
// ─────────────────────────────────────────────
const DEMO_TENANTS = [
  { id: 1, name: 'Mane School and College',          short_name: 'MANE', eiin: '107985', domain: 'maneschool.site.je',  sms_balance: 4500 },
  { id: 2, name: 'Dhaka Residential Model College', short_name: 'DRMC', eiin: '108277', domain: 'drmc.edu.bd',         sms_balance: 3200 },
  { id: 3, name: 'Ideal School and College',         short_name: 'ISC',  eiin: '104044', domain: 'idealschool.edu.bd', sms_balance: 1200 },
];

const SCHOOL_MENU = [
  { group: 'Main',              items: [{ id: 'dashboard',  label: 'Dashboard Overview' }] },
  { group: 'Academic',          items: [
    { id: 'academic',    label: 'Academic Management' },
    { id: 'students',   label: 'Student Management' },
    { id: 'attendance',  label: 'Attendance & Leaves' },
    { id: 'exams',       label: 'Examination & Results' },
  ]},
  { group: 'Finance & HR',      items: [
    { id: 'fees',  label: 'Fees & Accounts (POS)' },
    { id: 'hr',   label: 'HR & Payroll' },
  ]},
  { group: 'Communication',     items: [{ id: 'sms',     label: 'SMS & Notice Board' }] },
  { group: 'Add-on Services',   items: [{ id: 'library', label: 'Library & Transport' }] },
  { group: 'System',            items: [{ id: 'settings',label: 'Settings & Permissions' }] },
];

const SUPER_MENU = [
  {
    group: 'SaaS Administration',
    items: [
      { id: 'dashboard', label: '📊 Dashboard Overview' },
      { id: 'tenants', label: '🏢 Institutions Directory' },
      { id: 'school_admins', label: '👥 School Admin Profiles' },
      { id: 'plans', label: '💎 Subscription Plans' },
      { id: 'sms_gateway', label: '📱 SMS Gateway & Credits' },
      { id: 'analytics', label: '💰 Platform Financials' },
      { id: 'system', label: '🛡️ System & Isolation' },
    ]
  }
];

// ─────────────────────────────────────────────
//  App root
// ─────────────────────────────────────────────
export default function App() {
  const [activeTab,   setActiveTab]   = useState('dashboard');
  const [role,        setRole]        = useState(() => {
    // Load role from localStorage on mount
    const savedRole = localStorage.getItem('userRole');
    return savedRole || 'school_admin';
  });
  const [darkMode,    setDarkMode]    = useState(false);
  const [tenant,      setTenant]      = useState(DEMO_TENANTS[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Load authentication state from localStorage on mount
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });
  const [user, setUser] = useState(() => {
    // Load user data from localStorage on mount
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const switchRole = (newRole) => {
    setRole(newRole);
    setActiveTab(newRole === 'super_admin' ? 'dashboard' : 'dashboard');
  };

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark', !darkMode);
    setDarkMode(d => !d);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    if (userData.role === 'super_admin') {
      setRole('super_admin');
      setActiveTab('dashboard');
    } else {
      setRole('school_admin');
      setActiveTab('dashboard');
    }
    // Save to localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userRole', userData.role || 'school_admin');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setRole('school_admin');
    setActiveTab('dashboard');
    // Clear from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  };

  const menu = role === 'super_admin' ? SUPER_MENU : SCHOOL_MENU;

  const renderPage = () => {
    if (role === 'super_admin') {
      return <SuperAdminDashboard />;
    }

    if (activeTab === 'dashboard') return <SchoolAdminDashboard />;

    switch (activeTab) {
      case 'academic':   return <AcademicManagement />;
      case 'students':   return <StudentManagement />;
      case 'attendance': return <AttendanceLeaves />;
      case 'exams':      return <ExaminationResults />;
      case 'fees':       return <FeesAccounts />;
      case 'hr':         return <HRPayroll />;
      case 'sms':        return <CommunicationSMS />;
      case 'library':    return <LibraryTransport />;
      case 'settings':   return <SettingsCustomization />;
      default:           return <SchoolAdminDashboard />;
    }
  };

  // Shared context value consumed by all child pages via useAuthStore()
  const ctxValue = {
    tenant,
    setTenant: (t) => {
      setTenant(t);
      if (role === 'super_admin') {
        setRole('school_admin');
        setActiveTab('dashboard');
      }
    },
    role,
    setRole,
    activeTab,
    setActiveTab,
    selectedSession: '2026',
    availableTenants: DEMO_TENANTS,
    user,
    handleLogout
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <AuthCtx.Provider value={ctxValue}>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">

        {/* ════════════════  TOP NAVBAR  ════════════════ */}
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between gap-3">

          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs shadow"
                style={{ backgroundColor: role === 'super_admin' ? '#4f46e5' : '#059669' }}
              >
                {role === 'super_admin' ? 'SA' : tenant.short_name.slice(0, 2)}
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="font-extrabold text-xs text-slate-900 dark:text-white truncate max-w-[220px]">
                  {role === 'super_admin' ? 'SaaS Super Administrator' : tenant.name}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {role === 'super_admin' ? 'platform.edumanage.bd' : tenant.domain}
                </p>
              </div>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleDark}
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-base"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* ════════════════  BODY  ════════════════ */}
        <div className="flex flex-1 overflow-hidden">

          {/* SIDEBAR */}
          <aside
            className={`${sidebarOpen ? 'w-56' : 'w-0'} shrink-0 transition-all duration-300 overflow-hidden bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col py-3 overflow-y-auto`}
          >
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

            {/* Logged-in user stub */}
            <div className="mt-auto mx-3 mb-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <p className="font-bold text-slate-900 dark:text-white truncate">
                {role === 'super_admin' ? 'Super Administrator' : 'Prof. Kazi Faruq Ahmed'}
              </p>
              <p className="text-slate-400 text-[10px] capitalize">{role.replace(/_/g, ' ')}</p>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-5 lg:p-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </AuthCtx.Provider>
  );
}
