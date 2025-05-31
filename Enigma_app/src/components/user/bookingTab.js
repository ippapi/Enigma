"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BookingActions from './bookingActions';

export default function BookingTab({ tab }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/booking/user?status=${tab}`);
      if (!res.ok) {
        if (res.status === 403) {
          router.push("/auth");
          return;
        }
        throw new Error('Failed to fetch bookings');
      }
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p className="text-center text-gray-400">Loading data ...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  return (
    <div className="p-4 space-y-6 text-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">Your booking history</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-400">You haven't made any bookings yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="bg-[#1f1b3a] bg-opacity-60 border border-gray-600 rounded-xl p-6 shadow-md"
            >
              <h3 className="text-l font-semibold">{booking.reader.name}</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-300">
                <p><span className="font-medium text-gray-400">Time:</span> {new Date(booking.time).toLocaleString()}</p>
                <p><span className="font-medium text-gray-400">Duration:</span> {booking.duration} minutes</p>
                <p><span className="font-medium text-gray-400">Notes:</span> {booking.notes}</p>
                <p><span className="font-medium text-gray-400">Status:</span> {booking.status}</p>

              </div>

              <div className="mt-4">
                <BookingActions tab={tab} booking={booking} onUpdate={fetchBookings} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
