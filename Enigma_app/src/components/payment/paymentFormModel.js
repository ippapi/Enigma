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
        onSuccess?.(data);
        onClose();
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
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center rounded-2x1">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1b3a] border border-white/10 text-white w-[90%] max-w-md p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-white">📦 Xác nhận thanh toán</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-300">Địa chỉ nhận hàng</label>
          <input
            type="text"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            className="w-full rounded-md px-3 py-2 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập địa chỉ của bạn"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-300">Số điện thoại</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-md px-3 py-2 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ví dụ: 090xxxxxxx"
            required
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </div>
      </form>
    </div>
  );
}
