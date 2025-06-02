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

