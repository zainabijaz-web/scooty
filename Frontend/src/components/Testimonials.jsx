import React from "react";
import { Star } from "lucide-react";

/**
 * IMPORTANT: These are sample/example testimonials for demo purposes only.
 * Replace with real customer quotes when available.
 */

const sampleReviews = [
  {
    id: 1,
    name: "Demo Rider",
    location: "London (sample)",
    rating: 5,
    text: "Smooth ride, great battery life and excellent customer support. (sample)",
  },
  {
    id: 2,
    name: "Test User",
    location: "Manchester (sample)",
    rating: 5,
    text: "Stylish design and very efficient for my daily commute. (sample)",
  },
  {
    id: 3,
    name: "Example Rider",
    location: "Birmingham (sample)",
    rating: 4,
    text: "Good build quality — perfect for city trips. (sample)",
  },
];

const Stars = ({ n }) => (
  <div className="flex items-center space-x-1">
    {Array.from({ length: n }).map((_, i) => (
      <Star key={i} className="w-4 h-4 text-yellow-400" />
    ))}
  </div>
);

const Testimonials = ({ reviews = sampleReviews }) => {
  return (
    <section className="py-16 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-[#1E40AF] mt-2">What Clients Say</h3>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Feedback from our happy customers who bought their scooties from us.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-lg">{r.name}</h4>
                  <p className="text-sm text-gray-400">{r.location}</p>
                </div>
                <Stars n={r.rating} />
              </div>

              <p className="text-gray-700 mt-4 text-sm leading-relaxed">“{r.text}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
