const User = require("../models/userModel");
const Product = require("../models/productModel");


// GET dashboard counts
exports.getDashboardCounts = async (req, res) => {
  try {
    const usersCount = await User.countDocuments({ role: {$ne: "admin"}});
    const productsCount = await Product.countDocuments();
    

    res.json({
      users: usersCount,
      products: productsCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
