import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import {
  Calendar,
  Clock,
  Layers,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Users,
  MapPin,
  Sparkles
} from 'lucide-react';

export const AcademicManagement = () => {
  const [activeTab, setActiveTab] = useState('sessions'); // 'sessions' | 'shifts' | 'classes' | 'subjects' | 'routine'

  // 1. Sessions State
  const [sessions, setSessions] = useState([
    { id: 1, year: '2026', title: 'Academic Session 2026', is_current: true, start_date: '2026-01-01', end_date: '2026-12-31', students_count: 1250 },
    { id: 2, year: '2027', title: 'Academic Session 2027 (Upcoming)', is_current: false, start_date: '2027-01-01', end_date: '2027-12-31', students_count: 0 },
    { id: 3, year: '2025', title: 'Academic Session 2025 (Archive)', is_current: false, start_date: '2025-01-01', end_date: '2025-12-31', students_count: 1180 }
  ]);

  // 2. Shifts & Versions
  const [shifts, setShifts] = useState([
    { id: 1, name: 'Morning Shift (প্রভাতি শাখা)', start_time: '07:30 AM', end_time: '12:00 PM', version: 'Bangla Version', status: 'active' },
    { id: 2, name: 'Day Shift (দিবা শাখা)', start_time: '12:30 PM', end_time: '05:30 PM', version: 'Bangla & English Version', status: 'active' }
  ]);

  // 3. Classes & Sections Config (Class 1 to 12 / HSC)
  const [classList, setClassList] = useState([
    { id: 1, name: 'Class 6 (Six)', numeric: 6, sections: ['Padma (Morning)', 'Meghna (Day)'], groups: ['General'], count: 230 },
    { id: 2, name: 'Class 7 (Seven)', numeric: 7, sections: ['Padma', 'Meghna'], groups: ['General'], count: 200 },
    { id: 3, name: 'Class 8 (Eight - JSC)', numeric: 8, sections: ['Padma', 'Meghna', 'Surma'], groups: ['General'], count: 220 },
    { id: 4, name: 'Class 9 (Nine - SSC)', numeric: 9, sections: ['Science A', 'Science B', 'Business Studies', 'Humanities'], groups: ['Science', 'Commerce', 'Humanities'], count: 250 },
    { id: 5, name: 'Class 10 (Ten - SSC Batch)', numeric: 10, sections: ['Padma (Science)', 'Meghna (Commerce)', 'Jamuna (Humanities)'], groups: ['Science', 'Commerce', 'Humanities'], count: 270 },
    { id: 6, name: 'Class 11 (HSC 1st Year)', numeric: 11, sections: ['Section A (Science)', 'Section B (Commerce)'], groups: ['Science', 'Commerce'], count: 45 },
    { id: 7, name: 'Class 12 (HSC 2nd Year)', numeric: 12, sections: ['Section A (Science)', 'Section B (Commerce)'], groups: ['Science', 'Commerce'], count: 35 }
  ]);

  // 4. Subjects Configuration & Teacher Allocation
  const [subjects, setSubjects] = useState([
    { id: 1, class_id: 5, name: 'Bangla 1st Paper', code: '101', type: 'Compulsory', cq: 70, mcq: 30, pr: 0, teacher: 'Nusrat Jahan (Senior Lecturer)' },
    { id: 2, class_id: 5, name: 'Bangla 2nd Paper', code: '102', type: 'Compulsory', cq: 70, mcq: 30, pr: 0, teacher: 'Nusrat Jahan' },
    { id: 3, class_id: 5, name: 'English 1st Paper', code: '107', type: 'Compulsory', cq: 100, mcq: 0, pr: 0, teacher: 'Sultana Razia' },
    { id: 4, class_id: 5, name: 'English 2nd Paper', code: '108', type: 'Compulsory', cq: 100, mcq: 0, pr: 0, teacher: 'Sultana Razia' },
    { id: 5, class_id: 5, name: 'General Mathematics', code: '109', type: 'Compulsory', cq: 70, mcq: 30, pr: 0, teacher: 'Mohammad Rafiqul Islam' },
    { id: 6, class_id: 5, name: 'Physics', code: '136', type: 'Compulsory (Science)', cq: 50, mcq: 25, pr: 25, teacher: 'Prof. Kazi Faruq Ahmed' },
    { id: 7, class_id: 5, name: 'Chemistry', code: '137', type: 'Compulsory (Science)', cq: 50, mcq: 25, pr: 25, teacher: 'Md. Anwar Hossain' },
    { id: 8, class_id: 5, name: 'Biology', code: '138', type: 'Compulsory (Science)', cq: 50, mcq: 25, pr: 25, teacher: 'Nazmul Huda' },
    { id: 9, class_id: 5, name: 'Higher Mathematics', code: '126', type: 'Elective 4th Subject', cq: 50, mcq: 25, pr: 25, teacher: 'Mohammad Rafiqul Islam' },
    { id: 10, class_id: 5, name: 'Information & Communication Tech (ICT)', code: '154', type: 'Compulsory', cq: 0, mcq: 25, pr: 25, teacher: 'Tariqul Islam' }
  ]);

  // Routine Matrix (Saturday to Thursday)
  const routineData = {
    Saturday: [
      { p: 1, time: '07:30 - 08:15 AM', sub: 'Bangla 1st Paper', teacher: 'Nusrat Jahan', room: 'Room 301' },
      { p: 2, time: '08:15 - 09:00 AM', sub: 'General Mathematics', teacher: 'Rafiqul Islam', room: 'Room 301' },
      { p: 3, time: '09:00 - 09:45 AM', sub: 'Physics (Theory)', teacher: 'Dr. Faruq Ahmed', room: 'Physics Lab' },
      { p: 4, time: '10:00 - 10:45 AM', sub: 'Chemistry Lab', teacher: 'Anwar Hossain', room: 'Chemistry Lab' }
    ],
    Sunday: [
      { p: 1, time: '07:30 - 08:15 AM', sub: 'Higher Mathematics [4th]', teacher: 'Rafiqul Islam', room: 'Room 301' },
      { p: 2, time: '08:15 - 09:00 AM', sub: 'Biology (Botany)', teacher: 'Nazmul Huda', room: 'Biology Lab' },
      { p: 3, time: '09:00 - 09:45 AM', sub: 'English 1st Paper', teacher: 'Sultana Razia', room: 'Room 301' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Academic Management & NCTB Curriculum Architecture
          </h2>
          <p className="text-xs text-slate-500">
            Configure Academic Years, Shifts, Versions, Classes (1-12), NCTB Subject Marking & Timetable Matrices
          </p>
        </div>

        {/* Sub-Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          {[
            { id: 'sessions', label: ' Sessions (2026-27)' },
            { id: 'shifts', label: ' Shifts & Versions' },
            { id: 'classes', label: ' Classes & Sections' },
            { id: 'subjects', label: ' Subjects & Teachers' },
            { id: 'routine', label: ' Routine Matrix' }
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

      {/* 1. SESSIONS SUBTAB */}
      {activeTab === 'sessions' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Academic Years & Running Sessions</h3>
            <button onClick={() => alert('New Academic Session creation modal')} className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow">
              + Add New Session
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sessions.map((s) => (
              <div
                key={s.id}
                className={`p-5 rounded-2xl border ${
                  s.is_current
                    ? 'border-emerald-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                } space-y-3 relative`}
              >
                {s.is_current && (
                  <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-emerald-500 text-white text-[10px] font-black rounded-full">
                    LIVE RUNNING
                  </span>
                )}
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{s.title}</h4>
                <p className="text-xs text-slate-500">Duration: {s.start_date} to {s.end_date}</p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-600">{s.students_count} Students Enrolled</span>
                  {!s.is_current && (
                    <button onClick={() => alert(`Activated Session: ${s.year}`)} className="text-xs text-indigo-600 font-bold hover:underline">
                      Set as Live
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. SHIFTS & VERSIONS SUBTAB */}
      {activeTab === 'shifts' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Academic Shifts & Language Versions</h3>
            <button onClick={() => alert('New Shift modal')} className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow">
              + Add Shift
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shifts.map((shift) => (
              <div key={shift.id} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{shift.name}</h4>
                  <Badge variant="success">{shift.status.toUpperCase()}</Badge>
                </div>
                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <p>⏰ Timing: <strong>{shift.start_time} - {shift.end_time}</strong></p>
                  <p>🌐 Medium / Version: <strong>{shift.version}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CLASSES & SECTIONS SUBTAB */}
      {activeTab === 'classes' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Class 1 to 12 (HSC) & Section Management</h3>
            <button onClick={() => alert('New Class / Section modal')} className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow">
              + Add Class / Section
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classList.map((c) => (
              <div key={c.id} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{c.name}</h4>
                  <Badge variant="info">{c.count} Students</Badge>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Active Sections:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {c.sections.map((sec, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-emerald-600 font-bold">
                  Groups: {c.groups.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SUBJECTS & TEACHER ALLOCATION SUBTAB */}
      {activeTab === 'subjects' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden p-5 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-extrabold text-sm">NCTB Subject Setup & Teacher Allocations (Class 10)</h3>
              <p className="text-xs text-slate-500">CQ, MCQ, Practical marks breakdown and designated faculty</p>
            </div>
            <button onClick={() => alert('New Subject modal')} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
              + Add Subject
            </button>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Subject Name</th>
                <th className="p-3">Code</th>
                <th className="p-3">Category</th>
                <th className="p-3">CQ</th>
                <th className="p-3">MCQ</th>
                <th className="p-3">Practical</th>
                <th className="p-3">Total</th>
                <th className="p-3">Assigned Faculty</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {subjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{sub.name}</td>
                  <td className="p-3 font-mono">{sub.code}</td>
                  <td className="p-3"><Badge variant={sub.type.includes('4th') ? 'warning' : 'default'}>{sub.type}</Badge></td>
                  <td className="p-3">{sub.cq}</td>
                  <td className="p-3">{sub.mcq}</td>
                  <td className="p-3">{sub.pr}</td>
                  <td className="p-3 font-bold text-emerald-600">{sub.cq + sub.mcq + sub.pr}</td>
                  <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{sub.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. ROUTINE MATRIX SUBTAB */}
      {activeTab === 'routine' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="font-extrabold text-sm">Class 10 (Science) Period Schedule & Timetable</h3>
            <button onClick={() => window.print()} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
              🖨️ Print Timetable
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {Object.keys(routineData).map((day) => (
              <div key={day} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-extrabold text-emerald-700 dark:text-emerald-400 uppercase">{day}</h4>
                <div className="space-y-1.5">
                  {routineData[day].map((p, i) => (
                    <div key={i} className="p-2 bg-white dark:bg-slate-900 rounded-lg flex justify-between items-center shadow-sm">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{p.sub}</p>
                        <p className="text-[10px] text-slate-500">{p.teacher} • {p.room}</p>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {p.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
