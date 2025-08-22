import React from "react";
import Sidebar from "../../components/admin/AdminSidebar";
import Navbar from "../../components/admin/AdminNavbar";

const Orders = () => {
  const dummyOrders = [
    { id: 1, product: "Laptop", user: "Ali", status: "Pending" },
    { id: 2, product: "Phone", user: "Sara", status: "Completed" },
  ];

  return (
    <div className="flex mt-30">
      <div className="flex-1">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          <table className="w-full border-collapse border text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyOrders.map((order) => (
                <tr key={order.id}>
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.product}</td>
                  <td className="border px-4 py-2">{order.user}</td>
                  <td className="border px-4 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
