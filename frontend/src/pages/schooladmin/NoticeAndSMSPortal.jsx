import React, { useState } from 'react';
import { Badge, Modal, StatCard } from '../../components/common/StatCard';
import {
  BellRing,
  Send,
  MessageSquare,
  Plus,
  History,
  Sparkles,
  Smartphone,
  CheckCircle2,
  FileText,
  School
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const NoticeAndSMSPortal = () => {
  const { tenant } = useAuthStore();
  const [activeTab, setActiveTab] = useState('sms_portal');
  const [targetGroup, setTargetGroup] = useState('all_parents');
  const [messageBody, setMessageBody] = useState('');
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', target_role: 'all' });

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
      <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100">
              <School className="h-3.5 w-3.5" />
              Communication hub
            </div>
            <h2 className="text-2xl font-black tracking-tight">Notices & Bulk SMS Gateway Portal</h2>
            <p className="mt-2 max-w-2xl text-sm text-emerald-100/80">
              GreenwebBD cloud messaging, notice publishing, and circular board distribution for parents and staff.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-emerald-900">
            <Sparkles className="h-4 w-4" />
            New broadcast
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="SMS balance" value={String(tenant?.sms_balance?.toLocaleString() || 4500)} icon={Smartphone} color="emerald" subtext="Gateway credits" />
        <StatCard title="Daily recipients" value="1,250" icon={MessageSquare} color="blue" subtext="Parent circles" />
        <StatCard title="Published notices" value={String(notices.length)} icon={FileText} color="violet" subtext="Live board entries" />
        <StatCard title="Gateway status" value="Active" icon={CheckCircle2} color="amber" subtext="GreenwebBD connected" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveTab('sms_portal')} className={`rounded-xl px-3 py-2 text-xs font-bold transition ${activeTab === 'sms_portal' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}>📱 Bulk SMS Portal</button>
          <button onClick={() => setActiveTab('notices')} className={`rounded-xl px-3 py-2 text-xs font-bold transition ${activeTab === 'notices' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}>📢 Notice Board</button>
        </div>
      </div>

      {activeTab === 'sms_portal' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Send className="h-4 w-4 text-emerald-600" />
              Compose bulk SMS broadcast
            </h3>

            <form onSubmit={handleSendBulkSMS} className="space-y-4 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">Recipient target group *</label>
                <select value={targetGroup} onChange={(e) => setTargetGroup(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                  <option value="all_parents">All School Parents / Guardians (~1,250 Recipients)</option>
                  <option value="class_10">Class 10 (SSC Candidates) Parents (~60 Recipients)</option>
                  <option value="teachers">All Teachers & Faculty Members (~45 Recipients)</option>
                </select>
              </div>

              <div>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Quick Bengali / English templates</span>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setMessageBody(`শ্রদ্ধেয় অভিভাবক, হাফ-ইয়ারলি পরীক্ষা আগামী ১০ জুন শুরু হবে। বকেয়া বেতন পরিশোধ করে প্রবেশপত্র সংগ্রহ করুন। - ${tenant?.short_name || 'DRMC'}`)} className="rounded-lg bg-slate-100 px-2.5 py-1 font-bengali text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-300">পরীক্ষার নোটিশ (বাংলা)</button>
                  <button type="button" onClick={() => setMessageBody(`Dear Guardian, Monthly tuition fee for March is due. Please pay by 10th March via bKash to avoid late fine. - ${tenant?.short_name || 'DRMC'}`)} className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-300">Fee Reminder</button>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Message body (Unicode / Bangla support) *</label>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">{isBangla ? '🇧🇩 Bangla (Unicode)' : '🔤 English (GSM)'}</span>
                </div>
                <textarea rows={4} required placeholder="Type SMS in Bengali or English..." value={messageBody} onChange={(e) => setMessageBody(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-[11px] dark:border-slate-700 dark:bg-slate-800/80">
                  <div><span className="text-slate-500">Characters:</span> <strong className="text-slate-900 dark:text-white">{currentLength}</strong> <span className="text-slate-400"> / {maxCharPerSMS} per SMS</span></div>
                  <div><span className="text-slate-500">SMS parts:</span> <strong className="text-emerald-600">{smsCount} part(s)</strong></div>
                  <div><span className="text-slate-500">Est. credits:</span> <strong className="text-indigo-600">{totalCostCredits} credits</strong></div>
                </div>
              </div>

              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-extrabold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700">
                <Send className="h-4 w-4" />
                Send broadcast SMS to {recipientsEstimate} guardians
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">📶 Gateway configuration</h3>
              <div className="space-y-3 text-xs">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/40">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">Gateway provider</span>
                    <Badge variant="success">Connected</Badge>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">GreenwebBD (Masking: DRMC_EDU)</p>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800"><span className="text-slate-500">SMS balance</span><span className="text-sm font-black text-emerald-600">{tenant?.sms_balance?.toLocaleString() || 4500}</span></div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800"><span className="text-slate-500">Sender ID (masking)</span><span className="font-mono font-bold text-slate-800 dark:text-slate-200">{tenant?.short_name || 'DRMC'}_EDU</span></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Official school circulars & notice board</h3>
            <button onClick={() => setIsNoticeModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-[10px] font-bold text-white">
              <Plus className="h-3.5 w-3.5" />
              Publish notice
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {notices.map((notice) => (
              <div key={notice.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/40">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-slate-900 dark:text-white">{notice.title}</h4>
                      {notice.is_pinned && <Badge variant="success">Pinned</Badge>}
                    </div>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{notice.content}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-[10px] text-slate-500 dark:border-slate-700">
                  <span>By {notice.author}</span>
                  <span>{notice.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal isOpen={isNoticeModalOpen} onClose={() => setIsNoticeModalOpen(false)} title="📢 Publish official notice" maxWidth="max-w-2xl">
        <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
          <div>
            <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">Notice title *</label>
            <input value={newNotice.title} onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white" required />
          </div>
          <div>
            <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">Target audience</label>
            <select value={newNotice.target_role} onChange={(e) => setNewNotice({ ...newNotice, target_role: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <option value="all">All</option>
              <option value="students">Students</option>
              <option value="parents">Parents</option>
              <option value="teachers">Teachers</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">Notice content *</label>
            <textarea rows={4} value={newNotice.content} onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white" required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsNoticeModalOpen(false)} className="rounded-xl bg-slate-100 px-3 py-2 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">Cancel</button>
            <button type="submit" className="rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white">Publish</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
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
