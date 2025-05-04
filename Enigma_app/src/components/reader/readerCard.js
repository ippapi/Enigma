import { useState } from 'react';

export default function ReaderCard({ reader, onBooking }) {
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
    <div className="border rounded-xl p-6 space-y-4 shadow-md relative bg-white w-64 text-center">
      {/* Badge "Highly rated" */}
      <div className="absolute top-4 left-4 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
        Highly rated
      </div>

      {/* Ảnh đại diện */}
      <div className="mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-purple-200">
        <img
          src={reader.profilePicture || '/default-avatar.jpg'}
          alt={`${reader.name} profile`}
          className="w-full h-full object-cover"
        />
      </div>
 
      {/* Tiêu đề "Pro Reader" */}
      <div className="text-xs font-semibold text-purple-600 tracking-wider">PRO READER</div>

      {/* Tên reader */}
      <h3 className="text-xl font-bold text-gray-800">{reader.name}</h3>

      {/* Mô tả */}
      <p className="text-sm text-gray-600 leading-snug">
        {reader.description || "With her dynamic personality and attentive listening, she is loved by clients for her dedication, empathy, and accuracy."}
      </p>

      {/* Nút đặt lịch */}
      <button
        onClick={handleOpen}
        className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Đặt lịch
      </button>

      {/* Modal đặt lịch (giữ nguyên) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold">Đặt lịch với {reader.name}</h2>

            <div>
              <label className="block text-sm font-medium">⏰ Thời gian bắt đầu</label>
              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">⏱️ Thời gian kéo dài (phút)</label>
              <input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">📝 Ghi chú</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded border border-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
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