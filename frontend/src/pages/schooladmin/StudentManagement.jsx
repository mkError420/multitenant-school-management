import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import { IDCardGenerator } from '../../components/printables/IDCardGenerator';
import {
  Users,
  Search,
  UserPlus,
  Contact2,
  FileSpreadsheet,
  Upload,
  ArrowRightCircle,
  FileText,
  Printer,
  CheckCircle2,
  Award
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const StudentManagement = () => {
  const { tenant, selectedSession } = useAuthStore();
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'admission' | 'id_cards' | 'promotion' | 'certificates'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudentForID, setSelectedStudentForID] = useState(null);
  const [selectedCertificateType, setSelectedCertificateType] = useState('tc'); // 'tc' | 'testimonial' | 'character'
  const [certificateStudent, setCertificateStudent] = useState(null);

  const [students, setStudents] = useState([
    {
      id: 1,
      admission_no: 'ADM-2026-1001',
      roll_no: 1,
      name_en: 'Tanvir Hasan',
      name_bn: 'তানভীর হাসান',
      class_name: 'Class 10 (SSC)',
      class_id: 5,
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
      class_id: 5,
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
      class_id: 5,
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
      class_id: 5,
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
      roll_no: parseInt(newStudent.roll_no) || (students.length + 1),
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
    setStudents([...students, created]);
    alert(`Student "${created.name_en}" admitted successfully with Roll #${created.roll_no}!`);
    setActiveTab('directory');
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Student Management & Digital Registry
          </h2>
          <p className="text-xs text-slate-500">
            Admissions, Auto-Roll, Dual-Sided ID Cards, End-of-Year Promotion Engine, TC & Certificates
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
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

      {/* 1. DIRECTORY SUBTAB */}
      {activeTab === 'directory' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden p-5 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex gap-2">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
              >
                <option value="all">All Classes</option>
                <option value="10">Class 10 (SSC Candidate)</option>
                <option value="9">Class 9</option>
                <option value="8">Class 8</option>
              </select>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search roll, name, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold uppercase text-[10px] border-b">
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
            <tbody className="divide-y font-medium">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-extrabold text-sm">{s.roll_no < 10 ? `0${s.roll_no}` : s.roll_no}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <img src={s.photo_url} className="w-8 h-8 rounded-lg object-cover ring-1 ring-emerald-500" />
                      <div>
                        <p className="font-bold">{s.name_en}</p>
                        <p className="text-[10px] text-emerald-600 font-bengali">{s.name_bn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{s.class_name} • <span className="text-slate-400">{s.section_name}</span></td>
                  <td className="p-3">{s.father_name} • <span className="font-mono text-emerald-600">{s.father_phone}</span></td>
                  <td className="p-3"><span className="text-rose-600 font-bold bg-rose-50 dark:bg-rose-950 px-1.5 py-0.5 rounded">{s.blood_group}</span></td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.fee_status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {s.fee_status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => setSelectedStudentForID(s)} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold rounded-lg hover:bg-emerald-100">
                      🪪 ID Card
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. ADMISSION FORM SUBTAB */}
      {activeTab === 'admission' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Student Admission & Registration (ভর্তি ফরম)</h3>
              <p className="text-xs text-slate-500">Auto-assigns next Roll Number and Admission Registry ID</p>
            </div>
            <button onClick={() => alert('Bulk Student CSV Import sample downloaded!')} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-200">
              <Upload className="w-3.5 h-3.5" />
              <span>Bulk CSV Import</span>
            </button>
          </div>

          <form onSubmit={handleAdmissionSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold block mb-1">Student Full Name (English) *</label>
              <input required value={newStudent.name_en} onChange={e => setNewStudent({...newStudent, name_en: e.target.value})} placeholder="e.g. Mahir Faisal" className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800" />
            </div>
            <div>
              <label className="font-bold block mb-1">Student Name (বাংলায়)</label>
              <input value={newStudent.name_bn} onChange={e => setNewStudent({...newStudent, name_bn: e.target.value})} placeholder="e.g. মাহির ফয়সাল" className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 font-bengali" />
            </div>
            <div>
              <label className="font-bold block mb-1">Class & Shift *</label>
              <select value={newStudent.class_name} onChange={e => setNewStudent({...newStudent, class_name: e.target.value})} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800">
                <option value="Class 6">Class 6 (Six)</option>
                <option value="Class 7">Class 7 (Seven)</option>
                <option value="Class 8">Class 8 (Eight)</option>
                <option value="Class 9">Class 9 (Nine)</option>
                <option value="Class 10 (SSC)">Class 10 (SSC Candidate)</option>
                <option value="Class 11 (HSC)">Class 11 (HSC 1st Year)</option>
              </select>
            </div>
            <div>
              <label className="font-bold block mb-1">Assigned Roll Number *</label>
              <input required value={newStudent.roll_no} onChange={e => setNewStudent({...newStudent, roll_no: e.target.value})} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 font-bold" />
            </div>
            <div>
              <label className="font-bold block mb-1">Father / Guardian Name *</label>
              <input required value={newStudent.father_name} onChange={e => setNewStudent({...newStudent, father_name: e.target.value})} placeholder="e.g. Abdur Razzaq" className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800" />
            </div>
            <div>
              <label className="font-bold block mb-1">Guardian Mobile (for SMS alerts) *</label>
              <input required value={newStudent.father_phone} onChange={e => setNewStudent({...newStudent, father_phone: e.target.value})} placeholder="+8801711000000" className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 font-mono" />
            </div>
            <div className="md:col-span-2 pt-2 flex justify-end">
              <button type="submit" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow">
                Save & Admit Student
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. ID CARD GENERATOR SUBTAB */}
      {activeTab === 'id_cards' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Dual-Sided Student ID Card Generator (PVC CR80 & A4 Sheet)</h3>
              <p className="text-xs text-slate-500">Includes Institution Crest, Barcode, Blood Group, and Principal Signature</p>
            </div>
            <button onClick={() => window.print()} className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
              🖨️ Bulk Print All ID Cards
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 p-4 bg-slate-100 dark:bg-slate-950 rounded-2xl">
            {students.slice(0, 2).map((stu) => (
              <div key={stu.id} className="w-56 h-80 bg-white text-slate-900 border-2 border-emerald-600 rounded-xl overflow-hidden text-center flex flex-col justify-between p-3 shadow-lg">
                <div className="bg-emerald-700 text-white py-1 rounded">
                  <p className="font-bold text-[10px] uppercase">{tenant?.name || 'MANE COLLEGE'}</p>
                  <p className="text-[8px]">Session {selectedSession}</p>
                </div>
                <div>
                  <img src={stu.photo_url} className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-emerald-500 mb-1" />
                  <h4 className="font-bold text-xs">{stu.name_en}</h4>
                  <p className="text-[10px] text-emerald-700 font-bengali">{stu.name_bn}</p>
                  <p className="text-[9px] text-slate-500 mt-1">Roll: <strong>{stu.roll_no}</strong> • {stu.class_name}</p>
                  <p className="text-[9px] text-rose-600 font-bold">Blood: {stu.blood_group}</p>
                </div>
                <div className="bg-emerald-800 text-white text-[8px] py-0.5 rounded font-mono font-bold">
                  {stu.admission_no}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PROMOTION ENGINE SUBTAB */}
      {activeTab === 'promotion' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">End-of-Year Student Promotion Engine</h3>
              <p className="text-xs text-slate-500">Promote students from Class 9 to Class 10 based on GPA 5.0 Pass/Fail criteria</p>
            </div>
            <button onClick={() => alert('Batch promotion executed for Session 2027!')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow">
              🚀 Execute Promotion to Session 2027
            </button>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Current Roll</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Current Class</th>
                <th className="p-3">Annual GPA</th>
                <th className="p-3">Next Class (Session 2027)</th>
                <th className="p-3">Promotion Status</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {students.map(s => (
                <tr key={s.id}>
                  <td className="p-3 font-bold">{s.roll_no}</td>
                  <td className="p-3 font-bold">{s.name_en}</td>
                  <td className="p-3">Class 9 (Nine)</td>
                  <td className="p-3 font-black text-emerald-600">{s.gpa_last_term}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">Class 10 (Ten)</td>
                  <td className="p-3"><Badge variant="success">Eligible for Promotion</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. DOCUMENTS & CERTIFICATES SUBTAB */}
      {activeTab === 'certificates' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-extrabold text-sm">Official Academic Certificates Generator</h3>
              <p className="text-xs text-slate-500">Generate Transfer Certificates (TC), Testimonials, and Character Certificates</p>
            </div>
            <div className="flex gap-2 text-xs">
              <button onClick={() => setSelectedCertificateType('tc')} className={`px-3 py-1.5 rounded-lg font-bold ${selectedCertificateType === 'tc' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                Transfer Certificate (TC)
              </button>
              <button onClick={() => setSelectedCertificateType('testimonial')} className={`px-3 py-1.5 rounded-lg font-bold ${selectedCertificateType === 'testimonial' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                Testimonial (প্রশংসাপত্র)
              </button>
            </div>
          </div>

          {/* Certificate Template Preview */}
          <div className="p-8 border-4 border-double border-slate-400 bg-white text-slate-900 rounded-xl space-y-4 text-center max-w-2xl mx-auto shadow-sm">
            <h3 className="font-extrabold text-lg uppercase">{tenant?.name || 'Mane School and College'}</h3>
            <p className="text-xs text-slate-600">EIIN: {tenant?.eiin || '107985'} • Dhaka Board</p>
            <div className="inline-block px-4 py-1 bg-emerald-700 text-white font-black text-xs uppercase rounded-full">
              {selectedCertificateType === 'tc' ? 'TRANSFER CERTIFICATE (ছাড়পত্র)' : 'ACADEMIC TESTIMONIAL (প্রশংসাপত্র)'}
            </div>

            <p className="text-xs leading-relaxed text-slate-700 text-justify pt-4">
              This is to certify that <strong>Tanvir Hasan</strong>, Son of <strong>Md. Kamrul Hasan</strong>, was a student of Class 10 (Science Section). He has cleared all institutional dues and his conduct has been satisfactory during his stay at this college.
            </p>

            <div className="pt-8 flex justify-between items-end text-xs">
              <div>
                <p className="font-mono text-[10px]">Date: 01-03-2026</p>
              </div>
              <div className="text-center">
                <p className="font-serif italic font-bold text-emerald-800">Kazi Faruq Ahmed</p>
                <div className="w-28 h-px bg-slate-400 mx-auto"></div>
                <span className="text-[10px] font-bold uppercase block mt-0.5">Principal / Headmaster</span>
              </div>
            </div>

            <div className="pt-2 no-print flex justify-center">
              <button onClick={() => window.print()} className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
                🖨️ Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ID Card Modal */}
      {selectedStudentForID && (
        <IDCardGenerator
          student={selectedStudentForID}
          onClose={() => setSelectedStudentForID(null)}
        />
      )}
    </div>
  );
};
