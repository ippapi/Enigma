"use client";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetch("/api/cart?status=ACTIVE", {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error("Lỗi khi lấy giỏ hàng:", err));
  }, []);

  if (!cart) return <p>Đang tải giỏ hàng...</p>;

  if (!cart.items || cart.items.length === 0) {
    return <p>Giỏ hàng trống.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h1>
      <ul className="space-y-4">
        {cart.items.map((item, idx) => (
          <li key={idx} className="border p-4 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{item.product.name}</h2>
              <p>Số lượng: {item.quantity}</p>
              <p>Giá: {item.product.price.toLocaleString()} đ</p>
            </div>
            <img
              src={item.product.image || "/placeholder.jpg"}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
