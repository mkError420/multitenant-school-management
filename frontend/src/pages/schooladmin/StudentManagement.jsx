import React, { useState } from 'react';
import { Badge, StatCard } from '../../components/common/StatCard';
import { IDCardGenerator } from '../../components/printables/IDCardGenerator';
import {
  Users,
  Search,
  UserPlus,
  Contact2,
  Upload,
  Award,
  School,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const StudentManagement = () => {
  const { tenant, selectedSession } = useAuthStore();
  const [activeTab, setActiveTab] = useState('directory');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudentForID, setSelectedStudentForID] = useState(null);
  const [selectedCertificateType, setSelectedCertificateType] = useState('tc');

  const [students, setStudents] = useState([
    {
      id: 1,
      admission_no: 'ADM-2026-1001',
      roll_no: 1,
      name_en: 'Tanvir Hasan',
      name_bn: 'তানভীর হাসান',
      class_name: 'Class 10 (SSC)',
      section_name: 'Padma (Morning)',
      group_name: 'Science',
      gender: 'Male',
      blood_group: 'O+',
      father_name: 'Md. Kamrul Hasan',
      father_phone: '+8801711888001',
      emergency_contact: '+8801711888001',
      present_address: 'House 24, Road 5, Dhanmondi, Dhaka',
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      fee_status: 'paid',
      gpa_last_term: '5.00',
      promotion_status: 'eligible'
    },
    {
      id: 2,
      admission_no: 'ADM-2026-1002',
      roll_no: 2,
      name_en: 'Sadia Afrin',
      name_bn: 'সাদিয়া আফরিন',
      class_name: 'Class 10 (SSC)',
      section_name: 'Padma (Morning)',
      group_name: 'Science',
      gender: 'Female',
      blood_group: 'A+',
      father_name: 'Engr. Mahbubur Rahman',
      father_phone: '+8801711888002',
      emergency_contact: '+8801711888002',
      present_address: 'Flat B-3, Green Road, Dhaka',
      photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      fee_status: 'paid',
      gpa_last_term: '5.00',
      promotion_status: 'eligible'
    },
    {
      id: 3,
      admission_no: 'ADM-2026-1003',
      roll_no: 3,
      name_en: 'Arafat Rahman',
      name_bn: 'আরাফাত রহমান',
      class_name: 'Class 10 (SSC)',
      section_name: 'Padma (Morning)',
      group_name: 'Science',
      gender: 'Male',
      blood_group: 'B+',
      father_name: 'Dr. Aminul Islam',
      father_phone: '+8801711888003',
      emergency_contact: '+8801711888003',
      present_address: 'Sector 4, Uttara, Dhaka',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      fee_status: 'unpaid',
      gpa_last_term: '4.00',
      promotion_status: 'eligible'
    },
    {
      id: 4,
      admission_no: 'ADM-2026-1004',
      roll_no: 4,
      name_en: 'Farzana Akter',
      name_bn: 'ফারজানা আক্তার',
      class_name: 'Class 10 (SSC)',
      section_name: 'Padma (Morning)',
      group_name: 'Science',
      gender: 'Female',
      blood_group: 'AB+',
      father_name: 'Jahangir Alam',
      father_phone: '+8801711888004',
      emergency_contact: '+8801711888004',
      present_address: 'Lalmatia Block D, Dhaka',
      photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      fee_status: 'partially_paid',
      gpa_last_term: '4.50',
      promotion_status: 'eligible'
    }
  ]);

  const [newStudent, setNewStudent] = useState({
    name_en: '',
    name_bn: '',
    roll_no: '5',
    class_name: 'Class 10 (SSC)',
    section_name: 'Padma (Morning)',
    group_name: 'Science',
    gender: 'Male',
    blood_group: 'A+',
    father_name: '',
    father_phone: '',
    emergency_contact: '',
    present_address: ''
  });

  const handleAdmissionSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: students.length + 1,
      admission_no: `ADM-2026-${1000 + students.length + 1}`,
      roll_no: parseInt(newStudent.roll_no) || students.length + 1,
      name_en: newStudent.name_en,
      name_bn: newStudent.name_bn || newStudent.name_en,
      class_name: newStudent.class_name,
      section_name: newStudent.section_name,
      group_name: newStudent.group_name,
      gender: newStudent.gender,
      blood_group: newStudent.blood_group,
      father_name: newStudent.father_name,
      father_phone: newStudent.father_phone,
      emergency_contact: newStudent.emergency_contact || newStudent.father_phone,
      present_address: newStudent.present_address,
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      fee_status: 'unpaid',
      gpa_last_term: '0.00',
      promotion_status: 'eligible'
    };

    setStudents((prev) => [...prev, created]);
    alert(`Student "${created.name_en}" admitted successfully with Roll #${created.roll_no}!`);
    setActiveTab('directory');
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      searchTerm === '' ||
      student.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.father_phone.includes(searchTerm) ||
      String(student.roll_no).includes(searchTerm);

    const matchesClass = selectedClass === 'all' || student.class_name === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100">
              <School className="h-3.5 w-3.5" />
              Student registry
            </div>
            <h2 className="text-2xl font-black tracking-tight">Student Management & Digital Registry</h2>
            <p className="mt-2 max-w-2xl text-sm text-emerald-100/80">
              Admissions, directory management, promotion engine, and document generation for the active session.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-emerald-900">
            <Sparkles className="h-4 w-4" />
            New student flow
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active students" value="1,250" icon={Users} color="emerald" subtext="Live registry" />
        <StatCard title="Admissions" value="86" icon={UserPlus} color="blue" subtext="This term" />
        <StatCard title="ID cards" value="2" icon={Contact2} color="violet" subtext="Ready to print" />
        <StatCard title="Promotions" value="96%" icon={Award} color="amber" subtext="Eligible" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'directory', label: '👥 Student Directory' },
            { id: 'admission', label: '📝 New Admission Form' },
            { id: 'id_cards', label: '🪪 ID Card Generator' },
            { id: 'promotion', label: '🚀 Promotion Engine' },
            { id: 'certificates', label: '📜 TC & Certificates' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'directory' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex gap-2">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="all">All Classes</option>
                <option value="Class 10 (SSC)">Class 10 (SSC Candidate)</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 8">Class 8</option>
              </select>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search roll, name, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-4 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="p-3">Roll</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Class & Section</th>
                  <th className="p-3">Guardian & Phone</th>
                  <th className="p-3">Blood</th>
                  <th className="p-3">Fee Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="bg-white dark:bg-slate-900">
                    <td className="p-3 text-sm font-extrabold text-slate-900 dark:text-white">{s.roll_no < 10 ? `0${s.roll_no}` : s.roll_no}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img src={s.photo_url} alt={s.name_en} className="h-8 w-8 rounded-lg object-cover ring-1 ring-emerald-500" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{s.name_en}</p>
                          <p className="text-[10px] font-bengali text-emerald-600">{s.name_bn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      {s.class_name} • <span className="text-slate-400">{s.section_name}</span>
                    </td>
                    <td className="p-3">
                      {s.father_name} • <span className="font-mono text-emerald-600">{s.father_phone}</span>
                    </td>
                    <td className="p-3">
                      <span className="rounded bg-rose-50 px-1.5 py-0.5 font-bold text-rose-600 dark:bg-rose-950">{s.blood_group}</span>
                    </td>
                    <td className="p-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.fee_status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {s.fee_status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedStudentForID(s)}
                        className="rounded-lg bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300"
                      >
                        🪪 ID Card
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'admission' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Student admission & registration</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Auto-assigns next roll number and admission registry ID</p>
            </div>
            <button
              onClick={() => alert('Bulk Student CSV Import sample downloaded!')}
              className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Upload className="h-3.5 w-3.5" />
              Bulk CSV Import
            </button>
          </div>

          <form onSubmit={handleAdmissionSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 text-xs">
            <div>
              <label className="mb-1 block font-bold">Student Full Name (English) *</label>
              <input
                required
                value={newStudent.name_en}
                onChange={(e) => setNewStudent({ ...newStudent, name_en: e.target.value })}
                placeholder="e.g. Mahir Faisal"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block font-bold">Student Name (বাংলায়)</label>
              <input
                value={newStudent.name_bn}
                onChange={(e) => setNewStudent({ ...newStudent, name_bn: e.target.value })}
                placeholder="e.g. মাহির ফয়সাল"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-bengali dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block font-bold">Class & Shift *</label>
              <select
                value={newStudent.class_name}
                onChange={(e) => setNewStudent({ ...newStudent, class_name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="Class 6">Class 6 (Six)</option>
                <option value="Class 7">Class 7 (Seven)</option>
                <option value="Class 8">Class 8 (Eight)</option>
                <option value="Class 9">Class 9 (Nine)</option>
                <option value="Class 10 (SSC)">Class 10 (SSC Candidate)</option>
                <option value="Class 11 (HSC)">Class 11 (HSC 1st Year)</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-bold">Assigned Roll Number *</label>
              <input
                required
                value={newStudent.roll_no}
                onChange={(e) => setNewStudent({ ...newStudent, roll_no: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-bold dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block font-bold">Father / Guardian Name *</label>
              <input
                required
                value={newStudent.father_name}
                onChange={(e) => setNewStudent({ ...newStudent, father_name: e.target.value })}
                placeholder="e.g. Abdur Razzaq"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block font-bold">Guardian Mobile (for SMS alerts) *</label>
              <input
                required
                value={newStudent.father_phone}
                onChange={(e) => setNewStudent({ ...newStudent, father_phone: e.target.value })}
                placeholder="+8801711000000"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-mono dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div className="md:col-span-2 flex justify-end pt-2">
              <button type="submit" className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow">
                Save & Admit Student
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'id_cards' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Dual-sided student ID card generator</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Includes institution crest, barcode, blood group, and principal signature</p>
            </div>
            <button onClick={() => window.print()} className="rounded-xl bg-emerald-600 px-4 py-2 text-[10px] font-bold text-white">
              🖨️ Bulk print all ID cards
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 rounded-2xl bg-slate-100 p-4 dark:bg-slate-950">
            {students.slice(0, 2).map((stu) => (
              <div key={stu.id} className="flex h-80 w-56 flex-col justify-between overflow-hidden rounded-xl border-2 border-emerald-600 bg-white p-3 text-center text-slate-900 shadow-lg">
                <div className="rounded bg-emerald-700 py-1 text-white">
                  <p className="text-[10px] font-bold uppercase">{tenant?.name || 'MANE COLLEGE'}</p>
                  <p className="text-[8px]">Session {selectedSession}</p>
                </div>
                <div>
                  <img src={stu.photo_url} alt={stu.name_en} className="mx-auto mb-1 h-16 w-16 rounded-full object-cover ring-2 ring-emerald-500" />
                  <h4 className="text-xs font-bold">{stu.name_en}</h4>
                  <p className="text-[10px] font-bengali text-emerald-700">{stu.name_bn}</p>
                  <p className="mt-1 text-[9px] text-slate-500">
                    Roll: <strong>{stu.roll_no}</strong> • {stu.class_name}
                  </p>
                  <p className="text-[9px] font-bold text-rose-600">Blood: {stu.blood_group}</p>
                </div>
                <div className="rounded bg-emerald-800 py-0.5 text-[8px] font-mono font-bold text-white">
                  {stu.admission_no}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'promotion' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">End-of-year student promotion engine</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Promote students from Class 9 to Class 10 based on GPA 5.0 pass/fail criteria</p>
            </div>
            <button onClick={() => alert('Batch promotion executed for Session 2027!')} className="rounded-xl bg-indigo-600 px-4 py-2 text-[10px] font-bold text-white">
              🚀 Execute promotion to Session 2027
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="p-3">Current Roll</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Current Class</th>
                  <th className="p-3">Annual GPA</th>
                  <th className="p-3">Next Class</th>
                  <th className="p-3">Promotion Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {students.map((s) => (
                  <tr key={s.id} className="bg-white dark:bg-slate-900">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{s.roll_no}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{s.name_en}</td>
                    <td className="p-3">Class 9 (Nine)</td>
                    <td className="p-3 font-black text-emerald-600">{s.gpa_last_term}</td>
                    <td className="p-3 font-bold">Class 10 (Ten)</td>
                    <td className="p-3">
                      <Badge variant="success">Eligible for Promotion</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Official academic certificates generator</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Generate Transfer Certificates (TC), Testimonials, and Character Certificates</p>
            </div>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setSelectedCertificateType('tc')}
                className={`rounded-lg px-3 py-1.5 font-bold ${selectedCertificateType === 'tc' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                Transfer Certificate (TC)
              </button>
              <button
                onClick={() => setSelectedCertificateType('testimonial')}
                className={`rounded-lg px-3 py-1.5 font-bold ${selectedCertificateType === 'testimonial' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                Testimonial (প্রশংসাপত্র)
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-2xl rounded-xl border-4 border-double border-slate-400 bg-white p-8 text-center text-slate-900 shadow-sm">
            <h3 className="text-lg font-extrabold uppercase">{tenant?.name || 'Mane School and College'}</h3>
            <p className="text-xs text-slate-600">EIIN: {tenant?.eiin || '107985'} • Dhaka Board</p>
            <div className="mt-4 inline-block rounded-full bg-emerald-700 px-4 py-1 text-xs font-black uppercase text-white">
              {selectedCertificateType === 'tc' ? 'TRANSFER CERTIFICATE (ছাড়পত্র)' : 'ACADEMIC TESTIMONIAL (প্রশংসাপত্র)'}
            </div>

            <p className="pt-4 text-justify text-xs leading-relaxed text-slate-700">
              This is to certify that <strong>Tanvir Hasan</strong>, Son of <strong>Md. Kamrul Hasan</strong>, was a student of Class 10 (Science Section). He has cleared all institutional dues and his conduct has been satisfactory during his stay at this college.
            </p>

            <div className="flex items-end justify-between pt-8 text-xs">
              <div>
                <p className="text-[10px] font-mono">Date: 01-03-2026</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-emerald-800 font-bold italic">Kazi Faruq Ahmed</p>
                <div className="mx-auto mt-1 h-px w-28 bg-slate-400"></div>
                <span className="mt-0.5 block text-[10px] font-bold uppercase">Principal / Headmaster</span>
              </div>
            </div>

            <div className="no-print flex justify-center pt-2">
              <button onClick={() => window.print()} className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white">
                🖨️ Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedStudentForID && <IDCardGenerator student={selectedStudentForID} onClose={() => setSelectedStudentForID(null)} />}
    </div>
  );
};
