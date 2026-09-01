import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import { IDCardGenerator } from '../../components/printables/IDCardGenerator';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Contact2,
  Phone,
  FileText,
  Edit,
  Trash2,
  Download,
  Printer
} from 'lucide-react';

export const StudentsDirectory = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentForID, setSelectedStudentForID] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
      section_id: 1,
      shift_name: 'Morning Shift',
      group_name: 'Science',
      gender: 'Male',
      blood_group: 'O+',
      religion: 'Islam',
      father_name: 'Md. Kamrul Hasan',
      father_phone: '+8801711888001',
      emergency_contact: '+8801711888001',
      present_address: 'House 24, Road 5, Dhanmondi, Dhaka',
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      fee_status: 'paid',
      total_due: 0.00
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
      section_id: 1,
      shift_name: 'Morning Shift',
      group_name: 'Science',
      gender: 'Female',
      blood_group: 'A+',
      religion: 'Islam',
      father_name: 'Engr. Mahbubur Rahman',
      father_phone: '+8801711888002',
      emergency_contact: '+8801711888002',
      present_address: 'Flat B-3, Green Road, Dhaka',
      photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      fee_status: 'paid',
      total_due: 0.00
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
      section_id: 1,
      shift_name: 'Morning Shift',
      group_name: 'Science',
      gender: 'Male',
      blood_group: 'B+',
      religion: 'Islam',
      father_name: 'Dr. Aminul Islam',
      father_phone: '+8801711888003',
      emergency_contact: '+8801711888003',
      present_address: 'Sector 4, Uttara, Dhaka',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      fee_status: 'unpaid',
      total_due: 3100.00
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
      section_id: 1,
      shift_name: 'Morning Shift',
      group_name: 'Science',
      gender: 'Female',
      blood_group: 'AB+',
      religion: 'Islam',
      father_name: 'Jahangir Alam',
      father_phone: '+8801711888004',
      emergency_contact: '+8801711888004',
      present_address: 'Lalmatia Block D, Dhaka',
      photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      fee_status: 'partially_paid',
      total_due: 1700.00
    },
    {
      id: 5,
      admission_no: 'ADM-2026-1005',
      roll_no: 5,
      name_en: 'Mahir Faisal',
      name_bn: 'মাহির ফয়সাল',
      class_name: 'Class 10 (SSC)',
      class_id: 5,
      section_name: 'Padma (Morning)',
      section_id: 1,
      shift_name: 'Morning Shift',
      group_name: 'Science',
      gender: 'Male',
      blood_group: 'O+',
      religion: 'Islam',
      father_name: 'Abdur Razzaq',
      father_phone: '+8801711888005',
      emergency_contact: '+8801711888005',
      present_address: 'Mirpur-10, Dhaka',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      fee_status: 'paid',
      total_due: 0.00
    }
  ]);

  const [newStudent, setNewStudent] = useState({
    name_en: '',
    name_bn: '',
    roll_no: '',
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

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admission_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(s.roll_no).includes(searchTerm) ||
      s.father_phone.includes(searchTerm);
    return matchesSearch;
  });

  const handleAddSubmit = (e) => {
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
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      fee_status: 'unpaid',
      total_due: 2500.00
    };
    setStudents([...students, created]);
    setIsAddModalOpen(false);
    alert(`Student "${created.name_en}" admitted successfully with Roll #${created.roll_no}!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Student Management & Admissions
          </h2>
          <p className="text-xs text-slate-500">
            Digital student profiles, admission registry, and ID card issuance
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>New Student Admission</span>
        </button>
      </div>

      {/* Directory Table Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Classes</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10 (SSC)</option>
              <option value="11">Class 11 (HSC)</option>
            </select>

            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Sections (Padma, Meghna)</option>
              <option value="padma">Padma (Morning)</option>
              <option value="meghna">Meghna (Day)</option>
              <option value="jamuna">Jamuna (Science)</option>
            </select>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Roll, Name, Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Roll</th>
                <th className="py-3 px-4">Student Profile</th>
                <th className="py-3 px-4">Class & Section</th>
                <th className="py-3 px-4">Guardian & Phone</th>
                <th className="py-3 px-4">Blood Group</th>
                <th className="py-3 px-4">Fee Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-sm text-slate-900 dark:text-white">
                    {s.roll_no < 10 ? `0${s.roll_no}` : s.roll_no}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.photo_url}
                        alt={s.name_en}
                        className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-500/20 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{s.name_en}</p>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bengali">{s.name_bn}</p>
                        <span className="text-[10px] text-slate-400 font-mono">{s.admission_no}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900 dark:text-white">{s.class_name}</p>
                    <p className="text-[11px] text-slate-500">{s.section_name} • {s.group_name}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900 dark:text-white">{s.father_name}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-emerald-500" />
                      {s.father_phone}
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900/40">
                      {s.blood_group}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {s.fee_status === 'paid' ? (
                      <Badge variant="success">Paid</Badge>
                    ) : s.fee_status === 'partially_paid' ? (
                      <Badge variant="warning">Due: ৳{s.total_due}</Badge>
                    ) : (
                      <Badge variant="danger">Unpaid: ৳{s.total_due}</Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedStudentForID(s)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-100 transition-colors"
                        title="Generate Official Student ID Card"
                      >
                        <Contact2 className="w-3.5 h-3.5" />
                        <span>ID Card</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ID Card Generator Modal */}
      {selectedStudentForID && (
        <IDCardGenerator
          student={selectedStudentForID}
          onClose={() => setSelectedStudentForID(null)}
        />
      )}

      {/* New Admission Modal Form */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="🎓 Student Admission Registration (ভর্তি ফরম)"
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Student Full Name (English) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mahir Rahman"
                value={newStudent.name_en}
                onChange={(e) => setNewStudent({ ...newStudent, name_en: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Student Name (বাংলায়)
              </label>
              <input
                type="text"
                placeholder="e.g. মাহির রহমান"
                value={newStudent.name_bn}
                onChange={(e) => setNewStudent({ ...newStudent, name_bn: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bengali"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Class *
              </label>
              <select
                value={newStudent.class_name}
                onChange={(e) => setNewStudent({ ...newStudent, class_name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Class 6">Class 6 (Six)</option>
                <option value="Class 7">Class 7 (Seven)</option>
                <option value="Class 8">Class 8 (Eight)</option>
                <option value="Class 9">Class 9 (Nine)</option>
                <option value="Class 10 (SSC)">Class 10 (SSC)</option>
                <option value="Class 11 (HSC)">Class 11 (HSC)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Section & Shift *
              </label>
              <select
                value={newStudent.section_name}
                onChange={(e) => setNewStudent({ ...newStudent, section_name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Padma (Morning)">Padma (Morning Shift)</option>
                <option value="Meghna (Day)">Meghna (Day Shift)</option>
                <option value="Jamuna (Science)">Jamuna (Science)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Roll Number *
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 6"
                value={newStudent.roll_no}
                onChange={(e) => setNewStudent({ ...newStudent, roll_no: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Blood Group (রক্তের গ্রুপ)
              </label>
              <select
                value={newStudent.blood_group}
                onChange={(e) => setNewStudent({ ...newStudent, blood_group: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="A+">A Positive (A+)</option>
                <option value="A-">A Negative (A-)</option>
                <option value="B+">B Positive (B+)</option>
                <option value="B-">B Negative (B-)</option>
                <option value="O+">O Positive (O+)</option>
                <option value="O-">O Negative (O-)</option>
                <option value="AB+">AB Positive (AB+)</option>
                <option value="AB-">AB Negative (AB-)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Father / Guardian Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Md. Anwar Hossain"
                value={newStudent.father_name}
                onChange={(e) => setNewStudent({ ...newStudent, father_name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Guardian Mobile No (for SMS alerts) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. +8801711000000"
                value={newStudent.father_phone}
                onChange={(e) => setNewStudent({ ...newStudent, father_phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Residential Address (বর্তমান ঠিকানা)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. House 12, Road 4, Dhanmondi, Dhaka"
              value={newStudent.present_address}
              onChange={(e) => setNewStudent({ ...newStudent, present_address: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
            >
              Complete Admission
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
