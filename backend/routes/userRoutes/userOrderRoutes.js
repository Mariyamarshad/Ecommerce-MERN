const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getUserOrders, 
} = require("../../controllers/userControllers/userOrderController");
const authMiddleware = require("../../middlewares/authMiddleware");

// Create order
router.post("/", authMiddleware, createOrder);

// Fetch all orders for logged-in user
router.get("/user", authMiddleware, getUserOrders); 

// Fetch order by ID
router.get("/:id", authMiddleware, getOrderById);

module.exports = router;
