'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReaderCard from '@/components/reader/readerCard';

export default function ShopPage() {
  const [readers, setReaders] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/booking?page=${page}&limit=6`)
      .then((res) => res.json())
      .then((data) => setReaders(data.readers || []));
  }, [page]);

  const handleBooking = async (readerId, time, duration, notes) => {
    const res = await fetch('/api/booking/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ reader: readerId, time, duration, notes }),
    });

    const result = await res.json();
    if (res.ok) {
      alert('Đặt lịch thành công! Vui lòng chờ reader xác nhận.');
    } else if (res.status === 403) {
      router.push('/auth');
    } else {
      alert(`Lỗi: ${result.message || result.error}`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Reader</h1>

      <h2 className="text-xl font-semibold">Suggested For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {readers.map((reader) => (
          <ReaderCard
            key={reader._id}
            reader={reader}
            onBooking={handleBooking}
          />
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Prev
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
