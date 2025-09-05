const Wishlist = require("../models/wishlistModel");

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id; // requires authMiddleware

    const existing = await Wishlist.findOne({ user: userId, product: productId });
    if (existing) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const newItem = new Wishlist({ user: userId, product: productId });
    await newItem.save();

    res.json({ message: "Added to wishlist", item: newItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get wishlist
exports.getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({ user: req.user.id }).populate("product");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
