import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ------------------------------
  // FETCH USERS
  // ------------------------------
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      if (Array.isArray(res.data)) setUsers(res.data);
      else throw new Error("Invalid response format");
    } catch (err) {
      console.error(err); // Debug info
      setError("Failed to fetch users.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ------------------------------
  // VIEW USER
  // ------------------------------
  const handleView = (user) => {
    // Alert ke sath console log bhi
    console.log("View clicked:", user);
    alert(`Name: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}`);
  };

  // ------------------------------
  // DELETE USER
  // ------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      console.log(res.data); // Debug info
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err); // Debug info
      alert("Failed to delete user. Check backend route or CORS.");
    }
  };

  // ------------------------------
  // LOADING SCREEN
  // ------------------------------
  if (loading) return <div className="p-6 text-xl font-semibold">Loading...</div>;

  return (
    <div className="flex">
      <div className="flex-1 min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4">Users</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow overflow-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="border-b">
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.role}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-600 mr-3"
                        onClick={() => handleView(u)}
                      >
                        View
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(u._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}