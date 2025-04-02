"use client";
import { useEffect, useState } from "react";

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        fetch(`/api/payment?page=${page}&limit=${limit}`) // Fetch payments based on the current page and limit
            .then((res) => res.json())
            .then((data) => {
                setPayments(data.data); // Set the payment data
                setTotal(data.total || 0);
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, [page, limit]); // Fetch payments whenever the page changes

    const updateCartStatus = async (cartId, status) => {
        const res = await fetch("/api/payment", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cartId, // The associated cartId
                status, // Either "COMPLETED" or "CANCELED"
            }),
        });

        if (res.ok) {
            const updatedPayment = await res.json();
            setPayments(payments.map(payment =>
                payment.cart._id === updatedPayment.updatedCart._id ? updatedPayment : payment
            ));
        } else {
            console.error("Failed to update cart status");
        }
    };

    const goToNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Payment Management</h1>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2 w-1/4">User</th>
                            <th className="border p-2 w-1/6">Items</th>
                            <th className="border p-2 w-1/6">Total Qty</th>
                            <th className="border p-2 w-1/6">Status</th>
                            <th className="border p-2 w-1/3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.cart._id} className="border">
                                <td className="border p-2">{payment.cart.user || "Guest"}</td>
                                <td className="border p-2 text-center">{payment.cart.items.length} items</td>
                                <td className="border p-2 text-center">
                                    {payment.cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                                </td>
                                <td className="border p-2 text-center">{payment.cart.status}</td>
                                <td className="border p-2 flex space-x-2 justify-center">
                                    {payment.cart.status === "ORDERED" && (
                                        <>
                                            <button
                                                onClick={() => updateCartStatus(payment.cart._id, "COMPLETED")}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                                            >
                                                Mark as Completed
                                            </button>
                                            <button
                                                onClick={() => updateCartStatus(payment.cart._id, "CANCELED")}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                                            >
                                                Cancel Order
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Display current page and total pages */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="bg-gray-300 p-2 disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {page} of {total}</span>
                <button
                    disabled={page * limit >= total}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="bg-gray-300 p-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaymentManagement;
