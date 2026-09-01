import React, { useState } from 'react';
import { Clock, Calendar, Users, MapPin } from 'lucide-react';

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Weekly Class Routine & Schedule Matrix
          </h2>
          <p className="text-xs text-slate-500">
            6-day academic period matrix (Saturday to Thursday) with teacher allocations and lab assignments
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="10">Class 10 (Science) - Morning Shift</option>
            <option value="9">Class 9 (Science)</option>
            <option value="8">Class 8</option>
          </select>
        </div>
      </div>

      {/* Routine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((day) => (
          <div
            key={day.key}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-xs text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                {day.name}
              </h3>
              <span className="text-[10px] font-bold text-slate-400">
                {routineMatrix[day.key]?.length || 0} Periods
              </span>
            </div>

            <div className="space-y-2.5">
              {routineMatrix[day.key]?.map((p, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 dark:text-white">{p.subject}</span>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      P{p.period}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {p.time}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {p.room}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold">{p.teacher}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
