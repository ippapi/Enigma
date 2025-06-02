import { Trash2 } from "lucide-react";
import { useState } from "react";
import PaymentFormModal from "../payment/paymentFormModel";

export default function CartItem({ data }) { 
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const cart = data.cart;
  const totalPrice = data.totalPrice;

  const handleRemoveItem = async (productId, quantity) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId, quantity: -quantity }),
    });

    const result = await res.json();
    if (res.ok) {
      window.location.reload();
    } else if (res.status === 403) {
      window.location.href = "/auth";
    } else {
      alert(`Error: ${result.message || result.error}`);
    }
  };

  const updateCartStatus = async (cartId, status) => {
    const res = await fetch("/api/payment", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cartId: cartId,
            status: status,
        }),
    });

    if (res.ok) {
        const updatedPayment = await res.json();
        setPayments(payments.map(payment =>
            payment._id === updatedPayment._id ? updatedPayment : payment
        ));
    } else {
        console.error("Failed to update cart status");
    }
};

  const handleCancelOrder = async (cartId) => {
    const res = await fetch("/api/cart", {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          cartId: cartId,
          status: "CANCELED",
      }),
    });

    const result = await res.json();
    if (res.ok) {
      window.location.reload();
    } else {
      alert(`Error: ${result.message || result.error}`);
    }
  };

  return (
    <div className="bg-[#1f1b3a] bg-opacity-60 border border-gray-600 rounded-xl p-6 shadow-md text-gray-300">
      <h3 className="text-l font-semibold mb-3">
        Order #{cart._id.slice(-6)}
      </h3>

      <ul className="space-y-4 text-sm">
        {cart.items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between gap-4 bg-[#1f1b3a] bg-opacity-60 p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <p className="font-semibold text-white">{item.product.name}</p>
                <p className="text-gray-400">Quantity: {item.quantity}</p>
                <p className="text-gray-400">Total: {item.quantity * item.product.price} VND</p>
              </div>
            </div>

            {cart.status === "ACTIVE" && (
              <button
                onClick={() => handleRemoveItem(item.product._id, item.quantity)}
                className="flex items-center gap-1 px-2 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white text-xs transition"
              >
                <Trash2 size={14} />
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-1 text-sm">
        <p>
          <span className="font-medium text-gray-400">Status:</span>{" "}
          <span className="uppercase text-blue-400">{cart.status}</span>
        </p>
        <p>
          <span className="font-medium text-gray-400">Total price:</span>{" "}
          <span className="text-green-400">{totalPrice} VND</span>
        </p>
      </div>

      {cart.status === "ACTIVE" && (
        <div className="mt-5">
          <button
            onClick={() => setShowPaymentModal(true)}
            className={`px-4 py-2 rounded-lg transition text-white ${
              totalPrice === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
            disabled = {totalPrice === 0}
          >
            Pay now
          </button>
        </div>
      )}

      {cart.status === "ORDERED" && (
        <div className="mt-5">
          <button
            onClick={() => handleCancelOrder(cart._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Cancel order
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
