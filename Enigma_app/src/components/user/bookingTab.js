"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BookingActions from './bookingActions';

export default function BookingTab({tab}) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // ✅ Tách ra thành hàm riêng
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

  // ✅ Gọi trong useEffect
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
      <h1 className="text-2xl font-bold text-center">Lịch sử đặt lịch của bạn</h1>

      {bookings.length === 0 ? (
        <p className="text-center">Bạn chưa đặt lịch nào.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="border rounded p-4 space-y-2 shadow-sm">
              <h3 className="text-lg font-bold">Reader name: {booking.reader.name}</h3>
              <p><strong>Thời gian:</strong> {new Date(booking.time).toLocaleString()}</p>
              <p><strong>Thời gian kéo dài:</strong> {booking.duration} phút</p>
              <p><strong>Ghi chú:</strong> {booking.notes}</p>
              <p><strong>Trạng thái:</strong> {booking.status}</p>

              {/* ✅ Truyền xuống mỗi booking */}
              <BookingActions tab={tab} booking={booking} onUpdate={fetchBookings} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
