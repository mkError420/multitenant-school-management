import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  CreditCard,
  Database,
  Globe2,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

const stats = [
  { title: 'Active schools', value: '38', change: '+5', tone: 'emerald', icon: Building2, note: 'Across 8 districts' },
  { title: 'Students enrolled', value: '2.4L', change: '+12.4%', tone: 'blue', icon: Users, note: 'Across all tenants' },
  { title: 'Monthly revenue', value: '৳18.6L', change: '+9.8%', tone: 'violet', icon: Wallet, note: 'Recurring subscriptions' },
  { title: 'SMS credits used', value: '4.8L', change: '+21%', tone: 'amber', icon: MessageSquareText, note: 'Month to date' },
  { title: 'System uptime', value: '99.98%', change: '+0.04%', tone: 'rose', icon: ShieldCheck, note: 'Platform availability' },
];

const tenantList = [
  { name: 'Mane School and College', plan: 'Enterprise', status: 'Active', domain: 'maneschool.site.je', students: '1,284', revenue: '৳2.4L' },
  { name: 'Dhaka Residential Model College', plan: 'Enterprise', status: 'Active', domain: 'drmc.edu.bd', students: '3,260', revenue: '৳3.7L' },
  { name: 'Ideal School and College', plan: 'Premium', status: 'Active', domain: 'idealschool.edu.bd', students: '5,400', revenue: '৳4.8L' },
  { name: 'Chittagong Collegiate School', plan: 'Standard', status: 'Trial', domain: 'ccs.edu.bd', students: '1,450', revenue: '৳1.1L' },
  { name: 'Rajshahi Collegiate School', plan: 'Basic', status: 'Onboarding', domain: 'rcs.edu.bd', students: '480', revenue: '৳0.5L' },
];

const growthData = [52, 64, 60, 72, 88, 83, 95];

export const SuperAdminPlatformDashboard = () => {
  const { setActiveTab } = useAuthStore();
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const platformSummary = useMemo(() => ({
    activeTenants: '38',
    newOnboards: '05',
    pendingTasks: '12',
    avgRetention: '91.8%',
  }), []);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-indigo-200 bg-gradient-to-br from-indigo-950 via-violet-950 to-slate-950 p-6 text-white shadow-2xl shadow-indigo-950/20 overflow-hidden relative">
        <div className="absolute -right-16 -bottom-12 h-52 w-52 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -left-12 top-12 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-100">
              <Globe2 className="h-3.5 w-3.5" />
              SaaS control center
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">EduManage BD Platform</h1>
              <p className="mt-2 max-w-xl text-sm text-indigo-100/80">
                Manage institutions, subscriptions, SMS credits, and platform-wide analytics from one place.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('tenants')}
              className="rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-indigo-900 transition hover:bg-indigo-50"
            >
              Manage schools
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className="rounded-xl border border-white/20 bg-indigo-500/20 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-400/20"
            >
              Subscription plans
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map(({ title, value, change, tone, icon: Icon, note }) => (
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

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Platform health</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">System growth and revenue momentum</p>
            </div>
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
              {['This Month', 'Quarter', 'Year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedPeriod(range)}
                  className={`rounded-lg px-3 py-1.5 text-[10px] font-bold transition ${selectedPeriod === range ? 'bg-white text-indigo-700 shadow-sm dark:bg-slate-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Institutions</p>
              <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{platformSummary.activeTenants}</p>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-emerald-600">
                <Building2 className="h-4 w-4" />
                Active tenants
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">New onboardings</p>
              <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{platformSummary.newOnboards}</p>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-sky-600">
                <Database className="h-4 w-4" />
                This month
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Retention</p>
              <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{platformSummary.avgRetention}</p>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-violet-600">
                <BarChart3 className="h-4 w-4" />
                Average retention
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Growth trend</p>
              <span className="text-[10px] font-bold text-indigo-600">Steady expansion</span>
            </div>
            <div className="flex h-32 items-end gap-2">
              {growthData.map((value, index) => (
                <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <div className={`w-full rounded-t-xl ${index === growthData.length - 1 ? 'bg-indigo-500' : 'bg-indigo-300/80'}`} style={{ height: `${value}%` }} />
                  <span className="text-[9px] font-bold text-slate-400">{['J','F','M','A','M','J','J'][index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Priority tasks</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Operational actions for the SaaS team</p>
            </div>
            <Sparkles className="h-4 w-4 text-violet-500" />
          </div>

          <div className="space-y-3">
            {[
              { title: 'Renew enterprise plan for 3 schools', status: 'Due this week' },
              { title: 'Review SMS balance for western districts', status: 'Low balance' },
              { title: 'Audit tenant data isolation checks', status: 'Pending review' },
              { title: 'Approve school onboarding documents', status: '2 items' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Tenant overview</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Current active schools and subscription health</p>
          </div>
          <button onClick={() => setActiveTab('tenants')} className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">View directory</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th className="px-3 py-3">School</th>
                <th className="px-3 py-3">Plan</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Domain</th>
                <th className="px-3 py-3">Students</th>
                <th className="px-3 py-3">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {tenantList.map((tenant) => (
                <tr key={tenant.name} className="bg-white dark:bg-slate-900">
                  <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{tenant.name}</td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{tenant.plan}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${tenant.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : tenant.status === 'Trial' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' : 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'}`}>
                      {tenant.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{tenant.domain}</td>
                  <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{tenant.students}</td>
                  <td className="px-3 py-3 font-bold text-emerald-600 dark:text-emerald-400">{tenant.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
