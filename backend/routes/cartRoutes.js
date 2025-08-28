const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

//Get all cart items
router.get("/",authMiddleware, cartController.getAllItems);

//add to cart
router.post("/add",authMiddleware, cartController.addToCart)

//delete cart item
router.delete("/:productId", authMiddleware, cartController.deleteItem);

//update cart item
router.put("/:productId", authMiddleware, cartController.updateQuantity)

module.exports = router;