import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <CheckCircle className="w-20 h-20 mx-auto text-green-600" />
        <h1 className="text-3xl font-bold text-[#1E40AF] mt-6">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Thanks for your purchase! Your order has been confirmed.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-[#1E40AF] hover:bg-[#2E4A9E] text-white px-8 py-3 rounded-full transition"
        >
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
