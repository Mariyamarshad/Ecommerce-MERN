import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById, clearCurrentOrder } from "../../redux/slices/orderSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));

    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-20">Loading order details...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!currentOrder) return <p className="text-center mt-20">No order found</p>;

  const orderNumber = `#${new Date(currentOrder.createdAt)
    .toISOString()
    .split("T")[0]}-${currentOrder._id.slice(-4).toUpperCase()}`;

  // Status badge color mapping
  const statusClasses = {
    Pending: "bg-yellow-500",
    Shipped: "bg-blue-500",
    Delivered: "bg-green-600",
    Rejected: "bg-red-600",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow mt-36 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Order <span className="text-gray-600">{orderNumber}</span>
        </h2>
        <span
          className={`mt-2 md:mt-0 px-4 py-1 rounded-full text-white text-sm font-medium ${
            statusClasses[currentOrder.status] || "bg-gray-500"
          }`}
        >
          {currentOrder.status}
        </span>
      </div>

      {/* Refund Notice */}
      {currentOrder.status === "Rejected" && currentOrder.paymentIntentId && (
        <p className="mt-2 text-sm text-red-600 font-medium">
          This order was rejected and your payment has been refunded.
        </p>
      )}

      {/* Shipping Info */}
      <div className="bg-gray-50 p-5 rounded-xl text-sm text-gray-700 space-y-1">
        <p>
          <strong>Recipient:</strong> {currentOrder.shippingInfo.fullName}
        </p>
        <p>
          <strong>Address:</strong> {currentOrder.shippingInfo.address}
        </p>
        <p>
          <strong>Phone:</strong> {currentOrder.shippingInfo.phone}
        </p>
      </div>

      {/* Items Table */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-3 py-2 text-left">Product</th>
                <th className="px-3 py-2 text-center">Qty</th>
                <th className="px-3 py-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentOrder.items.map((item, idx) => (
                <tr key={item._id || idx} className="text-gray-700">
                  <td className="px-3 py-2">{item.name || "Unknown Product"}</td>
                  <td className="px-3 py-2 text-center">{item.quantity}</td>
                  <td className="px-3 py-2 text-right">Rs {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center border-t pt-4 font-semibold text-gray-800">
        <span>Total</span>
        <span className="text-lg text-red-600">Rs {currentOrder.total}</span>
      </div>
    </div>
  );
};

export default OrderDetails;
