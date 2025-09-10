import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Canceled</h1>
        <p className="text-gray-700 mb-6">
          Your payment was not completed. You can try again or continue shopping.
        </p>
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
        >
          Go Back to Shop
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
