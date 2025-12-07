import React from "react";
import { Link } from "react-router-dom";

const ScooterList = ({ scooters }) => {
  return (
    <div className="w-full max-w-7xl mx-auto text-center">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Super Fast ⚡ Electric Scooty
      </h1>

      {/* Horizontal scroll list */}
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-6 pb-6">
        {scooters.map((scooter) => (
          <div
            key={scooter.id}
            className="min-w-[280px] bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between items-center transition-transform hover:scale-105 cursor-pointer"
          >
            {/* Main image */}
            <div className="relative flex justify-center">
              <img
                src={scooter.image}
                alt={scooter.name}
                className="w-[200px] h-[140px] object-contain"
              />
            </div>

            {/* Info */}
            <div className="mt-4 text-center">
              <h2 className="text-lg font-semibold">{scooter.name}</h2>
              <p className="text-gray-600 text-sm">{scooter.price}</p>
              <p className="text-gray-500 text-xs mt-1">{scooter.range}</p>
            </div>

            {/* Button */}
            <Link
              to={`/scooty/${scooter.id}`}
              className="mt-4 bg-green-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-600 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ScooterList;