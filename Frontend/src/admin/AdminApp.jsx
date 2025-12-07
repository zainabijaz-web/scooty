import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import DashboardPage from "./DashboardPage";
import ModelsPage from "./ModelsPage";
import UsersPage from "./UsersPage";
import OrdersPage from "./OrdersPage";

export default function AdminApp() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen">
        <AdminTopbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="models" element={<ModelsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="settings" element={<div className="p-6">Settings</div>} />
        </Routes>
      </div>
    </div>

  );
}