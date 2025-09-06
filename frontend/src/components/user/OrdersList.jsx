import React from "react";
import OrderCard from "./OrderCard";

const OrdersList = ({ orders, loading }) => {
  return (
    <div className="md:col-span-2">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Your Orders
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersList;
