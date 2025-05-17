// "use client";

// import { useEffect, useState } from "react";
// import CartItem from "@/components/cart/cartItem";

// export default function CartPage() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/cart?status=ACTIVE", {
//       method: "GET",
//       credentials: "include",
//     })
//       .then(res => res.json())
//       .then(data => setData(data))
//       .catch(err => {
//         console.error("Lỗi khi lấy giỏ hàng:", err);
//         setData(null);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <p>Đang tải giỏ hàng...</p>;

//   if (!data || !data.cart || !Array.isArray(data.cart.items) || data.cart.items.length === 0) {
//     return <p>Giỏ hàng trống.</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h1>
//       <CartItem data={data} />
//     </div>
//   );
// }

"use client"

import { useState } from "react";
import Sidebar from "@/components/cart/sidebar";
import CartTab from "@/components/cart/cartTab";
import Card from "@/components/admin/card";

export default function CartPage() {
  const [activeTab, setActiveTab] = useState("ACTIVE");

  return (
    <div className="flex h-screen mt-20 mb-10">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <main className="flex-1 py-6 px-6 me-4 bg-gradient-to-b from-[#3d2560]/50 to-[#2a204e]/50 text-gray-200 rounded-xl shadow-lg backdrop-blur-sm">
        {activeTab === "ACTIVE" && <Card className="bg-inherit shadow-none"><CartTab tab={activeTab} /></Card>}
        {activeTab === "ORDERED" && <Card className="bg-inherit shadow-none"><CartTab tab={activeTab} /></Card>}
        {activeTab === "COMPLETED" && <Card className="bg-inherit shadow-none"><CartTab tab={activeTab} /></Card>}
        {activeTab === "CANCELED" && <Card className="bg-inherit shadow-none"><CartTab tab={activeTab} /></Card>}
      </main>
    </div>
  );
}

