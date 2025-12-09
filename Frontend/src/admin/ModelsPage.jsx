import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export default function ModelsPage() {
  const [models, setModels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newModel, setNewModel] = useState({ name: "", price: "", rangeKm: "", image: null });
  const [editModelId, setEditModelId] = useState(null); // ✅ Track edit mode
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/models`);
      setModels(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Failed to fetch models:", err);
      setModels([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewModel(prev => ({ ...prev, image: files[0] }));
    } else {
      setNewModel(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddOrEditModel = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", newModel.name);
      formData.append("price", newModel.price);
      formData.append("rangeKm", newModel.rangeKm);
      if (newModel.image) formData.append("image", newModel.image);

      let res;
      if (editModelId) {
        // Edit existing model
        res = await axios.put(`${BASE_URL}/api/models/${editModelId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setModels(prev => prev.map(m => (m._id === editModelId ? res.data.data : m)));
      } else {
        // Add new model
        res = await axios.post(`${BASE_URL}/api/models`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setModels(prev => [...prev, res.data.data]);
      }

      setNewModel({ name: "", price: "", rangeKm: "", image: null });
      setEditModelId(null);
      setShowModal(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to add/edit model. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (model) => {
    setNewModel({ name: model.name, price: model.price, rangeKm: model.rangeKm, image: null });
    setEditModelId(model._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this model?")) return;

  try {
    await axios.delete(`${BASE_URL}/api/models/${id}`);
    setModels(prev => prev.filter(m => m._id !== id));
  } catch (err) {
    console.error("Failed to delete model:", err);
    alert("Failed to delete model. Check console for details.");
  }
};


  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Scooty Models</h2>
        <button
          className="bg-[#FF5A5F] text-white px-4 py-2 rounded-md"
          onClick={() => {
            setNewModel({ name: "", price: "", rangeKm: "", image: null });
            setEditModelId(null);
            setShowModal(true);
          }}
        >
          Add Model
        </button>
      </div>

      {/* Models Table */}
      <div className="bg-white rounded-2xl shadow overflow-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Range (Km)</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m._id} className="border-b">
                <td className="px-6 py-4">{m.name}</td>
                <td className="px-6 py-4">${m.price}</td>
                <td className="px-6 py-4">{m.rangeKm}</td>
                <td className="px-6 py-4">
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="w-16 h-16 object-cover rounded" />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 mr-3" onClick={() => handleEditClick(m)}>
                    Edit
                  </button>
                  <button className="text-red-600" onClick={() => handleDelete(m._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Model Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96 relative">
            <h2 className="text-xl font-semibold mb-4">
              {editModelId ? "Edit Model" : "Add New Model"}
            </h2>

            {error && (
              <div className="mb-3 p-2 text-red-600 border border-red-300 rounded">{error}</div>
            )}

            <form onSubmit={handleAddOrEditModel} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Model Name"
                value={newModel.name}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newModel.price}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="rangeKm"
                placeholder="Range (Km)"
                value={newModel.rangeKm}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-2 mt-2">
                <button type="button" className="px-4 py-2 border rounded" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-[#FF5A5F] text-white rounded" disabled={loading}>
                  {loading ? "Saving..." : editModelId ? "Update Model" : "Add Model"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}