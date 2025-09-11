import React, { useState, useEffect } from "react";
import axios from "axios";
import { Package, Truck, CheckCircle2, Clock, XCircle } from "lucide-react"; 
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/data`);
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sorted);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to fetch Orders");
      setLoading(false);
    }
  };

  
  const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}/status`,
      { status: newStatus }
    );

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );

    toast.info(res.data.message);
  } catch (err) {
    console.error("Failed to update status:", err);
    toast.error("Failed to update order status");
  }
};


  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const base =
      "px-3 py-1 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1 w-fit";
    if (status === "Pending") return `${base} bg-yellow-100 text-yellow-700`;
    if (status === "Shipped") return `${base} bg-red-100 text-red-700`;
    if (status === "Delivered") return `${base} bg-green-100 text-green-700`;
    if (status === "Rejected") return `${base} bg-gray-200 text-red-600`;
    return `${base} bg-gray-100 text-gray-600`;
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="flex justify-center mt-16">
      <div className="w-full max-w-7xl px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Package className="w-7 h-7 text-red-600" /> Orders
        </h2>

        <div className="flex gap-3 mb-6">
          {[
            { label: "All", icon: <Package className="w-4 h-4" /> },
            { label: "Pending", icon: <Clock className="w-4 h-4" /> },
            { label: "Shipped", icon: <Truck className="w-4 h-4" /> },
            { label: "Delivered", icon: <CheckCircle2 className="w-4 h-4" /> },
            { label: "Rejected", icon: <XCircle className="w-4 h-4" /> }, 
          ].map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`px-5 py-2 flex items-center gap-2 rounded-lg text-sm font-medium shadow transition ${
                filter === label
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-600">Loading Orders...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-hidden bg-white rounded-xl shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wide">
                  <th className="px-5 py-3 text-left">#</th>
                  <th className="px-5 py-3 text-left">Order ID</th>
                  <th className="px-5 py-3 text-left">Total</th>
                  <th className="px-5 py-3 text-left">Items</th>
                  <th className="px-5 py-3 text-left">Shipping Info</th>
                  <th className="px-5 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr
                    key={order._id || index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-5 py-4 text-sm">{index + 1}</td>
                    <td className="px-5 py-4 font-mono text-xs text-gray-700">
                      {order._id?.substring(0, 8)}...
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-green-700 text-sm font-semibold">
                        Rs {order.total}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="px-5 py-4 max-w-[150px]">
                      <div className="max-h-20 overflow-x-auto overflow-y-auto pr-1 custom-scrollbar">
                        <ul className="space-y-1 min-w-max">
                          {order.items.map((item, i) => (
                            <li
                              key={i}
                              className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-md whitespace-nowrap"
                            >
                              {item.name || item.productId?.name || "Deleted"}{" "}
                              <span className="text-gray-500">(x{item.quantity})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>

                    {/* Shipping Info */}
                    <td className="px-5 py-4 text-xs text-gray-700 max-w-xs break-words">
                      {order.shippingInfo ? (
                        <div className="space-y-1">
                          <div className="font-semibold">{order.shippingInfo.fullName}</div>
                          <div>{order.shippingInfo.address}</div>
                          <div className="text-gray-500">{order.shippingInfo.phone}</div>
                        </div>
                      ) : (
                        <div className="text-gray-400 italic">No shipping info</div>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          if (newStatus === "Rejected") {
                            const confirmReject = window.confirm(
                              "Are you sure you want to reject this order and refund the payment?"
                            );
                            if (!confirmReject) return;
                          }
                          await updateOrderStatus(order._id, newStatus);
                        }}
                        className={`${getStatusBadge(order.status)} border-none focus:ring-2 focus:ring-red-300 cursor-pointer`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Custom scrollbar styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.2);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default Orders;
