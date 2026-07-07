import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Clock } from 'lucide-react';

const API_BASE = 'http://localhost:4000/api/v1';

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking || null;

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState('');

  const amount = booking ? Number(booking.amount || booking.totalAmount || 0) : 0;

  const handlePay = async () => {
    if (!booking) return;
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/bookings/cbooking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tripTitle: booking.tripTitle,
          tripType: booking.tripType,
          destination: booking.destination,
          startDate: booking.startDate,
          endDate: booking.endDate,
          totalAmount: amount,
          currency: booking.currency || 'NPR',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message || 'Could not create booking');
      }

      setPaid(true);
      setTimeout(() => navigate('/my-bookings'), 1400);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-lg rounded-lg bg-white p-8 shadow">
          <h2 className="text-lg font-semibold text-slate-800">No booking selected</h2>
          <p className="mt-3 text-sm text-slate-600">Please start a booking from flight or stay pages.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-sky-50 p-3 text-sky-600">
                <CreditCard />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Payment</h3>
                <p className="text-sm text-slate-600">Complete your payment to confirm the booking.</p>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm text-slate-700">Name on card</label>
              <input value={cardName} onChange={(e) => setCardName(e.target.value)} className="mt-2 w-full rounded border border-slate-200 p-2" />

              <label className="mt-4 block text-sm text-slate-700">Card number</label>
              <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="mt-2 w-full rounded border border-slate-200 p-2" />

              <div className="mt-4 flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm text-slate-700">Expiry</label>
                  <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className="mt-2 w-full rounded border border-slate-200 p-2" />
                </div>
                <div className="w-28">
                  <label className="block text-sm text-slate-700">CVC</label>
                  <input value={cvc} onChange={(e) => setCvc(e.target.value)} className="mt-2 w-full rounded border border-slate-200 p-2" />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="text-xl font-semibold text-slate-900">${amount.toLocaleString()}</p>
                </div>
                <div className="space-y-2 text-right">
                  {error ? <p className="text-sm text-rose-500">{error}</p> : null}
                  <button disabled={processing || paid} onClick={handlePay} className="inline-flex items-center gap-2 rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-500">
                    {processing ? (
                      <><Clock className="animate-spin" /> Processing</>
                    ) : paid ? (
                      <><CheckCircle /> Paid</>
                    ) : (
                      'Pay now'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-lg bg-white p-6 shadow">
            <h4 className="text-sm font-semibold text-slate-900">Booking summary</h4>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Trip</p>
                <p className="font-medium text-slate-900">{booking.tripTitle}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Type</p>
                <p className="font-medium text-slate-900">{booking.tripType}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Dates</p>
                <p className="font-medium text-slate-900">{new Date(booking.startDate).toLocaleDateString()} — {new Date(booking.endDate).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Destination</p>
                <p className="font-medium text-slate-900">{booking.destination}</p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">Total</p>
                  <p className="text-lg font-semibold text-slate-900">${amount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
