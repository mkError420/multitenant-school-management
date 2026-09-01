import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import { TabulationSheetView } from '../../components/printables/TabulationSheetView';
import { AdmitCardModal } from '../../components/printables/PrintableModals';
import {
  GraduationCap,
  FileSpreadsheet,
  Printer,
  Award,
  Calendar,
  CheckCircle2,
  Contact2,
  FileText,
  Sliders
} from 'lucide-react';

export const ExaminationResults = () => {
  const [activeTab, setActiveTab] = useState('tabulation'); // 'setup' | 'marks_entry' | 'grading' | 'tabulation' | 'admit_cards'
  const [selectedExam, setSelectedExam] = useState('1');
  const [isAdmitCardOpen, setIsAdmitCardOpen] = useState(false);

  // Exam Setup List
  const [examTerms, setExamTerms] = useState([
    { id: 1, name: 'Half-Yearly Examination 2026', start_date: '2026-06-10', end_date: '2026-06-25', status: 'published', cq_weight: '70%', mcq_weight: '30%', sba: 'Continuous Assessment' },
    { id: 2, name: 'Pre-Test / Model Test Examination 2026', start_date: '2026-09-15', end_date: '2026-09-30', status: 'draft', cq_weight: '70%', mcq_weight: '30%', sba: 'SBA Applicable' },
    { id: 3, name: 'Annual Examination 2026', start_date: '2026-11-15', end_date: '2026-11-30', status: 'draft', cq_weight: '70%', mcq_weight: '30%', sba: 'Final Evaluation' }
  ]);

  // Marks Entry Matrix for Teacher
  const [marksData, setMarksData] = useState([
    { roll: 1, name: 'Tanvir Hasan', cq: 62, mcq: 26, pr: 0, ca: 0, total: 88, gpa: '5.00', grade: 'A+' },
    { roll: 2, name: 'Sadia Afrin', cq: 58, mcq: 24, pr: 0, ca: 0, total: 82, gpa: '5.00', grade: 'A+' },
    { roll: 3, name: 'Arafat Rahman', cq: 45, mcq: 20, pr: 0, ca: 0, total: 65, gpa: '3.50', grade: 'A-' },
    { roll: 4, name: 'Farzana Akter', cq: 52, mcq: 22, pr: 0, ca: 0, total: 74, gpa: '4.00', grade: 'A' }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Examination, GPA 5.0 Tabulation & Marksheets
          </h2>
          <p className="text-xs text-slate-500">
            NCTB mark distribution, teacher marks entry, GPA 5.0 rule customizer, tabulation sheets, and admit cards
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          {[
            { id: 'tabulation', label: '📊 Tabulation & Marksheets' },
            { id: 'marks_entry', label: '✍️ Marks Entry Portal' },
            { id: 'setup', label: '⚙️ Exam Setup & Weightage' },
            { id: 'grading', label: '🏆 Grading Scale (5.0)' },
            { id: 'admit_cards', label: '🎫 Admit Card Generator' }
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

      {/* 1. TABULATION & MARKSHEETS SUBTAB */}
      {activeTab === 'tabulation' && (
        <TabulationSheetView />
      )}

      {/* 2. MARKS ENTRY SUBTAB */}
      {activeTab === 'marks_entry' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Marks Entry Portal: Bangla 1st Paper (Code: 101)</h3>
              <p className="text-xs text-slate-500">Class 10 (Science) • Half-Yearly Exam 2026 • Full Marks: 100</p>
            </div>
            <button onClick={() => alert('Marks saved and synchronized to tabulation engine!')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow">
              Save & Synchronize Marks
            </button>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Roll</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Creative CQ (70)</th>
                <th className="p-3">MCQ (30)</th>
                <th className="p-3">Total (100)</th>
                <th className="p-3">Grade Point</th>
                <th className="p-3">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {marksData.map((m, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-bold">{m.roll}</td>
                  <td className="p-3 font-bold">{m.name}</td>
                  <td className="p-3"><input defaultValue={m.cq} className="w-16 p-1 border rounded bg-slate-50 dark:bg-slate-800 font-bold" /></td>
                  <td className="p-3"><input defaultValue={m.mcq} className="w-16 p-1 border rounded bg-slate-50 dark:bg-slate-800 font-bold" /></td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{m.total}</td>
                  <td className="p-3 font-black text-emerald-600">{m.gpa}</td>
                  <td className="p-3"><Badge variant="success">{m.grade}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. EXAM SETUP SUBTAB */}
      {activeTab === 'setup' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="font-extrabold text-sm">Exam Terms & Mark Distribution Weightage</h3>
            <button onClick={() => alert('New Exam creation modal')} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
              + Create Exam Term
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {examTerms.map((term) => (
              <div key={term.id} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-900 dark:text-white">{term.name}</h4>
                  <Badge variant={term.status === 'published' ? 'success' : 'default'}>{term.status.toUpperCase()}</Badge>
                </div>
                <p className="text-slate-500">Dates: {term.start_date} to {term.end_date}</p>
                <div className="pt-2 border-t text-[11px] space-y-1 text-slate-600 dark:text-slate-300">
                  <p>CQ Weight: <strong>{term.cq_weight}</strong> • MCQ: <strong>{term.mcq_weight}</strong></p>
                  <p>SBA / Continuous: <strong>{term.sba}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. GRADING RULES SUBTAB */}
      {activeTab === 'grading' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Bangladesh NCTB GPA 5.0 Standard Grading Rules</h3>
              <p className="text-xs text-slate-500">Includes 4th Subject Bonus Rule: Points above 2.0 GPA added to total score</p>
            </div>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Letter Grade</th>
                <th className="p-3">Marks Range</th>
                <th className="p-3">Grade Point (GP)</th>
                <th className="p-3">Remarks / Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {[
                { grade: 'A+', range: '80% - 100%', gp: '5.00', remarks: 'Outstanding / Golden Grade' },
                { grade: 'A',  range: '70% - 79%',  gp: '4.00', remarks: 'Excellent' },
                { grade: 'A-', range: '60% - 69%',  gp: '3.50', remarks: 'Very Good' },
                { grade: 'B',  range: '50% - 59%',  gp: '3.00', remarks: 'Good' },
                { grade: 'C',  range: '40% - 49%',  gp: '2.00', remarks: 'Satisfactory / Passing' },
                { grade: 'D',  range: '33% - 39%',  gp: '1.00', remarks: 'Minimum Passing' },
                { grade: 'F',  range: '0% - 32%',   gp: '0.00', remarks: 'Failed (Compulsory Retake)' }
              ].map((g, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-extrabold text-emerald-600 text-sm">{g.grade}</td>
                  <td className="p-3">{g.range}</td>
                  <td className="p-3 font-bold">{g.gp}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{g.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. ADMIT CARDS SUBTAB */}
      {activeTab === 'admit_cards' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Exam Admit Card Generator (A4 Print Ready)</h3>
              <p className="text-xs text-slate-500">Generates official candidate admit card with full examination timetable</p>
            </div>
            <button onClick={() => setIsAdmitCardOpen(true)} className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow">
              🎫 Launch Candidate Admit Card
            </button>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border text-center space-y-2 text-xs">
            <Award className="w-10 h-10 text-indigo-500 mx-auto" />
            <h4 className="font-bold text-sm">Admit Cards Ready for 1,250 Candidates</h4>
            <p className="text-slate-500 max-w-md mx-auto">
              Students who have cleared tuition dues can collect their official signed admit cards.
            </p>
          </div>
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
