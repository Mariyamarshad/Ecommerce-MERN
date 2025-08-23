import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct } from "../../redux/slices/productSlice";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({ name: "", price: "" });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(formData));
    setFormData({ name: "", price: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add Product
        </button>
      </form>

      {/* Products Table */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse border text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">Rs. {product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
