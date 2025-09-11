import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

      toast.success("Product updated successfully!");
      onProductUpdated?.(); 
      onClose?.(); 
    } catch (err) {
      console.error("Failed to update product:", err);
      toast.error("Failed to update product");
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
        <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="phones">Phones</option>
            <option value="computers">Computers</option>
            <option value="smartWatch">SmartWatch</option>
            <option value="camera">Camera</option>
            <option value="headphones">Headphones</option>
            <option value="gaming">Gaming</option>
            <option value="shopping">Shopping</option>
            <option value="Home">Home Appliances</option>
            <option value="fitness">Fitness</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
            <option value="books">Books</option>
          </select>
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
