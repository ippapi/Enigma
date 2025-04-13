"use client";

import { useState } from "react";

export default function PaymentFormModal({ isOpen, onClose, cartId, onSuccess }) {
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addr, cartId, phone }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        onSuccess?.(data); // Callback update UI
        onClose();         // Close modal
      } else {
        alert(data.error || "Failed to make payment.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Xác nhận thanh toán</h2>
        <div className="mb-3">
          <label className="block text-sm font-medium">Địa chỉ</label>
          <input
            type="text"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Số điện thoại</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </div>
      </form>
    </div>
  );
}