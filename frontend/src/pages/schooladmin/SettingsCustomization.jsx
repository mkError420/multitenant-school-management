import React, { useState } from 'react';
import { Badge } from '../../components/common/StatCard';
import { CheckCircle2, Database, Lock, Save, School, ShieldCheck, Sparkles, Upload } from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const SettingsCustomization = () => {
  const { tenant } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  const [schoolProfile, setSchoolProfile] = useState({
    name: tenant?.name || 'Mane School and College',
    short_name: tenant?.short_name || 'MANE',
    eiin: tenant?.eiin || '107985',
    board: 'Dhaka',
    principal_name: 'Prof. Kazi Faruq Ahmed',
    email: 'info@maneschool.site.je',
    phone: '+8801711111111',
    address: 'Mirpur Road, Mohammadpur, Dhaka-1207',
    theme_color: '#059669',
    domain: 'maneschool.site.je'
  });

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Principal / School Admin',
      label: 'school_admin',
      permissions: { dashboard: true, students: true, attendance: true, exams: true, fees: true, hr: true, sms: true, settings: true, library: true, transport: true }
    },
    {
      id: 2,
      name: 'Class Teacher',
      label: 'teacher',
      permissions: { dashboard: true, students: true, attendance: true, exams: true, fees: false, hr: false, sms: false, settings: false, library: true, transport: false }
    },
    {
      id: 3,
      name: 'Accountant (POS)',
      label: 'accountant',
      permissions: { dashboard: true, students: false, attendance: false, exams: false, fees: true, hr: false, sms: false, settings: false, library: false, transport: false }
    }
  ]);

  const auditLogs = [
    { id: 1, user: 'Prof. Kazi Faruq Ahmed', action: 'Published Half-Yearly Exam Result for Class 10', module: 'Examination', time: '01 Mar 2026, 11:42 AM', ip: '192.168.1.5' },
    { id: 2, user: 'Md. Shahinur Rahman', action: 'Collected fee from Tanvir Hasan', module: 'Fees', time: '01 Mar 2026, 10:15 AM', ip: '192.168.1.12' },
    { id: 3, user: 'System Auto', action: 'Sent 65 absentee SMS alerts to guardians', module: 'Attendance / SMS', time: '01 Mar 2026, 08:05 AM', ip: 'API Gateway' },
    { id: 4, user: 'Prof. Kazi Faruq Ahmed', action: 'Approved 3-day medical leave for Nusrat Jahan', module: 'HR / Leaves', time: '28 Feb 2026, 03:45 PM', ip: '192.168.1.5' }
  ];

  const togglePermission = (roleId, perm) => {
    setRoles((prev) => prev.map((role) => role.id === roleId ? { ...role, permissions: { ...role.permissions, [perm]: !role.permissions[perm] } } : role));
  };

  const permKeys = ['dashboard', 'students', 'attendance', 'exams', 'fees', 'hr', 'sms', 'settings', 'library', 'transport'];
  const permLabels = {
    dashboard: 'Dashboard',
    students: 'Students',
    attendance: 'Attendance',
    exams: 'Exams',
    fees: 'Fees',
    hr: 'HR & Payroll',
    sms: 'SMS Portal',
    settings: 'Settings',
    library: 'Library',
    transport: 'Transport'
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'roles', label: 'Roles' },
    { id: 'audit', label: 'Audit log' }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-zinc-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200">
              <School className="h-3.5 w-3.5" />
              System control
            </div>
            <h2 className="text-2xl font-black tracking-tight">School settings</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-200/80">
              Branding, permission controls, and audit trail management for the institution.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900">
            <Sparkles className="h-4 w-4" />
            Save profile
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'School profile', value: '100%', icon: School, tone: 'emerald', note: 'Configured' },
          { title: 'Access roles', value: '3', icon: Lock, tone: 'blue', note: 'Defined roles' },
          { title: 'Audit events', value: '1,240', icon: Database, tone: 'violet', note: 'Tracked records' },
          { title: 'Security', value: 'Secure', icon: ShieldCheck, tone: 'amber', note: 'Activity monitored' }
        ].map(({ title, value, icon: Icon, tone, note }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{title}</p>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone === 'emerald' ? 'bg-emerald-100 text-emerald-600' : tone === 'blue' ? 'bg-sky-100 text-sky-600' : tone === 'violet' ? 'bg-violet-100 text-violet-600' : 'bg-amber-100 text-amber-600'}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-5 text-2xl font-black text-slate-900 dark:text-white">{value}</p>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{note}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition ${activeTab === tab.id ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'profile' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Institution profile</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Customize school identity and branding</p>
            </div>
            <button className="rounded-xl bg-emerald-600 px-3.5 py-2 text-[10px] font-bold text-white">Save changes</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">School name</label>
              <input value={schoolProfile.name} onChange={(e) => setSchoolProfile({ ...schoolProfile, name: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Short name</label>
              <input value={schoolProfile.short_name} onChange={(e) => setSchoolProfile({ ...schoolProfile, short_name: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">EIIN</label>
              <input value={schoolProfile.eiin} onChange={(e) => setSchoolProfile({ ...schoolProfile, eiin: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Board</label>
              <select value={schoolProfile.board} onChange={(e) => setSchoolProfile({ ...schoolProfile, board: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                <option>Dhaka</option>
                <option>Rajshahi</option>
                <option>Chittagong</option>
                <option>Sylhet</option>
              </select>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2 dark:border-slate-700 dark:bg-slate-800/60">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Registered address</label>
              <textarea rows={3} value={schoolProfile.address} onChange={(e) => setSchoolProfile({ ...schoolProfile, address: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-center dark:border-slate-700">
              <Upload className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Upload school logo</p>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-center dark:border-slate-700">
              <Upload className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Upload principal signature</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Permissions</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Role-based access matrix</p>
            </div>
            <button className="rounded-xl bg-indigo-600 px-3.5 py-2 text-[10px] font-bold text-white">+ New role</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-3 py-3">Module</th>
                  {roles.map((role) => (
                    <th key={role.id} className="px-3 py-3 text-center">{role.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {permKeys.map((key) => (
                  <tr key={key} className="bg-white dark:bg-slate-900">
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{permLabels[key]}</td>
                    {roles.map((role) => (
                      <td key={`${role.id}-${key}`} className="px-3 py-3 text-center">
                        <button onClick={() => togglePermission(role.id, key)} className={`relative h-6 w-11 rounded-full transition ${role.permissions[key] ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                          <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${role.permissions[key] ? 'left-6' : 'left-1'}`} />
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Audit trail</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Administrator action history</p>
            </div>
            <button className="rounded-xl bg-slate-100 px-3.5 py-2 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">Export logs</button>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white">{log.user}</p>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{log.action}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{log.time}</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                  <Badge variant="default">{log.module}</Badge>
                  <span className="font-mono">IP: {log.ip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
