"use client";

import { useEffect, useState } from "react";
import CartItem from "@/components/cart/cartItem";

export default function CartPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cart?status=ACTIVE", {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => {
        console.error("Lỗi khi lấy giỏ hàng:", err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải giỏ hàng...</p>;

  if (!data || !data.cart || !Array.isArray(data.cart.items) || data.cart.items.length === 0) {
    return <p>Giỏ hàng trống.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h1>
      <CartItem data={data} />
    </div>
  );
}
