import React, { useState, useEffect } from 'react';
import { StatCard, Badge, Modal } from '../../components/common/StatCard';
import {
  Building2,
  Users,
  Layers,
  Send,
  BarChart3,
  Server,
  Plus,
  Search,
  Power,
  ExternalLink,
  Edit,
  Trash2,
  DollarSign,
  CheckCircle2,
  Database,
  Phone,
  Mail,
  Lock,
  Sparkles,
  ShieldCheck,
  XCircle
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';
import { schoolAdminApi } from '../../services/schoolAdminApi';

export const SuperAdminDashboard = () => {
  const { tenant, setTenant, setActiveTab, activeTab } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRechargeSMSModalOpen, setIsRechargeSMSModalOpen] = useState(false);
  const [selectedTenantForSMS, setSelectedTenantForSMS] = useState(null);
  const [smsRechargeAmount, setSmsRechargeAmount] = useState(1000);
  const [isSchoolAdminModalOpen, setIsSchoolAdminModalOpen] = useState(false);
  const [selectedSchoolAdmin, setSelectedSchoolAdmin] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initial Tenants List
  const [tenantsList, setTenantsList] = useState([
    {
      id: 1,
      name: 'Mane School and College',
      short_name: 'MANE',
      eiin: '107985',
      subdomain: 'maneschool',
      domain: 'maneschool.site.je',
      board: 'Dhaka',
      plan_name: 'Enterprise College',
      plan_id: 3,
      students_count: 1250,
      teachers_count: 45,
      monthly_fee: 10000.00,
      sms_balance: 4500,
      status: 'active',
      created_at: '2025-01-10',
      contact_email: 'info@maneschool.site.je',
      contact_phone: '+8801711111111'
    },
    {
      id: 2,
      name: 'Dhaka Residential Model College',
      short_name: 'DRMC',
      eiin: '108277',
      subdomain: 'drmc',
      domain: 'drmc.edu.bd',
      board: 'Dhaka',
      plan_name: 'Enterprise College',
      plan_id: 3,
      students_count: 3200,
      teachers_count: 110,
      monthly_fee: 10000.00,
      sms_balance: 3200,
      status: 'active',
      created_at: '2024-11-15',
      contact_email: 'principal@drmc.edu.bd',
      contact_phone: '+8801711222222'
    },
    {
      id: 3,
      name: 'Ideal School and College',
      short_name: 'ISC',
      eiin: '104044',
      subdomain: 'idealschool',
      domain: 'idealschool.edu.bd',
      board: 'Dhaka',
      plan_name: 'Enterprise College',
      plan_id: 3,
      students_count: 5400,
      teachers_count: 180,
      monthly_fee: 10000.00,
      sms_balance: 1200,
      status: 'active',
      created_at: '2024-08-20',
      contact_email: 'contact@idealschool.edu.bd',
      contact_phone: '+8801811000002'
    },
    {
      id: 4,
      name: 'Chittagong Collegiate School',
      short_name: 'CCS',
      eiin: '104483',
      subdomain: 'ccs',
      domain: 'ccs.edu.bd',
      board: 'Chittagong',
      plan_name: 'Standard High School',
      plan_id: 2,
      students_count: 1450,
      teachers_count: 55,
      monthly_fee: 5000.00,
      sms_balance: 850,
      status: 'active',
      created_at: '2025-02-01',
      contact_email: 'info@ccs.edu.bd',
      contact_phone: '+8801811333333'
    },
    {
      id: 5,
      name: 'Rajshahi Collegiate School',
      short_name: 'RCS',
      eiin: '126480',
      subdomain: 'rcs',
      domain: 'rcs.edu.bd',
      board: 'Rajshahi',
      plan_name: 'Basic School (Primary)',
      plan_id: 1,
      students_count: 480,
      teachers_count: 22,
      monthly_fee: 2500.00,
      sms_balance: 150,
      status: 'trial',
      created_at: '2026-02-15',
      contact_email: 'headmaster@rcs.edu.bd',
      contact_phone: '+8801711444444'
    }
  ]);

  // Subscription Plans
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Basic School (Primary)',
      slug: 'basic',
      price_monthly: 2500,
      price_yearly: 25000,
      max_students: 500,
      max_teachers: 25,
      sms_credits: 500,
      features: ['Core Admission', 'Daily Attendance', 'Basic Marksheet', 'Cash POS']
    },
    {
      id: 2,
      name: 'Standard High School',
      slug: 'standard',
      price_monthly: 5000,
      price_yearly: 50000,
      max_students: 1500,
      max_teachers: 60,
      sms_credits: 2000,
      features: ['NCTB GPA 5.0 Engine', 'RFID & Biometric Sync', 'bKash Gateway POS', 'Admit Cards & ID Cards']
    },
    {
      id: 3,
      name: 'Enterprise Model College',
      slug: 'enterprise',
      price_monthly: 10000,
      price_yearly: 100000,
      max_students: 5000,
      max_teachers: 200,
      sms_credits: 5000,
      features: ['Custom Domain SSL', 'Complete Payroll & HR', 'Transport & Library', 'Priority 24/7 Dedicated Server']
    }
  ]);

  // Form State for New School
  const [newSchool, setNewSchool] = useState({
    name: '',
    short_name: '',
    eiin: '',
    subdomain: '',
    custom_domain: '',
    board: 'Dhaka',
    plan_id: 3,
    contact_email: '',
    contact_phone: '+8801700000000'
  });

  // School Admins List - Load from API
  const [schoolAdmins, setSchoolAdmins] = useState([]);
  const [isLoadingSchoolAdmins, setIsLoadingSchoolAdmins] = useState(false);

  // Load school admins from API on mount
  useEffect(() => {
    loadSchoolAdmins();
  }, []);

  const loadSchoolAdmins = async () => {
    setIsLoadingSchoolAdmins(true);
    try {
      const response = await schoolAdminApi.getSchoolAdmins();
      if (response.success) {
        setSchoolAdmins(response.data);
      }
    } catch (error) {
      console.error('Failed to load school admins:', error);
      // Fallback to localStorage if API fails
      const saved = localStorage.getItem('schoolAdmins');
      if (saved) {
        setSchoolAdmins(JSON.parse(saved));
      }
    } finally {
      setIsLoadingSchoolAdmins(false);
    }
  };

  // Form State for School Admin
  const [schoolAdminForm, setSchoolAdminForm] = useState({
    name: '',
    email: '',
    phone: '',
    school_id: '',
    role: 'Admin',
    status: 'active',
    password: '',
    confirm_password: ''
  });

  // Filter Tenants
  const filteredTenants = tenantsList.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.eiin && t.eiin.includes(searchTerm)) ||
      (t.subdomain && t.subdomain.includes(searchTerm));
    const matchesStatus =
      selectedStatusFilter === 'all' || t.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddSchool = (e) => {
    e.preventDefault();
    const selectedPlan = plans.find(p => p.id === Number(newSchool.plan_id)) || plans[2];
    const createdTenant = {
      id: tenantsList.length + 1,
      name: newSchool.name,
      short_name: newSchool.short_name || newSchool.name.slice(0, 4).toUpperCase(),
      eiin: newSchool.eiin,
      subdomain: newSchool.subdomain.toLowerCase(),
      domain: newSchool.custom_domain || `${newSchool.subdomain.toLowerCase()}.edumanage.bd`,
      board: newSchool.board,
      plan_name: selectedPlan.name,
      plan_id: selectedPlan.id,
      students_count: 0,
      teachers_count: 0,
      monthly_fee: selectedPlan.price_monthly,
      sms_balance: selectedPlan.sms_credits,
      status: 'active',
      created_at: new Date().toISOString().split('T')[0],
      contact_email: newSchool.contact_email,
      contact_phone: newSchool.contact_phone
    };

    setTenantsList([...tenantsList, createdTenant]);
    alert(`🎉 Institution "${createdTenant.name}" onboarded successfully with subdomain: ${createdTenant.subdomain}.edumanage.bd`);
    setIsAddModalOpen(false);
  };

  const handleToggleStatus = (tenantId) => {
    setTenantsList(tenantsList.map(t => {
      if (t.id === tenantId) {
        const nextStatus = t.status === 'active' ? 'suspended' : 'active';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleRechargeSMS = (e) => {
    e.preventDefault();
    if (!selectedTenantForSMS) return;
    const amount = Number(smsRechargeAmount);
    setTenantsList(tenantsList.map(t => {
      if (t.id === selectedTenantForSMS.id) {
        return { ...t, sms_balance: t.sms_balance + amount };
      }
      return t;
    }));
    alert(`✅ Added ${amount} SMS credits to ${selectedTenantForSMS.name}. New Balance: ${selectedTenantForSMS.sms_balance + amount}`);
    setIsRechargeSMSModalOpen(false);
  };

  const handleImpersonateTenant = (targetTenant) => {
    setTenant(targetTenant);
    setActiveTab('dashboard');
    alert(`Switched active portal to: ${targetTenant.name}`);
  };

  // School Admin Handlers
  const handleAddSchoolAdmin = async (e) => {
    e.preventDefault();
    
    // Password validation
    if (schoolAdminForm.password && schoolAdminForm.password !== schoolAdminForm.confirm_password) {
      alert('❌ Passwords do not match!');
      return;
    }
    
    if (schoolAdminForm.password && schoolAdminForm.password.length < 6) {
      alert('❌ Password must be at least 6 characters long!');
      return;
    }
    
    const selectedSchool = tenantsList.find(t => t.id === Number(schoolAdminForm.school_id));
    const adminData = {
      name: schoolAdminForm.name,
      email: schoolAdminForm.email,
      phone: schoolAdminForm.phone,
      school_id: Number(schoolAdminForm.school_id),
      role: schoolAdminForm.role,
      status: schoolAdminForm.status,
      password: schoolAdminForm.password || 'default123'
    };

    try {
      const response = await schoolAdminApi.createSchoolAdmin(adminData);
      if (response.success) {
        await loadSchoolAdmins(); // Reload from API
        alert(`✅ School admin "${adminData.name}" created successfully for ${selectedSchool?.name || 'Unknown School'}`);
        setIsSchoolAdminModalOpen(false);
        setSchoolAdminForm({
          name: '',
          email: '',
          phone: '',
          school_id: '',
          role: 'Admin',
          status: 'active',
          password: '',
          confirm_password: ''
        });
      }
    } catch (error) {
      alert('❌ Failed to create school admin. Please try again.');
    }
  };

  const handleEditSchoolAdmin = (admin) => {
    setSelectedSchoolAdmin(admin);
    setSchoolAdminForm({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      school_id: admin.school_id,
      role: admin.role,
      status: admin.status,
      password: '',
      confirm_password: ''
    });
    setIsSchoolAdminModalOpen(true);
  };

  const handleUpdateSchoolAdmin = async (e) => {
    e.preventDefault();
    
    // Password validation for password change
    if (schoolAdminForm.password && schoolAdminForm.password !== schoolAdminForm.confirm_password) {
      alert('❌ Passwords do not match!');
      return;
    }
    
    if (schoolAdminForm.password && schoolAdminForm.password.length < 6) {
      alert('❌ Password must be at least 6 characters long!');
      return;
    }
    
    const adminData = {
      id: selectedSchoolAdmin.id,
      name: schoolAdminForm.name,
      email: schoolAdminForm.email,
      phone: schoolAdminForm.phone,
      school_id: Number(schoolAdminForm.school_id),
      role: schoolAdminForm.role,
      status: schoolAdminForm.status,
      password: schoolAdminForm.password
    };

    try {
      const response = await schoolAdminApi.updateSchoolAdmin(adminData);
      if (response.success) {
        await loadSchoolAdmins(); // Reload from API
        const message = schoolAdminForm.password 
          ? `✅ School admin "${schoolAdminForm.name}" updated successfully with new password`
          : `✅ School admin "${schoolAdminForm.name}" updated successfully`;
        alert(message);
        setIsSchoolAdminModalOpen(false);
        setSelectedSchoolAdmin(null);
        setSchoolAdminForm({
          name: '',
          email: '',
          phone: '',
          school_id: '',
          role: 'Admin',
          status: 'active',
          password: '',
          confirm_password: ''
        });
      }
    } catch (error) {
      alert('❌ Failed to update school admin. Please try again.');
    }
  };

  const handleDeleteSchoolAdmin = async (adminId) => {
    if (confirm('Are you sure you want to delete this school admin?')) {
      try {
        const response = await schoolAdminApi.deleteSchoolAdmin(adminId);
        if (response.success) {
          await loadSchoolAdmins(); // Reload from API
          alert('School admin deleted successfully');
        }
      } catch (error) {
        alert('❌ Failed to delete school admin. Please try again.');
      }
    }
  };

  const handleToggleSchoolAdminStatus = async (adminId) => {
    try {
      const response = await schoolAdminApi.toggleSchoolAdminStatus(adminId);
      if (response.success) {
        await loadSchoolAdmins(); // Reload from API
      }
    } catch (error) {
      alert('❌ Failed to toggle school admin status. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Super Admin Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl border border-indigo-900/50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              SaaS Multi-Tenant Super Administrator Console
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold">
              Bangladesh School & College SaaS Platform
            </h1>
            <p className="text-slate-300 text-xs lg:text-sm mt-1 max-w-xl">
              Centralized multitenancy control: Manage {tenantsList.length} live institutions across 8 Bangladesh Education Boards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Onboard New Institution</span>
            </button>
          </div>
        </div>
      </div>

      {/* SaaS High-Level KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Tenant Schools"
          value={`${tenantsList.filter(t => t.status === 'active').length} Institutions`}
          change="2 new"
          isPositive={true}
          icon={Building2}
          color="emerald"
          subtext="Dhaka, Ctg, Rajshahi"
        />
        <StatCard
          title="Total Hosted Students"
          value={tenantsList.reduce((acc, t) => acc + t.students_count, 0).toLocaleString()}
          change="14%"
          isPositive={true}
          icon={Users}
          color="blue"
          subtext="across all client schools"
        />
        <StatCard
          title="Monthly Recurring Revenue"
          value={`৳ ${tenantsList.reduce((acc, t) => acc + (t.status === 'active' ? t.monthly_fee : 0), 0).toLocaleString()}`}
          change="12%"
          isPositive={true}
          icon={DollarSign}
          color="indigo"
          subtext="SaaS subscription MRR"
        />
        <StatCard
          title="Total SMS Pool Available"
          value={tenantsList.reduce((acc, t) => acc + t.sms_balance, 0).toLocaleString()}
          icon={Send}
          color="purple"
          subtext="GreenwebBD Gateway active"
        />
      </div>

      {/* ═══════════ DASHBOARD OVERVIEW ═══════════ */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white rounded-3xl p-6 lg:p-8 shadow-xl border border-indigo-500/50 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <h1 className="text-2xl lg:text-3xl font-extrabold mb-2">
                Welcome, Super Administrator
              </h1>
              <p className="text-indigo-100 text-sm lg:text-base max-w-2xl">
                Monitor your SaaS platform performance, manage tenant institutions, and oversee school administrator accounts across the entire platform.
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Institutions"
              value={tenantsList.length}
              change="+2 this month"
              isPositive={true}
              icon={Building2}
              color="emerald"
              subtext="Active schools & colleges"
            />
            <StatCard
              title="School Admins"
              value={schoolAdmins.length}
              change="+5 new admins"
              isPositive={true}
              icon={Users}
              color="blue"
              subtext="Platform administrators"
            />
            <StatCard
              title="Monthly Revenue"
              value={`৳ ${tenantsList.reduce((acc, t) => acc + (t.status === 'active' ? t.monthly_fee : 0), 0).toLocaleString()}`}
              change="+12% growth"
              isPositive={true}
              icon={DollarSign}
              color="indigo"
              subtext="SaaS subscriptions"
            />
            <StatCard
              title="SMS Credits Pool"
              value={tenantsList.reduce((acc, t) => acc + t.sms_balance, 0).toLocaleString()}
              icon={Send}
              color="purple"
              subtext="Available for distribution"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab('tenants')}
                className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 hover:bg-emerald-100 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">Add New Institution</p>
                  <p className="text-xs text-slate-500">Onboard a new school</p>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('school_admins')}
                className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">Manage Admins</p>
                  <p className="text-xs text-slate-500">View school administrators</p>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('sms_gateway')}
                className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 hover:bg-purple-100 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">SMS Credits</p>
                  <p className="text-xs text-slate-500">Manage SMS allocation</p>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">New institution onboarded</p>
                  <p className="text-[10px] text-slate-500">Rajshahi Collegiate School joined the platform</p>
                </div>
                <span className="text-[10px] text-slate-400">2 hours ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">School admin created</p>
                  <p className="text-[10px] text-slate-500">New admin added for Ideal School and College</p>
                </div>
                <span className="text-[10px] text-slate-400">5 hours ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                  <Send className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">SMS credits distributed</p>
                  <p className="text-[10px] text-slate-500">5,000 SMS credits added to DRMC account</p>
                </div>
                <span className="text-[10px] text-slate-400">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ TENANTS DIRECTORY ═══════════ */}
      {activeTab === 'tenants' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          {/* Filter Bar */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Client Institutions & Colleges Directory
                </h3>
                <p className="text-xs text-slate-500">Live tenant row-level data isolation status</p>
              </div>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="trial">Trial Mode</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by school, EIIN, subdomain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Institution Name & EIIN</th>
                  <th className="py-3.5 px-4">Subdomain / Live URL</th>
                  <th className="py-3.5 px-4">Plan & Billing</th>
                  <th className="py-3.5 px-4">Students</th>
                  <th className="py-3.5 px-4">SMS Balance</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredTenants.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                          {item.short_name}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                          <p className="text-[11px] text-slate-400">EIIN: {item.eiin} • {item.board} Board</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400">
                      <div>{item.subdomain}.edumanage.bd</div>
                      {item.domain && item.domain !== `${item.subdomain}.edumanage.bd` && (
                        <div className="text-[10px] text-slate-400 font-semibold">{item.domain}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="purple">{item.plan_name}</Badge>
                      <p className="text-[10px] text-slate-500 font-bold mt-0.5">৳{item.monthly_fee.toLocaleString()} / mo</p>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {item.students_count?.toLocaleString()} Students
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{item.sms_balance?.toLocaleString()}</span>
                        <button
                          onClick={() => { setSelectedTenantForSMS(item); setIsRechargeSMSModalOpen(true); }}
                          className="px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold hover:bg-purple-100"
                        >
                          + Add
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={item.status === 'active' ? 'success' : item.status === 'trial' ? 'warning' : 'danger'}>
                        {item.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleStatus(item.id)}
                          className={`p-1.5 rounded-lg text-[10px] font-bold border ${
                            item.status === 'active'
                              ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                              : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={item.status === 'active' ? 'Suspend Tenant' : 'Activate Tenant'}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleImpersonateTenant(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-100 transition-colors"
                        >
                          <span>Launch</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════ SCHOOL ADMIN PROFILES ═══════════ */}
      {activeTab === 'school_admins' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                School Administrator Profiles
              </h3>
              <p className="text-xs text-slate-500">Manage school admin accounts and permissions</p>
            </div>
            <button
              onClick={() => {
                setSelectedSchoolAdmin(null);
                setSchoolAdminForm({
                  name: '',
                  email: '',
                  phone: '',
                  school_id: '',
                  role: 'Admin',
                  status: 'active',
                  password: '',
                  confirm_password: ''
                });
                setIsSchoolAdminModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add School Admin</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Admin Name & Contact</th>
                  <th className="py-3.5 px-4">School</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Created</th>
                  <th className="py-3.5 px-4">Last Login</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {schoolAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{admin.name}</p>
                        <p className="text-[11px] text-slate-400">{admin.email}</p>
                        <p className="text-[10px] text-slate-400">{admin.phone}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="indigo">{admin.school_name}</Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                        {admin.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={admin.status === 'active' ? 'success' : 'danger'}>
                        {admin.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {admin.created_at}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {admin.last_login || 'Never'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleSchoolAdminStatus(admin.id)}
                          className={`p-1.5 rounded-lg text-[10px] font-bold border ${
                            admin.status === 'active'
                              ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                              : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={admin.status === 'active' ? 'Suspend Admin' : 'Activate Admin'}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEditSchoolAdmin(admin)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                          title="Edit Admin"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSchoolAdmin(admin.id)}
                          className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                          title="Delete Admin"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════ PLANS & PRICING ═══════════ */}
      {activeTab === 'plans' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                SaaS Subscription Plans & Tier Limits
              </h3>
              <p className="text-xs text-slate-500">Configure feature gates and monthly/yearly pricing in BDT</p>
            </div>
            <button onClick={() => alert('New Plan creation modal')} className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow hover:bg-indigo-700">
              + Create Custom Plan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-black text-lg text-slate-900 dark:text-white">{p.name}</h4>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] font-bold">
                      {p.slug}
                    </span>
                  </div>

                  <div className="py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-3xl font-black text-emerald-600">৳{p.price_monthly.toLocaleString()}<span className="text-xs text-slate-400 font-normal"> / month</span></p>
                    <p className="text-xs text-slate-500 font-semibold">৳{p.price_yearly.toLocaleString()} billed annually</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="flex items-center gap-2"><strong>Max Students:</strong> {p.max_students.toLocaleString()} students</p>
                    <p className="flex items-center gap-2"><strong>Max Faculty:</strong> {p.max_teachers} teachers</p>
                    <p className="flex items-center gap-2"><strong>Included SMS:</strong> {p.sms_credits} SMS / month</p>
                  </div>

                  <div className="pt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <p className="font-bold text-[10px] uppercase text-slate-400">Included Modules:</p>
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={() => alert(`Editing Plan: ${p.name}`)} className="w-full py-2 bg-slate-100 dark:bg-slate-800 font-bold text-xs rounded-xl hover:bg-slate-200">
                  Edit Plan Parameters
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════ SMS GATEWAY ═══════════ */}
      {activeTab === 'sms_gateway' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-base">Bulk SMS Gateway & Institutional Quota Distribution</h3>
              <p className="text-xs text-slate-500">Connected Gateway: <strong>GreenwebBD (Primary)</strong> & <strong>BulkSMSBD (Failover)</strong></p>
            </div>
            <div className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl border border-emerald-200">
              API Status: Online (Latency: 42ms)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200">
              <span className="text-[10px] font-bold text-purple-700 uppercase">Master API Balance</span>
              <h4 className="text-2xl font-black text-purple-900 dark:text-purple-200 mt-1">450,000 SMS</h4>
              <p className="text-[11px] text-purple-600 mt-0.5">Masking Approved Sender: <strong>EDUMANAGE</strong></p>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Total Allocated to Schools</span>
              <h4 className="text-2xl font-black text-emerald-900 dark:text-emerald-200 mt-1">9,900 SMS</h4>
              <p className="text-[11px] text-emerald-600 mt-0.5">Across {tenantsList.length} client schools</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200">
              <span className="text-[10px] font-bold text-blue-700 uppercase">Dispatched This Month</span>
              <h4 className="text-2xl font-black text-blue-900 dark:text-blue-200 mt-1">142,800 Sent</h4>
              <p className="text-[11px] text-blue-600 mt-0.5">99.4% Delivery Success Rate</p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ PLATFORM FINANCIALS ═══════════ */}
      {activeTab === 'analytics' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-base">SaaS Platform Financials & Subscriptions Collection</h3>
              <p className="text-xs text-slate-500">Collected via bKash Merchant API & Nagad Direct Settlement</p>
            </div>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">School Name</th>
                <th className="p-3">Billing Cycle</th>
                <th className="p-3">Monthly Charge</th>
                <th className="p-3">Last Payment Trx</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {tenantsList.map((t) => (
                <tr key={t.id}>
                  <td className="p-3 font-bold">{t.name}</td>
                  <td className="p-3 text-slate-500">March 2026</td>
                  <td className="p-3 font-bold text-emerald-600">৳{t.monthly_fee.toLocaleString()}</td>
                  <td className="p-3 font-mono text-slate-400">BKASH_{t.id}982A1</td>
                  <td className="p-3 font-semibold">bKash Merchant</td>
                  <td className="p-3"><Badge variant="success">PAID</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ═══════════ SYSTEM & ISOLATION ═══════════ */}
      {activeTab === 'system' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-base">Multi-Tenant System Isolation & Database Architecture</h3>
              <p className="text-xs text-slate-500">Row-level security enforcement with `tenant_id` context scope</p>
            </div>
            <Badge variant="success">Database: Healthy</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>MySQL Connection Pool</span>
              </h4>
              <p className="text-slate-600 dark:text-slate-300">Host: <code className="font-mono text-indigo-600">sql101.infinityfree.com</code></p>
              <p className="text-slate-600 dark:text-slate-300">Database: <code className="font-mono text-indigo-600">if0_42784359_myscmanagement</code></p>
              <p className="text-slate-600 dark:text-slate-300">Tables: <strong>13 Core Tables Active</strong></p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Tenant Domain Routing</span>
              </h4>
              <p className="text-slate-600 dark:text-slate-300">Header Resolver: <code className="font-mono text-emerald-600">X-Tenant-ID / Subdomain</code></p>
              <p className="text-slate-600 dark:text-slate-300">Live Domain: <strong className="text-indigo-600">https://maneschool.site.je</strong></p>
              <p className="text-slate-600 dark:text-slate-300">Security: <strong>JWT HMAC-SHA256 Token Auth</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ ONBOARD NEW SCHOOL MODAL ═══════════ */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="🏢 Onboard New Institution to SaaS Platform"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleAddSchool} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Institution Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rajshahi College"
                value={newSchool.name}
                onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Short Name / Acronym *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. RC"
                value={newSchool.short_name}
                onChange={(e) => setNewSchool({ ...newSchool, short_name: e.target.value.toUpperCase() })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                EIIN Number (BANBEIS) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 102938"
                value={newSchool.eiin}
                onChange={(e) => setNewSchool({ ...newSchool, eiin: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Subdomain Slug *
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  required
                  placeholder="rajshahicollege"
                  value={newSchool.subdomain}
                  onChange={(e) => setNewSchool({ ...newSchool, subdomain: e.target.value.toLowerCase() })}
                  className="w-full p-2.5 rounded-l-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="bg-slate-200 dark:bg-slate-700 px-3 py-2.5 rounded-r-xl font-mono text-slate-600 dark:text-slate-300 text-[10px]">
                  .edumanage.bd
                </span>
              </div>
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Education Board
              </label>
              <select
                value={newSchool.board}
                onChange={(e) => setNewSchool({ ...newSchool, board: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Dhaka">Dhaka Board</option>
                <option value="Chittagong">Chittagong Board</option>
                <option value="Rajshahi">Rajshahi Board</option>
                <option value="Jessore">Jessore Board</option>
                <option value="Comilla">Comilla Board</option>
                <option value="Barisal">Barisal Board</option>
                <option value="Sylhet">Sylhet Board</option>
                <option value="Dinajpur">Dinajpur Board</option>
                <option value="Mymensingh">Mymensingh Board</option>
                <option value="Madrasah">Madrasah Board</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Subscription Plan
              </label>
              <select
                value={newSchool.plan_id}
                onChange={(e) => setNewSchool({ ...newSchool, plan_id: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
              >
                {plans.map(p => (
                  <option key={p.id} value={p.id}>{p.name} - ৳{p.price_monthly}/mo</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Principal / Admin Email *
              </label>
              <input
                type="email"
                required
                placeholder="principal@school.edu.bd"
                value={newSchool.contact_email}
                onChange={(e) => setNewSchool({ ...newSchool, contact_email: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Principal Mobile Phone *
              </label>
              <input
                type="text"
                required
                placeholder="+8801700000000"
                value={newSchool.contact_phone}
                onChange={(e) => setNewSchool({ ...newSchool, contact_phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
            >
              Confirm Onboarding
            </button>
          </div>
        </form>
      </Modal>

      {/* ═══════════ RECHARGE SMS MODAL ═══════════ */}
      {isRechargeSMSModalOpen && selectedTenantForSMS && (
        <Modal
          isOpen={true}
          onClose={() => setIsRechargeSMSModalOpen(false)}
          title={`📱 Add SMS Credits: ${selectedTenantForSMS.name}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleRechargeSMS} className="space-y-4 text-xs">
            <div>
              <label className="font-bold block mb-1">Current Balance</label>
              <p className="text-lg font-black text-purple-600">{selectedTenantForSMS.sms_balance.toLocaleString()} SMS</p>
            </div>
            <div>
              <label className="font-bold block mb-1">Select Credit Pack</label>
              <select
                value={smsRechargeAmount}
                onChange={(e) => setSmsRechargeAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 font-bold"
              >
                <option value="500">+500 SMS (৳250)</option>
                <option value="1000">+1,000 SMS (৳500)</option>
                <option value="2500">+2,500 SMS (৳1,200)</option>
                <option value="5000">+5,000 SMS (৳2,250)</option>
                <option value="10000">+10,000 SMS (৳4,000)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsRechargeSMSModalOpen(false)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow"
              >
                Add Credits
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ═══════════ SCHOOL ADMIN MODAL ═══════════ */}
      {isSchoolAdminModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => {
            setIsSchoolAdminModalOpen(false);
            setSelectedSchoolAdmin(null);
            setSchoolAdminForm({
              name: '',
              email: '',
              phone: '',
              school_id: '',
              role: 'Admin',
              status: 'active',
              password: '',
              confirm_password: ''
            });
          }}
          title={selectedSchoolAdmin ? '✏️ Edit School Admin' : '👤 Add New School Admin'}
          maxWidth="max-w-xl"
        >
          <form onSubmit={selectedSchoolAdmin ? handleUpdateSchoolAdmin : handleAddSchoolAdmin} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. Kazi Faruq Ahmed"
                  value={schoolAdminForm.name}
                  onChange={(e) => setSchoolAdminForm({ ...schoolAdminForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@school.edu.bd"
                  value={schoolAdminForm.email}
                  onChange={(e) => setSchoolAdminForm({ ...schoolAdminForm, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+8801700000000"
                  value={schoolAdminForm.phone}
                  onChange={(e) => setSchoolAdminForm({ ...schoolAdminForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Assign to School *
                </label>
                <select
                  required
                  value={schoolAdminForm.school_id}
                  onChange={(e) => setSchoolAdminForm({ ...schoolAdminForm, school_id: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold"
                >
                  <option value="">Select a school...</option>
                  {tenantsList.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Role *
                </label>
                <select
                  required
                  value={schoolAdminForm.role}
                  onChange={(e) => setSchoolAdminForm({ ...schoolAdminForm, role: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Principal">Principal</option>
                  <option value="Admin">Admin</option>
                  <option value="Vice Principal">Vice Principal</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Status *
                </label>
                <select
                  required
                  value={schoolAdminForm.status}
                  onChange={(e) => setSchoolAdminForm({ ...schoolAdminForm, status: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* Password Section */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-3">
                {selectedSchoolAdmin ? 'Change Password (Optional)' : 'Set Password'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    {selectedSchoolAdmin ? 'New Password' : 'Password'} {!selectedSchoolAdmin && '*'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={selectedSchoolAdmin ? 'Leave blank to keep current' : 'Enter password'}
                      value={schoolAdminForm.password}
                      onChange={(e) => setSchoolAdminForm({ ...schoolAdminForm, password: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
                      required={!selectedSchoolAdmin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? <Lock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Confirm Password {!selectedSchoolAdmin && '*'}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm password"
                      value={schoolAdminForm.confirm_password}
                      onChange={(e) => setSchoolAdminForm({ ...schoolAdminForm, confirm_password: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
                      required={!selectedSchoolAdmin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showConfirmPassword ? <Lock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              {selectedSchoolAdmin && (
                <p className="text-[10px] text-slate-500 mt-2">
                  💡 Leave password fields blank to keep the existing password unchanged.
                </p>
              )}
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsSchoolAdminModalOpen(false);
                  setSelectedSchoolAdmin(null);
                  setSchoolAdminForm({
                    name: '',
                    email: '',
                    phone: '',
                    school_id: '',
                    role: 'Admin',
                    status: 'active',
                    password: '',
                    confirm_password: ''
                  });
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20"
              >
                {selectedSchoolAdmin ? 'Update Admin' : 'Create Admin'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
