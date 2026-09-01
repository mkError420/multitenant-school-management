import React from 'react';
import { StatCard, Badge } from '../../components/common/StatCard';
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
  Sparkles,
  School,
  Clock
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const DashboardOverview = () => {
  const { tenant, setActiveTab } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold mb-2">
              <School className="w-3.5 h-3.5" />
              EIIN: {tenant?.eiin_number} • Education Board: Dhaka
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              {tenant?.name || 'Dhaka Residential Model College'}
            </h1>
            <p className="text-emerald-100/80 text-xs lg:text-sm mt-1 max-w-xl">
              Academic Session 2026 Active • Morning & Day Shifts Operating • NCTB Curriculum Standard
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
              onClick={() => setActiveTab('attendance')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Today's Attendance</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Enrolled Students"
          value="1,250"
          change="35"
          isPositive={true}
          icon={Users}
          color="emerald"
          subtext="Class 6 to Class 12 (HSC)"
        />
        <StatCard
          title="Today's Attendance Rate"
          value="94.8%"
          change="1.2%"
          isPositive={true}
          icon={UserCheck}
          color="blue"
          subtext="1,185 Present • 65 Absent"
        />
        <StatCard
          title="Fee Collected (March 2026)"
          value="৳ 485,000"
          change="14%"
          isPositive={true}
          icon={CreditCard}
          color="indigo"
          subtext="Due Balance: ৳ 65,000"
        />
        <StatCard
          title="SMS Credits Remaining"
          value={tenant?.sms_balance?.toLocaleString() || '4,500'}
          icon={Send}
          color="purple"
          subtext="GreenwebBD Gateway Active"
        />
      </div>

      {/* Main Grid: Quick Actions & Live Attendance / Financial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Attendance & Fee Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Action Hub */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
              ⚡ Administrative Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <button
                onClick={() => setActiveTab('students')}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-300 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <UserPlus className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Admit Student</p>
                <p className="text-[10px] text-slate-400">Roll & Profile</p>
              </button>

              <button
                onClick={() => setActiveTab('attendance')}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Take Attendance</p>
                <p className="text-[10px] text-slate-400">1-Click Absent SMS</p>
              </button>

              <button
                onClick={() => setActiveTab('fees')}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:border-indigo-300 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Collect Fees POS</p>
                <p className="text-[10px] text-slate-400">bKash / Cash Receipt</p>
              </button>

              <button
                onClick={() => setActiveTab('exams')}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:border-purple-300 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">GPA 5.0 Result</p>
                <p className="text-[10px] text-slate-400">NCTB Tabulation</p>
              </button>
            </div>
          </div>

          {/* Class-wise Student Distribution */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Class-wise Enrollment & Distribution
                </h3>
                <p className="text-xs text-slate-500">Boys vs Girls Ratio in Session 2026</p>
              </div>
              <Badge variant="success">Total: 1,250</Badge>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Class 6 (Six)', boys: 120, girls: 110, total: 230, pct: 85 },
                { name: 'Class 7 (Seven)', boys: 105, girls: 95, total: 200, pct: 75 },
                { name: 'Class 8 (Eight - JSC)', boys: 115, girls: 105, total: 220, pct: 80 },
                { name: 'Class 9 (Nine - SSC Batch)', boys: 130, girls: 120, total: 250, pct: 90 },
                { name: 'Class 10 (Ten - SSC Candidate)', boys: 140, girls: 130, total: 270, pct: 100 },
                { name: 'Class 11 (HSC 1st Year)', boys: 45, girls: 35, total: 80, pct: 30 }
              ].map((c, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">{c.name}</span>
                    <span className="text-slate-500">
                      {c.boys} Boys • {c.girls} Girls (<strong>{c.total} Students</strong>)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="bg-emerald-600 h-full rounded-l-full"
                      style={{ width: `${(c.boys / c.total) * 100}%` }}
                    />
                    <div
                      className="bg-teal-400 h-full rounded-r-full"
                      style={{ width: `${(c.girls / c.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Notice Board & Today's Attendance Mini Summary */}
        <div className="space-y-6">
          {/* Today's Attendance Gauge */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              📊 Today's Attendance
            </h3>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 text-center">
              <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400">94.8%</span>
              <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mt-0.5">
                Overall Daily Attendance Rate
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-emerald-200 dark:border-emerald-900/50 text-left text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block">Present Students</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">1,185</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Absent Students</span>
                  <span className="font-bold text-rose-600">65</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('attendance')}
              className="w-full mt-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
            >
              Dispatch Absentee SMS Alert →
            </button>
          </div>

          {/* Institutional Circulars */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                📢 Institutional Circulars
              </h3>
              <button
                onClick={() => setActiveTab('notices')}
                className="text-xs text-emerald-600 hover:underline font-bold"
              >
                View All
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Exam Notice</span>
                <h4 className="font-bold text-slate-900 dark:text-white mt-0.5">
                  Half-Yearly Examination 2026 Routine Published
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  Exams commence from 10th June. Collect Admit Cards from accounts office.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold text-purple-600 uppercase">Holiday Notice</span>
                <h4 className="font-bold text-slate-900 dark:text-white mt-0.5">
                  Shaheed Dibash (21st February) Program
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  Special cultural program at college auditorium at 9:00 AM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
