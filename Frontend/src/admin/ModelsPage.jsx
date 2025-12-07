import React, { useEffect, useState } from "react";
import axios from "axios";

// ModelsPage with image upload support
export default function ModelsPage() {
const [models, setModels] = useState([]);
const [showModal, setShowModal] = useState(false);
const [newModel, setNewModel] = useState({ name: "", price: "", rangeKm: "", image: null });
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

useEffect(() => {
axios.get("/api/models")
.then(r => setModels(Array.isArray(r.data.data) ? r.data.data : []))
.catch(() => setModels([
{ _id: "1", name: "Scooty A", price: 1200, rangeKm: 60 },
{ _id: "2", name: "Scooty B", price: 1500, rangeKm: 75 },
]));
}, []);

const handleChange = (e) => {
const { name, value, files } = e.target;
if (name === "image") {
setNewModel(prev => ({ ...prev, image: files[0] }));
} else {
setNewModel(prev => ({ ...prev, [name]: value }));
}
};

const handleAddModel = async (e) => {
e.preventDefault();
setLoading(true);
setError("");

```
try {
  const formData = new FormData();
  formData.append("name", newModel.name);
  formData.append("price", newModel.price);
  formData.append("rangeKm", newModel.rangeKm);
  if (newModel.image) formData.append("image", newModel.image);

  const res = await axios.post("/api/models", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  setModels(prev => [...prev, res.data]);
  setNewModel({ name: "", price: "", rangeKm: "", image: null });
  setShowModal(false);
} catch (err) {
  setError("Failed to add model. Make sure image & data are correct.");
} finally {
  setLoading(false);
}
```

};

return ( <main className="p-6"> <div className="flex justify-between items-center mb-4"> <h2 className="text-xl font-semibold">Scooty Models</h2>
<button
className="bg-[#FF5A5F] text-white px-4 py-2 rounded-md"
onClick={() => setShowModal(true)}
>
Add Model </button> </div>

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
        {models.map(m => (
          <tr key={m._id} className="border-b">
            <td className="px-6 py-4">{m.name}</td>
            <td className="px-6 py-4">${m.price}</td>
            <td className="px-6 py-4">{m.rangeKm}</td>
            <td className="px-6 py-4">
              {m.image ? <img src={m.image} alt={m.name} className="w-16 h-16 object-cover rounded" /> : "-"}
            </td>
            <td className="px-6 py-4">
              <button className="text-blue-600 mr-3">Edit</button>
              <button className="text-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Add Model Modal */}
  {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-96 relative">
        <h2 className="text-xl font-semibold mb-4">Add New Model</h2>

        {error && (
          <div className="mb-3 p-2 text-red-600 border border-red-300 rounded">{error}</div>
        )}

        <form onSubmit={handleAddModel} className="flex flex-col gap-3">
          <input type="text" name="name" placeholder="Model Name" value={newModel.name} onChange={handleChange} required className="border px-3 py-2 rounded"/>
          <input type="number" name="price" placeholder="Price" value={newModel.price} onChange={handleChange} required className="border px-3 py-2 rounded"/>
          <input type="number" name="rangeKm" placeholder="Range (Km)" value={newModel.rangeKm} onChange={handleChange} required className="border px-3 py-2 rounded"/>
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="border px-3 py-2 rounded"/>

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" className="px-4 py-2 border rounded" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#FF5A5F] text-white rounded" disabled={loading}>
              {loading ? "Adding..." : "Add Model"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</main>


);
}
