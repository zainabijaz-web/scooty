import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Backend URL

export default function ScootyDetails() {
  const { id } = useParams(); // backend _id
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [scooty, setScooty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/models/${id}`)
      .then((res) => {
        if (res.data) {
          const model = res.data;
          // Fix image path
          model.image = model.image || "/images/default.png";
          setScooty(model);
        } else {
          setScooty(null);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch model:", err);
        setScooty(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    if (!user) {
      navigate("/login", { state: { msg: "login_required" } });
      return;
    }
    dispatch(
      addToCart({
        id: scooty._id,
        name: scooty.name,
        price: scooty.price,
        image: scooty.image,
        qty: 1,
      })
    );
    alert("Added to Cart!");
  };

  if (loading)
    return (
      <div className="text-center py-20 text-white text-xl">Loading...</div>
    );
  if (!scooty)
    return (
      <div className="text-center py-20 text-white text-xl">
        Scooter not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#1E3A8A] text-white p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 py-8">
        {/* Left Side - Image */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <img
            src={scooty.image}
            className="w-full h-96 object-contain rounded-lg"
            alt={scooty.name}
          />
        </div>

        {/* Right Side - Details */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-4">{scooty.name}</h1>
          <p className="text-2xl text-blue-300 font-bold mb-6">
            {scooty.price}
          </p>

          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            {scooty.description || "No description available."}
          </p>

          {/* Specifications */}
          <div className="space-y-3 mb-8">
            {scooty.rangeKm && (
              <div className="flex items-center gap-3">
                <span className="text-blue-400">📊</span>
                <span className="text-gray-300">
                  {scooty.rangeKm} km per charge
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-white text-[#1E40AF] rounded-full hover:bg-gray-200 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              Add to Cart
            </button>

            <Link
              to="/models"
              className="px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold"
            >
              Back to Models
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
