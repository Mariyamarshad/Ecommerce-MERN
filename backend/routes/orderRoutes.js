const express = require("express");
const router = express.Router();
const { createOrder, getOrderById } = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/", authMiddleware, createOrder);
router.get("/:id", authMiddleware, getOrderById); 

module.exports = router;