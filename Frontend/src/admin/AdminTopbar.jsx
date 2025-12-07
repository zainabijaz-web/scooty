import React from "react";
import { Bell } from "lucide-react";

export default function AdminTopbar({ title = "Dashboard" }) {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 border-b">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-md hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">3</span>
        </button>

        {/* Avatar uses your uploaded image path */}
        <img
          src="/mnt/data/82bd0769-3875-4900-bbfc-50a52b36d9e6.png"
          alt="admin avatar"
          className="w-10 h-10 rounded-full object-cover border"
        />
      </div>
    </header>
  );
}