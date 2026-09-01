import React, { useState } from 'react';
import { Badge, Modal } from '../../components/common/StatCard';
import {
  BookOpen,
  Bus,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  DollarSign
} from 'lucide-react';

export const LibraryTransport = () => {
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'transport'

  // Books
  const [books, setBooks] = useState([
    { id: 1, title: 'Higher Mathematics for Class 9-10', author: 'NCTB Bangladesh', isbn: '978-984-68-1002', qty: 25, available: 18 },
    { id: 2, title: 'English Grammar and Composition', author: 'NCTB', isbn: '978-984-68-1007', qty: 30, available: 24 },
    { id: 3, title: 'Fundamentals of Physics', author: 'Dr. Shahjahan Tapan', isbn: '978-984-68-1036', qty: 15, available: 8 }
  ]);

  // Transport Routes
  const [routes, setRoutes] = useState([
    { id: 1, route_name: 'Route 1: Uttara to Campus', vehicle_no: 'Dhaka Metro Cha-54-1290', driver_name: 'Md. Joynal Abedin', phone: '+8801711999111', fee: 1800.00, students_count: 32 },
    { id: 2, route_name: 'Route 2: Mirpur 10 to Campus', vehicle_no: 'Dhaka Metro Cha-54-3382', driver_name: 'Abul Kashem', phone: '+8801711999222', fee: 1500.00, students_count: 28 }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Library & Transport Management (Add-on Services)
          </h2>
          <p className="text-xs text-slate-500">
            Book cataloging, student issue/return, vehicle routes, drivers, and monthly transport fee mapping
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'library'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📚 Library Catalog & Issues
          </button>
          <button
            onClick={() => setActiveTab('transport')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'transport'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🚌 Transport Routes & Fleet
          </button>
        </div>
      </div>

      {/* 1. LIBRARY SUBTAB */}
      {activeTab === 'library' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="font-extrabold text-sm">Library Book Catalog & Circulation</h3>
            <button onClick={() => alert('New Book modal')} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
              + Add Book
            </button>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-[10px] border-b">
              <tr>
                <th className="p-3">Book Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">ISBN / Code</th>
                <th className="p-3">Total Qty</th>
                <th className="p-3">Available</th>
                <th className="p-3 text-right">Circulation</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {books.map((b) => (
                <tr key={b.id}>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{b.title}</td>
                  <td className="p-3 text-slate-500">{b.author}</td>
                  <td className="p-3 font-mono">{b.isbn}</td>
                  <td className="p-3 font-bold">{b.qty}</td>
                  <td className="p-3 font-bold text-emerald-600">{b.available}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => alert(`Issued book: ${b.title}`)} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 font-bold rounded-lg">
                      Issue to Student
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. TRANSPORT SUBTAB */}
      {activeTab === 'transport' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="font-extrabold text-sm">School Bus Fleet & Student Transport Routes</h3>
            <button onClick={() => alert('New Transport Route modal')} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
              + Add Route / Bus
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {routes.map((r) => (
              <div key={r.id} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{r.route_name}</h4>
                  <Badge variant="info">৳{r.fee} / mo</Badge>
                </div>
                <div className="space-y-1 text-slate-600 dark:text-slate-300">
                  <p>🚍 Vehicle No: <strong>{r.vehicle_no}</strong></p>
                  <p>👤 Driver: <strong>{r.driver_name}</strong> (Phone: <span className="font-mono text-emerald-600">{r.phone}</span>)</p>
                  <p>👥 Students Enrolled: <strong>{r.students_count} Passengers</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
