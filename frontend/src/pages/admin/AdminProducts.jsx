import React, { useEffect, useState } from "react";
import AdminProductForm from "../../components/admin/AdminProductForm";
import AdminProductList from "../../components/admin/AdminProductList";
import { Plus, Boxes } from "lucide-react";

const AdminProducts = () => {
  const [showForm, setShowForm] = useState(false);

  const [refresList, setRefresList] = useState(false);
  
  const handleProductAdded = () => {
    setRefresList((prev) => !prev);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/*page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Boxes className="w-6 h-6 text-red-600" /> Manage Products{" "}
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded=lg shadow hover:bg-indigo-600 transition rounded"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* product Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div >
            {/* Close button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Plus size={18} /> Add New Product
            </h2>
            <AdminProductForm onProductAdded={handleProductAdded} onClose={()=> setShowForm(false)} />
          </div>
        </div>
      )}
      {/* Product List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <AdminProductList refresh={refresList} />
      </div>
    </div>
  );
};

export default AdminProducts;
