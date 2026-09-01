import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import { FeeReceiptModal } from '../../components/printables/PrintableModals';
import {
  CreditCard,
  DollarSign,
  Search,
  Plus,
  Printer,
  Smartphone,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export const FeesAccounts = () => {
  const [activeTab, setActiveTab] = useState('collection'); // 'structure' | 'collection' | 'due' | 'invoices' | 'income_expense'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoiceForReceipt, setSelectedInvoiceForReceipt] = useState(null);
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);

  // Invoices & Ledger
  const [invoices, setInvoices] = useState([
    { id: 1, invoice_no: 'INV-2026-03-1001', student_name: 'Tanvir Hasan', roll: 1, class_name: 'Class 10 (SSC)', title: 'Tuition & Lab Fee - March 2026', total: 3100.00, paid: 3100.00, due: 0.00, status: 'paid', method: 'bKash Merchant (Trx: BKASH9A87X21)', date: '05 Mar 2026' },
    { id: 2, invoice_no: 'INV-2026-03-1002', student_name: 'Sadia Afrin', roll: 2, class_name: 'Class 10 (SSC)', title: 'Tuition & Lab Fee - March 2026', total: 2600.00, paid: 2600.00, due: 0.00, status: 'paid', method: 'Cash (Slip #502)', date: '06 Mar 2026' },
    { id: 3, invoice_no: 'INV-2026-03-1003', student_name: 'Arafat Rahman', roll: 3, class_name: 'Class 10 (SSC)', title: 'Tuition & Lab Fee - March 2026', total: 3100.00, paid: 0.00, due: 3100.00, status: 'unpaid', method: null, date: 'Pending' },
    { id: 4, invoice_no: 'INV-2026-03-1004', student_name: 'Farzana Akter', roll: 4, class_name: 'Class 10 (SSC)', title: 'Tuition & Lab Fee - March 2026', total: 3200.00, paid: 1500.00, due: 1700.00, status: 'partially_paid', method: 'Nagad (Trx: NAGAD88B129)', date: '08 Mar 2026' }
  ]);

  // Fee Structures
  const feeStructures = [
    { id: 1, name: 'Monthly Tuition Fee', class: 'Class 10 (SSC)', amount: 2500.00, due_day: '10th of Month', type: 'Recurring' },
    { id: 2, name: 'Session Development Charge', class: 'Class 10 (SSC)', amount: 8000.00, due_day: 'Annual (January)', type: 'One-Time' },
    { id: 3, name: 'Half-Yearly Examination Fee', class: 'Class 10 (SSC)', amount: 1500.00, due_day: 'Term Exam', type: 'Term Based' },
    { id: 4, name: 'Science Lab & ICT Charge', class: 'Class 10 (SSC)', amount: 600.00, due_day: '10th of Month', type: 'Recurring' }
  ];

  // Expenses & Cash Book
  const expenses = [
    { id: 1, date: '01 Mar 2026', category: 'Teacher & Staff Payroll (March)', amount: 294000.00, method: 'Bank Transfer', voucher: 'VCH-PAY-03' },
    { id: 2, date: '03 Mar 2026', category: 'DESCO Electricity & Utility Bill', amount: 32000.00, method: 'Online Banking', voucher: 'VCH-UTIL-12' },
    { id: 3, date: '04 Mar 2026', category: 'Science Practical Lab Chemicals', amount: 18500.00, method: 'Cash', voucher: 'VCH-LAB-04' }
  ];

  const handleCollectSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(e.target.amount.value);
    const method = e.target.method.value;

    setInvoices(invoices.map(inv => {
      if (inv.id === activeInvoice.id) {
        const newPaid = inv.paid + amt;
        const newDue = Math.max(0, inv.total - newPaid);
        return {
          ...inv,
          paid: newPaid,
          due: newDue,
          status: newDue === 0 ? 'paid' : 'partially_paid',
          method: `${method.toUpperCase()} (Live POS)`,
          date: 'Just now'
        };
      }
      return inv;
    }));

    setIsCollectModalOpen(false);
    alert(`✅ Payment of ৳${amt} successfully collected via ${method.toUpperCase()}!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Fees Management, POS Counter & Institutional Accounts
          </h2>
          <p className="text-xs text-slate-500">
            Fee structure setup, bKash / Nagad POS collection, due reminders, 3-part vouchers, and daily cash ledger
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          {[
            { id: 'collection', label: '💳 POS Counter & bKash' },
            { id: 'due', label: '⚠️ Due Fees & SMS Reminders' },
            { id: 'structure', label: '⚙️ Fee Structure Setup' },
            { id: 'invoices', label: '🧾 Invoices & 3-Part Receipts' },
            { id: 'income_expense', label: '📊 Income / Expense Ledger' }
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

      {/* 1. POS COLLECTION SUBTAB */}
      {activeTab === 'collection' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Fee Collection POS Counter (March 2026)</h3>
              <p className="text-xs text-slate-500">Search student roll or name to collect fees instantly with bKash/Nagad/Cash</p>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>bKash Merchant API: Connected</span>
            </div>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Invoice #</th>
                <th className="p-3">Student & Roll</th>
                <th className="p-3">Title / Particulars</th>
                <th className="p-3">Billed</th>
                <th className="p-3">Paid</th>
                <th className="p-3">Due</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="p-3 font-mono font-bold">{inv.invoice_no}</td>
                  <td className="p-3 font-bold">{inv.student_name} (Roll {inv.roll})</td>
                  <td className="p-3 text-slate-500">{inv.title}</td>
                  <td className="p-3 font-bold">৳{inv.total}</td>
                  <td className="p-3 text-emerald-600 font-bold">৳{inv.paid}</td>
                  <td className="p-3 text-rose-600 font-bold">৳{inv.due}</td>
                  <td className="p-3"><Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'partially_paid' ? 'warning' : 'danger'}>{inv.status.toUpperCase()}</Badge></td>
                  <td className="p-3 text-right">
                    {inv.due > 0 ? (
                      <button onClick={() => { setActiveInvoice(inv); setIsCollectModalOpen(true); }} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow text-xs">
                        Collect Fee
                      </button>
                    ) : (
                      <button onClick={() => setSelectedInvoiceForReceipt(inv)} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 font-bold rounded-lg hover:bg-slate-200">
                        🖨️ 3-Part Voucher
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. DUE MANAGEMENT SUBTAB */}
      {activeTab === 'due' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Unpaid Dues & Automated SMS Reminder Dispatch</h3>
              <p className="text-xs text-slate-500">Total Pending Dues for March 2026: <strong>৳65,000</strong></p>
            </div>
            <button onClick={() => alert('Automated Bengali SMS Fee Reminders sent to all due guardians!')} className="px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl shadow animate-pulse">
              Send Bulk Fee Reminder SMS (2 Guardians)
            </button>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Roll</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Class</th>
                <th className="p-3">Due Amount</th>
                <th className="p-3">Due Date</th>
                <th className="p-3 text-right">Quick SMS</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {invoices.filter(i => i.due > 0).map((inv) => (
                <tr key={inv.id}>
                  <td className="p-3 font-bold">{inv.roll}</td>
                  <td className="p-3 font-bold">{inv.student_name}</td>
                  <td className="p-3">{inv.class_name}</td>
                  <td className="p-3 font-black text-rose-600 text-sm">৳{inv.due}</td>
                  <td className="p-3 text-slate-500">10 Mar 2026</td>
                  <td className="p-3 text-right">
                    <button onClick={() => alert(`Fee reminder SMS sent for ${inv.student_name}`)} className="px-3 py-1 bg-rose-50 dark:bg-rose-950 text-rose-700 font-bold rounded-lg border border-rose-200">
                      Send SMS
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. FEE STRUCTURE SUBTAB */}
      {activeTab === 'structure' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="font-extrabold text-sm">Class 10 (SSC) Fee Structure & Mapping</h3>
            <button onClick={() => alert('New Fee Structure modal')} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
              + Add Fee Category
            </button>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Fee Type</th>
                <th className="p-3">Applicable Class</th>
                <th className="p-3">Billing Amount</th>
                <th className="p-3">Due Schedule</th>
                <th className="p-3">Recurrence</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {feeStructures.map((f) => (
                <tr key={f.id}>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{f.name}</td>
                  <td className="p-3">{f.class}</td>
                  <td className="p-3 font-bold text-emerald-600 text-sm">৳{f.amount}</td>
                  <td className="p-3">{f.due_day}</td>
                  <td className="p-3"><Badge variant="info">{f.type}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. INVOICES & 3-PART RECEIPTS */}
      {activeTab === 'invoices' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="font-extrabold text-sm">Paid Invoices & 3-Part Money Receipts (বাউচার রসিদ)</h3>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Invoice #</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Amount Paid</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3 text-right">3-Part Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {invoices.filter(i => i.paid > 0).map((inv) => (
                <tr key={inv.id}>
                  <td className="p-3 font-mono font-bold">{inv.invoice_no}</td>
                  <td className="p-3 font-bold">{inv.student_name} (Roll {inv.roll})</td>
                  <td className="p-3 font-extrabold text-emerald-600">৳{inv.paid}</td>
                  <td className="p-3 text-slate-500">{inv.method}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => setSelectedInvoiceForReceipt(inv)} className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold rounded-lg">
                      🖨️ Print 3-Part Voucher
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. INCOME & EXPENSE LEDGER */}
      {activeTab === 'income_expense' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="font-extrabold text-sm">Institutional Cash Book & Expense Audit Ledger</h3>
            <button onClick={() => alert('New Expense entry modal')} className="px-3.5 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-xl shadow">
              - Record Expense
            </button>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Particulars</th>
                <th className="p-3">Payment Mode</th>
                <th className="p-3">Voucher #</th>
                <th className="p-3 text-right">Amount (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td className="p-3 font-mono">{exp.date}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{exp.category}</td>
                  <td className="p-3">{exp.method}</td>
                  <td className="p-3 font-mono text-slate-500">{exp.voucher}</td>
                  <td className="p-3 text-right font-bold text-rose-600">-৳{exp.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Collect Modal */}
      {isCollectModalOpen && activeInvoice && (
        <Modal isOpen={true} onClose={() => setIsCollectModalOpen(false)} title={`💳 Fee Collection - ${activeInvoice.student_name}`}>
          <form onSubmit={handleCollectSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-bold block mb-1">Payment Method</label>
              <select name="method" className="w-full p-2 border rounded-xl bg-slate-50 dark:bg-slate-800">
                <option value="bkash">bKash Merchant Checkout</option>
                <option value="cash">Cash (Counter Slip)</option>
                <option value="nagad">Nagad Gateway</option>
              </select>
            </div>
            <div>
              <label className="font-bold block mb-1">Amount (৳)</label>
              <input name="amount" defaultValue={activeInvoice.due} className="w-full p-2 border rounded-xl font-bold bg-slate-50 dark:bg-slate-800" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsCollectModalOpen(false)} className="px-3 py-1.5 bg-slate-200 rounded-xl font-bold">Cancel</button>
              <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-xl shadow">Confirm Payment</button>
            </div>
          </form>
        </Modal>
      )}

      {/* 3-Part Receipt Modal */}
      {selectedInvoiceForReceipt && (
        <FeeReceiptModal
          isOpen={true}
          onClose={() => setSelectedInvoiceForReceipt(null)}
          invoice={selectedInvoiceForReceipt}
        />
      )}
    </div>
  );
};
