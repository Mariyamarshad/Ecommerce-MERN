const express = require("express");
const ordersController = require("../../controllers/adminControllers/adminOrderController");
const router  = express.Router();

router.get("/data", ordersController.getOrdersData);
router.put("/:id/status", ordersController.OrderStatus);

module.exports = router;