const Orders = require("../../models/Orders");

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
    const updatedOrder = await Orders.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order nor found"});
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error updating order status"})
  }
}
