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
    <div className="flex min-h-screen mt-20 mb-10">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <main className="flex-1 py-6 px-6 me-4 bg-white rounded-xl shadow-lg backdrop-blur-sm">
        {activeTab === "dashboard" && <Card className="bg-inherit shadow-none"><Dashboard /></Card>}
        {activeTab === "orders" && <Card className="bg-inherit shadow-none"><OrderManagement /></Card>}
        {activeTab === "products" && <Card className="bg-inherit shadow-none"><ProductManagement /></Card>}
        {activeTab === "users" && <Card className="bg-inherit shadow-none"><UserManagement /></Card>}
      </main>
    </div>
  );
}
