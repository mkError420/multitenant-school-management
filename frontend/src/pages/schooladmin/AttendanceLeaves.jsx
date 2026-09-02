import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import {
  AlertTriangle,
  CalendarCheck2,
  Clock3,
  MessageSquareText,
  School,
  Send,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const AttendanceLeaves = () => {
  const { tenant } = useAuthStore();
  const [activeTab, setActiveTab] = useState('student');
  const [selectedDate] = useState('2026-03-01');
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);

  const [studentRecords] = useState([
    { id: 1, roll: 1, name: 'Tanvir Hasan', phone: '+8801711888001', status: 'present', in_time: '07:42 AM', mode: 'RFID Biometric Tap' },
    { id: 2, roll: 2, name: 'Sadia Afrin', phone: '+8801711888002', status: 'present', in_time: '07:38 AM', mode: 'RFID Biometric Tap' },
    { id: 3, roll: 3, name: 'Arafat Rahman', phone: '+8801711888003', status: 'absent', in_time: '--', mode: 'Manual Roll Call' },
    { id: 4, roll: 4, name: 'Farzana Akter', phone: '+8801711888004', status: 'present', in_time: '07:45 AM', mode: 'RFID Biometric Tap' }
  ]);

  const [staffRecords] = useState([
    { id: 1, name: 'Prof. Kazi Faruq Ahmed', role: 'Principal', check_in: '07:20 AM', check_out: '04:30 PM', status: 'present' },
    { id: 2, name: 'Mohammad Rafiqul Islam', role: 'Senior Math Teacher', check_in: '07:28 AM', check_out: '02:00 PM', status: 'present' },
    { id: 3, name: 'Nusrat Jahan', role: 'Lecturer in English', check_in: '--', check_out: '--', status: 'on_leave' },
    { id: 4, name: 'Md. Anwar Hossain', role: 'Chemistry Teacher', check_in: '07:35 AM', check_out: '02:15 PM', status: 'present' }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, applicant: 'Nusrat Jahan', type: 'Medical Leave', duration: '05 Mar - 07 Mar (3 days)', reason: 'Seasonal viral fever doctor prescription', status: 'pending' },
    { id: 2, applicant: 'Tanvir Hasan (Roll 1)', type: 'Student Sick Leave', duration: '02 Mar (1 day)', reason: 'Dental appointment', status: 'approved' }
  ]);

  const handleApproveLeave = (id) => {
    setLeaveRequests((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item)));
    alert('Leave application approved and attendance record updated!');
  };

  const handleRejectLeave = (id) => {
    setLeaveRequests((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item)));
  };

  const absentStudents = studentRecords.filter((s) => s.status === 'absent');
  const tabs = [
    { id: 'student', label: 'Student attendance' },
    { id: 'staff', label: 'Staff check-in' },
    { id: 'leaves', label: 'Leave requests' },
    { id: 'reports', label: 'Reports' }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-cyan-200 bg-gradient-to-r from-sky-900 via-cyan-900 to-slate-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-100">
              <School className="h-3.5 w-3.5" />
              Attendance & leaves
            </div>
            <h2 className="text-2xl font-black tracking-tight">Operations & monitoring</h2>
            <p className="mt-2 max-w-2xl text-sm text-cyan-100/80">
              Live attendance status, biometric checks, leave review, and absentee alerts for students and staff.
            </p>
          </div>

          {absentStudents.length > 0 && (
            <button onClick={() => setIsSMSModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-500/30">
              <MessageSquareText className="h-4 w-4" />
              Send absent SMS ({absentStudents.length})
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'Present today', value: '94.8%', icon: CalendarCheck2, tone: 'emerald', note: 'Student attendance' },
          { title: 'Faculty on duty', value: '97.2%', icon: ShieldCheck, tone: 'blue', note: 'Staff coverage' },
          { title: 'Pending leave', value: '1', icon: Clock3, tone: 'amber', note: 'Awaiting review' },
          { title: 'Alerts sent', value: '65', icon: Send, tone: 'violet', note: 'Parent SMS logs' }
        ].map(({ title, value, icon: Icon, tone, note }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{title}</p>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone === 'emerald' ? 'bg-emerald-100 text-emerald-600' : tone === 'blue' ? 'bg-sky-100 text-sky-600' : tone === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-violet-100 text-violet-600'}`}>
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
              className={`rounded-xl px-3 py-2 text-xs font-bold transition ${activeTab === tab.id ? 'bg-cyan-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'student' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Student roll call</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Date: {selectedDate} • Biometric sync active</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
              <Users className="h-3.5 w-3.5" />
              4 students tracked
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-3 py-3">Roll</th>
                  <th className="px-3 py-3">Student</th>
                  <th className="px-3 py-3">Phone</th>
                  <th className="px-3 py-3">Check-in</th>
                  <th className="px-3 py-3">Mode</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {studentRecords.map((student) => (
                  <tr key={student.id} className={student.status === 'absent' ? 'bg-rose-50 dark:bg-rose-950/20' : 'bg-white dark:bg-slate-900'}>
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{student.roll}</td>
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{student.name}</td>
                    <td className="px-3 py-3 font-mono text-slate-600 dark:text-slate-300">{student.phone}</td>
                    <td className="px-3 py-3 font-mono text-slate-600 dark:text-slate-300">{student.in_time}</td>
                    <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{student.mode}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${student.status === 'present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'}`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'staff' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Staff check-in</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Daily reporting log</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-3 py-3">Staff</th>
                  <th className="px-3 py-3">Role</th>
                  <th className="px-3 py-3">Check-in</th>
                  <th className="px-3 py-3">Check-out</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {staffRecords.map((staff) => (
                  <tr key={staff.id} className="bg-white dark:bg-slate-900">
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{staff.name}</td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{staff.role}</td>
                    <td className="px-3 py-3 font-mono text-slate-600 dark:text-slate-300">{staff.check_in}</td>
                    <td className="px-3 py-3 font-mono text-slate-600 dark:text-slate-300">{staff.check_out}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${staff.status === 'present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'}`}>
                        {staff.status === 'present' ? 'Present' : 'On leave'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'leaves' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Leave approvals</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Review pending leave records</p>
            </div>
            <Badge variant="warning">{leaveRequests.filter((item) => item.status === 'pending').length} pending</Badge>
          </div>

          <div className="space-y-3">
            {leaveRequests.map((request) => (
              <div key={request.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-black text-slate-900 dark:text-white">{request.applicant}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{request.type} • {request.duration}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${request.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : request.status === 'rejected' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'}`}>
                    {request.status}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">Reason: <span className="font-bold">{request.reason}</span></p>

                {request.status === 'pending' && (
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => handleApproveLeave(request.id)} className="rounded-xl bg-emerald-600 px-3 py-2 text-[10px] font-bold text-white">Approve</button>
                    <button onClick={() => handleRejectLeave(request.id)} className="rounded-xl bg-rose-600 px-3 py-2 text-[10px] font-bold text-white">Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Monthly summary</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Attendance and messaging performance</p>
            </div>
            <button className="rounded-xl bg-emerald-600 px-3.5 py-2 text-[10px] font-bold text-white">Export report</button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center dark:border-emerald-900 dark:bg-emerald-950/20">
              <p className="text-3xl font-black text-emerald-700">94.8%</p>
              <p className="mt-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">Student attendance</p>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-center dark:border-sky-900 dark:bg-sky-950/20">
              <p className="text-3xl font-black text-sky-700">97.2%</p>
              <p className="mt-2 text-xs font-bold text-sky-900 dark:text-sky-300">Faculty presence</p>
            </div>
            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 text-center dark:border-violet-900 dark:bg-violet-950/20">
              <p className="text-3xl font-black text-violet-700">65</p>
              <p className="mt-2 text-xs font-bold text-violet-900 dark:text-violet-300">Absent alerts sent</p>
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={isSMSModalOpen} onClose={() => setIsSMSModalOpen(false)} title="Dispatch absent alert SMS">
        <div className="space-y-4 text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-200">
            Sending absentee notification to {absentStudents.length} guardian(s) via GreenwebBD.
          </p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
            শ্রদ্ধেয় অভিভাবক, আপনার সন্তান আজ বিদ্যালয়ে অনুপস্থিত। - {tenant?.name || 'MANE COLLEGE'}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsSMSModalOpen(false)} className="rounded-xl bg-slate-200 px-4 py-2 font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">Cancel</button>
            <button onClick={() => { setIsSMSModalOpen(false); alert('✅ Absent SMS sent to guardians!'); }} className="rounded-xl bg-rose-600 px-4 py-2 font-bold text-white">Dispatch SMS</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
