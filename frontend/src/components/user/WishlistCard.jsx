import React from "react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistCard = ({ item, onRemove }) => {
  return (
    <div className="flex items-center gap-6 bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition">
      <img
        src={
          item.image?.startsWith("http")
            ? item.image
            : `${import.meta.env.VITE_BACKEND_URL}${item.image}`
        }
        alt={item.name}
        className="w-24 h-24 rounded-lg object-cover border"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-500">Rs {item.price}</p>
        <Link
          to={`/product/${item._id}`}
          className="text-xs text-red-600 hover:underline"
        >
          View Product
        </Link>
      </div>

      <button
        onClick={() => onRemove(item._id)}
        className="p-2 text-red-600 hover:text-red-800 transition"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default WishlistCard;
