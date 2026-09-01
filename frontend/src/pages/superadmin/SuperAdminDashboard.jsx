import React, { useState } from 'react';
import { StatCard, Badge, Modal } from '../../components/common/StatCard';
import {
  Building2,
  Users,
  DollarSign,
  Send,
  Plus,
  Search,
  ExternalLink,
  ShieldCheck,
  Power,
  BarChart3,
  Server,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '../../services/authStore';

export const SuperAdminDashboard = () => {
  const { availableTenants, setTenant } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSchool, setNewSchool] = useState({
    name: '',
    short_name: '',
    eiin: '',
    subdomain: '',
    custom_domain: '',
    board: 'Dhaka',
    plan: 'enterprise',
    email: '',
    phone: '+8801700000000',
    admin_name: ''
  });

  const filteredTenants = availableTenants.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.eiin_number.includes(searchTerm) ||
    t.subdomain.includes(searchTerm)
  );

  const handleAddSchool = (e) => {
    e.preventDefault();
    alert(`School "${newSchool.name}" onboarded successfully with subdomain "${newSchool.subdomain}.edumanage.bd"!`);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Super Admin Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl border border-indigo-900/50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              SaaS Multi-Tenant Super Administrator
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold">
              Bangladesh School & College SaaS Platform
            </h1>
            <p className="text-slate-300 text-xs lg:text-sm mt-1 max-w-xl">
              Centralized multitenancy control: Manage 38 live educational institutions across 8 Bangladesh Education Boards.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard New Institution</span>
          </button>
        </div>
      </div>

      {/* SaaS High-Level KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Active Tenants"
          value="38 Schools"
          change="4 new"
          isPositive={true}
          icon={Building2}
          color="emerald"
          subtext="across Dhaka, Ctg, Rajshahi"
        />
        <StatCard
          title="Total Students Hosted"
          value="48,250"
          change="12%"
          isPositive={true}
          icon={Users}
          color="blue"
          subtext="active student profiles"
        />
        <StatCard
          title="Monthly Recurring Revenue"
          value="৳ 285,000"
          change="8.5%"
          isPositive={true}
          icon={DollarSign}
          color="indigo"
          subtext="MRR via bKash / SSLCommerz"
        />
        <StatCard
          title="SMS Dispatched (This Month)"
          value="142,800"
          icon={Send}
          color="purple"
          subtext="GreenwebBD Gateway active"
        />
      </div>

      {/* Tenants Management Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Filter bar */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Institutional Tenants Directory
            </h3>
            <p className="text-xs text-slate-500">Live isolation and domain routing status</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by school, EIIN, subdomain..."
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
                <th className="py-3.5 px-4">Institution Name & EIIN</th>
                <th className="py-3.5 px-4">Subdomain / Custom Domain</th>
                <th className="py-3.5 px-4">Subscription Plan</th>
                <th className="py-3.5 px-4">Students</th>
                <th className="py-3.5 px-4">SMS Balance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredTenants.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {item.short_name}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-[11px] text-slate-400">EIIN: {item.eiin_number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400">
                    <div>{item.subdomain}.edumanage.bd</div>
                    {item.custom_domain && (
                      <div className="text-[10px] text-slate-400">{item.custom_domain}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="purple">{item.plan_name}</Badge>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {item.students_count?.toLocaleString() || '1,200'}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">
                    {item.sms_balance?.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success">Active</Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setTenant(item);
                        alert(`Switched active portal view to: ${item.name}`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-100 transition-colors"
                    >
                      <span>Launch Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard School Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="🏢 Onboard New Institution to SaaS Platform"
      >
        <form onSubmit={handleAddSchool} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Institution Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rajshahi College"
                value={newSchool.name}
                onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                EIIN Number (BANBEIS) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 102938"
                value={newSchool.eiin}
                onChange={(e) => setNewSchool({ ...newSchool, eiin: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Subdomain Slug *
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  required
                  placeholder="rajshahicollege"
                  value={newSchool.subdomain}
                  onChange={(e) => setNewSchool({ ...newSchool, subdomain: e.target.value.toLowerCase() })}
                  className="w-full p-2.5 rounded-l-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="bg-slate-200 dark:bg-slate-700 px-3 py-2.5 rounded-r-xl font-mono text-slate-600 dark:text-slate-300">
                  .edumanage.bd
                </span>
              </div>
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Education Board
              </label>
              <select
                value={newSchool.board}
                onChange={(e) => setNewSchool({ ...newSchool, board: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Dhaka">Dhaka Board</option>
                <option value="Chittagong">Chittagong Board</option>
                <option value="Rajshahi">Rajshahi Board</option>
                <option value="Jessore">Jessore Board</option>
                <option value="Comilla">Comilla Board</option>
                <option value="Barisal">Barisal Board</option>
                <option value="Sylhet">Sylhet Board</option>
                <option value="Dinajpur">Dinajpur Board</option>
                <option value="Mymensingh">Mymensingh Board</option>
                <option value="Madrasah">Madrasah Board</option>
              </select>
            </div>
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
              Confirm Onboarding
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
