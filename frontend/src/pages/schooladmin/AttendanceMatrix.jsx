import React, { useState } from 'react';
import { Badge, Modal, StatCard } from '../../components/common/StatCard';
import {
  CalendarCheck,
  Send,
  Check,
  X,
  Clock,
  AlertCircle,
  Sparkles,
  Search,
  MessageSquare,
  Users,
  School
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const AttendanceMatrix = () => {
  const { tenant } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState('2026-03-01');
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('padma');
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);
  const [smsSending, setSmsSending] = useState(false);

  const [records, setRecords] = useState([
    {
      id: 1,
      roll_no: 1,
      name: 'Tanvir Hasan',
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      guardian_phone: '+8801711888001',
      status: 'present',
      in_time: '07:42 AM',
      remarks: ''
    },
    {
      id: 2,
      roll_no: 2,
      name: 'Sadia Afrin',
      photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      guardian_phone: '+8801711888002',
      status: 'present',
      in_time: '07:38 AM',
      remarks: ''
    },
    {
      id: 3,
      roll_no: 3,
      name: 'Arafat Rahman',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      guardian_phone: '+8801711888003',
      status: 'absent',
      in_time: '',
      remarks: 'Fever reported'
    },
    {
      id: 4,
      roll_no: 4,
      name: 'Farzana Akter',
      photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
      guardian_phone: '+8801711888004',
      status: 'present',
      in_time: '07:45 AM',
      remarks: ''
    },
    {
      id: 5,
      roll_no: 5,
      name: 'Mahir Faisal',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      guardian_phone: '+8801711888005',
      status: 'late',
      in_time: '08:15 AM',
      remarks: 'Traffic delay'
    }
  ]);

  const updateStatus = (id, newStatus) => {
    setRecords(
      records.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              in_time: newStatus === 'absent' ? '' : r.in_time || '07:45 AM'
            }
          : r
      )
    );
  };

  const markAll = (status) => {
    setRecords(
      records.map((r) => ({
        ...r,
        status,
        in_time: status === 'absent' ? '' : '07:45 AM'
      }))
    );
  };

  const total = records.length;
  const presentCount = records.filter((r) => r.status === 'present').length;
  const absentCount = records.filter((r) => r.status === 'absent').length;
  const lateCount = records.filter((r) => r.status === 'late').length;
  const attendanceRate = (((presentCount + lateCount) / total) * 100).toFixed(1);

  const absentStudents = records.filter((r) => r.status === 'absent');

  const handleSendAbsentSMS = () => {
    setSmsSending(true);
    setTimeout(() => {
      setSmsSending(false);
      setIsSMSModalOpen(false);
      alert(`✅ Absent alert SMS sent to ${absentStudents.length} parent(s) via GreenwebBD Gateway!`);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100">
              <School className="h-3.5 w-3.5" />
              Attendance control
            </div>
            <h2 className="text-2xl font-black tracking-tight">Daily Attendance & Absent Alert System</h2>
            <p className="mt-2 max-w-2xl text-sm text-emerald-100/80">
              Real-time classroom roll call and instant Bengali SMS dispatch to absent guardians.
            </p>
          </div>

          {absentCount > 0 && (
            <button
              onClick={() => setIsSMSModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-500/20"
            >
              <Send className="h-4 w-4" />
              Send absent SMS ({absentCount})
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10 (SSC)</option>
                <option value="11">Class 11 (HSC)</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="padma">Padma (Morning)</option>
                <option value="meghna">Meghna (Day)</option>
                <option value="jamuna">Jamuna (Science)</option>
              </select>
            </div>
          </div>
        </div>

        <StatCard title="Present rate" value={`${attendanceRate}%`} icon={Check} color="emerald" subtext={`${presentCount} present • ${lateCount} late`} />
        <StatCard title="Absent count" value={`${absentCount}`} icon={AlertCircle} color="rose" subtext="Recipients ready" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 bg-slate-50/60 p-4 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black uppercase tracking-[0.18em] text-slate-900 dark:text-white">Class 10 (Padma) roll call matrix</h3>
            <Badge variant="info">{records.length} students</Badge>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Quick mark:</span>
            <button onClick={() => markAll('present')} className="rounded-lg bg-emerald-100 px-2.5 py-1 font-bold text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">All Present</button>
            <button onClick={() => markAll('absent')} className="rounded-lg bg-rose-100 px-2.5 py-1 font-bold text-rose-800 hover:bg-rose-200 dark:bg-rose-950 dark:text-rose-300">All Absent</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th className="py-3 px-4">Roll</th>
                <th className="py-3 px-4">Student profile</th>
                <th className="py-3 px-4">Guardian phone</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">In time</th>
                <th className="py-3 px-4">Remarks</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {records.map((r) => (
                <tr key={r.id} className="bg-white dark:bg-slate-900">
                  <td className="px-4 py-3 font-black text-slate-900 dark:text-white">{r.roll_no}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={r.photo_url} alt={r.name} className="h-9 w-9 rounded-xl object-cover ring-2 ring-emerald-500/20" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{r.name}</p>
                        <p className="text-[10px] text-slate-500">Class {selectedClass}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-emerald-600">{r.guardian_phone}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="present">Present</option>
                      <option value="late">Late</option>
                      <option value="absent">Absent</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-200">{r.in_time || '—'}</td>
                  <td className="px-4 py-3 text-slate-500">{r.remarks || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"> <Clock className="h-3 w-3" /> Log</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isSMSModalOpen} onClose={() => setIsSMSModalOpen(false)} title="📱 Dispatch absent alert SMS">
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-300">Send SMS to {absentStudents.length} absent guardian(s) using the current gateway configuration.</p>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <p className="font-bold text-slate-900 dark:text-white">Recipients</p>
            <div className="mt-2 space-y-1">
              {absentStudents.slice(0, 3).map((student) => (
                <div key={student.id} className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span>{student.name}</span>
                  <span className="font-mono">{student.guardian_phone}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsSMSModalOpen(false)} className="rounded-xl bg-slate-100 px-3 py-2 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">Cancel</button>
            <button type="button" onClick={handleSendAbsentSMS} className="rounded-xl bg-rose-600 px-3 py-2 font-bold text-white shadow-lg shadow-rose-600/20" disabled={smsSending}>{smsSending ? 'Sending...' : 'Send SMS'}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
                <th className="py-3 px-4">In-Time</th>
                <th className="py-3 px-4">Attendance Status</th>
                <th className="py-3 px-4">Remarks / Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {records.map((r) => (
                <tr
                  key={r.id}
                  className={`transition-colors ${
                    r.status === 'absent'
                      ? 'bg-rose-50/40 dark:bg-rose-950/20'
                      : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3.5 px-4 font-extrabold text-sm text-slate-900 dark:text-white">
                    {r.roll_no < 10 ? `0${r.roll_no}` : r.roll_no}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={r.photo_url}
                        alt={r.name}
                        className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-500/20 shrink-0"
                      />
                      <span className="font-bold text-slate-900 dark:text-white">{r.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    {r.guardian_phone}
                  </td>
                  <td className="py-3.5 px-4">
                    {r.in_time ? (
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-mono">
                        <Clock className="w-3 h-3 text-emerald-500" />
                        {r.in_time}
                      </span>
                    ) : (
                      <span className="text-slate-400">--</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateStatus(r.id, 'present')}
                        className={`px-3 py-1 rounded-xl font-bold text-xs transition-all ${
                          r.status === 'present'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, 'absent')}
                        className={`px-3 py-1 rounded-xl font-bold text-xs transition-all ${
                          r.status === 'absent'
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, 'late')}
                        className={`px-3 py-1 rounded-xl font-bold text-xs transition-all ${
                          r.status === 'late'
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        Late
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <input
                      type="text"
                      placeholder="Add remarks..."
                      value={r.remarks}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRecords(records.map((rec) => (rec.id === r.id ? { ...rec, remarks: val } : rec)));
                      }}
                      className="w-full px-2.5 py-1 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Absent SMS Alert Confirmation Modal */}
      <Modal
        isOpen={isSMSModalOpen}
        onClose={() => setIsSMSModalOpen(false)}
        title="📱 Trigger Automated Absent SMS Alert (GreenwebBD Gateway)"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-300">
            <p className="font-bold">
              You are about to dispatch Absent Notifications to {absentStudents.length} guardian(s).
            </p>
            <p className="text-[11px] mt-0.5">
              Cost: {absentStudents.length} SMS credits will be deducted from your tenant balance.
            </p>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Bangla SMS Message Template:
            </label>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-bengali text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              শ্রদ্ধেয় অভিভাবক, আপনার সন্তান <strong>[শিক্ষার্থীর নাম]</strong> (রোল: [রোল]) আজ {selectedDate} তারিখে বিদ্যালয়ে অনুপস্থিত। - {tenant?.name || 'DRMC'}
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Recipients List ({absentStudents.length} Guardians):
            </label>
            <div className="max-h-36 overflow-y-auto space-y-1 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
              {absentStudents.map((stu) => (
                <div key={stu.id} className="flex justify-between items-center text-[11px] p-1.5 bg-white dark:bg-slate-900 rounded-lg">
                  <span className="font-bold">{stu.name} (Roll {stu.roll_no})</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">{stu.guardian_phone}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsSMSModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleSendAbsentSMS}
              disabled={smsSending}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md shadow-rose-600/20 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{smsSending ? 'Sending SMS...' : 'Dispatch Live SMS Now'}</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
