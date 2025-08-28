const Cart = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;   //from JWT
    const { productId, quantity } = req.body;

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      // if product already in cart, just update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    res
      .status(200)
      .json({ success: true, message: "Product added to cart", cartItem });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error adding to cart",
        error: error.message,
      });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const { userId } = req.user.id;
    const cartItems = await Cart.find({ userId }).populate("productId");
    res.status(200).json(cartItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart items", error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    await Cart.findOneAndDelete({ userId, productId });
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing from cart", error: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const {  productId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({ userId, productId });
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: "Quantity updated", cartItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
};
