"use client"

import { useState } from "react";
import Sidebar from "@/components/booking/sidebar";
import BookingTab from "@/components/reader/bookingTab";
import Card from "@/components/admin/card";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("SCHEDULED");

  return (
    <div className="flex h-screen mt-20 mb-10">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <main className="flex-1 py-6 px-6 me-4 bg-gradient-to-b from-[#3d2560]/50 to-[#2a204e]/50 text-gray-200 rounded-xl shadow-lg backdrop-blur-sm">
        {activeTab === "PENDING" && <Card className="bg-inherit shadow-none"><BookingTab tab={activeTab} /></Card>}
        {activeTab === "SCHEDULED" && <Card className="bg-inherit shadow-none"><BookingTab tab={activeTab} /></Card>}
        {activeTab === "COMPLETED" && <Card className="bg-inherit shadow-none"><BookingTab tab={activeTab} /></Card>}
        {activeTab === "CANCELED" && <Card className="bg-inherit shadow-none"><BookingTab tab={activeTab} /></Card>}
      </main>
    </div>
  );
}
