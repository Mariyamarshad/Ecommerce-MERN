import React from "react";
import { Link } from "react-router-dom";
import apiCaller from "../../utils/apiCaller";
import summaryApi from "../../Utils";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to login first!");
      Navigate("/login");
      return;
    }

    try {
      const response = await apiCaller({
        url: summaryApi.addToCart.url,
        method: summaryApi.addToCart.method,
        data: { productId: product._id, quantity: 1 },
      });

      alert(response.message || "Added to Cart!");
    } catch (error) {
      alert(error.message || "Please login first!");
    }
  };

  return (
    <div className="group border rounded-lg bg-white shadow hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
      {/* image */}
      <div className="relative w-full h-36 bg-gray-50 flex items-center justify-center overflow-hidden">
        {product.image && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
            alt={product.name}
            className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* content */}
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
        <p className="text-gray-500 text-xs line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <p className="text-red-600 font-bold text-sm">Rs. {product.price}</p>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition"
            >
              Add to Cart
            </button>
            <Link
              to={`/product/${product._id}`}
              className="border border-gray-300 px-2 py-1 rounded text-xs hover:bg-gray-100 transition"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
