import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { CalendarDays, Compass, MapPin, Plane, Sparkles, Ticket } from 'lucide-react';

const API_BASE = 'http://localhost:4000/api/v1';

const checklist = ['Passport and visa copy', 'Hotel confirmation', 'Airport transfer details'];

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(null);
  const token = localStorage.getItem('token');
  const rawUser = localStorage.getItem('user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/bookings/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleCancel = async (bookingId) => {
    if (!token) return;
    setCanceling(bookingId);

    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Unable to cancel booking');
      }

      const data = await res.json();
      setBookings((current) => current.map((booking) => (booking._id === bookingId ? data.booking : booking)));
    } catch (error) {
      console.error(error);
      alert('Could not cancel the booking. Please try again.');
    } finally {
      setCanceling(null);
    }
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  const upcomingCount = bookings.filter((booking) => booking.status === 'Confirmed' || booking.status === 'Pending').length;
  const cancelledCount = bookings.filter((booking) => booking.status === 'Cancelled').length;
  const totalCount = bookings.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.3)] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">My travel dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Hello, {user?.username || user?.name || 'Traveler'}.</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                Everything about your upcoming journeys, confirmations, and travel essentials in one place.
              </p>
            </div>
            <Link to="/flight" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
              <Plane size={16} />
              Book another trip
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sky-600">
                <Ticket size={18} />
                <p className="text-sm font-medium">Upcoming trips</p>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-900">{upcomingCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <CalendarDays size={18} />
                <p className="text-sm font-medium">Total bookings</p>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-900">{totalCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-violet-600">
                <Compass size={18} />
                <p className="text-sm font-medium">Cancelled bookings</p>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-900">{cancelledCount}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
          <div className="space-y-4">
            {loading ? (
              <div className="rounded-[24px] border border-slate-200 bg-white p-8 text-center text-slate-500">Loading bookings...</div>
            ) : bookings.length > 0 ? bookings.map((booking) => {
              const badge = booking.status === 'Confirmed'
                ? 'bg-emerald-500/15 text-emerald-300'
                : booking.status === 'Pending'
                  ? 'bg-amber-500/15 text-amber-300'
                  : 'bg-rose-500/15 text-rose-300';

              return (
                <div key={booking._id} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sky-600">
                        <Sparkles size={16} />
                        <p className="text-sm font-semibold uppercase tracking-[0.24em]">{booking.tripType}</p>
                      </div>
                      <h2 className="mt-2 text-xl font-semibold text-slate-900">{booking.tripTitle}</h2>
                      <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2"><CalendarDays size={15} /> {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'TBD'} – {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'TBD'}</span>
                        <span className="inline-flex items-center gap-2"><MapPin size={15} /> {booking.destination || 'Unknown'}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <span className={`rounded-full px-3 py-1 text-sm font-medium ${badge}`}>{booking.status}</span>
                      <p className="text-sm font-semibold text-slate-900">${Number(booking.amount || 0).toLocaleString()}</p>
                      <button
                        type="button"
                        disabled={booking.status === 'Cancelled' || canceling === booking._id}
                        onClick={() => handleCancel(booking._id)}
                        className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
                      >
                        {canceling === booking._id ? 'Cancelling...' : booking.status === 'Cancelled' ? 'Cancelled' : 'Cancel booking'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                You do not have any bookings yet.
              </div>
            )}
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Travel checklist</h3>
            <p className="mt-2 text-sm text-slate-600">A polished check-in plan for your next getaway.</p>
            <ul className="mt-5 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Need help?</p>
              <p className="mt-1 text-sm text-slate-600">Our concierge team can help you adjust plans or add extras.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
