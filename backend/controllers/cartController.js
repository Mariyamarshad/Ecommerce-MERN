const Cart = require("../models/cartModel");

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += Number(quantity);
      await cartItem.save();
    } else {
      await Cart.create({ userId, productId, quantity });
    }

    // Return updated cart
    const cartItems = await Cart.find({ userId }).populate("productId");
    return res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: "Error adding to cart",
      error: error.message,
    });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.find({ userId }).populate("productId");
    return res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart items",
      error: error.message,
    });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    await Cart.findOneAndDelete({ userId, productId });

    // Return updated cart
    const cartItems = await Cart.find({ userId }).populate("productId");
    return res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({
      message: "Error removing from cart",
      error: err.message,
    });
  }
};

// Update quantity
exports.updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({ userId, productId });
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    // Return updated cart
    const cartItems = await Cart.find({ userId }).populate("productId");
    return res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: "Error updating cart",
      error: error.message,
    });
  }
};
