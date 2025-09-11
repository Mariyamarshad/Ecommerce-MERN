const Orders = require("../../models/Orders");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getOrdersData = async (req, res) => {
  try {
    const orders = await Orders.find()
      .populate("items.productId", "name price"); 
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.OrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    const order = await Orders.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    let message = `Order status updated to ${status}`;

    // Handle rejection & refund
    if (status === "Rejected" && order.paymentIntentId) {
      try {
        const refund = await stripe.refunds.create({
          payment_intent: order.paymentIntentId,
        });
        message = `Order rejected and refund successful (Refund ID: ${refund.id})`;
        console.log(`Refund successful for order ${order._id}: ${refund.id}`);
      } catch (refundError) {
        console.error("Refund failed:", refundError);
        message = `Order rejected but refund failed: ${refundError.message}`;
      }
    }

    // Safely update only the status
    const updatedOrder = await Orders.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: false } // skip other field validations
    );

    res.json({ order: updatedOrder, message });
  } catch (err) {
    console.error("OrderStatus error:", err);
    res.status(500).json({ message: "Error updating order status", error: err.message });
  }
};
