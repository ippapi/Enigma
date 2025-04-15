'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReaderCard from '@/components/reader/readerCard';
import React from "react";
import Header from "../../components/navBar";
import Footer from "../../components/footer";
import AnimatedWave from '../../components/wave/AnimatedWave';

export default function TarotBookingPage() {
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
    <div style={{ backgroundColor: '#581C87', color: 'white', borderRadius: '8px' }}>
      <Header />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-20 pb-0">
        <div className="w-full md:w-1/2 flex justify-center mt-5 relative">
          <div
            style={{
              width: '600px',
              height: '600px',
              backgroundImage: 'radial-gradient(circle, #F2569F 0%, rgba(242, 86, 159, 0.14) 50%, rgba(254, 180, 123, 0) 100%)',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src="images/Booking Reader/Pink Panther - Booking.png"
              alt="Pink Panther"
              className="w-[420px] h-[420px] object-cover mt-[50px]"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 text-right space-y-4 mr-[45px]">
          <h2
            className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-right"
            style={{
              backgroundImage: 'linear-gradient(-30deg, #00A1C7, #F5559E, #ED7D0C)',
              fontFamily: 'Anton, sans-serif',
            }}
          >
            BOOKING<br />TAROT READER
          </h2>

          <p className="text-lg text-gray-100 font-normal">Unlock the Mysteries, One Card at a Time.</p>
          <p className="text-base text-gray-300 font-thin">
            Our Tarot Booking feature allows you to connect with experienced tarot readers <br />for personalized guidance. <br />
            Whether you seek clarity on love, career, or life decisions, book a session with just a few clicks. Choose your reader, select a time that suits you, and gain insight into your future—all from the comfort of everywhere!
          </p>
          <button className="text-white px-4 py-2 rounded">BOOKING NOW!</button>
        </div>
      </div>
      <AnimatedWave />

      {/* Top Tarot Readers */}
      <div className="px-8 py-12" style={{ backgroundColor: '#38255E' }}>
        <h2
          className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-right"
          style={{
            backgroundImage: 'linear-gradient(150deg, #00A1C7, #F5559E, rgb(241, 197, 154))',
            fontFamily: 'Anton, sans-serif',
          }}
        >
          TOP TAROT READER
        </h2>
        <p className="text-sm text-gray-300 mb-6">Top Tarot Readers with the Highest Ratings and Reviews at Tarot Enigma.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-900 rounded-xl p-4 text-center">
            <div className="w-full h-40 bg-gray-400 mb-4 rounded">IMAGE</div>
            <h3 className="font-bold">TOP 2</h3>
            <p>Phong Vu Thanh</p>
          </div>
          <div className="bg-pink-500 rounded-xl p-4 text-center shadow-xl">
            <div className="w-full h-40 bg-gray-400 mb-4 rounded">IMAGE</div>
            <h3 className="font-bold text-white">TOP 1</h3>
            <p className="text-white">BB Cream</p>
          </div>
          <div className="bg-indigo-700 rounded-xl p-4 text-center">
            <div className="w-full h-40 bg-gray-400 mb-4 rounded">IMAGE</div>
            <h3 className="font-bold">TOP 3</h3>
            <p>Ice Cream Nun</p>
          </div>
        </div>
      </div>

      {/* Suggested Section */}
      <div className="px-8 py-12" style={{ backgroundImage: 'url("/images/Home/Background.png")', backgroundSize: 'cover' }}>
        <h2
          className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-right"
          style={{
            backgroundImage: 'linear-gradient(150deg, #00A1C7, #F5559E, rgb(241, 197, 154))',
            fontFamily: 'Anton, sans-serif',
          }}
        >
          SUGGESTED FOR YOU
        </h2>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {readers.map((reader) => (
              <ReaderCard key={reader._id} reader={reader} onBooking={handleBooking} />
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-6">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-4 py-2 bg-gray-200 rounded">Prev</button>
            <button onClick={() => setPage((p) => p + 1)} className="px-4 py-2 bg-gray-200 rounded">Next</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
