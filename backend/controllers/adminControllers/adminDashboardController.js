const User = require("../../models/userModel");
const Product = require("../../models/productModel");
const Order = require("../../models/Orders");


// GET dashboard counts
exports.getDashboardCounts = async (req, res) => {
  try {
    const usersCount = await User.countDocuments({ role: {$ne: "admin"}});
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();
    

    res.json({
      users: usersCount,
      products: productsCount,
      orders: ordersCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
