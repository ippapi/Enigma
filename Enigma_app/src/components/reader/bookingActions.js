'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingActions({ tab, booking, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      const res = await fetch('/api/booking/reader', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking._id,
          status: newStatus,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Lỗi: ${errorData.error}`);
      } else {
        onUpdate(); // refresh list
      }
    } catch (err) {
      alert('Có lỗi xảy ra khi cập nhật.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      {tab === "PENDING" && (
        <button
          disabled={loading}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => handleStatusChange("SCHEDULED")}
        >
          {loading ? "Đang xác nhận..." : "Xác nhận"}
        </button>
      )}

      {tab === "SCHEDULED" && (
        <>
          <button
            disabled={loading}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            onClick={() => handleStatusChange("COMPLETED")}
          >
            {loading ? "Đang hoàn tất..." : "Hoàn tất"}
          </button>

          <button
            disabled={loading}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => handleStatusChange("CANCELED")}
          >
            {loading ? "Đang huỷ..." : "Huỷ"}
          </button>
        </>
      )}

      {tab === "SCHEDULED" && booking.room && (
        <button
          className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
          onClick={() => router.push(`/room/${booking.room}`)}
        >
          Vào phòng
        </button>
      )}
    </div>
  );
}
