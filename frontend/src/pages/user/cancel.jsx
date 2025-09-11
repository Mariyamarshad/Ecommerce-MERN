import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-sm rounded-lg p-6 max-w-sm w-full text-center border border-gray-100">
        {/* Icon */}
        <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />

        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-800 mb-1">
          Payment Cancelled
        </h1>

        {/* Message */}
        <p className="text-sm text-gray-500 mb-4">
          Your payment was not completed.  
          You can try again anytime.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block bg-red-500 text-white text-sm font-medium py-2 px-5 rounded-md hover:bg-red-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
