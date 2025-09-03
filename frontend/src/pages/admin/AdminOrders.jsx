import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/data`
      );
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to fetch Orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex mt-20">
      <div className="flex-1">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800"> Orders</h2>

          {loading && <p className="text-gray-600">Loading Orders...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Order ID</th>
                    <th className="px-4 py-3 text-left">User ID</th>
                    <th className="px-4 py-3 text-left">Total</th>
                    <th className="px-4 py-3 text-left">Items</th>
                    <th className="px-4 py-3 text-left">Shipping Info</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={order._id || index}
                      
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-mono text-sm text-gray-700">
                        {order._id}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {order.userId}
                      </td>
                      <td className="px-4 py-3">
                        <span className=" text-green-700 text-sm px-2 py-1 rounded-lg">
                          Rs. {order.total}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ul className="space-y-1">
                          {order.items.map((item, i) => (
                            <li
                              key={i}
                              className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-md"
                            >
                              {item.productId?.name || "Deleted Product"}{" "}
                              <span className="text-gray-500">
                                (x{item.quantity})
                              </span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs break-words">
                        <div className="font-semibold">
                          {order.shippingInfo.fullName}
                        </div>
                        <div>{order.shippingInfo.address}</div>
                        <div className="text-gray-500">
                           {order.shippingInfo.phone}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
