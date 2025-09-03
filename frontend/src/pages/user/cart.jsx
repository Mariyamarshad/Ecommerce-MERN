import {
  fetchCart,
  addToCart,
  removeCartItem,
  updateCartItem,
} from "../../redux/slices/cartSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
          dispatch(fetchCart());
    }
  }, [dispatch, user]);

  const handleIncrease = (id, qty) => {
    dispatch(updateCartItem({ id, quantity: qty + 1 }));
  };

  const handleDecrease = (id, qty) => {
    if (qty > 1) {
      dispatch(updateCartItem({ id, quantity: qty - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeCartItem(id));
  };

  if (loading)
    return <p className="text-center text-lg mt-40">Loading your cart...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 mt-36">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingCart size={28} className="text-red-600" />
        Your Shopping Cart
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
          <ShoppingCart size={50} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
          <Link to="/" className="inline-block mt-6">
            <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-6 bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition"
              >
                {/* Product Image */}
                <img
                  src={
                    item.productId.image
                      ? `${import.meta.env.VITE_BACKEND_URL}${
                          item.productId.image
                        }`
                      : "https://via.placeholder.com/150"
                  }
                  alt={item.productId.name}
                  className="w-24 h-24 rounded-lg object-cover border"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {item.productId.name}
                  </h3>
                  <p className="text-gray-500">Rs {item.productId.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleDecrease(item.productId._id, item.quantity)
                    }
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3 py-1 border rounded-md">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleIncrease(item.productId._id, item.quantity)
                    }
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.productId._id)}
                  className="p-2 text-red-600 hover:text-red-800 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4 border-b pb-3 text-gray-900">
              Order Summary
            </h3>
            <div className="space-y-3 text-lg">
              <div className="flex justify-between ">
                <span>Subtotal</span>
                <span className="font-medium">
                  Rs 
                  {items.reduce(
                    (total, item) =>
                      total + item.productId.price * item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">Rs 5.00</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-3">
                <span>Total</span>
                <span>
                  Rs 
                  {items.reduce(
                    (total, item) =>
                      total + item.productId.price * item.quantity,
                    0
                  ) + 5}
                </span>
              </div>
            </div>
            <Link to="/checkout">
              <button className="w-full mt-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
