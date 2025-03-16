"use client"

import { useState } from "react";
import Sidebar from "@/components/admin/sidebar";
import { Dashboard } from "@/components/admin/dashboard";
// import { Products } from "@/components/admin/products";
// import { Users } from "@/components/admin/users";
import Card from "@/components/admin/card";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && <Card><Dashboard /></Card>}
        {activeTab === "products" && <Card><Products /></Card>}
        {activeTab === "users" && <Card><Users /></Card>}
      </main>
    </div>
  );
}
