const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const authMiddleware = require("../middlewares/authMiddleware");


// Add to wishlist
router.post("/add", authMiddleware, wishlistController.addToWishlist);

// Get wishlist
router.get("/", authMiddleware, wishlistController.getWishlist);

// Remove from wishlist
router.delete("/:id", authMiddleware, wishlistController.removeFromWishlist);

module.exports = router;
