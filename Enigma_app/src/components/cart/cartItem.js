"use client";

import { useState } from "react";
import PaymentFormModal from "../payment/paymentFormModel";

export default function CartItem({ data }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const cart = data.cart;
  const totalPrice = data.totalPrice;

  return (
    <div className="p-4 border rounded-lg shadow-sm mb-4">
      <h3 className="text-lg font-semibold mb-2">
        Đơn hàng #{cart._id.slice(-6)}
      </h3>

      <ul className="text-sm space-y-1">
        {cart.items.map((item, idx) => (
          <li key={idx}>
            {item.product.name} x {item.quantity}
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm">
        <strong>Trạng thái:</strong>{" "}
        <span className="uppercase text-blue-600">{cart.status}</span>
      </p>

      <p className="mt-3 text-sm">
        <strong>Tổng tiền:</strong>{" "}
        <span className="uppercase text-blue-600">{totalPrice}</span>
      </p>

      {cart.status === "ACTIVE" && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Thanh toán
          </button>
        </div>
      )}

      <PaymentFormModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        cartId={cart._id}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
}
