import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import {
  Settings,
  School,
  Shield,
  Activity,
  Upload,
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Clock,
  User,
  Database
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const SettingsCustomization = () => {
  const { tenant, setTenant } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'roles' | 'audit'

  // School Profile
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

  // Roles & Permissions
  const [roles, setRoles] = useState([
    {
      id: 1, name: 'Principal / School Admin', label: 'school_admin',
      permissions: { dashboard: true, students: true, attendance: true, exams: true, fees: true, hr: true, sms: true, settings: true, library: true, transport: true }
    },
    {
      id: 2, name: 'Class Teacher', label: 'teacher',
      permissions: { dashboard: true, students: true, attendance: true, exams: true, fees: false, hr: false, sms: false, settings: false, library: true, transport: false }
    },
    {
      id: 3, name: 'Accountant (POS)', label: 'accountant',
      permissions: { dashboard: true, students: false, attendance: false, exams: false, fees: true, hr: false, sms: false, settings: false, library: false, transport: false }
    }
  ]);

  // Audit Logs
  const auditLogs = [
    { id: 1, user: 'Prof. Kazi Faruq Ahmed (Principal)', action: 'Published Half-Yearly Exam Result for Class 10', module: 'Examination', time: '01 Mar 2026, 11:42 AM', ip: '192.168.1.5' },
    { id: 2, user: 'Md. Shahinur Rahman (Accountant)', action: 'Collected Fee ৳3,100 from Tanvir Hasan (Roll 1)', module: 'Fees', time: '01 Mar 2026, 10:15 AM', ip: '192.168.1.12' },
    { id: 3, user: 'System Auto', action: 'Sent 65 Absentee SMS alerts to guardians via GreenwebBD', module: 'Attendance / SMS', time: '01 Mar 2026, 08:05 AM', ip: 'API Gateway' },
    { id: 4, user: 'Prof. Kazi Faruq Ahmed (Principal)', action: 'Approved 3-day medical leave for Nusrat Jahan', module: 'HR / Leaves', time: '28 Feb 2026, 03:45 PM', ip: '192.168.1.5' },
    { id: 5, user: 'Mohammad Rafiqul Islam (Teacher)', action: 'Entered marks for General Mathematics - Class 10 (Science)', module: 'Examination', time: '28 Feb 2026, 01:30 PM', ip: '192.168.1.9' }
  ];

  const togglePermission = (roleId, perm) => {
    setRoles(roles.map(r =>
      r.id === roleId ? { ...r, permissions: { ...r.permissions, [perm]: !r.permissions[perm] } } : r
    ));
  };

  const permKeys = ['dashboard', 'students', 'attendance', 'exams', 'fees', 'hr', 'sms', 'settings', 'library', 'transport'];
  const permLabels = {
    dashboard: '📊 Dashboard',
    students: '👥 Students',
    attendance: '📅 Attendance',
    exams: '🎓 Exams',
    fees: '💳 Fees',
    hr: '💰 HR & Payroll',
    sms: '📱 SMS Portal',
    settings: '⚙️ Settings',
    library: '📚 Library',
    transport: '🚌 Transport'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Settings, Roles, Permissions & Audit Logs
          </h2>
          <p className="text-xs text-slate-500">
            Customize institution profile, branding, role-based access control, and track all administrative activity
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          {[
            { id: 'profile', label: '🏫 School Profile & Branding' },
            { id: 'roles', label: '🔐 Roles & Permissions' },
            { id: 'audit', label: '🔍 Audit Activity Logs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. SCHOOL PROFILE & BRANDING */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Institution Profile & Branding Configuration</h3>
              <p className="text-xs text-slate-500">Customize school name, EIIN, logo, principal signature, and UI theme color</p>
            </div>
            <button
              onClick={() => alert('Profile saved successfully!')}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold block mb-1">Institution Full Name</label>
              <input
                value={schoolProfile.name}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Short Name / Abbreviation</label>
              <input
                value={schoolProfile.short_name}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, short_name: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">EIIN Number (Education Board)</label>
              <input
                value={schoolProfile.eiin}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, eiin: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Education Board</label>
              <select
                value={schoolProfile.board}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, board: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              >
                <option>Dhaka</option>
                <option>Rajshahi</option>
                <option>Chittagong</option>
                <option>Sylhet</option>
                <option>Barisal</option>
                <option>Jessore</option>
                <option>Comilla</option>
                <option>Mymensingh</option>
                <option>Dinajpur</option>
              </select>
            </div>
            <div>
              <label className="font-bold block mb-1">Principal / Headmaster Name</label>
              <input
                value={schoolProfile.principal_name}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, principal_name: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Live Domain (maneschool.site.je)</label>
              <input
                value={schoolProfile.domain}
                disabled
                className="w-full p-2.5 rounded-xl border bg-slate-100 dark:bg-slate-900 font-mono text-slate-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Institution Theme Color</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={schoolProfile.theme_color}
                  onChange={(e) => setSchoolProfile({ ...schoolProfile, theme_color: e.target.value })}
                  className="w-12 h-10 rounded-lg border cursor-pointer"
                />
                <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{schoolProfile.theme_color}</span>
              </div>
            </div>
            <div>
              <label className="font-bold block mb-1">Official Phone</label>
              <input
                value={schoolProfile.phone}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-bold block mb-1">Registered Address</label>
              <textarea
                rows={2}
                value={schoolProfile.address}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, address: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-xs mb-3">Institution Logo & Principal Signature Upload</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-40 p-4 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-2 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all">
                <Upload className="w-8 h-8 mx-auto text-slate-400" />
                <p className="text-xs font-bold text-slate-500">Upload School Logo (PNG/SVG)</p>
              </div>
              <div className="flex-1 min-w-40 p-4 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-2 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all">
                <Upload className="w-8 h-8 mx-auto text-slate-400" />
                <p className="text-xs font-bold text-slate-500">Upload Principal Signature (PNG)</p>
                <p className="text-[10px] text-slate-400">Used on ID Cards & Certificates</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ROLES & PERMISSIONS */}
      {activeTab === 'roles' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Role-Based Access Control (RBAC) Permission Matrix</h3>
              <p className="text-xs text-slate-500">Toggle on/off which modules each role can access</p>
            </div>
            <button onClick={() => alert('Custom role creation modal')} className="px-3 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow">
              + Create Custom Role
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 font-bold text-[10px] uppercase border-b">
                <tr>
                  <th className="p-3 text-left">Module / Feature</th>
                  {roles.map(r => (
                    <th key={r.id} className="p-3 text-center">
                      <div className="space-y-0.5">
                        <p className="font-extrabold text-slate-900 dark:text-white">{r.name}</p>
                        <p className="text-[9px] text-slate-400 font-mono normal-case">[{r.label}]</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y font-medium">
                {permKeys.map((perm) => (
                  <tr key={perm} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{permLabels[perm]}</td>
                    {roles.map(r => (
                      <td key={r.id} className="p-3 text-center">
                        <button
                          onClick={() => togglePermission(r.id, perm)}
                          className={`w-10 h-5 rounded-full transition-all duration-200 relative ${
                            r.permissions[perm] ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                            r.permissions[perm] ? 'left-5' : 'left-0.5'
                          }`}></span>
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

      {/* 3. AUDIT ACTIVITY LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Administrative Activity & Audit Trail Logs</h3>
              <p className="text-xs text-slate-500">Complete chronological record of who changed what data in the system</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 font-bold text-xs rounded-xl hover:bg-slate-200"
            >
              🖨️ Export Log Report
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start gap-2">
                <div className="space-y-0.5 flex-1">
                  <p className="font-extrabold text-slate-900 dark:text-white">{log.user}</p>
                  <p className="text-slate-600 dark:text-slate-300">{log.action}</p>
                  <p className="text-[10px] text-slate-400">Module: <strong>{log.module}</strong> • IP: <span className="font-mono">{log.ip}</span></p>
                </div>
                <span className="text-[10px] text-slate-400 whitespace-nowrap font-mono">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
