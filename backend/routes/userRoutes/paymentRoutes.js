const express = require("express");
const router = express.Router();
const {createCheckoutSession, webhook } = require("../../controllers/userControllers/stripeController")
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/create-checkout-session", authMiddleware, createCheckoutSession);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }), 
  webhook
);


module.exports = router;