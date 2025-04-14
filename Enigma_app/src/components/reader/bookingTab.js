"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BookingActions from '@/components/reader/bookingActions';

export default function BookingTab({tab}) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router= useRouter();

  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/booking/reader?status=${tab}`);
      if (!res.ok) {
        throw new Error('Failed to fetch bookings');
      }else if(res.status === 403){
        alert("Unauthorized or dont have permission")
        router.push("/auth")
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Những người đặt lịch với bạn</h1>

      {bookings.length === 0 ? (
        <p className="text-center">Bạn chưa có lịch đặt nào.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="border rounded p-4 space-y-2 shadow-sm">
              <h3 className="text-lg font-bold">{booking.user.name}</h3>
              <p><strong>Thời gian:</strong> {new Date(booking.time).toLocaleString()}</p>
              <p><strong>Thời gian kéo dài:</strong> {booking.duration} phút</p>
              <p><strong>Ghi chú:</strong> {booking.notes}</p>
              <p><strong>Trạng thái:</strong> {booking.status}</p>
              <BookingActions tab={tab} booking={booking} onUpdate={fetchBookings} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
