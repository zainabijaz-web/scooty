import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {

  // ------------------------------
  //  STATES
  // ------------------------------
  const [users, setUsers] = useState([]);       // Backend se users store honge
  const [loading, setLoading] = useState(true); // Page load hone tak loading true
  const [error, setError] = useState(null);     // Error message store hogi


  // ------------------------------
  //  BACKEND SE USERS FETCH KARNA
  // ------------------------------
  useEffect(() => {
    axios.get("/api/users") // Backend API call
      .then(res => {
        
        // Agar backend se array aaye to users set karo
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          // Agar response wrong format ho tu error throw karo
          throw new Error("Invalid response format");
        }

      })
      .catch(() => {
        // Agar API na chale tu ye message show hoga
        setError("Failed to fetch users.");
        setUsers([]); // Dummy users add NHI kar rahe
      })
      .finally(() => setLoading(false)); // Loading false
  }, []);


  // ------------------------------
  //  LOADING SCREEN
  // ------------------------------
  if (loading) {
    return <div className="p-6 text-xl font-semibold">Loading...</div>;
  }


  // ------------------------------
  //  UI STARTS HERE
  // ------------------------------
  return (
    <div className="flex">

      {/* FULL PAGE CONTENT */}
      <div className="flex-1 min-h-screen p-6">

        {/* PAGE TITLE */}
        <h1 className="text-2xl font-bold mb-4">Users</h1>

        {/* ERROR MESSAGE BOX */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* USERS TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-auto">

          <table className="min-w-full divide-y">

            {/* TABLE HEADERS */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>

              {/* AGAR KOI USER NA HO */}
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (

                // USERS KO LOOP ME SHOW KARNA
                users.map(u => (
                  <tr key={u?._id} className="border-b">

                    <td className="px-6 py-4">{u?.name}</td>
                    <td className="px-6 py-4">{u?.email}</td>
                    <td className="px-6 py-4">{u?.role}</td>

                    {/* ACTION BUTTONS */}
                    <td className="px-6 py-4">
                      <button className="text-blue-600 mr-3">View</button>
                      <button className="text-red-600">Delete</button>
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