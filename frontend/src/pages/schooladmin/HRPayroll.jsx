import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import {
  Users,
  Wallet,
  DollarSign,
  Printer,
  Download,
  CheckCircle2,
  FileSpreadsheet,
  Plus,
  Building
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const HRPayroll = () => {
  const { tenant } = useAuthStore();
  const [activeTab, setActiveTab] = useState('payroll'); // 'staff_directory' | 'payroll_setup' | 'payroll' | 'bank_sheet'
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  // Staff Directory
  const [staffList, setStaffList] = useState([
    { id: 1, emp_id: 'EMP-1001', name: 'Prof. Kazi Faruq Ahmed', role: 'Principal', dept: 'Administration', phone: '+8801711111111', joining: '2015-01-10', basic: 85000.00, status: 'active' },
    { id: 2, emp_id: 'EMP-1002', name: 'Mohammad Rafiqul Islam', role: 'Senior Math Teacher', dept: 'Mathematics', phone: '+8801711222222', joining: '2018-03-15', basic: 52000.00, status: 'active' },
    { id: 3, emp_id: 'EMP-1003', name: 'Nusrat Jahan', role: 'Lecturer in English', dept: 'English', phone: '+8801711333333', joining: '2020-07-01', basic: 48000.00, status: 'active' },
    { id: 4, emp_id: 'EMP-1004', name: 'Md. Shahinur Rahman', role: 'Senior Accountant', dept: 'Accounts', phone: '+8801711444444', joining: '2019-02-01', basic: 38000.00, status: 'active' }
  ]);

  // Salary Disbursements
  const staffPayroll = [
    { id: 1, name: 'Prof. Kazi Faruq Ahmed', designation: 'Principal', bank_account: 'DBBL: 115.105.99281', basic: 85000.00, house_rent: 20000.00, medical: 5000.00, conveyance: 5000.00, deduction: 2000.00, net_salary: 113000.00, status: 'paid' },
    { id: 2, name: 'Mohammad Rafiqul Islam', designation: 'Senior Math Teacher', bank_account: 'Sonali: 0291.884719', basic: 52000.00, house_rent: 12000.00, medical: 3000.00, conveyance: 2000.00, deduction: 1000.00, net_salary: 68000.00, status: 'paid' },
    { id: 3, name: 'Nusrat Jahan', designation: 'Lecturer in English', bank_account: 'Islami Bank: 2050.1982', basic: 48000.00, house_rent: 10000.00, medical: 3000.00, conveyance: 2000.00, deduction: 0.00, net_salary: 63000.00, status: 'paid' },
    { id: 4, name: 'Md. Shahinur Rahman', designation: 'Senior Accountant', bank_account: 'City Bank: 1109.4812', basic: 38000.00, house_rent: 8000.00, medical: 2500.00, conveyance: 1500.00, deduction: 0.00, net_salary: 50000.00, status: 'paid' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Human Resources (HR), Faculty & Payroll
          </h2>
          <p className="text-xs text-slate-500">
            Faculty directory, salary structures, monthly disbursements, payslip generation, and bank export sheets
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          {[
            { id: 'payroll', label: '💰 Salary Disbursement' },
            { id: 'staff_directory', label: '👥 Staff Directory' },
            { id: 'payroll_setup', label: '⚙️ Payroll Setup' },
            { id: 'bank_sheet', label: '🏦 Bank Transfer Sheet' }
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

      {/* 1. PAYROLL DISBURSEMENT SUBTAB */}
      {activeTab === 'payroll' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Monthly Faculty & Staff Payroll - March 2026</h3>
              <p className="text-xs text-slate-500">Total Monthly Disbursed: <strong>৳294,000</strong></p>
            </div>
            <button onClick={() => alert('Batch Salary Disbursed via Bank Transfer!')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow">
              Disburse March Payroll
            </button>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Staff Name</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Basic</th>
                <th className="p-3">Allowances</th>
                <th className="p-3">Deductions</th>
                <th className="p-3">Net Payable</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {staffPayroll.map((staff) => (
                <tr key={staff.id}>
                  <td className="p-3 font-bold">{staff.name}</td>
                  <td className="p-3 text-slate-500">{staff.designation}</td>
                  <td className="p-3 font-bold">৳{staff.basic.toLocaleString()}</td>
                  <td className="p-3 text-emerald-600 font-semibold">+৳{(staff.house_rent + staff.medical + staff.conveyance).toLocaleString()}</td>
                  <td className="p-3 text-rose-600 font-semibold">-৳{staff.deduction.toLocaleString()}</td>
                  <td className="p-3 font-black text-sm text-slate-900 dark:text-white">৳{staff.net_salary.toLocaleString()}</td>
                  <td className="p-3"><Badge variant="success">Disbursed</Badge></td>
                  <td className="p-3 text-right">
                    <button onClick={() => setSelectedPayslip(staff)} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 font-bold rounded-lg hover:bg-slate-200">
                      📄 Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. STAFF DIRECTORY SUBTAB */}
      {activeTab === 'staff_directory' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="font-extrabold text-sm">Faculty & Staff Members Directory</h3>
            <button onClick={() => alert('New Staff onboarding modal')} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
              + Onboard Faculty
            </button>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Employee ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Designation & Department</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Basic Salary</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {staffList.map((s) => (
                <tr key={s.id}>
                  <td className="p-3 font-mono font-bold">{s.emp_id}</td>
                  <td className="p-3 font-bold">{s.name}</td>
                  <td className="p-3">{s.role} • <span className="text-slate-400">{s.dept}</span></td>
                  <td className="p-3 font-mono text-emerald-600">{s.phone}</td>
                  <td className="p-3 font-bold">৳{s.basic.toLocaleString()}</td>
                  <td className="p-3"><Badge variant="success">{s.status.toUpperCase()}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. PAYROLL SETUP SUBTAB */}
      {activeTab === 'payroll_setup' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="font-extrabold text-sm">Salary Allowances & Deduction Structure</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
              <h4 className="font-bold text-emerald-600 uppercase text-[10px]">House Rent Allowance</h4>
              <p className="text-base font-black">20% of Basic</p>
              <p className="text-slate-500 text-[11px]">Applied to permanent teachers</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
              <h4 className="font-bold text-emerald-600 uppercase text-[10px]">Medical & Conveyance</h4>
              <p className="text-base font-black">৳ 5,000 / month</p>
              <p className="text-slate-500 text-[11px]">Fixed allowance for senior faculty</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
              <h4 className="font-bold text-rose-600 uppercase text-[10px]">Provident Fund Deduction</h4>
              <p className="text-base font-black">5% Deduction</p>
              <p className="text-slate-500 text-[11px]">Mandatory pension deposit</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. BANK TRANSFER SHEET SUBTAB */}
      {activeTab === 'bank_sheet' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Official Bank Salary Transfer Advice Sheet</h3>
              <p className="text-xs text-slate-500">March 2026 Advice for Sonali Bank / Dutch Bangla Bank</p>
            </div>
            <button onClick={() => window.print()} className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow">
              🖨️ Export Bank Advice PDF
            </button>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Beneficiary Name</th>
                <th className="p-3">Bank Account Details</th>
                <th className="p-3 text-right">Net Transfer Amount (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {staffPayroll.map((staff) => (
                <tr key={staff.id}>
                  <td className="p-3 font-bold">{staff.name}</td>
                  <td className="p-3 font-mono">{staff.bank_account}</td>
                  <td className="p-3 text-right font-black text-emerald-600">৳{staff.net_salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Salary Slip Modal */}
      {selectedPayslip && (
        <Modal isOpen={true} onClose={() => setSelectedPayslip(null)} title="📄 Faculty Salary Slip (বেতন রশিদ)">
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3 text-xs">
            <div className="text-center pb-2 border-b">
              <h4 className="font-extrabold text-base uppercase">{tenant?.name || 'Mane School and College'}</h4>
              <p className="text-[10px] text-slate-500">Official Monthly Pay Slip - March 2026</p>
            </div>
            <div className="flex justify-between">
              <span>Employee: <strong>{selectedPayslip.name}</strong></span>
              <span>Designation: <strong>{selectedPayslip.designation}</strong></span>
            </div>
            <div className="border-t border-b py-2 space-y-1">
              <div className="flex justify-between"><span>Basic:</span><span className="font-bold">৳{selectedPayslip.basic.toLocaleString()}</span></div>
              <div className="flex justify-between text-emerald-700"><span>House Rent:</span><span>+৳{selectedPayslip.house_rent.toLocaleString()}</span></div>
              <div className="flex justify-between text-emerald-700"><span>Medical + Conveyance:</span><span>+৳{(selectedPayslip.medical + selectedPayslip.conveyance).toLocaleString()}</span></div>
              <div className="flex justify-between text-rose-700"><span>Deduction:</span><span>-৳{selectedPayslip.deduction.toLocaleString()}</span></div>
            </div>
            <div className="flex justify-between font-bold text-sm">
              <span>Net Salary Paid:</span>
              <span className="text-emerald-700 font-black">৳{selectedPayslip.net_salary.toLocaleString()}</span>
            </div>
            <div className="pt-2 flex justify-end">
              <button onClick={() => window.print()} className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-lg">Print Slip</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export const CommunicationSMS = () => {
  const { tenant } = useAuthStore();
  const [activeTab, setActiveTab] = useState('sms'); // 'sms' | 'notices' | 'calendar'
  const [smsText, setSmsText] = useState('');

  const isBangla = /[\u0980-\u09FF]/.test(smsText);
  const charLimit = isBangla ? 70 : 160;
  const parts = smsText.length === 0 ? 1 : Math.ceil(smsText.length / charLimit);

  const [notices, setNotices] = useState([
    { id: 1, title: 'Half-Yearly Examination 2026 Routine & Admit Card Collection', content: 'Exams commence from 10th June 2026. All students must collect their Admit Cards by 5th June.', audience: 'All Students & Parents', date: '01 Mar 2026' },
    { id: 2, title: 'Shaheed Dibash & International Mother Language Day Celebration', content: 'Special cultural program at college auditorium at 9:00 AM on 21st February.', audience: 'All', date: '18 Feb 2026' }
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: 'Half-Yearly Examination Commences', date: '10 June 2026', type: 'Exam' },
    { id: 2, title: 'Annual Sports & Cultural Week', date: '25 November 2026', type: 'Sports' },
    { id: 3, title: 'Eid-ul-Fitr Vacation', date: '28 March 2026', type: 'Holiday' }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Communication, Bulk SMS Gateway & Event Calendar
          </h2>
          <p className="text-xs text-slate-500">
            Instant SMS gateway broadcast (absent alert, fee reminders), circular board, and institutional calendar
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          {[
            { id: 'sms', label: '📱 Bulk SMS Gateway' },
            { id: 'notices', label: '📢 Notice Board' },
            { id: 'calendar', label: '📅 Event Calendar' }
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

      {/* 1. BULK SMS GATEWAY SUBTAB */}
      {activeTab === 'sms' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
          <h3 className="font-extrabold text-sm">Send Instant Broadcast SMS (GreenwebBD Masking)</h3>
          
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold block mb-1">Target Audience</label>
              <select className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800">
                <option>All School Guardians (~1,250 Recipients)</option>
                <option>Class 10 SSC Candidate Guardians (~60 Recipients)</option>
                <option>All Faculty Members (~45 Recipients)</option>
              </select>
            </div>

            <div>
              <label className="font-bold block mb-1">Message Text (Bangla / English)</label>
              <textarea
                rows={4}
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                placeholder="Type SMS text in Bengali or English..."
                className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>{isBangla ? '🇧🇩 Bangla (Unicode)' : '🔤 English (GSM)'} • Chars: <strong>{smsText.length}</strong> / {charLimit}</span>
                <span>Parts: <strong>{parts} SMS</strong></span>
              </div>
            </div>

            <button
              onClick={() => { alert('Bulk SMS broadcast dispatched successfully!'); setSmsText(''); }}
              className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow hover:bg-emerald-700"
            >
              Send Live Broadcast SMS
            </button>
          </div>
        </div>
      )}

      {/* 2. NOTICES SUBTAB */}
      {activeTab === 'notices' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <h3 className="font-extrabold text-sm">Official Circulars & Notice Board</h3>
            <button onClick={() => alert('New notice modal')} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
              + Post Notice
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {notices.map(n => (
              <div key={n.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-600 uppercase text-[10px]">{n.audience}</span>
                  <span className="text-slate-400 text-[10px]">{n.date}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{n.title}</h4>
                <p className="text-slate-600 dark:text-slate-300">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. EVENT CALENDAR SUBTAB */}
      {activeTab === 'calendar' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <h3 className="font-extrabold text-sm">Academic Event & Holiday Calendar (Session 2026)</h3>
            <button onClick={() => alert('New Event modal')} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
              + Add Event
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {events.map((e) => (
              <div key={e.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-2">
                <Badge variant={e.type === 'Holiday' ? 'danger' : e.type === 'Exam' ? 'purple' : 'info'}>{e.type}</Badge>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{e.title}</h4>
                <p className="text-slate-500 font-mono text-[11px]">📅 {e.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
