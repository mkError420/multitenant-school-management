import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import {
  CalendarCheck,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  FileSpreadsheet,
  Printer
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const AttendanceLeaves = () => {
  const { tenant } = useAuthStore();
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'staff' | 'leaves' | 'reports'
  const [selectedDate, setSelectedDate] = useState('2026-03-01');
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);

  // Student Attendance
  const [studentRecords, setStudentRecords] = useState([
    { id: 1, roll: 1, name: 'Tanvir Hasan', phone: '+8801711888001', status: 'present', in_time: '07:42 AM', mode: 'RFID Biometric Tap' },
    { id: 2, roll: 2, name: 'Sadia Afrin', phone: '+8801711888002', status: 'present', in_time: '07:38 AM', mode: 'RFID Biometric Tap' },
    { id: 3, roll: 3, name: 'Arafat Rahman', phone: '+8801711888003', status: 'absent', in_time: '--', mode: 'Manual Roll Call' },
    { id: 4, roll: 4, name: 'Farzana Akter', phone: '+8801711888004', status: 'present', in_time: '07:45 AM', mode: 'RFID Biometric Tap' }
  ]);

  // Staff Attendance
  const [staffRecords, setStaffRecords] = useState([
    { id: 1, name: 'Prof. Kazi Faruq Ahmed', role: 'Principal', check_in: '07:20 AM', check_out: '04:30 PM', status: 'present' },
    { id: 2, name: 'Mohammad Rafiqul Islam', role: 'Senior Math Teacher', check_in: '07:28 AM', check_out: '02:00 PM', status: 'present' },
    { id: 3, name: 'Nusrat Jahan', role: 'Lecturer in English', check_in: '--', check_out: '--', status: 'on_leave' },
    { id: 4, name: 'Md. Anwar Hossain', role: 'Chemistry Teacher', check_in: '07:35 AM', check_out: '02:15 PM', status: 'present' }
  ]);

  // Leave Applications
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, applicant: 'Nusrat Jahan', type: 'Medical Leave', duration: '05 Mar - 07 Mar (3 days)', reason: 'Seasonal viral fever doctor prescription', status: 'pending', balance: '12 Days Remaining' },
    { id: 2, applicant: 'Tanvir Hasan (Roll 1)', type: 'Student Sick Leave', duration: '02 Mar (1 day)', reason: 'Dental appointment', status: 'approved', balance: 'Parent Approved' }
  ]);

  const handleApproveLeave = (id) => {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: 'approved' } : l));
    alert('Leave application approved and attendance record updated!');
  };

  const handleRejectLeave = (id) => {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: 'rejected' } : l));
  };

  const absentStudents = studentRecords.filter(s => s.status === 'absent');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Attendance, RFID Logs & Leave Management
          </h2>
          <p className="text-xs text-slate-500">
            Student roll call, biometric sync, staff check-in/out, leave approvals, and absentee SMS triggers
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          {[
            { id: 'student', label: '🎓 Student Attendance & RFID' },
            { id: 'staff', label: '👨‍🏫 Staff Check-in/Out' },
            { id: 'leaves', label: '📝 Leave Applications' },
            { id: 'reports', label: '📊 Reports & Absentee SMS' }
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

      {/* 1. STUDENT ATTENDANCE SUBTAB */}
      {activeTab === 'student' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Class 10 (Padma) Daily Roll Call & RFID Logs</h3>
              <p className="text-xs text-slate-500">Date: {selectedDate} • Biometric Sync Mode Active</p>
            </div>
            {absentStudents.length > 0 && (
              <button onClick={() => setIsSMSModalOpen(true)} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow animate-pulse">
                Send Absent Alert SMS ({absentStudents.length} Absent)
              </button>
            )}
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Roll</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Parent Phone</th>
                <th className="p-3">Check-In Time</th>
                <th className="p-3">Verification Mode</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {studentRecords.map((r) => (
                <tr key={r.id} className={r.status === 'absent' ? 'bg-rose-50/40 dark:bg-rose-950/20' : ''}>
                  <td className="p-3 font-bold">{r.roll}</td>
                  <td className="p-3 font-bold">{r.name}</td>
                  <td className="p-3 font-mono text-emerald-600">{r.phone}</td>
                  <td className="p-3 font-mono">{r.in_time}</td>
                  <td className="p-3 text-slate-500 text-[11px]">{r.mode}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${r.status === 'present' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                      {r.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. STAFF ATTENDANCE SUBTAB */}
      {activeTab === 'staff' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Faculty & Staff Daily Attendance Registry</h3>
              <p className="text-xs text-slate-500">Date: {selectedDate} • Check-In / Check-Out Timestamps</p>
            </div>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Staff Name</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Check-In</th>
                <th className="p-3">Check-Out</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {staffRecords.map((s) => (
                <tr key={s.id}>
                  <td className="p-3 font-bold">{s.name}</td>
                  <td className="p-3 text-slate-500">{s.role}</td>
                  <td className="p-3 font-mono">{s.check_in}</td>
                  <td className="p-3 font-mono">{s.check_out}</td>
                  <td className="p-3">
                    {s.status === 'present' ? (
                      <Badge variant="success">Present</Badge>
                    ) : (
                      <Badge variant="warning">On Approved Leave</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. LEAVE APPLICATIONS SUBTAB */}
      {activeTab === 'leaves' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="font-extrabold text-sm">Faculty & Student Leave Applications Review</h3>
            <Badge variant="warning">{leaveRequests.filter(l => l.status === 'pending').length} Pending Requests</Badge>
          </div>

          <div className="space-y-3">
            {leaveRequests.map((req) => (
              <div key={req.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">{req.applicant}</span>
                  <Badge variant={req.status === 'approved' ? 'success' : req.status === 'rejected' ? 'danger' : 'warning'}>
                    {req.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Type:</strong> {req.type} • <strong>Duration:</strong> {req.duration}
                </p>
                <p className="text-slate-500"><strong>Reason:</strong> {req.reason}</p>
                
                {req.status === 'pending' && (
                  <div className="pt-2 flex gap-2">
                    <button onClick={() => handleApproveLeave(req.id)} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg">
                      Approve Leave
                    </button>
                    <button onClick={() => handleRejectLeave(req.id)} className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. REPORTS & ABSENTEE SMS SUBTAB */}
      {activeTab === 'reports' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Monthly Attendance Summary & Absentee Trends</h3>
              <p className="text-xs text-slate-500">March 2026 Classwise Summary Report</p>
            </div>
            <button onClick={() => window.print()} className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
              🖨️ Print Monthly Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 text-center">
              <span className="text-3xl font-black text-emerald-700">94.8%</span>
              <p className="font-bold text-emerald-900 mt-1">Average Student Attendance Rate</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 text-center">
              <span className="text-3xl font-black text-blue-700">97.2%</span>
              <p className="font-bold text-blue-900 mt-1">Faculty & Staff Attendance Rate</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 text-center">
              <span className="text-3xl font-black text-purple-700">65 SMS</span>
              <p className="font-bold text-purple-900 mt-1">Absentee SMS Alerts Dispatched Today</p>
            </div>
          </div>
        </div>
      )}

      {/* Absent SMS Alert Modal */}
      <Modal isOpen={isSMSModalOpen} onClose={() => setIsSMSModalOpen(false)} title="📱 Dispatch Absent Alert SMS to Parents">
        <div className="space-y-4 text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-200">
            Sending absentee notification to {absentStudents.length} guardian(s) via GreenwebBD Gateway.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bengali text-sm leading-relaxed border">
            শ্রদ্ধেয় অভিভাবক, আপনার সন্তান আজ বিদ্যালয়ে অনুপস্থিত। - {tenant?.name || 'MANE COLLEGE'}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsSMSModalOpen(false)} className="px-4 py-2 bg-slate-200 rounded-xl font-bold">Cancel</button>
            <button onClick={() => { setIsSMSModalOpen(false); alert('✅ Absent SMS sent to guardians!'); }} className="px-5 py-2 bg-rose-600 text-white font-bold rounded-xl shadow">
              Dispatch Live SMS
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
