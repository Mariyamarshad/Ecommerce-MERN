import React from "react";
import { Link } from "react-router-dom";

const WishlistCard = ({ item }) => {
  const product = item.product;
  return (
    <div className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
        alt={product.name}
        className="w-full h-36 object-contain mb-2"
      />
      <h3 className="font-semibold text-sm truncate">{product.name}</h3>
      <p className="text-red-600 font-bold">Rs {product.price}</p>
      <Link
        to={`/product/${product._id}`}
        className="block mt-2 text-xs text-gray-500 hover:underline"
      >
        View Product
      </Link>
    </div>
  );
};

export default WishlistCard;
