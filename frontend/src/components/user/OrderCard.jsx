import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition flex flex-col md:flex-row md:items-center md:justify-between">
      {/* Order Info */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800">
          Order <span className="text-gray-600">#{order._id}</span>
        </h3>
        <p className="text-sm text-gray-500 mt-1">Placed on {orderDate}</p>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => navigate(`/order/${order._id}`)}
        className="mt-3 md:mt-0 px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
      >
        View Details
      </button>
    </div>
  );
};

export default OrderCard;
