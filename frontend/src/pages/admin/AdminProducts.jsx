import React from 'react';
import AdminProductForm from '../../components/admin/AdminProductForm';
import AdminProductList from '../../components/admin/AdminProductList';

const AdminProducts = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Product Form Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <AdminProductForm />
      </div>

      {/* Product List Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Products List</h2>
        <AdminProductList />
      </div>
    </div>
  );
};

export default AdminProducts;
