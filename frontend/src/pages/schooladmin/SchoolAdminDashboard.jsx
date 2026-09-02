import React, { useMemo, useState } from 'react';
import { useAuthStore } from '../../services/authStore';
import {
  ArrowUpRight,
  BellRing,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  CreditCard,
  GraduationCap,
  IndianRupee,
  School,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
} from 'lucide-react';

const statCards = [
  { title: 'Total Students', value: '1,284', change: '+86', tone: 'emerald', icon: Users, note: 'Across 12 classes' },
  { title: 'Present Today', value: '94.6%', change: '+1.8%', tone: 'blue', icon: CalendarCheck2, note: '1,214 present' },
  { title: 'Monthly Fees', value: '৳4,86,500', change: '+12.4%', tone: 'violet', icon: IndianRupee, note: 'Collected this month' },
  { title: 'Teachers', value: '48', change: '+3', tone: 'amber', icon: BriefcaseBusiness, note: 'Active faculty' },
  { title: 'Due Balance', value: '৳67,800', change: '-8.2%', tone: 'rose', icon: Wallet, note: 'Needs follow-up' },
];

const quickActions = [
  { id: 'students', label: 'Admission', icon: UserPlus, tone: 'emerald', hint: 'Add a new student' },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck2, tone: 'sky', hint: 'Daily check-in' },
  { id: 'fees', label: 'Collect Fees', icon: CreditCard, tone: 'violet', hint: 'POS & online' },
  { id: 'exams', label: 'Results', icon: BookOpen, tone: 'amber', hint: 'Marks & grade' },
  { id: 'communication', label: 'Notice', icon: BellRing, tone: 'rose', hint: 'Send to parents' },
];

const recentActivities = [
  { title: 'Annual admission drive started', meta: 'Academic Office · 25 mins ago', status: 'live' },
  { title: 'Fee collection crossed ৳4.8L', meta: 'Accounts · 1 hour ago', status: 'success' },
  { title: 'Teacher attendance reviewed', meta: 'HR Office · 3 hours ago', status: 'info' },
  { title: 'Exam routine published', meta: 'Administration · Today', status: 'warning' },
];

const notices = [
  { title: 'Monthly parent meeting', category: 'Academic', time: 'Tomorrow · 10:00 AM' },
  { title: 'Science fair registration open', category: 'Event', time: 'Due by 15 June' },
  { title: 'Fee payment reminder for Class 10', category: 'Finance', time: 'Auto SMS scheduled' },
];

const attendanceTrend = [82, 88, 91, 90, 95, 94, 96];

export const SchoolAdminDashboard = () => {
  const { tenant, setActiveTab } = useAuthStore();
  const [selectedRange, setSelectedRange] = useState('This Month');

  const performanceSummary = useMemo(() => ({
    revenue: '৳4,86,500',
    growth: '+14.8%',
    conversion: '91%',
    students: '1,284',
  }), []);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-emerald-200/80 bg-gradient-to-br from-slate-900 via-emerald-950 to-emerald-900 p-6 text-white shadow-2xl shadow-emerald-900/20 overflow-hidden relative">
        <div className="absolute -right-14 -bottom-12 h-52 w-52 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -left-12 top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-100">
              <School className="h-3.5 w-3.5" />
              School dashboard
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                {tenant?.name || 'Mane School and College'}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-emerald-100/80">
                Academic session 2026 is active. Daily operations, payments, staff, and academic reporting are running smoothly.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('students')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-emerald-900 transition hover:bg-emerald-50"
            >
              <UserPlus className="h-4 w-4" />
              New admission
            </button>
            <button
              onClick={() => setActiveTab('fees')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-emerald-500/20 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-400/20"
            >
              <CreditCard className="h-4 w-4" />
              Collect fees
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map(({ title, value, change, tone, icon: Icon, note }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{title}</p>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone === 'emerald' ? 'bg-emerald-100 text-emerald-600' : tone === 'blue' ? 'bg-sky-100 text-sky-600' : tone === 'violet' ? 'bg-violet-100 text-violet-600' : tone === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'} dark:bg-slate-800`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{value}</p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{note}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <ArrowUpRight className="h-3 w-3" />
                {change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Quick actions</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Most used school operations</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{quickActions.length} shortcuts</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {quickActions.map(({ id, label, icon: Icon, tone, hint }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-emerald-700 dark:hover:bg-slate-800"
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${tone === 'emerald' ? 'bg-emerald-100 text-emerald-600' : tone === 'sky' ? 'bg-sky-100 text-sky-600' : tone === 'violet' ? 'bg-violet-100 text-violet-600' : tone === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'} group-hover:scale-105`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{label}</p>
                  <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">{hint}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Performance</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Overview of academic and finance movement</p>
              </div>
              <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
                {['This Month', 'Quarter', 'Year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`rounded-lg px-3 py-1.5 text-[10px] font-bold transition ${selectedRange === range ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300' : 'text-slate-500 dark:text-slate-400'}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Fee collection</p>
                <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{performanceSummary.revenue}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  {performanceSummary.growth}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Student retention</p>
                <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{performanceSummary.conversion}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-blue-600">
                  <GraduationCap className="h-4 w-4" />
                  Strong retention
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Enrolled students</p>
                <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{performanceSummary.students}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-violet-600">
                  <Users className="h-4 w-4" />
                  Active intake
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Attendance trend</p>
                <span className="text-[10px] font-bold text-emerald-600">Average 92%</span>
              </div>
              <div className="flex h-28 items-end gap-2">
                {attendanceTrend.map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                    <div
                      className={`w-full rounded-t-xl ${index === attendanceTrend.length - 1 ? 'bg-emerald-500' : 'bg-emerald-300/70'}`}
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-[9px] font-bold text-slate-400">{['M','T','W','T','F','S','S'][index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Latest activity</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Live updates from campus</p>
              </div>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>

            <div className="space-y-3">
              {recentActivities.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{item.meta}</p>
                    </div>
                    <span className={`inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${item.status === 'live' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : item.status === 'success' ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300' : item.status === 'info' ? 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Notices</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">For staff and parents</p>
              </div>
              <button
                onClick={() => setActiveTab('communication')}
                className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {notices.map((notice) => (
                <div key={notice.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{notice.title}</p>
                    <span className="rounded-full bg-slate-200 px-2 py-1 text-[9px] font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">{notice.category}</span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">{notice.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Campus status</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Daily operational health</p>
            </div>
            <Building2 className="h-4 w-4 text-emerald-600" />
          </div>

          <div className="space-y-4">
            {[
              { label: 'Classrooms active', value: '32/34', status: 'healthy' },
              { label: 'Lab usage', value: '87%', status: 'good' },
              { label: 'Transport routes', value: '12', status: 'good' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/60">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{row.label}</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Today at a glance</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Calendar and operational timeline</p>
            </div>
            <CalendarCheck2 className="h-4 w-4 text-violet-600" />
          </div>

          <div className="space-y-3">
            {[
              '07:30 AM · Morning assembly',
              '09:15 AM · Class 10 chemistry practical',
              '11:00 AM · Parent fee support desk',
              '02:30 PM · Exam committee meeting',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/60">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm text-slate-700 dark:text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
