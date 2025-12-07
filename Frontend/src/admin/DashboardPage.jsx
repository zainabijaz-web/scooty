import React, { useEffect, useState } from "react";
import axios from "axios";

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    models: 0,
    bookings: 0,
    revenue: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [u, m, b] = await Promise.all([
          axios.get("/api/users/count"),
          axios.get("/api/models/count"),
          axios.get("/api/bookings/count"),
        ]);
        setStats({
          users: u.data.count || 0,
          models: m.data.count || 0,
          bookings: b.data.count || 0,
          revenue: 0,
        });
      } catch (err) {
        // fallback to sample data
        setStats({ users: 128, models: 12, bookings: 48, revenue: 5400 });
      }
    }
    loadStats();
  }, []);

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Users" value={stats.users} subtitle="Registered users" />
        <StatCard title="Total Models" value={stats.models} subtitle="Scooty models" />
        <StatCard title="Bookings" value={stats.bookings} subtitle="Active bookings" />
        <StatCard title="Revenue" value={`$${stats.revenue}`} subtitle="This month" />
      </div>

      <section className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
        <div className="text-sm text-gray-500">(Table placeholder — implement API listing)</div>
      </section>
    </main>
  );
}