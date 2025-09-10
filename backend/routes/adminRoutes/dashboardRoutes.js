const express = require("express");
const router = express.Router();
const { getDashboardCounts } = require("../../controllers/adminControllers/adminDashboardController");

// GET /api/dashboard/counts
router.get("/counts", getDashboardCounts);

module.exports = router;
