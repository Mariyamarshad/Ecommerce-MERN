import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import axios from "axios";
import AdminProductEditForm from "./AdminProductEditForm";
import { Package } from "lucide-react";

const AdminProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${_id}`
      );
      dispatch(fetchProducts()); // refresh products
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="mt-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center flex items-center justify-center gap-2">
        <Package className="w-6 h-6 text-amber-900 " />
        All Products
      </h2>

      {loading && (
        <p className="text-gray-500 text-center">Loading products...</p>
      )}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    {product.image && (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${
                          product.image
                        }`}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-md border"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    Rs. {product.price}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-500">{product.category}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 truncate max-w-[100px]">
                    {product._id}
                  </td>
                  <td className="px-4 py-3 text-center flex gap-2 justify-center">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-medium transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No products found.</p>
      )}

      {editingProduct && (
        <AdminProductEditForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={() => dispatch(fetchProducts())}
        />
      )}
    </div>
  );
};

export default AdminProductList;
