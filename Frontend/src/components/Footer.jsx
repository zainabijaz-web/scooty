import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="
      bg-gradient-to-r from-[#111827]/90 to-[#1E3A8A]/90
      text-white py-8
    ">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* 1️⃣ Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-[#FF5A5F] mb-4">
            E-SCOOTY
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Revolutionizing the way you move — clean, fast, and futuristic.
            Experience the next generation of electric scooters today!
          </p>
        </div>

        {/* 2️⃣ Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#FF5A5F]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-200">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Models</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* 3️⃣ Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#FF5A5F]">
            Connect With Us
          </h3>
          <div className="flex justify-center md:justify-start space-x-5">
            <Facebook className="w-6 h-6 hover:text-[#FF5A5F] cursor-pointer transition" />
            <Instagram className="w-6 h-6 hover:text-[#FF5A5F] cursor-pointer transition" />
            <Twitter className="w-6 h-6 hover:text-[#FF5A5F] cursor-pointer transition" />
            <Mail className="w-6 h-6 hover:text-[#FF5A5F] cursor-pointer transition" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/30 mt-5 pt-4 text-center text-gray-200 text-sm">
        E-SCOOTY © {new Date().getFullYear()} All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;