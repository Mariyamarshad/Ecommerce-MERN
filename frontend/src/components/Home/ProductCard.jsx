import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addWishlistItem, removeWishlistItem } from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const wishlistItem = wishlistItems.find((item) => item._id === product._id);
  const cartItem = cartItems.find((item) => item._id === product._id);

  const isInWishlist = !!wishlistItem;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("You need to login first!");
      navigate("/login");
      return;
    }
    dispatch(addToCart(product));
    toast.success("Added to Cart!");
  };

  const handleToggleWishlist = () => {
    if (!user) {
      toast.error("You need to login first!");
      navigate("/login");
      return;
    }

    if (isInWishlist) {
      dispatch(removeWishlistItem(product._id));
      toast.success("Item removed from wishlist!");
    } else {
      dispatch(addWishlistItem(product));
      toast.success("Item added to wishlist!");
    }
  };

  return (
    <div className="group border rounded-lg bg-white shadow hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
      {/* Image */}
      <div className="relative w-full h-36 bg-gray-50 flex items-center justify-center overflow-hidden">
        {product.image && (
          <img
            src={
              product.image.startsWith("http")
                ? product.image
                : `${import.meta.env.VITE_BACKEND_URL}${product.image}`
            }
            alt={product.name}
            className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Wishlist button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow hover:bg-red-50"
        >
          <Heart
            className={`w-5 h-5 ${
              isInWishlist ? "text-red-600 fill-red-600" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Content */}
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
              {cartItem ? "In Cart" : "Add to Cart"}
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
