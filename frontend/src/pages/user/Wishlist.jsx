import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react"; 
import { fetchWishlist, removeWishlistItem } from "../../redux/slices/wishlistSlice";
import { toast } from "react-toastify";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, user]);

  const handleRemove = (id) => {
    dispatch(removeWishlistItem(id)); 
    toast.success("Item removed from wishlist!")
  };

  if (loading) {
    return <p className="text-center text-lg mt-40">Loading your wishlist...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-36 px-6">
      <h2 className="text-xl font-bold mb-4">My Wishlist</h2>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
          <p className="text-gray-600 text-lg">
            There is nothing in the Wishlist!
          </p>
          <Link to="/" className="inline-block mt-6">
            <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-6 bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition"
              >
                {/* Product Image */}
                <img
                  src={
                    item.product?.image
                      ? `${import.meta.env.VITE_BACKEND_URL}${item.product.image}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={item.product?.name}
                  className="w-24 h-24 rounded-lg object-cover border"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {item.product?.name}
                  </h3>
                  <p className="text-gray-500">Rs {item.product?.price}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item._id)} // ✅ wishlist _id, not productId
                  className="p-2 text-red-600 hover:text-red-800 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
