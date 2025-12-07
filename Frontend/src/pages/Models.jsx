import React from "react";
import { Link } from "react-router-dom";
import scooters from "../data/scooters"; // Import your dynamic data

const Models = () => {
  // Function to convert price to Pakistani Rupees
  const convertToPKR = (price) => {
    // Agar price string mein dollar format mein hai to convert karein
    if (typeof price === 'string' && price.includes('$')) {
      const dollarAmount = parseFloat(price.replace('$', '').replace(',', ''));
      const pkrAmount = dollarAmount * 280; // Approximate conversion rate
      return `Rs. ${pkrAmount.toLocaleString('en-PK')}`;
    }
    // Agar already number hai ya PKR format mein hai
    return price;
  };

  return (
    <div className="px-10 py-16 bg-gradient-to-b from-[#111827] to-[#1E3A8A] min-h-screen">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Our Latest Models
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {scooters.map((scooty) => (
          <div
            key={scooty.id}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:bg-white/20"
          >
            <img
              src={scooty.image}
              alt={scooty.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-white">{scooty.name}</h3>
            <p className="text-blue-200 font-bold text-lg">{convertToPKR(scooty.price)}</p>
            <p className="text-gray-300 text-sm mt-2">{scooty.type}</p>

            <Link
              to={`/details/${scooty.id}`}
              className="mt-4 inline-block bg-white hover:bg-gray-200 text-[#1E40AF] px-6 py-2 rounded-full transition-colors duration-200 font-semibold"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Models;