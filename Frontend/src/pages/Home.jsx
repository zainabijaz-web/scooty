import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <section
        className="
    relative 
    min-h-[85vh] sm:min-h-[90vh] md:min-h-screen 
    flex items-center justify-center 
    overflow-hidden 
    bg-gradient-to-b from-[#111827] to-[#1E3A8A] 
    text-white
  "
      >
        {/* Big Background Text */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <h1
            className="
        text-[4.5rem] sm:text-[6rem] md:text-[9rem] lg:text-[15rem]
        font-black opacity-20 
        text-center w-full 
        absolute top-[22%] sm:top-[30%] left-1/2 
        -translate-x-1/2 -translate-y-1/2
      "
          >
            SCOOTY
          </h1>
        </div>

        {/* Scooty Image */}
        <div className="absolute z-10 top-8 sm:top-4 md:top-4 left-1/2 -translate-x-1/2 w-full flex justify-center">
          <img
            src="/images/herosection.png"
            className="
        w-[85%] 
        sm:w-[70%] md:w-[58%] drop-shadow-2xl"
            alt="Scooty"
          />
        </div>

        {/* Bottom Section */}
        <div
          className="
    absolute 
    bottom-1 sm:bottom-8 md:bottom-5 lg:bottom-6 xl:bottom-8
    left-4 right-4
    flex flex-col md:flex-row 
    justify-between 
    items-center
    gap-3 sm:gap-5 
    z-20
  "
        >
          {/* Button */}
          <Link
            to="/models"
            className="
      inline-flex items-center gap-2
      px-4 sm:px-6 md:px-4 lg:px-6 xl:px-8
      py-2 sm:py-3 md:py-2 lg:py-3 xl:py-4
      text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
      rounded-full bg-white text-[#111827] font-bold
      hover:bg-gray-100 shadow-xl hover:shadow-2xl
      transform hover:-translate-y-1 duration-300
    "
          >
            🛵 SHOP NOW
          </Link>

          {/* Stats Box */}
          <div
            className="
      bg-black/50 backdrop-blur-md rounded-xl
      p-2 sm:p-3 md:p-2 lg:p-4 xl:p-5
      border border-white/30 shadow-2xl
      text-center md:text-center
      
      w-[140px]      /* Mobile small */
      sm:w-[180px]   /* Tablet */
      md:w-auto      /* Desktop */
      lg:w-[220px]   /* Laptop */
      xl:w-[250px]   /* Large Laptop */
    "
          >
            <div className="text-md sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-bold">
              RS 155,000
            </div>

            <div className="text-white/80 text-[9px] sm:text-sm md:text-base lg:text-lg xl:text-xl mt-1">
              Starting Price
            </div>

            <div className="flex justify-center md:justify-end items-center gap-1 sm:gap-2 mt-1 md:mt-3">
              <span className="text-yellow-400 text-sm sm:text-lg lg:text-xl xl:text-xl">
                ⭐
              </span>
              <span className="font-semibold text-xs sm:text-base lg:text-lg xl:text-lg">
                4.8/5
              </span>
              <span className="text-white/70 text-[9px] sm:text-sm lg:text-base xl:text-base">
                (2K+ Reviews)
              </span>
            </div>
          </div>
          
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-10 sm:py-16 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Our <span className="text-blue-600">Premium</span> Benefits
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mt-2">
              Experience peace of mind with our comprehensive warranty & service
              packages.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🛡️",
                title: "2 Years Warranty",
                desc: "Complete vehicle protection",
                bgColor: "bg-blue-500",
              },
              {
                icon: "🔧",
                title: "Free Service",
                desc: "First 3 services complimentary",
                bgColor: "bg-green-500",
              },
              {
                icon: "⚡",
                title: "Battery Backup",
                desc: "5 years battery warranty",
                bgColor: "bg-orange-500",
              },
              {
                icon: "🚚",
                title: "Roadside Assist",
                desc: "24/7 emergency support",
                bgColor: "bg-purple-500",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                <div
                  className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section>
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[450px]">
          {/* Image */}
          <div className="bg-white flex items-center justify-center p-5 sm:p-8">
            <img
              src="/images/about-scooty.png"
              alt="About Scooty"
              className="w-full max-w-lg object-cover rounded-2xl"
            />
          </div>

          {/* Content */}
          <div className="bg-gradient-to-b from-[#111827] to-[#1E3A8A] text-white p-8 sm:p-12 flex flex-col justify-center">
            <div className="w-12 h-1 bg-white mb-4"></div>
            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6">
              ABOUT <br /> OUR <br /> COMPANY
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-md">
              We provide the best electric scooty experience with affordable
              pricing and high-tech features.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-10 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            We Ensure the Best Riding Experience
          </h2>
          <p className="text-gray-600 mt-2">
            Premium comfort, safety & smart technology.
          </p>

          <div className="max-w-xl mx-auto mt-6">
            <img
              src="/images/Scootydetails.png"
              className="w-full drop-shadow-lg"
              alt="Scooty Details"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
