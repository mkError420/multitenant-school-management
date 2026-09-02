import React, { useState } from 'react';
import { Badge, StatCard } from '../../components/common/StatCard';
import {
  Settings,
  Calendar,
  Clock,
  Layers,
  BookOpen,
  Plus,
  CheckCircle2,
  Sparkles,
  School
} from 'lucide-react';

export const AcademicSetup = () => {
  const [activeTab, setActiveTab] = useState('classes'); // 'sessions' | 'shifts' | 'classes' | 'subjects'

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100">
              <School className="h-3.5 w-3.5" />
              Academic structure
            </div>
            <h2 className="text-2xl font-black tracking-tight">Academic Structure & NCTB Curriculum Setup</h2>
            <p className="mt-2 max-w-2xl text-sm text-emerald-100/80">
              Configure academic sessions, shifts, sections, and subject marking schemes for the live school calendar.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-emerald-900">
            <Sparkles className="h-4 w-4" />
            Update configuration
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'Active session', value: '2026', icon: Calendar, tone: 'emerald', subtext: 'Current academic year' },
          { title: 'Morning/day shifts', value: '2', icon: Clock, tone: 'blue', subtext: 'Operational schedules' },
          { title: 'Class groups', value: '6', icon: Layers, tone: 'violet', subtext: 'Primary to HSC' },
          { title: 'Subject map', value: '120+', icon: BookOpen, tone: 'amber', subtext: 'NCTB standards' }
        ].map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.tone}
            subtext={item.subtext}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'classes', label: 'Classes & Sections' },
            { id: 'subjects', label: 'NCTB Subjects' },
            { id: 'shifts', label: 'Shifts' },
            { id: 'sessions', label: 'Academic Years' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Class 6 (Six)', num: 6, sections: ['Karnafuli (Morning)'], students: 230 },
            { name: 'Class 7 (Seven)', num: 7, sections: ['Meghna (Morning)'], students: 200 },
            { name: 'Class 8 (Eight - JSC)', num: 8, sections: ['Surma (Morning)'], students: 220 },
            { name: 'Class 9 (Nine - SSC)', num: 9, sections: ['Padma', 'Meghna'], hasGroup: true, students: 250 },
            { name: 'Class 10 (Ten - SSC Batch)', num: 10, sections: ['Padma (Morning)', 'Meghna (Day)', 'Jamuna (Science)'], hasGroup: true, students: 270 },
            { name: 'Class 11 (HSC 1st Year)', num: 11, sections: ['Science A', 'Science B', 'Commerce'], hasGroup: true, students: 80 }
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 dark:text-white">{c.name}</h3>
                <Badge variant="success">{c.students} Enrolled</Badge>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Active sections</span>
                <div className="flex flex-wrap gap-1.5">
                  {c.sections.map((s, idx) => (
                    <span key={idx} className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {c.hasGroup && (
                <div className="mt-4 border-t border-slate-200 pt-3 text-[10px] font-bold text-emerald-600 dark:border-slate-700 dark:text-emerald-400">
                  ✓ Science • Humanities • Business Studies
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'subjects' && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 bg-slate-50/80 p-4 text-xs font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-800/60 dark:text-white">
            NCTB Secondary & Higher Secondary Subject Matrix
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="p-3">Subject Name</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Creative (CQ)</th>
                  <th className="p-3">MCQ</th>
                  <th className="p-3">Practical</th>
                  <th className="p-3">Total Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { name: 'Bangla 1st Paper', code: '101', type: 'Compulsory', cq: 70, mcq: 30, pr: 0, total: 100 },
                  { name: 'Bangla 2nd Paper', code: '102', type: 'Compulsory', cq: 70, mcq: 30, pr: 0, total: 100 },
                  { name: 'English 1st Paper', code: '107', type: 'Compulsory', cq: 100, mcq: 0, pr: 0, total: 100 },
                  { name: 'English 2nd Paper', code: '108', type: 'Compulsory', cq: 100, mcq: 0, pr: 0, total: 100 },
                  { name: 'General Mathematics', code: '109', type: 'Compulsory', cq: 70, mcq: 30, pr: 0, total: 100 },
                  { name: 'Physics', code: '136', type: 'Science', cq: 50, mcq: 25, pr: 25, total: 100 },
                  { name: 'Chemistry', code: '137', type: 'Science', cq: 50, mcq: 25, pr: 25, total: 100 },
                  { name: 'Biology', code: '138', type: 'Science', cq: 50, mcq: 25, pr: 25, total: 100 },
                  { name: 'Higher Mathematics', code: '126', type: 'Elective 4th', cq: 50, mcq: 25, pr: 25, total: 100 },
                  { name: 'ICT', code: '154', type: 'Compulsory', cq: 0, mcq: 25, pr: 25, total: 50 }
                ].map((s, idx) => (
                  <tr key={idx} className="bg-white dark:bg-slate-900">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{s.name}</td>
                    <td className="p-3 font-mono">{s.code}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.type === 'Elective 4th' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                        {s.type}
                      </span>
                    </td>
                    <td className="p-3">{s.cq}</td>
                    <td className="p-3">{s.mcq}</td>
                    <td className="p-3">{s.pr}</td>
                    <td className="p-3 font-extrabold text-emerald-700 dark:text-emerald-400">{s.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'shifts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Morning Shift (প্রভাতি শাখা)</h3>
            <p className="mt-2 text-xs text-slate-500">Operating: 07:30 AM - 12:00 PM</p>
            <div className="mt-4"><Badge variant="success">Boys & Girls Section A</Badge></div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Day Shift (দিবা শাখা)</h3>
            <p className="mt-2 text-xs text-slate-500">Operating: 12:30 PM - 05:30 PM</p>
            <div className="mt-4"><Badge variant="info">Senior High & College</Badge></div>
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl border-2 border-emerald-500 bg-white p-5 shadow-sm dark:bg-slate-900">
            <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-black text-white">
              CURRENT LIVE
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Academic Session 2026</h3>
            <p className="mt-2 text-xs text-slate-500">01 January 2026 to 31 December 2026</p>
            <p className="mt-4 text-xs font-bold text-emerald-600">1,250 students enrolled</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm opacity-80 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Academic Session 2025</h3>
            <p className="mt-2 text-xs text-slate-500">Archived session data</p>
            <div className="mt-4"><Badge variant="default">Archived</Badge></div>
          </div>
        </div>
      )}
    </div>
  );
};
