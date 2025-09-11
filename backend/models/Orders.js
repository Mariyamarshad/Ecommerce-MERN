const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: false },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      name: { type: String, required: true }, 
    },
  ],
  shippingInfo: {
    fullName: String,
    address: String,
    phone: String,
  },
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
   paymentIntentId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
