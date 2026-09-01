import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import {
  BellRing,
  Send,
  MessageSquare,
  Plus,
  History,
  Sparkles,
  Smartphone,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const NoticeAndSMSPortal = () => {
  const { tenant } = useAuthStore();
  const [activeTab, setActiveTab] = useState('sms_portal'); // 'sms_portal' | 'notices' | 'logs'
  const [targetGroup, setTargetGroup] = useState('all_parents');
  const [messageBody, setMessageBody] = useState('');
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', target_role: 'all' });

  // SMS character & Unicode calculation (Bangla: 70 chars/SMS, English: 160 chars/SMS)
  const isBangla = /[\u0980-\u09FF]/.test(messageBody);
  const maxCharPerSMS = isBangla ? 70 : 160;
  const currentLength = messageBody.length;
  const smsCount = currentLength === 0 ? 1 : Math.ceil(currentLength / maxCharPerSMS);
  const recipientsEstimate = targetGroup === 'all_parents' ? 1250 : targetGroup === 'class_10' ? 60 : 45;
  const totalCostCredits = recipientsEstimate * smsCount;

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Half-Yearly Examination 2026 Routine & Admit Card Collection',
      content: 'The Half-Yearly Examination 2026 will commence from 10th June 2026. All students must collect their Admit Cards from accounts office after clearing tuition dues by 5th June.',
      target_role: 'all',
      author: 'Prof. Kazi Faruq Ahmed (Principal)',
      date: '01 Mar 2026',
      is_pinned: true
    },
    {
      id: 2,
      title: 'Shaheed Dibash & International Mother Language Day Celebration',
      content: 'Special cultural program and discussion meeting will be held at college auditorium at 9:00 AM on 21st February.',
      target_role: 'all',
      author: 'College Authority',
      date: '18 Feb 2026',
      is_pinned: false
    }
  ]);

  const handleSendBulkSMS = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Please enter a message body');
      return;
    }
    alert(`✅ Bulk SMS queued successfully for ${recipientsEstimate} recipients via GreenwebBD Gateway! Total credits deducted: ${totalCostCredits}`);
    setMessageBody('');
  };

  const handleCreateNotice = (e) => {
    e.preventDefault();
    const created = {
      id: notices.length + 1,
      title: newNotice.title,
      content: newNotice.content,
      target_role: newNotice.target_role,
      author: 'Principal Office',
      date: 'Today',
      is_pinned: false
    };
    setNotices([created, ...notices]);
    setIsNoticeModalOpen(false);
    alert('Notice published successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Notices & Bulk SMS Gateway Portal
          </h2>
          <p className="text-xs text-slate-500">
            GreenwebBD / BulkSMSBD Masking & Non-masking SMS gateway and digital circular board
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('sms_portal')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'sms_portal'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📱 Bulk SMS Portal
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'notices'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📢 Notice Board
          </button>
        </div>
      </div>

      {activeTab === 'sms_portal' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SMS Composer */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-600" />
              <span>Compose Bulk SMS Broadcast</span>
            </h3>

            <form onSubmit={handleSendBulkSMS} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Recipient Target Group *
                </label>
                <select
                  value={targetGroup}
                  onChange={(e) => setTargetGroup(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="all_parents">All School Parents / Guardians (~1,250 Recipients)</option>
                  <option value="class_10">Class 10 (SSC Candidates) Parents (~60 Recipients)</option>
                  <option value="teachers">All Teachers & Faculty Members (~45 Recipients)</option>
                </select>
              </div>

              {/* Quick Template Buttons */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Quick Bengali / English Templates:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setMessageBody(
                        `শ্রদ্ধেয় অভিভাবক, হাফ-ইয়ারলি পরীক্ষা আগামী ১০ জুন শুরু হবে। বকেয়া বেতন পরিশোধ করে প্রবেশপত্র সংগ্রহ করুন। - ${tenant?.short_name || 'DRMC'}`
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors font-bengali"
                  >
                    পরীক্ষার নোটিশ (বাংলা)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setMessageBody(
                        `Dear Guardian, Monthly tuition fee for March is due. Please pay by 10th March via bKash to avoid late fine. - ${tenant?.short_name || 'DRMC'}`
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    Fee Reminder
                  </button>
                </div>
              </div>

              {/* Message Text Area */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Message Body (Unicode / Bangla Support) *
                  </label>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    {isBangla ? '🇧🇩 Bangla (Unicode)' : '🔤 English (GSM)'}
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  placeholder="Type SMS in Bengali or English..."
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-sans"
                />

                {/* Character Counter & Cost Calculator */}
                <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500">Characters:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">{currentLength}</strong>
                    <span className="text-slate-400"> / {maxCharPerSMS} per SMS</span>
                  </div>
                  <div>
                    <span className="text-slate-500">SMS Parts:</span>{' '}
                    <strong className="text-emerald-600">{smsCount} Part(s)</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Est. Credits:</span>{' '}
                    <strong className="text-indigo-600">{totalCostCredits} Credits</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Broadcast SMS to {recipientsEstimate} Guardians</span>
                </button>
              </div>
            </form>
          </div>

          {/* Gateway Status & Balance */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                📶 Gateway Configuration
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">Gateway Provider</span>
                    <Badge variant="success">Connected</Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">GreenwebBD (Masking: DRMC_EDU)</p>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="text-slate-500">SMS Balance</span>
                  <span className="font-black text-sm text-emerald-600">
                    {tenant?.sms_balance?.toLocaleString() || 4500}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="text-slate-500">Sender ID (Masking)</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {tenant?.short_name || 'DRMC'}_EDU
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Notices List */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Official School Circulars & Notice Board
            </h3>
            <button
              onClick={() => setIsNoticeModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-emerald-700"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish Notice</span>
            </button>
          </div>

          <div className="space-y-3">
            {notices.map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-emerald-300 transition-colors text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[10px]">
                    Target: {n.target_role.toUpperCase()}
                  </span>
                  <span className="text-slate-400 text-[10px]">{n.date}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{n.title}</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{n.content}</p>
                <p className="text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-200 dark:border-slate-700">
                  Published by: {n.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publish Notice Modal */}
      <Modal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        title="📢 Publish Official School Circular"
      >
        <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Notice Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Eid-ul-Fitr Vacation Notice"
              value={newNotice.title}
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Target Audience
            </label>
            <select
              value={newNotice.target_role}
              onChange={(e) => setNewNotice({ ...newNotice, target_role: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="all">All (Teachers, Students & Parents)</option>
              <option value="students">Students Only</option>
              <option value="parents">Parents Only</option>
              <option value="teachers">Teachers Only</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Notice Content *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Enter full notice body..."
              value={newNotice.content}
              onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsNoticeModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
            >
              Publish Circular
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
