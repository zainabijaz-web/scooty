import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const Cancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <XCircle className="w-20 h-20 mx-auto text-red-500" />
        <h1 className="text-3xl font-bold text-red-600 mt-6">
          Payment Cancelled ❌
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          It seems you canceled your payment. No worries!
        </p>

        <Link
          to="/cart"
          className="inline-block mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full transition"
        >
          Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
