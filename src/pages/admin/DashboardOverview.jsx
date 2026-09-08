import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Users, UserPlus, Bed, Calendar, Activity } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalPatients: 1250,
    todaysPatients: 86,
    totalDoctors: 75,
    availableDoctors: 42,
    availableBeds: 58,
    occupiedBeds: 142,
    todaysAppointments: 64,
    emergencyPatients: 12
  });

  const patientTrends = [
    { name: 'Mon', patients: 120 },
    { name: 'Tue', patients: 132 },
    { name: 'Wed', patients: 101 },
    { name: 'Thu', patients: 143 },
    { name: 'Fri', patients: 90 },
    { name: 'Sat', patients: 150 },
    { name: 'Sun', patients: 86 },
  ];

  const departmentData = [
    { name: 'Cardiology', value: 400 },
    { name: 'Neurology', value: 300 },
    { name: 'Pediatrics', value: 300 },
    { name: 'Orthopedics', value: 200 },
  ];

  const statCards = [
    { title: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Today\'s Patients', value: stats.todaysPatients, icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Doctors', value: stats.totalDoctors, icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Available Beds', value: stats.availableBeds, icon: Bed, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <div className="flex gap-2">
          <select className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium bg-white">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value.toLocaleString()}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Available Doctors</p>
          <p className="text-xl font-bold text-slate-900">{stats.availableDoctors}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Occupied Beds</p>
          <p className="text-xl font-bold text-slate-900">{stats.occupiedBeds}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Today's Appts</p>
          <p className="text-xl font-bold text-slate-900">{stats.todaysAppointments}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-red-100 bg-red-50 text-center">
          <p className="text-xs text-red-600 uppercase tracking-wider font-semibold mb-1">Emergency</p>
          <p className="text-xl font-bold text-red-700">{stats.emergencyPatients}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Patient Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patientTrends}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Department Load</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#334155', fontSize: 12, fontWeight: 500}} />
                <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
