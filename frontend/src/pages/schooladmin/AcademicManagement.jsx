import React, { useState } from 'react';
import { Badge } from '../../components/common/StatCard';
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Layers3,
  Sparkles,
  Users,
  Clock3,
  CheckCircle2,
  School
} from 'lucide-react';

export const AcademicManagement = () => {
  const [activeTab, setActiveTab] = useState('sessions');

  const [sessions] = useState([
    { id: 1, year: '2026', title: 'Academic Session 2026', is_current: true, start_date: '2026-01-01', end_date: '2026-12-31', students_count: 1250 },
    { id: 2, year: '2027', title: 'Academic Session 2027', is_current: false, start_date: '2027-01-01', end_date: '2027-12-31', students_count: 0 },
    { id: 3, year: '2025', title: 'Academic Session 2025 Archive', is_current: false, start_date: '2025-01-01', end_date: '2025-12-31', students_count: 1180 }
  ]);

  const [shifts] = useState([
    { id: 1, name: 'Morning Shift', start_time: '07:30 AM', end_time: '12:00 PM', version: 'Bangla Version', status: 'active' },
    { id: 2, name: 'Day Shift', start_time: '12:30 PM', end_time: '05:30 PM', version: 'Bangla & English', status: 'active' }
  ]);

  const [classList] = useState([
    { id: 1, name: 'Class 6', sections: ['Padma', 'Meghna'], groups: ['General'], count: 230 },
    { id: 2, name: 'Class 7', sections: ['Padma', 'Meghna'], groups: ['General'], count: 200 },
    { id: 3, name: 'Class 8', sections: ['Padma', 'Meghna', 'Surma'], groups: ['General'], count: 220 },
    { id: 4, name: 'Class 9', sections: ['Science A', 'Science B', 'Business', 'Humanities'], groups: ['Science', 'Commerce', 'Humanities'], count: 250 },
    { id: 5, name: 'Class 10', sections: ['Padma', 'Meghna', 'Jamuna'], groups: ['Science', 'Commerce', 'Humanities'], count: 270 },
    { id: 6, name: 'Class 11', sections: ['Science A', 'Commerce B'], groups: ['Science', 'Commerce'], count: 45 },
    { id: 7, name: 'Class 12', sections: ['Science A', 'Commerce B'], groups: ['Science', 'Commerce'], count: 35 }
  ]);

  const [subjects] = useState([
    { id: 1, name: 'Bangla 1st Paper', code: '101', type: 'Compulsory', cq: 70, mcq: 30, pr: 0, teacher: 'Nusrat Jahan' },
    { id: 2, name: 'English 1st Paper', code: '107', type: 'Compulsory', cq: 100, mcq: 0, pr: 0, teacher: 'Sultana Razia' },
    { id: 3, name: 'General Mathematics', code: '109', type: 'Compulsory', cq: 70, mcq: 30, pr: 0, teacher: 'Mohammad Rafiqul Islam' },
    { id: 4, name: 'Physics', code: '136', type: 'Science Core', cq: 50, mcq: 25, pr: 25, teacher: 'Prof. Kazi Faruq Ahmed' },
    { id: 5, name: 'Chemistry', code: '137', type: 'Science Core', cq: 50, mcq: 25, pr: 25, teacher: 'Md. Anwar Hossain' },
    { id: 6, name: 'Biology', code: '138', type: 'Science Core', cq: 50, mcq: 25, pr: 25, teacher: 'Nazmul Huda' }
  ]);

  const routineData = {
    Saturday: [
      { p: 1, time: '07:30 - 08:15', sub: 'Bangla 1st Paper', teacher: 'Nusrat Jahan', room: 'Room 301' },
      { p: 2, time: '08:15 - 09:00', sub: 'General Math', teacher: 'Rafiqul Islam', room: 'Room 301' },
      { p: 3, time: '09:00 - 09:45', sub: 'Physics', teacher: 'Dr. Faruq Ahmed', room: 'Physics Lab' }
    ],
    Sunday: [
      { p: 1, time: '07:30 - 08:15', sub: 'Biology', teacher: 'Nazmul Huda', room: 'Biology Lab' },
      { p: 2, time: '08:15 - 09:00', sub: 'English 1st Paper', teacher: 'Sultana Razia', room: 'Room 301' },
      { p: 3, time: '09:00 - 09:45', sub: 'Chemistry', teacher: 'Anwar Hossain', room: 'Chemistry Lab' }
    ]
  };

  const tabs = [
    { id: 'sessions', label: 'Sessions' },
    { id: 'shifts', label: 'Shifts' },
    { id: 'classes', label: 'Classes' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'routine', label: 'Routine' }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100">
              <School className="h-3.5 w-3.5" />
              Academic operations
            </div>
            <h2 className="text-2xl font-black tracking-tight">Academic Management</h2>
            <p className="mt-2 max-w-2xl text-sm text-emerald-100/80">
              Sessions, shifts, classes, subject allocation, and timetable controls for the active academic year.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-emerald-900">
            <Sparkles className="h-4 w-4" />
            New academic plan
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'Active session', value: '2026', icon: CalendarDays, tone: 'emerald', note: 'Current academic year' },
          { title: 'Shift setup', value: '2', icon: Clock3, tone: 'blue', note: 'Morning + day' },
          { title: 'Class groups', value: '7', icon: Layers3, tone: 'violet', note: 'Primary to HSC' },
          { title: 'Subjects', value: '120+', icon: BookOpen, tone: 'amber', note: 'Allocated faculty' }
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
              className={`rounded-xl px-3 py-2 text-xs font-bold transition ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'sessions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Academic years</h3>
            <button className="rounded-xl bg-emerald-600 px-3.5 py-2 text-[10px] font-bold text-white">+ Add session</button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {sessions.map((s) => (
              <div key={s.id} className={`rounded-2xl border p-5 ${s.is_current ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/20' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'}`}>
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">{s.title}</h4>
                  {s.is_current && <Badge variant="success">Live</Badge>}
                </div>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{s.start_date} to {s.end_date}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
                  <span className="text-xs font-bold text-emerald-600">{s.students_count} enrolled</span>
                  {!s.is_current && <button className="text-[10px] font-bold text-indigo-600">Set active</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'shifts' && (
        <div className="grid gap-4 md:grid-cols-2">
          {shifts.map((shift) => (
            <div key={shift.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black text-slate-900 dark:text-white">{shift.name}</h4>
                <Badge variant="success">{shift.status}</Badge>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p>Timing: <span className="font-bold text-slate-900 dark:text-white">{shift.start_time} - {shift.end_time}</span></p>
                <p>Version: <span className="font-bold text-slate-900 dark:text-white">{shift.version}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'classes' && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {classList.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-black text-slate-900 dark:text-white">{item.name}</h4>
                <Badge variant="info">{item.count}</Badge>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Sections</p>
                <div className="flex flex-wrap gap-2">
                  {item.sections.map((section) => (
                    <span key={section} className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{section}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-700">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Groups</p>
                <p className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">{item.groups.join(' • ')}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'subjects' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Subject map</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Class 10 academic blueprint and teacher allocation</p>
            </div>
            <button className="rounded-xl bg-emerald-600 px-3.5 py-2 text-[10px] font-bold text-white">+ Add subject</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-3 py-3">Subject</th>
                  <th className="px-3 py-3">Code</th>
                  <th className="px-3 py-3">Type</th>
                  <th className="px-3 py-3">CQ</th>
                  <th className="px-3 py-3">MCQ</th>
                  <th className="px-3 py-3">Practical</th>
                  <th className="px-3 py-3">Teacher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {subjects.map((sub) => (
                  <tr key={sub.id} className="bg-white dark:bg-slate-900">
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{sub.name}</td>
                    <td className="px-3 py-3 font-mono text-slate-500">{sub.code}</td>
                    <td className="px-3 py-3"><Badge variant="default">{sub.type}</Badge></td>
                    <td className="px-3 py-3">{sub.cq}</td>
                    <td className="px-3 py-3">{sub.mcq}</td>
                    <td className="px-3 py-3">{sub.pr}</td>
                    <td className="px-3 py-3 font-bold text-slate-700 dark:text-slate-200">{sub.teacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'routine' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Timetable</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Class 10 weekly schedule</p>
            </div>
            <button className="rounded-xl bg-indigo-600 px-3.5 py-2 text-[10px] font-bold text-white">Print timetable</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(routineData).map(([day, items]) => (
              <div key={day} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <h4 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-emerald-600">{day}</h4>
                <div className="space-y-3">
                  {items.map((period) => (
                    <div key={`${day}-${period.p}`} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-black text-slate-900 dark:text-white">{period.sub}</p>
                          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{period.teacher} • {period.room}</p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">{period.time}</span>
                      </div>
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
