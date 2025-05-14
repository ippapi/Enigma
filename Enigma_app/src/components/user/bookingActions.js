'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingActions({ tab, booking, onUpdate }) {
  const [time, setTime] = useState(booking.time);
  const [duration, setDuration] = useState(booking.duration);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (newStatus = booking.status) => {
    setLoading(true);
    try {
      const res = await fetch('/api/booking/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking._id,
          status: newStatus,
          time,
          duration,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Lỗi: ${errorData.error}`);
      } else {
        onUpdate();
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {(tab === "PENDING" || tab === "SCHEDULED") && (
        <div className="flex flex-col gap-2 text-sm text-gray-300">
          <label className="text-gray-400">📅 Thời gian:</label>
          <input
            type="datetime-local"
            className="bg-[#2e2b45] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={new Date(time).toISOString().slice(0, 16)}
            onChange={(e) => setTime(new Date(e.target.value).toISOString())}
          />

          <label className="text-gray-400">⏳ Thời lượng (phút):</label>
          <input
            type="number"
            min="1"
            className="bg-[#2e2b45] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {tab === "PENDING" && (
          <button
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded shadow-sm"
            onClick={() => handleUpdate("CANCELED")}
          >
            {loading ? "Đang huỷ..." : "Huỷ lịch"}
          </button>
        )}

        {tab === "SCHEDULED" && (
          <>
            <button
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded shadow-sm"
              onClick={() => handleUpdate("COMPLETED")}
            >
              {loading ? "Đang cập nhật..." : "Hoàn thành"}
            </button>
            <button
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white px-4 py-2 rounded shadow-sm"
              onClick={() => handleUpdate("CANCELED")}
            >
              {loading ? "Đang cập nhật..." : "Huỷ lịch"}
            </button>
          </>
        )}

        {tab === "SCHEDULED" && booking.room && (
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow-sm"
            onClick={() => router.push(`/room/${booking.room}`)}
          >
            🔮 Vào phòng
          </button>
        )}
      </div>
    </div>
  );
}
