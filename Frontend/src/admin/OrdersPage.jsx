import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");

      // Ensure user and items exist
      const formattedOrders = res.data.map((o) => ({
        ...o,
        user: o.user?.name ? o.user : { name: o.user || "Unknown User" },
        items:
          o.items?.map((i) => ({
            name: i.name || i.product?.name || "Unnamed Item",
            qty: i.qty || 1,
          })) || [],
      }));

      setOrders(formattedOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Confirm order (admin action)
  const confirmOrder = async (id) => {
    try {
      const res = await axios.patch(`/api/orders/${id}/confirm`);
      setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)));
    } catch (err) {
      console.error("Failed to confirm order:", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow overflow-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>

        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Products</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id} className="border-b">
                  <td className="px-6 py-4">{o._id}</td>
                  <td className="px-6 py-4">{o.user?.name || "Unknown"}</td>
                  <td className="px-6 py-4">
                    {o.items?.map((i) => `${i.name} x${i.qty}`).join(", ")}
                  </td>
                  <td className="px-6 py-4 capitalize">{o.status}</td>
                  <td className="px-6 py-4">
                    {o.status.toLowerCase() !== "confirmed" && (
                      <button
                        onClick={() => confirmOrder(o._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
