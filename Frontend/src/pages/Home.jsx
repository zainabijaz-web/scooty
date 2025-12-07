import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#111827] to-[#1E3A8A] text-white">

        {/* Big Background Text */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <h1 className="text-[10rem] lg:text-[15rem] font-black font-sans select-none opacity-20 text-center w-full whitespace-nowrap absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            SCOOTY
          </h1>
        </div>

        {/* Scooty Image Center */}
        <div className="absolute z-10 top-10 left-1/2 -translate-x-1/2 w-full flex justify-center">
          <img
            src="/images/herosection.png"
            className="w-[70%] max-w-xl drop-shadow-2xl"
            alt="Scooty"/>
        </div>

        {/* Bottom Content Text */}
        <div className="absolute bottom-20 left-4 right-4 flex justify-between items-end z-20">
          {/* Left Side - Button */}
          <div className="text-left ml-10">
            <Link
              to="/models"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg rounded-full bg-white text-[#111827] font-bold hover:bg-gray-100 transition-all shadow-2xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 duration-300">
              🛵 SHOP NOW
            </Link>
          </div>

          {/* Right Side - Stats */}
          <div className="text-right text-white mr-10">
            <div className="bg-black/50 backdrop-blur-md rounded-2xl p-5 border border-white/30 shadow-2xl">
              <div className="text-3xl font-bold text-white">RS 155,000</div>
              <div className="text-white/80 text-base mt-1">Starting Price</div>
              <div className="flex items-center justify-end gap-2 mt-3">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-lg">⭐</span>
                  <span className="text-white font-semibold">4.8/5</span>
                </div>
                <span className="text-white/70 text-sm">(2K+ Reviews)</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Warranty Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-blue-600">Premium</span> Benefits
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience peace of mind with our comprehensive warranty and service packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🛡️',
                title: '2 Years Warranty',
                desc: 'Complete vehicle protection',
                bgColor: 'bg-blue-500',
                delay: '100'
              },
              {
                icon: '🔧',
                title: 'Free Service',
                desc: 'First 3 services complimentary',
                bgColor: 'bg-green-500',
                delay: '200'
              },
              {
                icon: '⚡',
                title: 'Battery Backup',
                desc: '5 years battery warranty',
                bgColor: 'bg-orange-500',
                delay: '300'
              },
              {
                icon: '🚚',
                title: 'Roadside Assist',
                desc: '24/7 emergency support',
                bgColor: 'bg-purple-500',
                delay: '400'
              }
            ].map((item) => (
              <div
                key={item.title}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 ${item.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Animated Icon Container */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 ${item.bgColor} group-hover:w-full transition-all duration-500`}></div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full border border-blue-200">
              <span className="text-blue-600">📞</span>
              <p className="text-gray-700">
                Need help? <span className="text-blue-600 font-semibold">Call us at +91-XXXXX-XXXXX</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Company Section */}
<section >
  <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[500px]">
    
    {/* Left Side - Image */}
    <div className="bg-white flex items-center justify-center p-8">
      <img
        src="/images/about-scooty.png"
        alt="About Scooty Company"
        className="h-full max-h-[500px] w-full object-cover rounded-2xl"
      />
    </div>

    {/* Right Side - Content with Hero Gradient */}
    <div className="bg-gradient-to-b from-[#111827] to-[#1E3A8A] text-white p-12 flex flex-col justify-center">
      <div className="w-10 h-1 bg-white mb-4"></div>

      <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
        ABOUT <br />
        OUR <br />
        COMPANY
      </h2>

      <p className="text-gray-300 text-lg mb-8 max-w-md">
        We provide the best electric scooty experience with affordable pricing,
        comfortable rides, and high-tech features for every modern rider.
      </p>
    </div>
  </div>
</section>

      {/* Best Customer Experience Section */}
      <section className="py-5 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mt-3">We Ensure the Best Riding Experience</h2>
          <p className="text-gray-600 mt-3">Premium comfort, safety, and smart technology for every ride.</p>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <img src="/images/Scootydetails.png" className="w-full mx-auto drop-shadow-lg" alt="Scooty Details" />
        </div>
      </section>
    </div>
  );
};

export default Home;