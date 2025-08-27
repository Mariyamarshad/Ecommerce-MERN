import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group border rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
      {/* product image */}
      <div className="relative">
        {product.image && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
       
      </div>
      {/*product Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">
          {product.description}
        </p>

        {/*Price & button */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-red-600 font-bold text-lg">Rs. {product.price}</p>
          <div className="flex gap-2">
            <button className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition text-sm">
              Add to Cart
            </button>
            {/* View Details Button */}
            <Link
              to={`/product/${product._id}`}
              className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100"
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
