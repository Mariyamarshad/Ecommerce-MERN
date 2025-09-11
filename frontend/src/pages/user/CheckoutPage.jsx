import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CreditCard, MapPin, Phone, User } from "lucide-react";
import { removeFromCart } from "../../redux/slices/cartSlice";

const CheckoutPage = () => {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 200;
  const total = subtotal + shipping;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    if (!formData.fullName || !formData.address || !formData.phone) {
      toast.error("Please fill in all shipping details!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-checkout-session`,
        {
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          shippingInfo: formData,
        },
        { withCredentials: true } 
      );

      if (res.data.url) {
        window.location.href = res.data.url; 
      } else {
        toast.error("Stripe checkout URL not found!");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(err.response?.data?.message || "Failed to start checkout!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-36 px-6 lg:px-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
        Checkout
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left - Shipping Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Shipping Information
          </h3>
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <User className="text-red-600" size={20} />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:ring focus:ring-red-200"
              />
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-red-600" size={20} />
              <input
                type="text"
                name="address"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:ring focus:ring-red-200"
              />
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-red-600" size={20} />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:ring focus:ring-red-200"
              />
            </div>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white shadow-xl rounded-2xl p-8 h-fit">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Order Summary
          </h3>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × Rs. {item.price}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  Rs. {item.price * item.quantity}
                </p>
              </div>
            ))}

            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Shipping</span>
              <span>Rs. {shipping}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-4">
              <span>Total</span>
              <span className="text-red-600">Rs. {total}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-8 py-4 flex items-center justify-center gap-2 bg-red-600 text-white text-lg font-medium rounded-xl hover:bg-red-700 transition"
          >
            <CreditCard size={20} /> Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
