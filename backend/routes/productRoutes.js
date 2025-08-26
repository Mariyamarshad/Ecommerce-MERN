const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middlewares/upload");

// Get all products
router.get("/", productController.getAllProducts);

// Create product (with image upload)
router.post("/", upload.single("image"), productController.createProduct);

// Update product (with image upload)
router.put("/:id", upload.single("image"), productController.updateProduct);

// Delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
