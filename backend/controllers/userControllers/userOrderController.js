const Order = require("../../models/Orders");


exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, shippingInfo, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (!shippingInfo || !shippingInfo.fullName || !shippingInfo.address || !shippingInfo.phone) {
  return res.status(400).json({ message: "Incomplete shipping info" });
}


    const order = new Order({
      userId,
      items,
      shippingInfo,
      total,
    });

    await order.save();

    await Cart.deleteMany({ userId });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      _id: order._id,
      order,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create order", error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).populate("items.productId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};
