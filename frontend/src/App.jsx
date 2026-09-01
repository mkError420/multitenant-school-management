import React, { useState } from 'react';
import { useAuthStore } from './services/authStore';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';

// Pages
import { SuperAdminDashboard } from './pages/superadmin/SuperAdminDashboard';
import { DashboardOverview } from './pages/schooladmin/DashboardOverview';
import { StudentsDirectory } from './pages/schooladmin/StudentsDirectory';
import { AttendanceMatrix } from './pages/schooladmin/AttendanceMatrix';
import { ExamsTabulation } from './pages/schooladmin/ExamsTabulation';
import { FeeCollectionPOS } from './pages/schooladmin/FeeCollectionPOS';
import { ClassRoutineView } from './pages/schooladmin/ClassRoutineView';
import { NoticeAndSMSPortal } from './pages/schooladmin/NoticeAndSMSPortal';
import { PayrollAccounts } from './pages/schooladmin/PayrollAccounts';
import { AcademicSetup } from './pages/schooladmin/AcademicSetup';

export function App() {
  const { activeTab, user } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'superadmin_tenants':
      case 'superadmin_analytics':
        return <SuperAdminDashboard />;
      case 'students':
        return <StudentsDirectory />;
      case 'attendance':
        return <AttendanceMatrix />;
      case 'exams':
        return <ExamsTabulation />;
      case 'fees':
        return <FeeCollectionPOS />;
      case 'routine':
        return <ClassRoutineView />;
      case 'notices':
        return <NoticeAndSMSPortal />;
      case 'payroll':
        return <PayrollAccounts />;
      case 'academic':
        return <AcademicSetup />;
      case 'dashboard':
      default:
        return user.role === 'super_admin' ? <SuperAdminDashboard /> : <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <div className="flex flex-1">
        {/* Responsive Sidebar */}
        <Sidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navbar */}
          <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

          {/* Page Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
            {renderActiveView()}
          </main>

          {/* SaaS Footer */}
          <footer className="no-print border-t border-slate-200 dark:border-slate-800 py-4 px-6 text-center text-xs text-slate-400">
            <p>
              © 2026 <strong>EduManageBD SaaS Platform</strong>. Tailored for Bangladesh Primary, High School & College Education Boards.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
