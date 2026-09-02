import React, { useState } from 'react';
import { TabulationSheetView } from '../../components/printables/TabulationSheetView';
import { AdmitCardModal } from '../../components/printables/IDCardGenerator';
import { StatCard } from '../../components/common/StatCard';
import {
  GraduationCap,
  FileSpreadsheet,
  Printer,
  Award,
  CheckCircle2,
  Calendar,
  Contact2,
  School,
  Sparkles
} from 'lucide-react';

export const ExamsTabulation = () => {
  const [selectedExam, setSelectedExam] = useState('1');
  const [selectedClass, setSelectedClass] = useState('10');
  const [activeTab, setActiveTab] = useState('tabulation');
  const [isAdmitCardOpen, setIsAdmitCardOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-indigo-200 bg-gradient-to-r from-indigo-900 via-violet-900 to-sky-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-100">
              <School className="h-3.5 w-3.5" />
              Results portal
            </div>
            <h2 className="text-2xl font-black tracking-tight">Bangladesh NCTB Examination & Result Portal (GPA 5.0)</h2>
            <p className="mt-2 max-w-2xl text-sm text-indigo-100/80">
              CQ, MCQ, practical marks tabulation, bonus-point grading, and admit card processing.
            </p>
          </div>

          <button onClick={() => setIsAdmitCardOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-indigo-900">
            <Contact2 className="h-4 w-4" />
            Generate admit cards
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Current exam" value="Half-yearly" icon={Calendar} color="indigo" subtext="2026 term" />
        <StatCard title="Eligible classes" value="4" icon={GraduationCap} color="emerald" subtext="SSC/HSC tiers" />
        <StatCard title="GPA engine" value="5.0" icon={Award} color="amber" subtext="Max score" />
        <StatCard title="Printable outputs" value="3" icon={FileSpreadsheet} color="blue" subtext="Tabulation, marks, admit" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div>
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Examination term</label>
              <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                <option value="1">Half-Yearly Examination 2026</option>
                <option value="2">Pre-Test / Model Test 2026</option>
                <option value="3">Annual Examination 2026</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Class & section</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                <option value="10">Class 10 (SSC Candidate) - Padma</option>
                <option value="9">Class 9 - Surma</option>
                <option value="8">Class 8 - Meghna</option>
                <option value="11">Class 11 (HSC 1st Year) - Science</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs font-bold dark:bg-slate-800">
            <button onClick={() => setActiveTab('tabulation')} className={`rounded-lg px-3 py-1.5 ${activeTab === 'tabulation' ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-900' : 'text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`}>
              Tabulation Sheet (GPA 5.0)
            </button>
            <button onClick={() => setActiveTab('marks_entry')} className={`rounded-lg px-3 py-1.5 ${activeTab === 'marks_entry' ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-900' : 'text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`}>
              Marks Entry Grid
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'tabulation' ? (
        <TabulationSheetView />
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-xs text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <GraduationCap className="mx-auto mb-2 h-10 w-10 text-emerald-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Marks Entry Matrix for Class 10 (Science)</h3>
          <p className="mt-1">Subject marks are synchronized live with the grading engine. All inputs automatically recalculate the tabulation GPA.</p>
        </div>
      )}

      <AdmitCardModal isOpen={isAdmitCardOpen} onClose={() => setIsAdmitCardOpen(false)} studentId={1} />
    </div>
  );
};
