import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  DollarSign,
  Hotel,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

const API_BASE = 'http://localhost:4000/api/v1';

const initialStats = [
  {
    title: 'Total Bookings',
    value: '0',
    detail: 'Loading...',
    icon: CalendarDays,
    accent: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Revenue',
    value: '$0',
    detail: 'Loading...',
    icon: DollarSign,
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Active Travelers',
    value: '0',
    detail: 'Loading...',
    icon: Users,
    accent: 'from-violet-500 to-fuchsia-500',
  },
  {
    title: 'Pending Requests',
    value: '0',
    detail: 'Loading...',
    icon: ShieldCheck,
    accent: 'from-amber-500 to-orange-500',
  },
];

const quickActions = [
  { title: 'Create package', description: 'Launch a fresh holiday package for the next season.', icon: Sparkles },
  { title: 'Manage stays', description: 'Update hotel availability and special offers.', icon: Hotel },
  { title: 'Track flights', description: 'Monitor seat inventory and route demand.', icon: Plane },
];

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(initialStats);
  const token = localStorage.getItem('token');
  const rawUser = localStorage.getItem('user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/bookings/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await res.json();
        setBookings(data);

        const confirmed = data.filter((item) => item.status === 'Confirmed').length;
        const pending = data.filter((item) => item.status === 'Pending').length;
        const revenue = data.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        const uniqueTravelers = new Set(data.map((item) => item.userName)).size;

        setStats([
          {
            title: 'Total Bookings',
            value: data.length.toString(),
            detail: `${confirmed} confirmed`,
            icon: CalendarDays,
            accent: 'from-cyan-500 to-blue-500',
          },
          {
            title: 'Revenue',
            value: `$${revenue.toLocaleString()}`,
            detail: 'From booking records',
            icon: DollarSign,
            accent: 'from-emerald-500 to-teal-500',
          },
          {
            title: 'Active Travelers',
            value: uniqueTravelers.toString(),
            detail: 'Tracked from bookings',
            icon: Users,
            accent: 'from-violet-500 to-fuchsia-500',
          },
          {
            title: 'Pending Requests',
            value: pending.toString(),
            detail: 'Awaiting review',
            icon: ShieldCheck,
            accent: 'from-amber-500 to-orange-500',
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/my-bookings" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_45px_-18px_rgba(15,23,42,0.25)] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Operations Center</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Welcome back, {user?.name || 'Admin'}.</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                Monitor bookings, oversee travel inventory, and keep every guest experience on track.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              View public site
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className={`inline-flex rounded-xl bg-gradient-to-r ${item.accent} p-2`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <p className="mt-4 text-sm text-slate-500">{item.title}</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Recent bookings</h2>
                <p className="text-sm text-slate-600">Latest guest reservations and their current status.</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                Live updates
              </span>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Guest</th>
                    <th className="px-4 py-3 font-medium">Trip</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {bookings.length > 0 ? bookings.map((booking) => (
                    <tr key={booking._id} className="text-slate-200">
                      <td className="px-4 py-3">{booking.userName}</td>
                      <td className="px-4 py-3">{booking.tripTitle}</td>
                      <td className="px-4 py-3">{booking.tripType}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-emerald-500/15 text-emerald-300' : booking.status === 'Pending' ? 'bg-amber-500/15 text-amber-300' : 'bg-rose-500/15 text-rose-300'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">${Number(booking.amount || 0).toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-6 text-center text-sm text-slate-500">No booking records found yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sky-50 p-2 text-sky-600">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Quick actions</h3>
                  <p className="text-sm text-slate-600">Keep operations moving smoothly.</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {quickActions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-white p-2 text-slate-700">
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{item.title}</p>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Today’s focus</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">12 pending guest requests need a response.</h3>
              <p className="mt-2 text-sm text-slate-600">Prioritize confirmations, special arrangements, and last-minute updates for your upcoming travelers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
