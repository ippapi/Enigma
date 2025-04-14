'use client';

import { useState } from 'react';

export default function BookingActions({tab, booking, onUpdate }) {
  const [time, setTime] = useState(booking.time);
  const [duration, setDuration] = useState(booking.duration);
  const [loading, setLoading] = useState(false);

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
        alert(`Error: ${errorData.error}`);
      } else {
        onUpdate(); // Refresh booking list
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {(tab === "PENDING" || tab === "SCHEDULED") && (
        <div className="flex flex-col gap-2">
          <label className="text-sm">Thời gian:</label>
          <input
            type="datetime-local"
            className="border px-2 py-1 rounded"
            value={new Date(time).toISOString().slice(0, 16)}
            onChange={(e) => setTime(new Date(e.target.value).toISOString())}
          />
  
          <label className="text-sm">Thời lượng (phút):</label>
          <input
            type="number"
            min="1"
            className="border px-2 py-1 rounded"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
      )}
  
      <div className="flex gap-2 mt-2">
        {tab === "PENDING" && (
          <button
            disabled={loading}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => handleUpdate("CANCELED")}
          >
            {loading ? "Đang huỷ..." : "Huỷ"}
          </button>
        )}
  
        {tab === "SCHEDULED" && (
          <>
            <button
              disabled={loading}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={() => handleUpdate("COMPLETED")}
            >
              {loading ? "Đang cập nhật..." : "Hoàn thành"}
            </button>
            <button
              disabled={loading}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              onClick={() => handleUpdate("CANCELED")}
            >
              {loading ? "Đang cập nhật..." : "Huỷ"}
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
    </div>
  );  
}
