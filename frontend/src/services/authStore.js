import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: {
    id: 2,
    name: 'Prof. Kazi Faruq Ahmed',
    title: 'Principal',
    email: 'principal@drmc.edu.bd',
    role: 'school_admin', // 'super_admin' | 'school_admin' | 'teacher' | 'student' | 'accountant'
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  tenant: {
    id: 1,
    uuid: '0190a42f-871d-7201-987a-351df986aa01',
    name: 'Dhaka Residential Model College',
    short_name: 'DRMC',
    eiin_number: '107985',
    board_name: 'Dhaka',
    subdomain: 'drmc',
    custom_domain: 'drmc.edu.bd',
    logo_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80',
    theme_color: '#059669',
    sms_balance: 4500,
    plan_name: 'Enterprise College'
  },
  availableTenants: [
    {
      id: 1,
      name: 'Dhaka Residential Model College',
      short_name: 'DRMC',
      eiin_number: '107985',
      subdomain: 'drmc',
      theme_color: '#059669',
      sms_balance: 4500,
      students_count: 3200,
      plan_name: 'Enterprise College'
    },
    {
      id: 2,
      name: 'Ideal School and College',
      short_name: 'ISC',
      eiin_number: '108277',
      subdomain: 'idealschool',
      theme_color: '#2563eb',
      sms_balance: 3200,
      students_count: 5400,
      plan_name: 'Enterprise College'
    },
    {
      id: 3,
      name: 'Chittagong Collegiate School',
      short_name: 'CCS',
      eiin_number: '104044',
      subdomain: 'collegiate',
      theme_color: '#7c3aed',
      sms_balance: 1200,
      students_count: 1800,
      plan_name: 'Standard High School'
    }
  ],
  selectedSession: '2026',
  darkMode: false,
  activeTab: 'dashboard', // dashboard, students, attendance, exams, fees, routine, notices, payroll, academic, superadmin_tenants, superadmin_analytics

  // Actions
  setUser: (user) => set({ user }),
  setTenant: (tenant) => {
    localStorage.setItem('edumanage_tenant_id', tenant.id);
    set({ tenant });
  },
  switchTenantById: (tenantId) => {
    const found = get().availableTenants.find((t) => t.id === Number(tenantId));
    if (found) {
      localStorage.setItem('edumanage_tenant_id', found.id);
      set({ tenant: found });
    }
  },
  switchRole: (role) => {
    const rolesMap = {
      super_admin: {
        id: 1,
        name: 'Super Admin (BD SaaS Platform)',
        title: 'Platform Director',
        email: 'superadmin@edumanage.bd',
        role: 'super_admin',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      school_admin: {
        id: 2,
        name: 'Prof. Kazi Faruq Ahmed',
        title: 'Principal',
        email: 'principal@drmc.edu.bd',
        role: 'school_admin',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      teacher: {
        id: 3,
        name: 'Mohammad Rafiqul Islam',
        title: 'Senior Math Teacher',
        email: 'rafiq.math@drmc.edu.bd',
        role: 'teacher',
        avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      },
      accountant: {
        id: 5,
        name: 'Md. Shahinur Rahman',
        title: 'Accounts Officer',
        email: 'accounts@drmc.edu.bd',
        role: 'accountant',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
      },
      student: {
        id: 6,
        name: 'Tanvir Hasan (Roll 1)',
        title: 'Class 10 Student',
        email: 'tanvir.student@drmc.edu.bd',
        role: 'student',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      }
    };

    const targetUser = rolesMap[role] || rolesMap.school_admin;
    const nextTab = role === 'super_admin' ? 'superadmin_tenants' : 'dashboard';
    set({ user: targetUser, activeTab: nextTab });
  },
  setSelectedSession: (session) => set({ selectedSession: session }),
  toggleDarkMode: () => {
    const nextMode = !get().darkMode;
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ darkMode: nextMode });
  },
  setActiveTab: (tab) => set({ activeTab: tab })
}));
