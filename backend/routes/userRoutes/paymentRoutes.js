const express = require("express");
const router = express.Router();
const { createCheckoutSession, webhook, refundOrder } = require("../../controllers/userControllers/stripeController");
const authMiddleware = require("../../middlewares/authMiddleware");
const bodyParser = require("body-parser");

router.post("/webhook", bodyParser.raw({ type: "application/json" }), webhook);

router.post("/create-checkout-session", authMiddleware, express.json(), createCheckoutSession);

router.post("/reject/:orderId", authMiddleware, refundOrder);




module.exports = router;
