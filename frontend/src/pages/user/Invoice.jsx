import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download, CheckCircle } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { toast } from "react-toastify";

const Invoice = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}`,
          { withCredentials: true }
        );
        setOrder(res.data);
      } catch (err) {
        toast.error("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="mt-40 text-center">Loading Invoice...</div>;
  if (!order) return <div className="mt-40 text-center text-red-600">Order not found</div>;

  const { items, shippingInfo, total, createdAt } = order;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 14, 30);
    doc.text(`Date: ${new Date(createdAt).toLocaleString()}`, 14, 37);
    doc.text(`Name: ${shippingInfo.fullName}`, 14, 45);
    doc.text(`Address: ${shippingInfo.address}`, 14, 52);
    doc.text(`Phone: ${shippingInfo.phone}`, 14, 59);

    const tableColumn = ["Item", "Price", "Qty", "Total"];
    const tableRows = items.map((item) => [
      item.productId.name,
      `Rs. ${item.productId.price}`,
      item.quantity,
      `Rs. ${item.productId.price * item.quantity}`,
    ]);
    tableRows.push(["", "", "Total", `Rs. ${total}`]);

    doc.autoTable(tableColumn, tableRows, { startY: 70 });
    doc.save(`invoice-${orderId}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 mt-28">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-5 mb-6">
          <h2 className="text-3xl font-bold">Invoice</h2>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Download size={18} /> Download
          </button>
        </div>

        {/* Shipping Info */}
        <div className="mb-6 text-gray-700 space-y-1">
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Date:</strong> {new Date(createdAt).toLocaleString()}</p>
          <p><strong>Name:</strong> {shippingInfo.fullName}</p>
          <p><strong>Address:</strong> {shippingInfo.address}</p>
          <p><strong>Phone:</strong> {shippingInfo.phone}</p>
        </div>

        {/* Items */}
        <div className="grid grid-cols-4 font-semibold border-b pb-3 mb-4">
          <span>Item</span>
          <span className="text-center">Price</span>
          <span className="text-center">Qty</span>
          <span className="text-right">Total</span>
        </div>

        {items.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-4 border-b pb-2"
          >
            <span>{item.productId.name}</span>
            <span className="text-center">Rs. {item.productId.price}</span>
            <span className="text-center">{item.quantity}</span>
            <span className="text-right">Rs. {item.productId.price * item.quantity}</span>
          </div>
        ))}

        {/* Total */}
        <div className="mt-8 flex justify-between text-xl font-bold border-t pt-4">
          <span>Total</span>
          <span className="text-red-600">Rs. {total}</span>
        </div>

        <div className="mt-8 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl">
          <CheckCircle size={20} /> Order Confirmed
        </div>
      </div>
    </div>
  );
};

export default Invoice;
