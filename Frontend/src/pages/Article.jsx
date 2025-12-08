import React from "react";
import { FaBatteryFull, FaChargingStation, FaMobileAlt, FaShieldAlt } from "react-icons/fa";

const Article = () => {
  return (
    <section className="px-6 md:px-20 py-24 bg-white">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16">
        Why Choose <span className="text-blue-600">E-Scooty?</span>
      </h2>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">

        <div className="bg-blue-50 p-8 rounded-2xl shadow hover:shadow-xl transition text-center">
          <FaBatteryFull className="text-blue-600 text-4xl mx-auto mb-3" />
          <h4 className="font-bold mb-2 text-gray-900">Long Battery</h4>
          <p className="text-sm text-gray-600">Up to 90km range on a single charge.</p>
        </div>

        <div className="bg-blue-50 p-8 rounded-2xl shadow hover:shadow-xl transition text-center">
          <FaChargingStation className="text-blue-600 text-4xl mx-auto mb-3" />
          <h4 className="font-bold mb-2 text-gray-900">Fast Charging</h4>
          <p className="text-sm text-gray-600">Full charge in just 3 hours.</p>
        </div>

        <div className="bg-blue-50 p-8 rounded-2xl shadow hover:shadow-xl transition text-center">
          <FaMobileAlt className="text-blue-600 text-4xl mx-auto mb-3" />
          <h4 className="font-bold mb-2 text-gray-900">Smart App</h4>
          <p className="text-sm text-gray-600">Track speed, battery & location.</p>
        </div>

        <div className="bg-blue-50 p-8 rounded-2xl shadow hover:shadow-xl transition text-center">
          <FaShieldAlt className="text-blue-600 text-4xl mx-auto mb-3" />
          <h4 className="font-bold mb-2 text-gray-900">Premium Safety</h4>
          <p className="text-sm text-gray-600">ABS brakes & anti-skid tyres.</p>
        </div>

      </div>
    </section>
  );
};

export default Article;