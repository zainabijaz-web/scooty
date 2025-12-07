import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/bookings")
      .then(r => {
        const data = Array.isArray(r.data) ? r.data : r.data.orders;
        setOrders(data || []);
      })
      .catch(() => setOrders([
        { _id: "o1", user: { name: "Ali" }, model: { name: "Scooty A" }, status: "pending" },
        { _id: "o2", user: { name: "Zain" }, model: { name: "Scooty B" }, status: "confirmed" },
      ]));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow overflow-auto p-4">
        <h1 className="text-2xl font-bold mb-5">Orders</h1>

        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Model</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(o => (
              <tr key={o._id} className="border-b">
                <td className="px-6 py-4">{o._id}</td>
                <td className="px-6 py-4">{o.user?.name}</td>
                <td className="px-6 py-4">{o.model?.name}</td>
                <td className="px-6 py-4 capitalize">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}