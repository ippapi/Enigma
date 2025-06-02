"use client";
import { useEffect, useState } from "react";

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(9); 
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await fetch(`/api/payment?page=${page}&limit=${limit}`);
                const data = await res.json();

                const sortedPayments = (data.data || []).sort((a, b) => {
                    const aStatus = a.cartId?.status === "ORDERED" ? 0 : 1;
                    const bStatus = b.cartId?.status === "ORDERED" ? 0 : 1;
                    return aStatus - bStatus;
                });

                setPayments(sortedPayments);
                setTotalPages(data.pagination?.totalPages || 1);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchPayments();
    }, [page, limit]);


    const updateCartStatus = async (cartId, status) => {
        try {
            const res = await fetch("/api/payment", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartId, status }),
            });

            if (res.ok) {
                setPage(1); 
            } else {
                console.error("Failed to update cart status");
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    return (
        <div className="p-4 pt-2">
            <h1 className="text-xl font-semibold mb-4">Payment Management</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2 w-1/6">User</th>
                            <th className="border p-2 w-1/3">Items</th>
                            <th className="border p-2 w-1/12">Total</th>
                            <th className="border p-2 w-1/6">Phone</th>
                            <th className="border p-2 w-1/4">Address</th>
                            <th className="border p-2 w-1/4">Status</th>
                            <th className="border p-2 w-1/4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment) => {
                                const cart = payment.cartId;
                                if (!cart) return null;
                                const itemNames = cart.items
                                    .map(item => `${item.product?.name || "Unnamed"} x ${item.quantity}`)
                                    .join(", ");

                                return (
                                    <tr key={cart._id} className="border">
                                        <td className="border p-2 text-center">{cart.user?.name || "Guest"}</td>
                                        <td className="border p-2">{itemNames}</td>
                                        <td className="border p-2 text-center">{payment.totalPrice?.toFixed(2)} VND</td>
                                        <td className="border p-2">{payment.phone || "-"}</td>
                                        <td className="border p-2">{payment.address || "-"}</td>
                                        <td className="border p-2">{cart.status || "-"}</td>
                                        <td className="border p-2 flex space-x-2 justify-center">
                                            {cart.status === "ORDERED" && (
                                                <>
                                                    <button
                                                        onClick={() => updateCartStatus(cart._id, "COMPLETED")}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                                                    >
                                                        Hustle
                                                    </button>
                                                    <button
                                                        onClick={() => updateCartStatus(cart._id, "CANCELED")}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                                                    >
                                                        Scam
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center p-4">No payment records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className="bg-gray-300 p-2 disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(prev => prev + 1)}
                    className="bg-gray-300 p-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaymentManagement;
