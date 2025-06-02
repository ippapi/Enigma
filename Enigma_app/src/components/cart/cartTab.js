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
        console.error("Error fetching cart:", err);
        setError("Unable to load data.");
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [tab]);

  if (loading) return <p className="text-center text-gray-400">Loading data...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  const isEmpty = !data || data.carts?.length === 0;

  return (
    <div className="p-4 pt-0 text-gray-100">
      <h1 className="text-xl font-bold text-center mb-4">
        {tab === "ACTIVE" && "Your cart"}
        {tab === "ORDERED" && "Placed orders"} 
        {tab === "COMPLETED" && "Completed orders"}
        {tab === "CANCELED" && "Cancelled orders"}
      </h1>

      <div className="rounded-lg p-4 h-[500px] overflow-y-auto space-y-4">
        {isEmpty ? (
          <p className="text-center text-gray-400">You don’t have any orders yet.</p>
        ) : tab === "ACTIVE" ? (
          <CartItem data={data} />
        ) : (
          data.carts?.map((cart, idx) => {
            const totalPrice = cart.items.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            );
            const cart_data = { cart, totalPrice };
            return <CartItem key={cart._id || idx} data={cart_data} />
          })
        )}
      </div>
    </div>
  );
}
