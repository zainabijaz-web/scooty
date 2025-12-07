import React from "react";
import { Home, Box, Users, ShoppingCart, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/admin", label: "Overview", icon: <Home className="w-5 h-5" /> },
  { to: "/admin/models", label: "Models", icon: <Box className="w-5 h-5" /> },
  { to: "/admin/orders", label: "Orders", icon: <ShoppingCart className="w-5 h-5" /> },
  { to: "/admin/users", label: "Users", icon: <Users className="w-5 h-5" /> },
  { to: "/admin/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#1E40AF]">Scooty Admin</h2>
      </div>

      <nav className="px-4 py-6 flex flex-col gap-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 ${
                isActive ? "bg-[#F3F4F6] font-semibold" : "text-gray-700"
              }`
            }
          >
            {it.icon}
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-6">
        <button className="w-full flex items-center gap-3 px-4 py-2 border rounded-md hover:bg-gray-50 text-red-600">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}