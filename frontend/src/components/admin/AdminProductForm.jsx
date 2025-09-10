import React, { useState } from "react";
import axios from "axios";
import summaryApi from "../../utils";
import { X } from "lucide-react"; 
import { toast } from "react-toastify"

const AdminProductForm = ({ onProductAdded, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      if (image) form.append("image", image);

      await axios({
        url: summaryApi.createProduct.url,
        method: summaryApi.createProduct.method,
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(" Product added successfully!");
      onProductAdded?.();

      // Reset form
      setFormData({ name: "", description: "", price: "", category: "", stock: "" });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Failed to add product", error);
      toast.error(" Failed to add product");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md mt-10 relative">
      {/*  Cancel Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <X size={22} />
      </button>

      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center flex items-center gap-2">
        ➕ Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            rows="3"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (Rs)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
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
            <option value="home">Home Appliances</option>
            <option value="fitness">Fitness</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
            <option value="books">Books</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            accept="image/*"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all font-medium"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;
