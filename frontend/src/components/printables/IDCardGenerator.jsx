import React from 'react';
import { Printer, X } from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const IDCardGenerator = ({ student, onClose }) => {
  const { tenant, selectedSession } = useAuthStore();

  const handlePrint = () => {
    window.print();
  };

  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        {/* Header toolbar */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Student ID Card Generator (Dual-Sided A4 / PVC CR80 Ready)
            </h3>
            <p className="text-xs text-slate-500">Official Student Identity Document</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print ID Card</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-8 flex flex-col md:flex-row items-center justify-center gap-6 bg-slate-100 dark:bg-slate-950">
          {/* FRONT SIDE */}
          <div className="w-[300px] h-[450px] bg-white text-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-300 relative flex flex-col justify-between">
            {/* Header Banner */}
            <div className="bg-emerald-700 text-white p-3.5 text-center relative">
              <div className="w-10 h-10 mx-auto rounded-full bg-white text-emerald-800 font-black flex items-center justify-center shadow-md mb-1 text-xs">
                {tenant?.short_name || 'BD'}
              </div>
              <h4 className="font-extrabold text-xs tracking-tight uppercase leading-tight">
                {tenant?.name || 'Dhaka Residential Model College'}
              </h4>
              <p className="text-[9px] text-emerald-100 mt-0.5">
                EIIN: {tenant?.eiin_number} • Session: {selectedSession}
              </p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full shadow">
                STUDENT ID CARD
              </div>
            </div>

            {/* Photo & Main Details */}
            <div className="p-4 pt-2 text-center flex-1 flex flex-col justify-center">
              <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden ring-4 ring-emerald-600/20 shadow-md mb-2">
                <img
                  src={student.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={student.name_en}
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="font-extrabold text-sm text-slate-900">{student.name_en}</h5>
              <p className="text-xs font-semibold text-emerald-700 font-bengali">{student.name_bn}</p>

              <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-2 text-left text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Roll No:</span>
                  <span className="font-bold text-slate-900">{student.roll_no}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Class:</span>
                  <span className="font-bold text-slate-900">{student.class_name || 'Class 10'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Section & Shift:</span>
                  <span className="font-bold text-slate-900">{student.section_name || 'Padma'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Blood Group:</span>
                  <span className="font-bold text-rose-600">{student.blood_group || 'O+'}</span>
                </div>
              </div>
            </div>

            {/* Footer Stripe */}
            <div className="bg-emerald-800 text-white text-[9px] py-1.5 text-center font-bold tracking-wider uppercase">
              Adm No: {student.admission_no}
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="w-[300px] h-[450px] bg-white text-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-300 relative flex flex-col justify-between p-4 text-center">
            <div>
              <h5 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Emergency Instructions & Contact
              </h5>
              <div className="w-12 h-0.5 bg-emerald-600 mx-auto my-1.5 rounded-full"></div>

              <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-left text-[10px] space-y-1.5">
                <div>
                  <span className="text-slate-400 block">Father / Guardian:</span>
                  <span className="font-bold text-slate-800">{student.father_name || 'Guardian'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Emergency Contact:</span>
                  <span className="font-bold text-emerald-700">{student.emergency_contact || '+8801711000000'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Residential Address:</span>
                  <span className="font-medium text-slate-700 text-[9px]">{student.present_address || 'Dhaka, Bangladesh'}</span>
                </div>
              </div>

              {/* Barcode Simulation */}
              <div className="mt-4 p-2 bg-white border border-slate-200 rounded-xl flex flex-col items-center justify-center">
                <div className="h-10 w-44 flex items-center justify-between px-2">
                  {[3,1,4,2,5,1,2,4,1,3,2,1,4,2,3,1,2,5,2,1,3,2,4,1,2,3].map((w, i) => (
                    <div
                      key={i}
                      className="h-full bg-slate-900"
                      style={{ width: `${w * 1.5}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[9px] text-slate-500 tracking-widest mt-1">
                  *{student.admission_no}*
                </span>
              </div>
            </div>

            {/* Principal Signature & Disclaimer */}
            <div className="mt-2 pt-2 border-t border-slate-200">
              <div className="flex justify-between items-end px-2">
                <div className="text-[8px] text-slate-400 text-left">
                  <p>Valid till: 31 Dec {selectedSession}</p>
                  <p>If found, return to school office</p>
                </div>
                <div className="text-center">
                  <div className="font-serif italic font-bold text-emerald-800 text-xs">Kazi Faruq</div>
                  <div className="w-16 h-px bg-slate-400 mx-auto"></div>
                  <span className="text-[8px] font-bold uppercase text-slate-600 block">Principal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdmitCardModal = ({ isOpen, onClose, studentId }) => {
  const { tenant } = useAuthStore();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Toolbar */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              NCTB Official Examination Admit Card (A4 Print Ready)
            </h3>
            <p className="text-xs text-slate-500">Half-Yearly Examination 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print Admit Card</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 border-4 border-double border-slate-400 m-4 rounded-xl bg-white relative">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-7xl font-black rotate-[-30deg]">
            {tenant?.short_name || 'DRMC'}
          </div>

          {/* Institutional Header */}
          <div className="text-center pb-4 border-b-2 border-emerald-800">
            <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">
              {tenant?.name || 'Dhaka Residential Model College'}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              {tenant?.address || 'Mirpur Road, Mohammadpur, Dhaka-1207'} • EIIN: {tenant?.eiin_number || '107985'}
            </p>
            <div className="inline-block mt-2 px-4 py-1 rounded-full bg-emerald-700 text-white font-black text-xs uppercase tracking-wider">
              ADMIT CARD - HALF-YEARLY EXAMINATION 2026
            </div>
          </div>

          {/* Candidate Info Grid */}
          <div className="my-4 flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs flex-1">
              <div>
                <span className="text-slate-500 font-semibold">Student Name:</span>{' '}
                <span className="font-bold text-slate-900">Tanvir Hasan</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Roll Number:</span>{' '}
                <span className="font-bold text-emerald-800 text-sm">01</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Admission No:</span>{' '}
                <span className="font-mono font-bold text-slate-900">ADM-2026-1001</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Class & Shift:</span>{' '}
                <span className="font-bold text-slate-900">Class 10 (Morning)</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Group / Stream:</span>{' '}
                <span className="font-bold text-slate-900">Science (বিজ্ঞান বিভাগ)</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Exam Hall Room:</span>{' '}
                <span className="font-bold text-slate-900">Room 301</span>
              </div>
            </div>

            <div className="w-20 h-24 rounded-lg overflow-hidden border-2 border-emerald-600 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Candidate"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Exam Timetable */}
          <table className="w-full border-collapse border border-slate-300 text-xs text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold">
                <th className="border border-slate-300 p-2">Date & Day</th>
                <th className="border border-slate-300 p-2">Subject Name & Code</th>
                <th className="border border-slate-300 p-2">Time</th>
                <th className="border border-slate-300 p-2 text-center">Invigilator Sig.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { date: '10-06-2026 (Wed)', sub: 'Bangla 1st Paper (101)', time: '10:00 AM - 01:00 PM' },
                { date: '12-06-2026 (Fri)', sub: 'Bangla 2nd Paper (102)', time: '10:00 AM - 01:00 PM' },
                { date: '15-06-2026 (Mon)', sub: 'English 1st Paper (107)', time: '10:00 AM - 01:00 PM' },
                { date: '17-06-2026 (Wed)', sub: 'English 2nd Paper (108)', time: '10:00 AM - 01:00 PM' },
                { date: '20-06-2026 (Sat)', sub: 'General Mathematics (109)', time: '10:00 AM - 01:00 PM' },
                { date: '22-06-2026 (Mon)', sub: 'Physics (136)', time: '10:00 AM - 01:00 PM' },
                { date: '24-06-2026 (Wed)', sub: 'Chemistry (137)', time: '10:00 AM - 01:00 PM' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="border border-slate-300 p-2 font-medium">{row.date}</td>
                  <td className="border border-slate-300 p-2 font-bold text-slate-800">{row.sub}</td>
                  <td className="border border-slate-300 p-2">{row.time}</td>
                  <td className="border border-slate-300 p-2 text-center text-slate-300">__________</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Exam Rules & Signatures */}
          <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">Rules & Instructions:</p>
            <p>1. Must arrive at exam hall 15 minutes before exam starts with this original admit card.</p>
            <p>2. Electronic gadgets, programmable calculators, or unfair means are strictly punishable by disqualification.</p>
          </div>

          <div className="mt-8 flex justify-between items-end px-4">
            <div className="text-center">
              <div className="w-24 h-px bg-slate-400 mx-auto"></div>
              <span className="text-[10px] font-bold text-slate-600 uppercase mt-1 block">Class Teacher</span>
            </div>
            <div className="text-center">
              <div className="font-serif italic font-bold text-emerald-800 text-sm">Kazi Faruq Ahmed</div>
              <div className="w-28 h-px bg-slate-400 mx-auto"></div>
              <span className="text-[10px] font-bold text-slate-600 uppercase mt-1 block">Principal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
