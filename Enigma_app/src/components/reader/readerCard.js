import { useState } from 'react';
import { CalendarClock, Heart } from 'lucide-react';

export default function ReaderCard({ reader, onBooking }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setTime('');
    setDuration('');
    setNotes('');
  };

  const handleConfirm = () => {
    if (!time || !duration) {
      alert('Vui lòng nhập thời gian và thời lượng!');
      return;
    }
    onBooking(reader._id, time, duration, notes);
    handleClose();
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl w-auto h-[450px] bg-black group text-white ml-2 mr-2">
      {/* Ảnh nền */}
      <img
        src={reader.profilePicture || '/default-avatar.jpg'}
        alt={reader.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Nút phóng to (giả lập) */}
      <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
        <svg
          className="w-3 h-3 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          style={{ transform: 'rotate(-30deg)' }}
        >
          <path d="M14 3l-1.41 1.41L18.17 10H4v2h14.17l-5.58 5.59L14 19l8-8z" />
        </svg>
      </div>

      {/* Nút like */}
      <button
        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transition-colors duration-200 hover:bg-gray-100"
        onClick={() => setIsLiked(!isLiked)}
      >
        <Heart
          className="w-5 h-5"
          fill={isLiked ? "#ef4444" : "white"}
          stroke={isLiked ? "#ef4444" : "#7c3aed"}
          strokeWidth={1.5}
        />
      </button>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-black/0 px-4 py-4 space-y-2">
        {/* Badges */}
        <div className="flex gap-2">
          <span className="bg-yellow-400 text-black text-[10px] font-semibold px-2 py-1 rounded-full">
            Pro Reader
          </span>
          <span className="bg-white text-black text-[10px] font-semibold px-2 py-1 rounded-full">
            Highly rated
          </span>
        </div>

        {/* Tên & mô tả */}
        <div>
          <h3 className="text-lg font-bold leading-tight">
            {reader.name || 'Phuong Vo Hoang Thao'}
          </h3>
          <p className="text-sm text-white opacity-90 mt-1 line-clamp-2">
            {reader.description || 'With her dynamic personality and attentive listening, she is loved by clients for her dedication, empathy, and accuracy.'}
          </p>
        </div>

        {/* Nút đặt lịch */}
        <div className="flex justify-end">
          <button
            onClick={handleOpen}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition duration-200"
          >
            Đặt lịch
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-black">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md space-y-4 shadow-2xl">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-purple-600" />
              Đặt lịch với {reader.name}
            </h2>

            <div>
              <label className="block text-sm font-medium">⏰ Thời gian bắt đầu</label>
              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">⏱️ Thời gian kéo dài (phút)</label>
              <input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">📝 Ghi chú</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
