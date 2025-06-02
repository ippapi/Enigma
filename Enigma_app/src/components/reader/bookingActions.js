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
        alert(`Error: ${errorData.error}`);
      } else {
        onUpdate(); 
      }
    } catch (err) {
      alert('An error occurred while updating.');
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
          {loading ? "Confirming..." : "Confirm"}
        </button>
      )}

      {tab === "SCHEDULED" && (
        <>
          <button
            disabled={loading}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            onClick={() => handleStatusChange("COMPLETED")}
          >
            {loading ? "Completing..." : "Completed"}
          </button>

          <button
            disabled={loading}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => handleStatusChange("CANCELED")}
          >
            {loading ? "Canceling..." : "Canceled"}
          </button>
        </>
      )}

      {tab === "SCHEDULED" && booking.room && (
        <button
          className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
          onClick={() => router.push(`/room/${booking.room}`)}
        >
          Enter chat room
        </button>
      )}
    </div>
  );
}
