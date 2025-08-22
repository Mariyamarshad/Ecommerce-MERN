import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-black text-white flex flex-col p-4 mt-4 mb-2 rounded">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/admin" className="hover:bg-gray-700 px-3 py-2 rounded">
          Dashboard
        </Link>
        <Link to="/admin/users" className="hover:bg-gray-700 px-3 py-2 rounded">
          Users
        </Link>
        <Link
          to="/admin/products"
          className="hover:bg-gray-700 px-3 py-2 rounded"
        >
          Products
        </Link>
        <Link to="/admin/orders" className="hover:bg-gray-700 px-3 py-2 rounded">
          Orders
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
