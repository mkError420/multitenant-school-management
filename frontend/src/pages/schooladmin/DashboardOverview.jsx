import React, { useState } from 'react';
import { StatCard, Badge, Modal } from '../../components/common/StatCard';
import {
  Users,
  UserCheck,
  CreditCard,
  Send,
  UserPlus,
  CalendarCheck,
  DollarSign,
  BellRing,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  School,
  Clock,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  XCircle,
  UserX,
  FileText
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const DashboardOverview = () => {
  const { tenant, setActiveTab } = useAuthStore();
  const [selectedPeriod, setSelectedPeriod] = useState('month'); // 'month' | 'year'

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'leave', title: 'Teacher Leave Request: Nusrat Jahan', desc: 'Applied for Medical Leave (3 days: 05-07 Mar)', time: '10 mins ago', status: 'pending' },
    { id: 2, type: 'fee', title: 'Pending Online Fee Clearance: BDT 3,100', desc: 'bKash TrxID #BKASH9A87X21 for Tanvir Hasan (Roll 1)', time: '25 mins ago', status: 'pending' },
    { id: 3, type: 'absence', title: "Today's Teacher Absence: Md. Anwar Hossain", desc: 'Chemistry Class in Room 302 needs proxy substitution', time: '1 hour ago', status: 'alert' },
    { id: 4, type: 'notice', title: 'Half-Yearly Exam Routine 2026 Published', desc: 'Notified to 1,250 parents via SMS & Noticeboard', time: '2 hours ago', status: 'info' }
  ]);

  const handleApproveAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'approved' } : a));
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold mb-2">
              <School className="w-3.5 h-3.5" />
              EIIN: {tenant?.eiin_number || tenant?.eiin} • Education Board: Dhaka
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              {tenant?.name || 'Mane School and College'}
            </h1>
            <p className="text-emerald-100/80 text-xs lg:text-sm mt-1 max-w-xl">
              Academic Session 2026 Active • Morning & Day Shifts • Bangla & English Version
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('students')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-extrabold text-xs shadow-md hover:bg-emerald-50 transition-all"
            >
              <UserPlus className="w-4 h-4 text-emerald-600" />
              <span>New Admission</span>
            </button>
            <button
              onClick={() => setActiveTab('fees')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>Collect Fee (POS)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Quick Stats Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Active Students"
          value="1,250"
          change="35 new"
          isPositive={true}
          icon={Users}
          color="emerald"
          subtext="Class 1 to 12 (HSC)"
        />
        <StatCard
          title="Teachers & Staff"
          value="45 Faculty"
          icon={UserCheck}
          color="blue"
          subtext="40 Present • 1 On-Leave"
        />
        <StatCard
          title={selectedPeriod === 'month' ? "Revenue (March)" : "Total Revenue (Year)"}
          value={selectedPeriod === 'month' ? "৳ 485,000" : "৳ 5,420,000"}
          change="14%"
          isPositive={true}
          icon={DollarSign}
          color="indigo"
          subtext="bKash / Cash Collection"
        />
        <StatCard
          title="Pending Due Fees"
          value="৳ 65,000"
          icon={CreditCard}
          color="rose"
          subtext="Auto-SMS Reminders Ready"
        />
        <StatCard
          title="Attendance Today"
          value="94.8%"
          change="1.2%"
          isPositive={true}
          icon={CalendarCheck}
          color="purple"
          subtext="1,185 Present • 65 Absent"
        />
      </div>

      {/* 2. Charts, Financial Trends & Live Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Financial Trends & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Action Shortcuts Hub */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center justify-between">
              <span>⚡ Core Administrative Actions</span>
              <span className="text-xs text-slate-400 font-normal">Fast 1-Click Operations</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <button
                onClick={() => setActiveTab('students')}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-300 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <UserPlus className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Add Student</p>
                <p className="text-[10px] text-slate-400">Admission Form</p>
              </button>

              <button
                onClick={() => setActiveTab('fees')}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:border-indigo-300 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Collect Fee</p>
                <p className="text-[10px] text-slate-400">bKash/POS Slip</p>
              </button>

              <button
                onClick={() => setActiveTab('attendance')}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Take Attendance</p>
                <p className="text-[10px] text-slate-400">1-Click Absent SMS</p>
              </button>

              <button
                onClick={() => setActiveTab('exams')}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:border-purple-300 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">GPA 5.0 Result</p>
                <p className="text-[10px] text-slate-400">Marksheet / Tabulation</p>
              </button>

              <button
                onClick={() => setActiveTab('notices')}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:border-amber-300 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <BellRing className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Post Notice</p>
                <p className="text-[10px] text-slate-400">Bulk SMS Broadcast</p>
              </button>
            </div>
          </div>

          {/* Monthly Income vs Expense & Fee Progress Visuals */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Monthly Financial Progress (Income vs Expense)
                </h3>
                <p className="text-xs text-slate-500">March 2026 Operational Budget Breakdown</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Income: ৳569,000
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Expense: ৳344,500
                </span>
              </div>
            </div>

            {/* Income vs Expense Comparative Bars */}
            <div className="space-y-3 pt-2">
              {[
                { month: 'January 2026', income: 520000, expense: 310000, collectedPct: 92 },
                { month: 'February 2026', income: 540000, expense: 330000, collectedPct: 95 },
                { month: 'March 2026 (Running)', income: 569000, expense: 344500, collectedPct: 88 }
              ].map((row, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">{row.month}</span>
                    <span className="text-slate-500">
                      Surplus: <strong className="text-emerald-600">+৳{(row.income - row.expense).toLocaleString()}</strong> (Collection {row.collectedPct}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-600 h-full rounded-l-full" style={{ width: `${(row.income / 700000) * 100}%` }}></div>
                    <div className="bg-rose-500 h-full" style={{ width: `${(row.expense / 700000) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Real-time Alerts & Feeds (Pending fees, leaves, notices, teacher absences) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>Real-Time Institutional Alerts</span>
              </h3>
              <Badge variant="warning">{alerts.filter(a => a.status === 'pending').length} Pending</Badge>
            </div>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all ${
                    alert.status === 'approved'
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200'
                      : alert.type === 'absence'
                      ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{alert.title}</span>
                    <span className="text-[10px] text-slate-400">{alert.time}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight">{alert.desc}</p>
                  
                  {alert.status === 'pending' && (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleApproveAlert(alert.id)}
                        className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))}
                        className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[10px]"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  {alert.status === 'approved' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <CheckCircle2 className="w-3 h-3" /> Approved
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
