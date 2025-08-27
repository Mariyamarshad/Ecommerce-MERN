const express = require("express");
const router = express.Router();
const { getDashboardCounts } = require("../controllers/dashboardController");

// GET /api/dashboard/counts
router.get("/counts", getDashboardCounts);

module.exports = router;
