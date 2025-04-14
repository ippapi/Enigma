"use client"

import { useState } from "react";
import Sidebar from "@/components/booking/sidebar";
import BookingTab from "@/components/user/bookingTab";
import Card from "@/components/admin/card";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("SCHEDULED");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <main className="flex-1 p-6">
        {activeTab === "PENDING" && <Card><BookingTab tab={activeTab} /></Card>}
        {activeTab === "SCHEDULED" && <Card><BookingTab tab={activeTab} /></Card>}
        {activeTab === "COMPLETED" && <Card><BookingTab tab={activeTab} /></Card>}
        {activeTab === "CANCELED" && <Card><BookingTab tab={activeTab} /></Card>}
      </main>
    </div>
  );
}
