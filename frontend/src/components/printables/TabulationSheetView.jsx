import React from 'react';
import { Printer, Download, Award, CheckCircle2, XCircle } from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const TabulationSheetView = ({ examData, onPrint }) => {
  const { tenant } = useAuthStore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 overflow-hidden">
      {/* Header Actions */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              NCTB GPA 5.0 Standard
            </span>
            <span className="text-xs text-slate-500">Board Compliant Format</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            Official Tabulation Sheet - Half-Yearly Exam 2026
          </h2>
          <p className="text-xs text-slate-500">Class 10 (Science) • Section: Padma • Shift: Morning</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Tabulation Sheet</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[950px] p-2 bg-white text-slate-900">
          {/* Printable Header */}
          <div className="text-center pb-4 mb-4 border-b border-slate-300">
            <h3 className="font-extrabold text-lg uppercase text-slate-900">
              {tenant?.name || 'Dhaka Residential Model College'}
            </h3>
            <p className="text-xs text-slate-600">
              EIIN: {tenant?.eiin_number || '107985'} • Education Board: Dhaka • Academic Session: 2026
            </p>
            <h4 className="font-bold text-sm text-emerald-800 uppercase mt-1">
              Tabulation Sheet (Class 10 - SSC Batch)
            </h4>
          </div>

          {/* Grading Legend Key */}
          <div className="flex items-center justify-between text-[10px] bg-slate-50 p-2 rounded border border-slate-200 mb-3">
            <span className="font-bold text-slate-700">Bangladesh NCTB Grade Scale:</span>
            <span>80-100: <strong>A+ (5.0)</strong></span>
            <span>70-79: <strong>A (4.0)</strong></span>
            <span>60-69: <strong>A- (3.5)</strong></span>
            <span>50-59: <strong>B (3.0)</strong></span>
            <span>40-49: <strong>C (2.0)</strong></span>
            <span>33-39: <strong>D (1.0)</strong></span>
            <span>0-32: <strong className="text-rose-600">F (0.0)</strong></span>
            <span className="text-emerald-700 font-semibold">*4th Subject: GP &gt; 2.0 added as bonus</span>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-slate-300 text-[11px] text-center">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-bold">
                <th className="border border-slate-300 p-2 w-10">Roll</th>
                <th className="border border-slate-300 p-2 text-left w-40">Student Name</th>
                <th className="border border-slate-300 p-1">Bangla (100)</th>
                <th className="border border-slate-300 p-1">English (100)</th>
                <th className="border border-slate-300 p-1">Gen Math (100)</th>
                <th className="border border-slate-300 p-1">Physics (100)</th>
                <th className="border border-slate-300 p-1">Chemistry (100)</th>
                <th className="border border-slate-300 p-1 bg-amber-50">Higher Math [4th]</th>
                <th className="border border-slate-300 p-1">Total Marks</th>
                <th className="border border-slate-300 p-1">4th Bonus</th>
                <th className="border border-slate-300 p-2 bg-emerald-50">GPA (Scale 5.0)</th>
                <th className="border border-slate-300 p-2 bg-emerald-50">Grade</th>
                <th className="border border-slate-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {/* Row 1: Roll 1 - Tanvir Hasan */}
              <tr className="hover:bg-slate-50 font-medium">
                <td className="border border-slate-300 p-2 font-bold">01</td>
                <td className="border border-slate-300 p-2 text-left font-semibold">
                  <div>Tanvir Hasan</div>
                  <span className="text-[9px] text-slate-400 font-mono">ADM-2026-1001</span>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">88</div>
                  <div className="text-[9px] text-emerald-700 font-semibold">A+ (5.0)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">85</div>
                  <div className="text-[9px] text-emerald-700 font-semibold">A+ (5.0)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">92</div>
                  <div className="text-[9px] text-emerald-700 font-semibold">A+ (5.0)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">91</div>
                  <div className="text-[9px] text-emerald-700 font-semibold">A+ (5.0)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">86</div>
                  <div className="text-[9px] text-emerald-700 font-semibold">A+ (5.0)</div>
                </td>
                {/* 4th Subject */}
                <td className="border border-slate-300 p-1 bg-amber-50/60">
                  <div className="font-bold">92</div>
                  <div className="text-[9px] text-emerald-700 font-semibold">A+ (5.0)</div>
                </td>
                <td className="border border-slate-300 p-1 font-bold text-slate-900">534</td>
                <td className="border border-slate-300 p-1 font-semibold text-emerald-600">+3.00</td>
                <td className="border border-slate-300 p-2 font-extrabold text-sm text-emerald-700 bg-emerald-50">
                  5.00
                </td>
                <td className="border border-slate-300 p-2 font-bold text-emerald-800 bg-emerald-50">
                  A+ (Golden)
                </td>
                <td className="border border-slate-300 p-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    PASSED
                  </span>
                </td>
              </tr>

              {/* Row 2: Roll 2 - Sadia Afrin */}
              <tr className="hover:bg-slate-50 font-medium">
                <td className="border border-slate-300 p-2 font-bold">02</td>
                <td className="border border-slate-300 p-2 text-left font-semibold">
                  <div>Sadia Afrin</div>
                  <span className="text-[9px] text-slate-400 font-mono">ADM-2026-1002</span>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">82</div>
                  <div className="text-[9px] text-emerald-700 font-semibold">A+ (5.0)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">76</div>
                  <div className="text-[9px] text-blue-700 font-semibold">A (4.0)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">78</div>
                  <div className="text-[9px] text-blue-700 font-semibold">A (4.0)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">79</div>
                  <div className="text-[9px] text-blue-700 font-semibold">A (4.0)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">84</div>
                  <div className="text-[9px] text-emerald-700 font-semibold">A+ (5.0)</div>
                </td>
                {/* 4th Subject */}
                <td className="border border-slate-300 p-1 bg-amber-50/60">
                  <div className="font-bold">88</div>
                  <div className="text-[9px] text-emerald-700 font-semibold">A+ (5.0)</div>
                </td>
                <td className="border border-slate-300 p-1 font-bold text-slate-900">487</td>
                <td className="border border-slate-300 p-1 font-semibold text-emerald-600">+3.00</td>
                <td className="border border-slate-300 p-2 font-extrabold text-sm text-emerald-700 bg-emerald-50">
                  5.00
                </td>
                <td className="border border-slate-300 p-2 font-bold text-emerald-800 bg-emerald-50">
                  A+
                </td>
                <td className="border border-slate-300 p-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    PASSED
                  </span>
                </td>
              </tr>

              {/* Row 3: Roll 3 - Arafat Rahman */}
              <tr className="hover:bg-slate-50 font-medium">
                <td className="border border-slate-300 p-2 font-bold">03</td>
                <td className="border border-slate-300 p-2 text-left font-semibold">
                  <div>Arafat Rahman</div>
                  <span className="text-[9px] text-slate-400 font-mono">ADM-2026-1003</span>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">65</div>
                  <div className="text-[9px] text-indigo-700 font-semibold">A- (3.5)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">65</div>
                  <div className="text-[9px] text-indigo-700 font-semibold">A- (3.5)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">66</div>
                  <div className="text-[9px] text-indigo-700 font-semibold">A- (3.5)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">68</div>
                  <div className="text-[9px] text-indigo-700 font-semibold">A- (3.5)</div>
                </td>
                <td className="border border-slate-300 p-1">
                  <div className="font-bold">72</div>
                  <div className="text-[9px] text-blue-700 font-semibold">A (4.0)</div>
                </td>
                {/* 4th Subject */}
                <td className="border border-slate-300 p-1 bg-amber-50/60">
                  <div className="font-bold">75</div>
                  <div className="text-[9px] text-blue-700 font-semibold">A (4.0)</div>
                </td>
                <td className="border border-slate-300 p-1 font-bold text-slate-900">411</td>
                <td className="border border-slate-300 p-1 font-semibold text-emerald-600">+2.00</td>
                <td className="border border-slate-300 p-2 font-extrabold text-sm text-slate-900 bg-emerald-50">
                  4.00
                </td>
                <td className="border border-slate-300 p-2 font-bold text-slate-800 bg-emerald-50">
                  A
                </td>
                <td className="border border-slate-300 p-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    PASSED
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Signatures */}
          <div className="mt-12 flex justify-between items-end px-6">
            <div className="text-center">
              <div className="w-32 h-px bg-slate-400 mx-auto"></div>
              <span className="text-[10px] font-bold text-slate-600 uppercase mt-1 block">
                Tabulator / Exam Controller
              </span>
            </div>
            <div className="text-center">
              <div className="w-32 h-px bg-slate-400 mx-auto"></div>
              <span className="text-[10px] font-bold text-slate-600 uppercase mt-1 block">
                Head of Department
              </span>
            </div>
            <div className="text-center">
              <div className="font-serif italic font-bold text-emerald-800 text-sm">Kazi Faruq Ahmed</div>
              <div className="w-32 h-px bg-slate-400 mx-auto"></div>
              <span className="text-[10px] font-bold text-slate-600 uppercase mt-1 block">
                Principal / Headmaster
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeeReceiptModal = ({ isOpen, onClose, invoice }) => {
  const { tenant } = useAuthStore();

  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const copies = [
    { title: 'Student Copy (শিক্ষার্থী কপি)', bg: 'bg-emerald-50' },
    { title: 'School / Accounts Copy (হিসাব কপি)', bg: 'bg-blue-50' },
    { title: 'Bank / Gateway Copy (ব্যাংক কপি)', bg: 'bg-amber-50' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Toolbar */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Official 3-Part Money Receipt Voucher (বাউচার / রসিদ)
            </h3>
            <p className="text-xs text-slate-500">Invoice #{invoice.invoice_no}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print 3-Part Receipt</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600">
              ✕
            </button>
          </div>
        </div>

        {/* 3-Part Voucher Slip Container */}
        <div className="p-6 space-y-6">
          {copies.map((copy, idx) => (
            <div key={idx} className="border border-slate-300 rounded-xl p-4 relative text-xs">
              {/* Slip Header */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 uppercase">
                    {tenant?.name || 'Dhaka Residential Model College'}
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    EIIN: {tenant?.eiin_number} • {tenant?.address || 'Dhaka-1207'}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${copy.bg} text-slate-800 border border-slate-300`}>
                    {copy.title}
                  </span>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">
                    Receipt: REC-2026-03-{invoice.id} • Date: {invoice.paid_at || '05 Mar 2026'}
                  </p>
                </div>
              </div>

              {/* Student info */}
              <div className="grid grid-cols-4 gap-2 my-2.5 bg-slate-50 p-2 rounded-lg border border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[9px]">Student Name</span>
                  <span className="font-bold text-slate-900">{invoice.student_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Roll No & Class</span>
                  <span className="font-bold text-slate-900">Roll {invoice.roll_no} • {invoice.class_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Fee Month / Title</span>
                  <span className="font-bold text-emerald-800">{invoice.title}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Payment Method</span>
                  <span className="font-bold text-slate-800">{invoice.payment_method || 'bKash Merchant'}</span>
                </div>
              </div>

              {/* Fee breakdown & amounts */}
              <div className="flex justify-between items-center pt-2 text-xs">
                <div className="text-[10px] text-slate-600">
                  <span>Amount in words: <strong>Three Thousand One Hundred Taka Only (৩,১০০/-)</strong></span>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-slate-400 text-[10px]">Total Billed:</span>{' '}
                    <span className="font-bold">৳{invoice.total_amount?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Paid Amount:</span>{' '}
                    <span className="font-extrabold text-emerald-700 text-sm">৳{invoice.paid_amount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Signature line */}
              <div className="mt-4 flex justify-between items-end text-[9px] text-slate-400">
                <span>System Generated Computer Receipt • Powered by EduManageBD SaaS</span>
                <span className="text-slate-700 font-bold border-t border-slate-400 pt-0.5 px-4">Authorized Signature & Seal</span>
              </div>

              {/* Cut line */}
              {idx < copies.length - 1 && (
                <div className="no-print mt-4 border-b border-dashed border-slate-300 text-center text-[9px] text-slate-400">
                  ✂-------------------------------------------------- Cut along this line --------------------------------------------------✂
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
