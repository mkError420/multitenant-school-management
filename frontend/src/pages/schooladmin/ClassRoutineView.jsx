import React, { useState } from 'react';
import { Clock, Calendar, Users, MapPin, School, Sparkles } from 'lucide-react';

export const ClassRoutineView = () => {
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('padma');

  const days = [
    { name: 'Saturday (শনিবার)', key: 'sat' },
    { name: 'Sunday (রবিবার)', key: 'sun' },
    { name: 'Monday (সোমবার)', key: 'mon' },
    { name: 'Tuesday (মঙ্গলবার)', key: 'tue' },
    { name: 'Wednesday (বুধবার)', key: 'wed' },
    { name: 'Thursday (বৃহস্পতিবার)', key: 'thu' }
  ];

  const routineMatrix = {
    sat: [
      { period: 1, time: '07:30 - 08:15 AM', subject: 'Bangla 1st Paper', teacher: 'Nusrat Jahan', room: 'Room 301' },
      { period: 2, time: '08:15 - 09:00 AM', subject: 'General Mathematics', teacher: 'Mohammad Rafiqul Islam', room: 'Room 301' },
      { period: 3, time: '09:00 - 09:45 AM', subject: 'Physics (Theory)', teacher: 'Dr. Kazi Faruq Ahmed', room: 'Physics Lab' },
      { period: 4, time: '10:00 - 10:45 AM', subject: 'Chemistry (Lab)', teacher: 'Md. Anwar Hossain', room: 'Chemistry Lab' },
      { period: 5, time: '10:45 - 11:30 AM', subject: 'English 1st Paper', teacher: 'Sultana Razia', room: 'Room 301' }
    ],
    sun: [
      { period: 1, time: '07:30 - 08:15 AM', subject: 'Higher Mathematics [4th]', teacher: 'Mohammad Rafiqul Islam', room: 'Room 301' },
      { period: 2, time: '08:15 - 09:00 AM', subject: 'Biology (Botany)', teacher: 'Nazmul Huda', room: 'Biology Lab' },
      { period: 3, time: '09:00 - 09:45 AM', subject: 'Bangla 2nd Paper', teacher: 'Nusrat Jahan', room: 'Room 301' },
      { period: 4, time: '10:00 - 10:45 AM', subject: 'ICT & Programming', teacher: 'Tariqul Islam', room: 'Computer Lab' },
      { period: 5, time: '10:45 - 11:30 AM', subject: 'English 2nd Paper', teacher: 'Sultana Razia', room: 'Room 301' }
    ],
    mon: [
      { period: 1, time: '07:30 - 08:15 AM', subject: 'Physics Practical', teacher: 'Dr. Kazi Faruq Ahmed', room: 'Physics Lab' },
      { period: 2, time: '08:15 - 09:00 AM', subject: 'General Mathematics', teacher: 'Mohammad Rafiqul Islam', room: 'Room 301' },
      { period: 3, time: '09:00 - 09:45 AM', subject: 'Chemistry (Organic)', teacher: 'Md. Anwar Hossain', room: 'Room 301' },
      { period: 4, time: '10:00 - 10:45 AM', subject: 'Islam & Moral Education', teacher: 'Mawlana Abdul Matin', room: 'Room 301' },
      { period: 5, time: '10:45 - 11:30 AM', subject: 'Bangla 1st Paper', teacher: 'Nusrat Jahan', room: 'Room 301' }
    ],
    tue: [
      { period: 1, time: '07:30 - 08:15 AM', subject: 'Higher Mathematics [4th]', teacher: 'Mohammad Rafiqul Islam', room: 'Room 301' },
      { period: 2, time: '08:15 - 09:00 AM', subject: 'Biology Practical', teacher: 'Nazmul Huda', room: 'Biology Lab' },
      { period: 3, time: '09:00 - 09:45 AM', subject: 'English 1st Paper', teacher: 'Sultana Razia', room: 'Room 301' },
      { period: 4, time: '10:00 - 10:45 AM', subject: 'BGS (বাংলাদেশ ও বিশ্বপরিচয়)', teacher: 'Kabir Uddin', room: 'Room 301' },
      { period: 5, time: '10:45 - 11:30 AM', subject: 'ICT Practical Lab', teacher: 'Tariqul Islam', room: 'Computer Lab' }
    ],
    wed: [
      { period: 1, time: '07:30 - 08:15 AM', subject: 'General Mathematics', teacher: 'Mohammad Rafiqul Islam', room: 'Room 301' },
      { period: 2, time: '08:15 - 09:00 AM', subject: 'Physics (Optics)', teacher: 'Dr. Kazi Faruq Ahmed', room: 'Room 301' },
      { period: 3, time: '09:00 - 09:45 AM', subject: 'Chemistry Lab', teacher: 'Md. Anwar Hossain', room: 'Chemistry Lab' },
      { period: 4, time: '10:00 - 10:45 AM', subject: 'English 2nd Paper', teacher: 'Sultana Razia', room: 'Room 301' },
      { period: 5, time: '10:45 - 11:30 AM', subject: 'Physical Education', teacher: 'Zillur Rahman', room: 'Playground' }
    ],
    thu: [
      { period: 1, time: '07:30 - 08:15 AM', subject: 'Higher Mathematics [4th]', teacher: 'Mohammad Rafiqul Islam', room: 'Room 301' },
      { period: 2, time: '08:15 - 09:00 AM', subject: 'Biology (Zoology)', teacher: 'Nazmul Huda', room: 'Room 301' },
      { period: 3, time: '09:00 - 09:45 AM', subject: 'Bangla 2nd Paper', teacher: 'Nusrat Jahan', room: 'Room 301' },
      { period: 4, time: '10:00 - 10:45 AM', subject: 'Weekly Model Quiz', teacher: 'Class Teacher', room: 'Room 301' }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100">
              <School className="h-3.5 w-3.5" />
              Timetable overview
            </div>
            <h2 className="text-2xl font-black tracking-tight">Weekly Class Routine & Schedule Matrix</h2>
            <p className="mt-2 max-w-2xl text-sm text-emerald-100/80">
              6-day academic period matrix with teacher allocations, room assignments, and lab-based periods.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-emerald-900">
            <Sparkles className="h-4 w-4" />
            Publish timetable
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-end">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="10">Class 10 (Science) - Morning Shift</option>
            <option value="9">Class 9 (Science)</option>
            <option value="8">Class 8</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((day) => (
          <div key={day.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">{day.name}</h3>
              <span className="text-[10px] font-bold text-slate-400">{routineMatrix[day.key]?.length || 0} periods</span>
            </div>

            <div className="space-y-2.5">
              {routineMatrix[day.key]?.map((p, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800/60">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{p.subject}</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">P{p.period}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1 font-mono"><Clock className="h-3 w-3" /> {p.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.room}</span>
                  </div>
                  <p className="mt-2 text-[10px] font-semibold text-slate-500">{p.teacher}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
