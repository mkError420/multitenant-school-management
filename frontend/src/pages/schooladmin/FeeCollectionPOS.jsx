import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import { FeeReceiptModal } from '../../components/printables/TabulationSheetView';
import {
  CreditCard,
  Search,
  CheckCircle2,
  DollarSign,
  Printer,
  Sparkles,
  Smartphone,
  Wallet,
  Building,
  Check
} from 'lucide-react';

export const FeeCollectionPOS = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoiceForReceipt, setSelectedInvoiceForReceipt] = useState(null);
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);

  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    payment_method: 'bkash', // 'bkash' | 'cash' | 'nagad'
    payer_phone: '',
    send_sms: true
  });

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoice_no: 'INV-2026-03-1001',
      student_id: 1,
      student_name: 'Tanvir Hasan',
      roll_no: 1,
      class_name: 'Class 10 (SSC)',
      title: 'Tuition & Lab Fee - March 2026',
      total_amount: 3100.00,
      paid_amount: 3100.00,
      due_amount: 0.00,
      status: 'paid',
      payment_method: 'bKash (Trx: BKASH9A87X21)',
      due_date: '2026-03-10',
      paid_at: '05 Mar 2026'
    },
    {
      id: 2,
      invoice_no: 'INV-2026-03-1002',
      student_id: 2,
      student_name: 'Sadia Afrin',
      roll_no: 2,
      class_name: 'Class 10 (SSC)',
      title: 'Tuition & Lab Fee - March 2026',
      total_amount: 2600.00,
      paid_amount: 2600.00,
      due_amount: 0.00,
      status: 'paid',
      payment_method: 'Cash (Slip #502)',
      due_date: '2026-03-10',
      paid_at: '06 Mar 2026'
    },
    {
      id: 3,
      invoice_no: 'INV-2026-03-1003',
      student_id: 3,
      student_name: 'Arafat Rahman',
      roll_no: 3,
      class_name: 'Class 10 (SSC)',
      title: 'Tuition & Lab Fee - March 2026',
      total_amount: 3100.00,
      paid_amount: 0.00,
      due_amount: 3100.00,
      status: 'unpaid',
      payment_method: null,
      due_date: '2026-03-10',
      paid_at: null
    },
    {
      id: 4,
      invoice_no: 'INV-2026-03-1004',
      student_id: 4,
      student_name: 'Farzana Akter',
      roll_no: 4,
      class_name: 'Class 10 (SSC)',
      title: 'Tuition & Lab Fee - March 2026',
      total_amount: 3200.00,
      paid_amount: 1500.00,
      due_amount: 1700.00,
      status: 'partially_paid',
      payment_method: 'Nagad (Trx: NAGAD88B129)',
      due_date: '2026-03-10',
      paid_at: '08 Mar 2026'
    }
  ]);

  const filteredInvoices = invoices.filter((inv) => {
    return (
      inv.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(inv.roll_no).includes(searchTerm) ||
      inv.invoice_no.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleOpenCollect = (invoice) => {
    setActiveInvoice(invoice);
    setPaymentForm({
      amount: invoice.due_amount,
      payment_method: 'bkash',
      payer_phone: '+880171188800' + invoice.roll_no,
      send_sms: true
    });
    setIsCollectModalOpen(true);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    const paidAmt = parseFloat(paymentForm.amount);
    setInvoices(
      invoices.map((inv) => {
        if (inv.id === activeInvoice.id) {
          const newPaid = inv.paid_amount + paidAmt;
          const newDue = Math.max(0, inv.total_amount - newPaid);
          return {
            ...inv,
            paid_amount: newPaid,
            due_amount: newDue,
            status: newDue === 0 ? 'paid' : 'partially_paid',
            payment_method: `${paymentForm.payment_method.toUpperCase()} (Trx: BD_${Date.now().toString().slice(-6)})`,
            paid_at: 'Just now'
          };
        }
        return inv;
      })
    );

    setIsCollectModalOpen(false);
    alert(`✅ Payment of ৳${paidAmt} recorded successfully via ${paymentForm.payment_method.toUpperCase()}!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            School Fees Collection & POS Counter
          </h2>
          <p className="text-xs text-slate-500">
            Rapid student fee collection with bKash / Nagad payment integration and 3-part printable vouchers
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>bKash Merchant: Active</span>
          </div>
        </div>
      </div>

      {/* POS Quick Search & Invoices Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Student Invoices & Fee Ledger (March 2026)
            </h3>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student roll, name, invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Student & Roll</th>
                <th className="py-3 px-4">Particulars</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Due Balance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {inv.invoice_no}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 dark:text-white">{inv.student_name}</p>
                    <p className="text-[11px] text-slate-500">Roll {inv.roll_no} • {inv.class_name}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {inv.title}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    ৳{inv.total_amount?.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">
                    ৳{inv.paid_amount?.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-rose-600">
                    ৳{inv.due_amount?.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    {inv.status === 'paid' ? (
                      <Badge variant="success">Paid</Badge>
                    ) : inv.status === 'partially_paid' ? (
                      <Badge variant="warning">Partial</Badge>
                    ) : (
                      <Badge variant="danger">Unpaid</Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {inv.due_amount > 0 ? (
                        <button
                          onClick={() => handleOpenCollect(inv)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                        >
                          Collect Fee
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedInvoiceForReceipt(inv)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Fee POS Modal */}
      <Modal
        isOpen={isCollectModalOpen}
        onClose={() => setIsCollectModalOpen(false)}
        title="💳 Fees POS Collection Counter"
      >
        {activeInvoice && (
          <form onSubmit={handleConfirmPayment} className="space-y-4 text-xs">
            {/* Student Info preview */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{activeInvoice.student_name}</p>
                <p className="text-slate-500 text-[11px]">Roll {activeInvoice.roll_no} • {activeInvoice.class_name}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Due Balance</span>
                <span className="text-lg font-black text-rose-600">৳{activeInvoice.due_amount}</span>
              </div>
            </div>

            {/* Payment Method Select */}
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Select Payment Channel *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'bkash', label: 'bKash Merchant', color: 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300' },
                  { id: 'cash', label: 'Cash (Counter)', color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' },
                  { id: 'nagad', label: 'Nagad Gateway', color: 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentForm({ ...paymentForm, payment_method: m.id })}
                    className={`p-3 rounded-xl border-2 text-center font-bold text-xs transition-all ${
                      paymentForm.payment_method === m.id
                        ? `${m.color} ring-2 ring-emerald-500/20`
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount & Phone input */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Collection Amount (৳) *
                </label>
                <input
                  type="number"
                  required
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Payer Phone Number (SMS Confirmation)
                </label>
                <input
                  type="text"
                  value={paymentForm.payer_phone}
                  onChange={(e) => setPaymentForm({ ...paymentForm, payer_phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsCollectModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
              >
                Confirm & Issue Receipt
              </button>
            </div>
          </form>
        )}
      </Modal>

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
