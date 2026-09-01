import React, { useState } from 'react';
import { useAuthStore } from '../../services/authStore';
import { GraduationCap, X, ChevronDown, ChevronRight } from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, activeTab, setActiveTab, tenant } = useAuthStore();
  const [expandedSections, setExpandedSections] = useState({});

  const isSuperAdmin = user.role === 'super_admin';

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const schoolAdminNav = [
    {
      section: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard Overview' }
      ]
    },
    {
      section: 'Student Management',
      items: [
        { 
          id: 'students', 
          label: 'Student Management',
          hasSubmenu: true,
          submenu: [
            { id: 'students_directory', label: 'Student Directory' },
            { id: 'students_admission', label: 'New Admission Form' },
            { id: 'students_idcard', label: 'ID Card Generator' },
            { id: 'students_promotion', label: 'Promotion Engine' },
            { id: 'students_certificates', label: 'TC & Certificates' }
          ]
        }
      ]
    },
    {
      section: 'Academic',
      items: [
        { 
          id: 'academic', 
          label: 'Academic Management',
          hasSubmenu: true,
          submenu: [
            { id: 'academic_sessions', label: 'Sessions (2026-27)' },
            { id: 'academic_shifts', label: 'Shifts & Versions' },
            { id: 'academic_classes', label: 'Classes & Sections' },
            { id: 'academic_subjects', label: 'Subjects & Teachers' },
            { id: 'academic_routine', label: 'Routine Matrix' }
          ]
        },
        { 
          id: 'exams', 
          label: 'Examination & Results',
          hasSubmenu: true,
          submenu: [
            { id: 'exams_tabulation', label: 'Tabulation & Marksheets' },
            { id: 'exams_marks', label: 'Marks Entry Portal' },
            { id: 'exams_setup', label: 'Exam Setup & Weightage' },
            { id: 'exams_grading', label: 'Grading Scale (5.0)' },
            { id: 'exams_admit', label: 'Admit Card Generator' }
          ]
        }
      ]
    },
    {
      section: 'Attendance & Leave Management',
      items: [
        { 
          id: 'attendance', 
          label: 'Attendance & Leave Management',
          hasSubmenu: true,
          submenu: [
            { id: 'attendance_student', label: 'Student Attendance & RFID' },
            { id: 'attendance_staff', label: 'Staff Check-in/Out' },
            { id: 'attendance_leave', label: 'Leave Applications' },
            { id: 'attendance_reports', label: 'Reports & Absentee SMS' }
          ]
        }
      ]
    },
    {
      section: 'Finance',
      items: [
        { 
          id: 'fees', 
          label: 'Fees & Accounts (POS)',
          hasSubmenu: true,
          submenu: [
            { id: 'fees_pos', label: 'POS Counter & bKash' },
            { id: 'fees_due', label: 'Due Fees & SMS Reminders' },
            { id: 'fees_structure', label: 'Fee Structure Setup' },
            { id: 'fees_invoices', label: 'Invoices & 3-Part Receipts' },
            { id: 'fees_ledger', label: 'Income / Expense Ledger' }
          ]
        },
        { 
          id: 'payroll', 
          label: 'HR & Payroll',
          hasSubmenu: true,
          submenu: [
            { id: 'payroll_salary', label: 'Salary Disbursement' },
            { id: 'payroll_staff', label: 'Staff Directory' },
            { id: 'payroll_setup', label: 'Payroll Setup' },
            { id: 'payroll_bank', label: 'Bank Transfer Sheet' }
          ]
        }
      ]
    },
    {
      section: 'Communication',
      items: [
        { 
          id: 'notices', 
          label: 'SMS & Notice Board',
          hasSubmenu: true,
          submenu: [
            { id: 'notices_sms', label: 'Bulk SMS Gateway' },
            { id: 'notices_board', label: 'Notice Board' },
            { id: 'notices_calendar', label: 'Event Calendar' }
          ]
        }
      ]
    },
    {
      section: 'Add-on Services',
      items: [
        { 
          id: 'library', 
          label: 'Library & Transport',
          hasSubmenu: true,
          submenu: [
            { id: 'library_catalog', label: 'Library Catalog & Issues' },
            { id: 'library_transport', label: 'Transport Routes & Fleet' }
          ]
        }
      ]
    },
    {
      section: 'System',
      items: [
        { 
          id: 'settings', 
          label: 'Settings & Permissions',
          hasSubmenu: true,
          submenu: [
            { id: 'settings_profile', label: 'School Profile & Branding' },
            { id: 'settings_roles', label: 'Roles & Permissions' },
            { id: 'settings_audit', label: 'Audit Activity Logs' }
          ]
        }
      ]
    }
  ];

  const superAdminNav = [
    {
      section: 'Platform Management',
      items: [
        { id: 'superadmin_tenants', label: 'All Schools & Colleges', badge: '38' },
        { id: 'superadmin_analytics', label: 'SaaS Platform Analytics' }
      ]
    },
    {
      section: 'System',
      items: [
        { id: 'academic', label: 'Global System Config' }
      ]
    }
  ];

  const teacherNav = [
    {
      section: 'Main',
      items: [
        { id: 'dashboard', label: 'Teacher Dashboard' }
      ]
    },
    {
      section: 'Classroom',
      items: [
        { id: 'attendance', label: 'Take Class Attendance' },
        { id: 'exams', label: 'Enter Exam Marks' },
        { id: 'routine', label: 'My Teaching Schedule' }
      ]
    },
    {
      section: 'Information',
      items: [
        { id: 'notices', label: 'School Notices' }
      ]
    }
  ];

  const studentNav = [
    {
      section: 'Main',
      items: [
        { id: 'dashboard', label: 'Student Portal' }
      ]
    },
    {
      section: 'Academic',
      items: [
        { id: 'students', label: 'Digital ID Card' },
        { id: 'exams', label: 'Exam Results & Marksheet' },
        { id: 'routine', label: 'Class Routine' }
      ]
    },
    {
      section: 'Finance',
      items: [
        { id: 'fees', label: 'Fee Dues & Online Pay' }
      ]
    },
    {
      section: 'Information',
      items: [
        { id: 'notices', label: 'Notices & Circulars' }
      ]
    }
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
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
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
          <div className="px-3 py-4 space-y-4 overflow-y-auto max-h-[calc(100vh-140px)]">
            {currentNav.map((section) => (
              <div key={section.section}>
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {section.section}
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = activeTab === item.id;
                    const isExpanded = expandedSections[item.id];
                    const isSubmenuActive = item.submenu?.some(sub => activeTab === sub.id);
                    
                    if (item.hasSubmenu) {
                      return (
                        <div key={item.id}>
                          <button
                            onClick={() => toggleSection(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all border-l-4 ${
                              isSubmenuActive || isActive
                                ? 'bg-emerald-50 border-emerald-600 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100'
                                : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-emerald-300'
                            }`}
                          >
                            <span>{item.label}</span>
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                          {isExpanded && item.submenu && (
                            <div className="ml-4 mt-1 space-y-1">
                              {item.submenu.map((subItem) => {
                                const isSubActive = activeTab === subItem.id;
                                return (
                                  <button
                                    key={subItem.id}
                                    onClick={() => {
                                      setActiveTab(subItem.id);
                                      onClose();
                                    }}
                                    className={`w-full flex items-center px-4 py-2 rounded-lg text-xs font-medium transition-all border-l-2 ${
                                      isSubActive
                                        ? 'bg-emerald-100 border-emerald-600 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100'
                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-emerald-400'
                                    }`}
                                  >
                                    <span>{subItem.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          onClose();
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all border-l-4 ${
                          isActive
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100'
                            : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-emerald-300'
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded ${
                              isActive
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
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
            ))}
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
