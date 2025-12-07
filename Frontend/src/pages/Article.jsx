import React from "react";
import { FaLeaf, FaBolt, FaUsers } from "react-icons/fa";

const Article = () => {
  return (
    <section className="px-6 md:px-20 py-24 bg-gradient-to-r from-blue-50 to-white text-gray-700">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E40AF] mb-16 text-center">
        Article - E-Scooty
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src="/images/about-scooter.png"
            alt="E-Scooty Scooter"
            className="rounded-2xl shadow-2xl w-full md:w-4/5 transition-transform hover:scale-105"
          />
        </div>

        {/* Right Content */}
        <div className="space-y-8">
          <p className="text-lg md:text-xl leading-relaxed text-gray-800">
            Welcome to <strong>E-Scooty</strong>, your ultimate destination for 
            modern, eco-friendly urban mobility. Founded in 2025, we are driven by a 
            vision to redefine city transportation, making it cleaner, smarter, and more enjoyable for everyone.
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-gray-800">
            At <strong>E-Scooty</strong>, we believe commuting should be effortless and sustainable. 
            Our electric scooters combine cutting-edge technology with sleek design, 
            offering you a ride that is not only stylish but also efficient and reliable. 
            Every journey with E-Scooty is a step towards a greener, healthier planet.
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-gray-800">
            Whether you are commuting to work, running errands, or exploring the city, 
            E-Scooty ensures a smooth, safe, and exciting experience. Join our community 
            of smart riders and embrace a future where mobility meets sustainability.
          </p>

          {/* Highlights Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <FaLeaf className="text-green-500 text-4xl mb-3" />
              <h4 className="font-bold text-lg mb-1">Eco-Friendly</h4>
              <p className="text-gray-500 text-center text-sm">
                Zero emissions, sustainable rides, and a cleaner environment for everyone.
              </p>
            </div>

            <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <FaBolt className="text-yellow-400 text-4xl mb-3" />
              <h4 className="font-bold text-lg mb-1">High Performance</h4>
              <p className="text-gray-500 text-center text-sm">
                Powerful motors and long-lasting batteries for seamless city travel.
              </p>
            </div>

            <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <FaUsers className="text-blue-500 text-4xl mb-3" />
              <h4 className="font-bold text-lg mb-1">Community Driven</h4>
              <p className="text-gray-500 text-center text-sm">
                Join a community of riders passionate about innovation and smart mobility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article;
