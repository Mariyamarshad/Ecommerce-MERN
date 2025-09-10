import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import summaryApi from "../../Utils";
import apiCaller from "../../utils/apiCaller";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const Navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("You need to login first!")
      Navigate("/login");
      return;
    }

    try {
      const response = await apiCaller({
        url: summaryApi.addToCart.url,
        method: summaryApi.addToCart.method,
        data: { productId: product._id, quantity: 1},
        withCredentials: true,
      });

      toast.success(response.message || "Added to cart!");
    } catch (error) {
      toast.error(err.message || "Please login first!");
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white shadow rounded-2xl mt-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl shadow"
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-3">{product.description}</p>
          <p className="text-red-600 font-bold text-2xl mt-4">
            Rs. {product.price}
          </p>
          <button onClick={handleAddToCart} className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
