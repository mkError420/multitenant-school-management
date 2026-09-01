import React, { useState } from 'react';
import { TabulationSheetView } from '../../components/printables/TabulationSheetView';
import { AdmitCardModal } from '../../components/printables/IDCardGenerator';
import {
  GraduationCap,
  FileSpreadsheet,
  Printer,
  Award,
  CheckCircle2,
  Calendar,
  Contact2
} from 'lucide-react';

export const ExamsTabulation = () => {
  const [selectedExam, setSelectedExam] = useState('1');
  const [selectedClass, setSelectedClass] = useState('10');
  const [activeTab, setActiveTab] = useState('tabulation'); // 'tabulation' | 'marks_entry'
  const [isAdmitCardOpen, setIsAdmitCardOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Bangladesh NCTB Examination & Result Portal (GPA 5.0)
          </h2>
          <p className="text-xs text-slate-500">
            Creative (CQ), MCQ, Practical marks tabulation, 4th subject bonus points, and Admit Card printing
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdmitCardOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all"
          >
            <Contact2 className="w-4 h-4" />
            <span>Generate Admit Cards</span>
          </button>
        </div>
      </div>

      {/* Selector Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Examination Term
            </label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="1">Half-Yearly Examination 2026</option>
              <option value="2">Pre-Test / Model Test 2026</option>
              <option value="3">Annual Examination 2026</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Class & Section
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="10">Class 10 (SSC Candidate) - Padma</option>
              <option value="9">Class 9 - Surma</option>
              <option value="8">Class 8 - Meghna</option>
              <option value="11">Class 11 (HSC 1st Year) - Science</option>
            </select>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('tabulation')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'tabulation'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tabulation Sheet (GPA 5.0)
          </button>
          <button
            onClick={() => setActiveTab('marks_entry')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'marks_entry'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Marks Entry Grid
          </button>
        </div>
      </div>

      {/* View Content */}
      {activeTab === 'tabulation' ? (
        <TabulationSheetView />
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center text-xs text-slate-500">
          <GraduationCap className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Marks Entry Matrix for Class 10 (Science)
          </h3>
          <p className="mt-1">
            Subject marks are synchronized live with the grading engine. All inputs automatically recalculate the tabulation GPA.
          </p>
        </div>
      )}

      {/* Admit Card Modal */}
      <AdmitCardModal
        isOpen={isAdmitCardOpen}
        onClose={() => setIsAdmitCardOpen(false)}
        studentId={1}
      />
    </div>
  );
};
