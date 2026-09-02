import React, { useState } from 'react';
import { Badge } from '../../components/common/StatCard';
import { BookOpen, Bus, LibraryBig, MapPinned, School, Sparkles } from 'lucide-react';

export const LibraryTransport = () => {
  const [activeTab, setActiveTab] = useState('library');

  const [books] = useState([
    { id: 1, title: 'Higher Mathematics for Class 9-10', author: 'NCTB Bangladesh', isbn: '978-984-68-1002', qty: 25, available: 18 },
    { id: 2, title: 'English Grammar and Composition', author: 'NCTB', isbn: '978-984-68-1007', qty: 30, available: 24 },
    { id: 3, title: 'Fundamentals of Physics', author: 'Dr. Shahjahan Tapan', isbn: '978-984-68-1036', qty: 15, available: 8 }
  ]);

  const [routes] = useState([
    { id: 1, route_name: 'Uttara to Campus', vehicle_no: 'Dhaka Metro Cha-54-1290', driver_name: 'Md. Joynal Abedin', phone: '+8801711999111', fee: 1800.0, students_count: 32 },
    { id: 2, route_name: 'Mirpur 10 to Campus', vehicle_no: 'Dhaka Metro Cha-54-3382', driver_name: 'Abul Kashem', phone: '+8801711999222', fee: 1500.0, students_count: 28 }
  ]);

  const tabs = [
    { id: 'library', label: 'Library' },
    { id: 'transport', label: 'Transport' }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-amber-200 bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-100">
              <School className="h-3.5 w-3.5" />
              Student support services
            </div>
            <h2 className="text-2xl font-black tracking-tight">Library & transport</h2>
            <p className="mt-2 max-w-2xl text-sm text-amber-100/80">
              Reading resources, circulation tracking, route planning, and student mobility management.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-amber-900">
            <Sparkles className="h-4 w-4" />
            Manage resources
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'Books', value: '320', icon: LibraryBig, tone: 'emerald', note: 'Catalogued titles' },
          { title: 'Available', value: '214', icon: BookOpen, tone: 'blue', note: 'Ready to issue' },
          { title: 'Routes', value: '12', icon: MapPinned, tone: 'violet', note: 'Active services' },
          { title: 'Fleet', value: '8', icon: Bus, tone: 'amber', note: 'School vehicles' }
        ].map(({ title, value, icon: Icon, tone, note }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{title}</p>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone === 'emerald' ? 'bg-emerald-100 text-emerald-600' : tone === 'blue' ? 'bg-sky-100 text-sky-600' : tone === 'violet' ? 'bg-violet-100 text-violet-600' : 'bg-amber-100 text-amber-600'}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-5 text-2xl font-black text-slate-900 dark:text-white">{value}</p>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{note}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition ${activeTab === tab.id ? 'bg-amber-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'library' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Library catalog</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Books and issue availability</p>
            </div>
            <button className="rounded-xl bg-emerald-600 px-3.5 py-2 text-[10px] font-bold text-white">+ Add book</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-3 py-3">Title</th>
                  <th className="px-3 py-3">Author</th>
                  <th className="px-3 py-3">ISBN</th>
                  <th className="px-3 py-3">Qty</th>
                  <th className="px-3 py-3">Available</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {books.map((book) => (
                  <tr key={book.id} className="bg-white dark:bg-slate-900">
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{book.title}</td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{book.author}</td>
                    <td className="px-3 py-3 font-mono text-slate-500">{book.isbn}</td>
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">{book.qty}</td>
                    <td className="px-3 py-3 font-bold text-emerald-600">{book.available}</td>
                    <td className="px-3 py-3"><button className="rounded-lg bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">Issue</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'transport' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Fleet & routes</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Student transport assignments and route views</p>
            </div>
            <button className="rounded-xl bg-amber-600 px-3.5 py-2 text-[10px] font-bold text-white">+ Add route</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {routes.map((route) => (
              <div key={route.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-base font-black text-slate-900 dark:text-white">{route.route_name}</p>
                  <Badge variant="info">৳{route.fee}/month</Badge>
                </div>
                <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <p>Vehicle: <span className="font-bold text-slate-900 dark:text-white">{route.vehicle_no}</span></p>
                  <p>Driver: <span className="font-bold text-slate-900 dark:text-white">{route.driver_name}</span></p>
                  <p>Students: <span className="font-bold text-slate-900 dark:text-white">{route.students_count}</span></p>
                  <p>Phone: <span className="font-mono text-emerald-600">{route.phone}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
