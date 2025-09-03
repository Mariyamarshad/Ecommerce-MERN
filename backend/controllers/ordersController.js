const Orders = require("../models/Orders");

exports.getOrdersData = async (req, res) => {
  try {
    const orders = await Orders.find()
      .populate("items.productId", "name price"); 
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

