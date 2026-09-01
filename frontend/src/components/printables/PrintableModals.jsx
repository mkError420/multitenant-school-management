// FeeReceiptModal – 3-part money voucher (exported for FeesAccounts.jsx)
// AdmitCardModal  – exported for ExaminationResults.jsx
// These live here so they co-locate with the other printable components.

import React from 'react';
import { Modal } from '../common/StatCard';
import { useAuthStore } from '../../services/authStore';

// ─────────────────────────────────────────────
//  FeeReceiptModal
// ─────────────────────────────────────────────
export const FeeReceiptModal = ({ isOpen, onClose, invoice }) => {
  const { tenant } = useAuthStore();
  if (!invoice) return null;

  const copies = [
    { label: 'Student Copy (ছাত্র কপি)',       color: 'border-emerald-400', badge: 'bg-emerald-100 text-emerald-800' },
    { label: 'School Copy (প্রতিষ্ঠান কপি)', color: 'border-blue-400',    badge: 'bg-blue-100 text-blue-800' },
    { label: 'Bank Copy (ব্যাংক কপি)',          color: 'border-amber-400',  badge: 'bg-amber-100 text-amber-800' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🧾 3-Part Money Receipt Voucher (বাউচার রসিদ)" maxWidth="max-w-2xl">
      <div className="space-y-3 text-xs">
        <div className="no-print flex justify-end mb-2">
          <button onClick={() => window.print()} className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-xl shadow">
            🖨️ Print 3-Part Voucher
          </button>
        </div>

        {copies.map((copy, idx) => (
          <div key={idx} className={`border-2 ${copy.color} rounded-xl p-4 space-y-2 bg-slate-50 dark:bg-slate-800/60`}>
            <div className="flex justify-between border-b pb-1.5">
              <div>
                <p className="font-extrabold text-sm">{tenant?.name || 'Mane School and College'}</p>
                <p className="text-[10px] text-slate-400">EIIN: {tenant?.eiin || '107985'} • Dhaka Education Board</p>
              </div>
              <span className={`self-start px-2 py-0.5 rounded-full font-bold text-[10px] ${copy.badge}`}>{copy.label}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <p>Invoice: <strong className="font-mono">{invoice.invoice_no}</strong></p>
                <p>Student: <strong>{invoice.student_name} (Roll {invoice.roll})</strong></p>
                <p>Class: <strong>{invoice.class_name}</strong></p>
              </div>
              <div className="text-right">
                <p className="text-emerald-700 font-black text-sm">৳{invoice.paid} Received</p>
                <p className="font-mono">{invoice.method}</p>
                <p>{invoice.date}</p>
              </div>
            </div>

            <div className="flex justify-between items-end border-t pt-2 text-[10px] text-slate-400">
              <span>Ref: {invoice.invoice_no.replace('INV', 'VCH')}</span>
              <div className="text-center">
                <div className="w-24 h-px bg-slate-400 mb-0.5"></div>
                <span className="font-bold text-slate-700 dark:text-slate-200">Authorized Signatory</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

// ─────────────────────────────────────────────
//  AdmitCardModal
// ─────────────────────────────────────────────
export const AdmitCardModal = ({ isOpen, onClose, studentId }) => {
  const { tenant } = useAuthStore();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🎫 Examination Admit Card Generator" maxWidth="max-w-2xl">
      <div className="space-y-4">
        <div className="no-print flex justify-end">
          <button onClick={() => window.print()} className="px-4 py-1.5 bg-indigo-600 text-white font-bold rounded-xl shadow text-xs">
            🖨️ Print Admit Card
          </button>
        </div>

        {/* Admit card template */}
        <div className="border-4 border-double border-slate-400 rounded-xl p-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white space-y-4 text-xs">
          <div className="text-center pb-3 border-b border-slate-300">
            <h3 className="font-extrabold text-base uppercase">{tenant?.name || 'Mane School and College'}</h3>
            <p className="text-[10px] text-slate-500">EIIN: {tenant?.eiin || '107985'} • Dhaka Education Board</p>
            <div className="mt-2 inline-block px-4 py-1 bg-emerald-700 text-white font-black text-xs uppercase rounded-full">
              Half-Yearly Examination 2026 — Admit Card
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 space-y-1.5">
            <div className="flex justify-between">
              <span>Student Name: <strong>Tanvir Hasan</strong></span>
              <span>Roll: <strong>01</strong></span>
            </div>
            <div className="flex justify-between">
              <span>Class: <strong>Class 10 (SSC Candidate)</strong></span>
              <span>Group: <strong>Science</strong></span>
            </div>
            <div className="flex justify-between">
              <span>Admission No: <strong className="font-mono">ADM-2026-1001</strong></span>
              <span>Session: <strong>2026</strong></span>
            </div>
          </div>

          {/* Exam schedule */}
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-500 mb-2">Examination Schedule</h4>
            <table className="w-full text-[10px]">
              <thead><tr className="bg-slate-100 dark:bg-slate-800"><th className="p-1.5 text-left">Date</th><th className="p-1.5 text-left">Subject</th><th className="p-1.5">Time</th></tr></thead>
              <tbody>
                {[
                  { date: '10 Jun 2026 (Sat)', sub: 'Bangla 1st Paper (101)', time: '10:00 AM' },
                  { date: '11 Jun 2026 (Sun)', sub: 'Bangla 2nd Paper (102)', time: '10:00 AM' },
                  { date: '13 Jun 2026 (Tue)', sub: 'English 1st Paper (107)', time: '10:00 AM' },
                  { date: '14 Jun 2026 (Wed)', sub: 'General Mathematics (109)', time: '10:00 AM' },
                ].map((r, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="p-1.5 font-mono">{r.date}</td>
                    <td className="p-1.5 font-bold">{r.sub}</td>
                    <td className="p-1.5 text-center">{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-end pt-2 border-t border-slate-300 text-[10px] text-slate-500">
            <div>
              <p className="font-bold text-rose-600">⚠ Mobile phones strictly prohibited in exam hall.</p>
              <p>Student must bring this admit card to every exam.</p>
            </div>
            <div className="text-center">
              <div className="w-28 h-px bg-slate-400 mb-0.5"></div>
              <span className="font-bold text-slate-700 dark:text-slate-200">Principal Signature</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
