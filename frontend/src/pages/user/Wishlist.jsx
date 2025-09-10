import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeWishlistItem } from "../../redux/slices/wishlistSlice";
import WishlistCard from "../../components/user/WishlistCard";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  const handleRemove = (id) => {
    if (!user) {
      toast.error("You need to login first!");
      navigate("/login");
      return;
    }
    dispatch(removeWishlistItem(id));
    toast.success("Item removed from wishlist!");
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <WishlistCard key={item._id} item={item} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
