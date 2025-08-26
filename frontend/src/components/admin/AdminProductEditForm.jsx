import React, { useState } from "react";
import axios from "axios";

const AdminProductEditForm = ({ product, onClose, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("category", formData.category);
      form.append("stock", formData.stock);
      if (image) form.append("image", image);

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${product._id}`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Product updated successfully!");
      onProductUpdated?.(); // Refresh the product list
      onClose?.(); // Close the edit form
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 space-y-3"
      >
        <h3 className="text-lg font-semibold mb-2">Edit Product</h3>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="w-full border p-2 rounded"
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductEditForm;
