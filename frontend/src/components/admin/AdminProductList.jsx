import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import axios from "axios";
import AdminProductEditForm from "./AdminProductEditForm";
const AdminProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${_id}`);
      dispatch(fetchProducts()); // refresh products
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="mt-6 text-center">
      <h2 className="text-xl font-semibold mb-3">All Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Product ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product._id}>
                <td className="border p-2">{product._id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2">
                  {product.image && (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
