import React from 'react';
import { useAuthStore } from '../../services/authStore';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  GraduationCap,
  CreditCard,
  Clock,
  BellRing,
  Wallet,
  Settings,
  Building,
  BarChart3,
  Contact2,
  FileSpreadsheet,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, activeTab, setActiveTab, tenant } = useAuthStore();

  const isSuperAdmin = user.role === 'super_admin';

  const schoolAdminNav = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students & Admissions', icon: Users, badge: '1,250' },
    { id: 'attendance', label: 'Attendance & SMS Alert', icon: CalendarCheck, badge: '94.8%' },
    { id: 'exams', label: 'Exams & Tabulation (GPA 5.0)', icon: GraduationCap },
    { id: 'fees', label: 'Fees Collection & POS', icon: CreditCard, badge: 'bKash' },
    { id: 'routine', label: 'Class Routine Matrix', icon: Clock },
    { id: 'notices', label: 'Notices & Bulk SMS Portal', icon: BellRing },
    { id: 'payroll', label: 'Payroll & Accounts', icon: Wallet },
    { id: 'academic', label: 'Academic Setup', icon: Settings },
  ];

  const superAdminNav = [
    { id: 'superadmin_tenants', label: 'All Schools & Colleges', icon: Building, badge: '38' },
    { id: 'superadmin_analytics', label: 'SaaS Platform Analytics', icon: BarChart3 },
    { id: 'academic', label: 'Global System Config', icon: Settings },
  ];

  const teacherNav = [
    { id: 'dashboard', label: 'Teacher Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Take Class Attendance', icon: CalendarCheck },
    { id: 'exams', label: 'Enter Exam Marks', icon: GraduationCap },
    { id: 'routine', label: 'My Teaching Schedule', icon: Clock },
    { id: 'notices', label: 'School Notices', icon: BellRing },
  ];

  const studentNav = [
    { id: 'dashboard', label: 'Student Portal', icon: LayoutDashboard },
    { id: 'students', label: 'Digital ID Card', icon: Contact2 },
    { id: 'exams', label: 'Exam Results & Marksheet', icon: FileSpreadsheet },
    { id: 'fees', label: 'Fee Dues & Online Pay', icon: CreditCard },
    { id: 'routine', label: 'Class Routine', icon: Clock },
    { id: 'notices', label: 'Notices & Circulars', icon: BellRing },
  ];

  let currentNav = schoolAdminNav;
  if (isSuperAdmin) currentNav = superAdminNav;
  else if (user.role === 'teacher') currentNav = teacherNav;
  else if (user.role === 'student') currentNav = studentNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Brand Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  EduManage<span className="text-emerald-600 dark:text-emerald-400 font-black">BD</span>
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {isSuperAdmin ? 'Platform SaaS' : 'School Core'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Navigation Menu
            </div>
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live NCTB BD 2026
            </span>
            <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">v2.5</span>
          </div>
        </div>
      </aside>
    </>
  );
};
