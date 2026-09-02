import React, { useState } from 'react';
import { Badge } from '../../components/common/StatCard';
import { TabulationSheetView } from '../../components/printables/TabulationSheetView';
import { AdmitCardModal } from '../../components/printables/PrintableModals';
import {
  Award,
  BookOpen,
  FileSpreadsheet,
  GraduationCap,
  School,
  Sparkles,
  Trophy,
} from 'lucide-react';

export const ExaminationResults = () => {
  const [activeTab, setActiveTab] = useState('tabulation');
  const [isAdmitCardOpen, setIsAdmitCardOpen] = useState(false);

  const [examTerms] = useState([
    { id: 1, name: 'Half-Yearly 2026', start_date: '2026-06-10', end_date: '2026-06-25', status: 'published', cq_weight: '70%', mcq_weight: '30%', sba: 'Continuous Assessment' },
    { id: 2, name: 'Pre-Test 2026', start_date: '2026-09-15', end_date: '2026-09-30', status: 'draft', cq_weight: '70%', mcq_weight: '30%', sba: 'SBA Applicable' },
    { id: 3, name: 'Annual 2026', start_date: '2026-11-15', end_date: '2026-11-30', status: 'draft', cq_weight: '70%', mcq_weight: '30%', sba: 'Final Evaluation' }
  ]);

  const marksData = [
    { roll: 1, name: 'Tanvir Hasan', cq: 62, mcq: 26, total: 88, gpa: '5.00', grade: 'A+' },
    { roll: 2, name: 'Sadia Afrin', cq: 58, mcq: 24, total: 82, gpa: '5.00', grade: 'A+' },
    { roll: 3, name: 'Arafat Rahman', cq: 45, mcq: 20, total: 65, gpa: '3.50', grade: 'A-' },
    { roll: 4, name: 'Farzana Akter', cq: 52, mcq: 22, total: 74, gpa: '4.00', grade: 'A' }
  ];

  const tabs = [
    { id: 'tabulation', label: 'Tabulation' },
    { id: 'marks_entry', label: 'Marks entry' },
    { id: 'setup', label: 'Exam setup' },
    { id: 'grading', label: 'Grading' },
    { id: 'admit_cards', label: 'Admit cards' }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-violet-200 bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-100">
              <School className="h-3.5 w-3.5" />
              Exam management
            </div>
            <h2 className="text-2xl font-black tracking-tight">Examination & results</h2>
            <p className="mt-2 max-w-2xl text-sm text-violet-100/80">
              Marks entry, tabulation, GPA grading, and admit card generation across all test cycles.
            </p>
          </div>

          <button onClick={() => setIsAdmitCardOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-violet-900">
            <Award className="h-4 w-4" />
            Admit cards
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'Open exam', value: 'Half-yearly', icon: BookOpen, tone: 'emerald', note: 'Published' },
          { title: 'Students scored', value: '1,250', icon: FileSpreadsheet, tone: 'blue', note: 'Class entries' },
          { title: 'Top GPA', value: '5.00', icon: Trophy, tone: 'violet', note: 'High achievers' },
          { title: 'Grade system', value: 'A+ to F', icon: GraduationCap, tone: 'amber', note: 'NCTB policy' }
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
              className={`rounded-xl px-3 py-2 text-xs font-bold transition ${activeTab === tab.id ? 'bg-violet-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'tabulation' && <TabulationSheetView />}

      {activeTab === 'marks_entry' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Marks entry</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Bangla 1st Paper • Class 10 • Half-yearly 2026</p>
            </div>
            <button className="rounded-xl bg-emerald-600 px-3.5 py-2 text-[10px] font-bold text-white">Save marks</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-3 py-3">Roll</th>
                  <th className="px-3 py-3">Student</th>
                  <th className="px-3 py-3">CQ</th>
                  <th className="px-3 py-3">MCQ</th>
                  <th className="px-3 py-3">Total</th>
                  <th className="px-3 py-3">GPA</th>
                  <th className="px-3 py-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {marksData.map((row) => (
                  <tr key={row.roll} className="bg-white dark:bg-slate-900">
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{row.roll}</td>
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{row.name}</td>
                    <td className="px-3 py-3"><input defaultValue={row.cq} className="w-16 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-center font-bold dark:border-slate-700 dark:bg-slate-800" /></td>
                    <td className="px-3 py-3"><input defaultValue={row.mcq} className="w-16 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-center font-bold dark:border-slate-700 dark:bg-slate-800" /></td>
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{row.total}</td>
                    <td className="px-3 py-3 text-emerald-600 font-black">{row.gpa}</td>
                    <td className="px-3 py-3"><Badge variant="success">{row.grade}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'setup' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Exam setup</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Mark distribution and public exam calendar</p>
            </div>
            <button className="rounded-xl bg-violet-600 px-3.5 py-2 text-[10px] font-bold text-white">+ New exam</button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {examTerms.map((term) => (
              <div key={term.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-slate-900 dark:text-white">{term.name}</p>
                  <Badge variant={term.status === 'published' ? 'success' : 'default'}>{term.status}</Badge>
                </div>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{term.start_date} to {term.end_date}</p>
                <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <p>CQ: <span className="font-bold">{term.cq_weight}</span> • MCQ: <span className="font-bold">{term.mcq_weight}</span></p>
                  <p>SBA: <span className="font-bold">{term.sba}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'grading' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">GPA 5.0 grading scale</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Bangladesh NCTB standard mapping</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-3 py-3">Grade</th>
                  <th className="px-3 py-3">Mark range</th>
                  <th className="px-3 py-3">GP</th>
                  <th className="px-3 py-3">Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  ['A+', '80-100', '5.00', 'Outstanding'],
                  ['A', '70-79', '4.00', 'Excellent'],
                  ['A-', '60-69', '3.50', 'Very good'],
                  ['B', '50-59', '3.00', 'Good'],
                  ['C', '40-49', '2.00', 'Satisfactory'],
                  ['D', '33-39', '1.00', 'Passing'],
                  ['F', '0-32', '0.00', 'Failed']
                ].map(([grade, range, gp, remark]) => (
                  <tr key={grade} className="bg-white dark:bg-slate-900">
                    <td className="px-3 py-3 font-black text-emerald-600">{grade}</td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{range}</td>
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{gp}</td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'admit_cards' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Admit cards</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Print-ready candidate documents</p>
            </div>
            <button onClick={() => setIsAdmitCardOpen(true)} className="rounded-xl bg-indigo-600 px-3.5 py-2 text-[10px] font-bold text-white">Open sample</button>
          </div>

          <div className="rounded-2xl border border-dashed border-violet-300 bg-violet-50 p-6 text-center dark:border-violet-800 dark:bg-violet-950/20">
            <Award className="mx-auto h-12 w-12 text-violet-600" />
            <p className="mt-4 text-lg font-black text-slate-900 dark:text-white">Admit cards ready for 1,250 students</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Official documents can be printed and distributed after due verification.</p>
          </div>
        </div>
      )}

      <AdmitCardModal isOpen={isAdmitCardOpen} onClose={() => setIsAdmitCardOpen(false)} studentId={1} />
    </div>
  );
};
