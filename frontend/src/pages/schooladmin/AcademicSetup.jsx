import React, { useState } from 'react';
import { Badge } from '../../components/common/StatCard';
import {
  Settings,
  Calendar,
  Clock,
  Layers,
  BookOpen,
  Plus,
  CheckCircle2
} from 'lucide-react';

export const AcademicSetup = () => {
  const [activeTab, setActiveTab] = useState('classes'); // 'sessions' | 'shifts' | 'classes' | 'subjects'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Academic Structure & NCTB Curriculum Setup
          </h2>
          <p className="text-xs text-slate-500">
            Configure Academic Sessions, Morning/Day Shifts, Classes, Sections, and Subject marking schemes
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold self-start sm:self-auto">
          {[
            { id: 'classes', label: 'Classes & Sections' },
            { id: 'subjects', label: 'NCTB Subjects' },
            { id: 'shifts', label: 'Shifts' },
            { id: 'sessions', label: 'Academic Years' }
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
            <div
              key={i}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{c.name}</h3>
                <Badge variant="success">{c.students} Enrolled</Badge>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Active Sections:</span>
                <div className="flex flex-wrap gap-1.5">
                  {c.sections.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {c.hasGroup && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓ Science • Humanities • Business Studies
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'subjects' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs font-bold text-slate-900 dark:text-white">
            NCTB Secondary & Higher Secondary Subject Matrix
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] border-b border-slate-200 dark:border-slate-800">
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
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
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
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{s.name}</td>
                    <td className="p-3 font-mono">{s.code}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.type === 'Elective 4th' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
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
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Morning Shift (প্রভাতি শাখা)</h3>
            <p className="text-xs text-slate-500">Operating: 07:30 AM - 12:00 PM</p>
            <Badge variant="success">Boys & Girls Section A</Badge>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Day Shift (দিবা শাখা)</h3>
            <p className="text-xs text-slate-500">Operating: 12:30 PM - 05:30 PM</p>
            <Badge variant="info">Senior High & College</Badge>
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-2xl p-5 shadow-sm space-y-2 relative">
            <span className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              CURRENT LIVE
            </span>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Academic Session 2026</h3>
            <p className="text-xs text-slate-500">01 January 2026 to 31 December 2026</p>
            <p className="text-xs text-emerald-600 font-bold">1,250 Students Enrolled</p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2 opacity-70">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Academic Session 2025</h3>
            <p className="text-xs text-slate-500">Archived Session Data</p>
            <Badge variant="default">Archived</Badge>
          </div>
        </div>
      )}
    </div>
  );
};
