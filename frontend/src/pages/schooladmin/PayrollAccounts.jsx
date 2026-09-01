import React, { useState } from 'react';
import { StatCard, Badge, Modal } from '../../components/common/StatCard';
import {
  Wallet,
  DollarSign,
  ArrowDownRight,
  ArrowUpRight,
  Printer,
  Calendar,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export const PayrollAccounts = () => {
  const [selectedMonth, setSelectedMonth] = useState('2026-03');
  const [activeTab, setActiveTab] = useState('payroll'); // 'payroll' | 'accounting'
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const staffPayroll = [
    {
      id: 1,
      name: 'Prof. Kazi Faruq Ahmed',
      designation: 'Principal',
      department: 'Administration',
      basic: 85000.00,
      house_rent: 20000.00,
      medical: 5000.00,
      conveyance: 5000.00,
      deduction: 2000.00,
      net_salary: 113000.00,
      status: 'paid',
      paid_at: '01 Mar 2026'
    },
    {
      id: 2,
      name: 'Mohammad Rafiqul Islam',
      designation: 'Senior Teacher',
      department: 'Mathematics',
      basic: 52000.00,
      house_rent: 12000.00,
      medical: 3000.00,
      conveyance: 2000.00,
      deduction: 1000.00,
      net_salary: 68000.00,
      status: 'paid',
      paid_at: '01 Mar 2026'
    },
    {
      id: 3,
      name: 'Nusrat Jahan',
      designation: 'Lecturer',
      department: 'English',
      basic: 48000.00,
      house_rent: 10000.00,
      medical: 3000.00,
      conveyance: 2000.00,
      deduction: 0.00,
      net_salary: 63000.00,
      status: 'paid',
      paid_at: '01 Mar 2026'
    },
    {
      id: 4,
      name: 'Md. Shahinur Rahman',
      designation: 'Senior Accountant',
      department: 'Accounts',
      basic: 38000.00,
      house_rent: 8000.00,
      medical: 2500.00,
      conveyance: 1500.00,
      deduction: 0.00,
      net_salary: 50000.00,
      status: 'paid',
      paid_at: '01 Mar 2026'
    }
  ];

  const accountingEntries = [
    { id: 1, type: 'income', category: 'Student Tuition Fees', amount: 485000.00, date: '08 Mar 2026', method: 'bKash / Cash POS' },
    { id: 2, type: 'expense', category: 'Teacher & Staff Payroll (March)', amount: 294000.00, date: '01 Mar 2026', method: 'Bank Transfer' },
    { id: 3, type: 'expense', category: 'DESCO Electricity & Utility Bill', amount: 32000.00, date: '03 Mar 2026', method: 'Bank Online' },
    { id: 4, type: 'expense', category: 'Science Lab Chemicals & Equipment', amount: 18500.00, date: '04 Mar 2026', method: 'Cash' },
    { id: 5, type: 'income', category: 'Session Development Charge', amount: 84000.00, date: '05 Mar 2026', method: 'Bank Deposit' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Accounts & Teacher Payroll Management
          </h2>
          <p className="text-xs text-slate-500">
            Institutional cash book ledger, income/expense auditing, and printable teacher salary slips
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('payroll')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'payroll'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            👥 Faculty Payroll & Salary Slips
          </button>
          <button
            onClick={() => setActiveTab('accounting')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'accounting'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📊 Income & Expense Ledger
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Monthly Income (March)"
          value="৳ 569,000"
          change="12%"
          isPositive={true}
          icon={ArrowUpRight}
          color="emerald"
          subtext="Tuition & Session fees"
        />
        <StatCard
          title="Total Monthly Expense"
          value="৳ 344,500"
          icon={ArrowDownRight}
          color="rose"
          subtext="Payroll, utilities, lab supplies"
        />
        <StatCard
          title="Net Institutional Surplus"
          value="৳ 224,500"
          change="8.4%"
          isPositive={true}
          icon={Wallet}
          color="indigo"
          subtext="March operational profit"
        />
      </div>

      {activeTab === 'payroll' ? (
        /* Payroll Table */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/40 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Staff Salary Disbursements - March 2026
            </h3>
            <Badge variant="success">Total Disbursed: ৳294,000</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Faculty / Staff Member</th>
                  <th className="py-3 px-4">Designation & Dept</th>
                  <th className="py-3 px-4">Basic Salary</th>
                  <th className="py-3 px-4">Allowances</th>
                  <th className="py-3 px-4">Deductions</th>
                  <th className="py-3 px-4">Net Payable</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Payslip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {staffPayroll.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {staff.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {staff.designation} • <span className="text-slate-400">{staff.department}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold">
                      ৳{staff.basic.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-emerald-600 font-semibold">
                      +৳{(staff.house_rent + staff.medical + staff.conveyance).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-rose-600 font-semibold">
                      -৳{staff.deduction.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900 dark:text-white text-sm">
                      ৳{staff.net_salary.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="success">Disbursed</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedPayslip(staff)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Salary Slip</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Accounting Entries Table */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/40 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Cash Book & Ledger Transactions (March 2026)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Particulars / Category</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4 text-right">Amount (BDT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {accountingEntries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500 font-mono">{item.date}</td>
                    <td className="py-3.5 px-4">
                      {item.type === 'income' ? (
                        <Badge variant="success">Income (+)</Badge>
                      ) : (
                        <Badge variant="danger">Expense (-)</Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{item.method}</td>
                    <td className={`py-3.5 px-4 text-right font-extrabold text-sm ${item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.type === 'income' ? '+' : '-'}৳{item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Salary Slip Modal */}
      {selectedPayslip && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedPayslip(null)}
          title="📄 Teacher / Staff Salary Slip (বেতন রশিদ)"
        >
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3 text-xs">
            <div className="text-center pb-2 border-b border-slate-200">
              <h4 className="font-extrabold text-base text-slate-900 uppercase">Dhaka Residential Model College</h4>
              <p className="text-[10px] text-slate-500">Official Monthly Pay Slip - March 2026</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 block">Employee Name:</span>
                <span className="font-bold text-slate-900">{selectedPayslip.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Designation:</span>
                <span className="font-bold text-slate-900">{selectedPayslip.designation}</span>
              </div>
            </div>

            <div className="border-t border-b border-slate-200 py-2 space-y-1">
              <div className="flex justify-between">
                <span>Basic Salary:</span>
                <span className="font-bold">৳{selectedPayslip.basic.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>House Rent Allowance:</span>
                <span>+৳{selectedPayslip.house_rent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Medical Allowance:</span>
                <span>+৳{selectedPayslip.medical.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-rose-700">
                <span>Provident Fund / Tax Deduction:</span>
                <span>-৳{selectedPayslip.deduction.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-1 font-bold text-sm">
              <span>Net Salary Disbursed:</span>
              <span className="text-emerald-700 text-base">৳{selectedPayslip.net_salary.toLocaleString()}</span>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-200">
              <button
                onClick={() => window.print()}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Print Slip
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
