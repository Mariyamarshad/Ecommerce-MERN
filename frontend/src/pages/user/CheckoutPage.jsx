import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { clearCart } from "../../redux/slices/cartSlice";

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

  const subtotal = items.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );
  const shipping = 200; // realistic shipping cost
  const total = subtotal + shipping;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = async () => {
    if (!formData.fullName || !formData.address || !formData.phone) {
      toast.error("Please fill in all shipping details!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order`,
        {
          userId: user._id,
          items: items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          shippingInfo: formData,
          total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(clearCart())

      toast.success("Order placed successfully!");
      navigate(`/invoice/${res.data._id}`); // redirect to invoice
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-28 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>

      {/* Shipping Form */}
      <div className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-lg focus:ring focus:ring-red-200"
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-lg focus:ring focus:ring-red-200"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-lg focus:ring focus:ring-red-200"
        />
      </div>

      {/* Summary */}
      <div className="mt-6 border-t pt-4 space-y-2 text-lg">
        <p>Subtotal: Rs. {subtotal}</p>
        <p>Shipping: Rs. {shipping}</p>
        <p className="font-bold text-xl">Total: Rs. {total}</p>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full mt-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
