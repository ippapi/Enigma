"use client";

import { useEffect, useState } from 'react';
import CartItem from './cartItem';

export default function BookingTab({ tab }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/cart?status=${tab}`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => {
        console.error("Lỗi khi lấy giỏ hàng:", err);
        setError("Không thể tải dữ liệu.");
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [tab]);

  if (loading) return <p className="text-center text-gray-400">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-400">Lỗi: {error}</p>;

  const isEmpty = !data || data.carts?.length === 0;

  return (
    <div className="p-4 space-y-6 text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-4">
        {tab === "ACTIVE" && "🛒 Giỏ hàng của bạn"}
        {tab === "ORDERED" && "📦 Đơn hàng đã đặt"}
        {tab === "COMPLETED" && "✅ Đơn hàng đã hoàn tất"}
        {tab === "CANCELED" && "❌ Đơn hàng đã huỷ"}
      </h1>
  
      {isEmpty ? (
        <p className="text-center text-gray-400">Bạn chưa có đơn hàng nào.</p>
      ) : tab === "ACTIVE" ? (
        <CartItem data={data} />
      ) : (
        <div className="space-y-4">
          {data.carts?.map((cart, idx) => {
            const totalPrice = cart.items.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            );
            const cart_data = {cart: cart, totalPrice: totalPrice};
            return <CartItem key={cart._id || idx} data={cart_data} />
          })}
        </div>
      )}
    </div>
  );
}
