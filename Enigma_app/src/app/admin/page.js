"use client"

import { useState } from "react";
import Sidebar from "@/components/admin/sidebar";
import Dashboard from "@/components/admin/dashboard";
import OrderManagement from "@/components/admin/orderManagement";
import ProductManagement from "@/components/admin/productManagement";
import UserManagement from "@/components/admin/userManagement";
import Card from "@/components/admin/card";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && <Card><Dashboard /></Card>}
        {activeTab === "orders" && <Card><OrderManagement /></Card>}
        {activeTab === "products" && <Card><ProductManagement /></Card>}
        {activeTab === "users" && <Card><UserManagement /></Card>}
      </main>
    </div>
  );
}
