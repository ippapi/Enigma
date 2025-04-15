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
    <div className="border rounded p-4 space-y-3 shadow-sm relative bg-white">
      {reader.profilePicture && (
        <img
          src={reader.profilePicture}
          alt={`${reader.name} profile`}
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
      )}

      {!reader.profilePicture && (
        <img
          src={'/default-avatar.jpg'}
          alt={`${reader.name} profile`}
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
      )}

      <h3 className="text-lg font-bold text-center">{reader.name}</h3>
      <p className="text-sm text-gray-600 text-center">{reader.description}</p>

      {reader.bio && (
        <p className="text-xs text-gray-500 mt-2 italic text-center">{reader.bio}</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleOpen}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Đặt lịch
        </button>
      </div>

      {/* Modal */}
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
