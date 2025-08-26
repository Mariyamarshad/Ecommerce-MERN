import React, { useState } from "react";
import axios from "axios";
import summaryApi from "../../utils";

const AdminProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

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

    await axios({
      url: summaryApi.createProduct.url,
      method: summaryApi.createProduct.method,
      data: form, // ✅ fixed here
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Product added successfully!");

    // ✅ Refresh product list in parent
    onProductAdded?.();

    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    });
    setImage(null);
  } catch (error) {
    console.error("Failed to add product", error);
    alert("Failed to add product");
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="file"
        name="image"
        onChange={handleImageChange}
        className="w-full border p-2 rounded"
        accept="image/*"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Product
      </button>
    </form>
  );
};

export default AdminProductForm;
