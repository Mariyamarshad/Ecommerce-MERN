const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middlewares/upload");

// Get all products
router.get("/", productController.getAllProducts);

// Get single product
router.get("/:id", productController.getProductById);

//Get product by category
router.get("/category/:category", productController.getProductByCategory)

// Create product (with image upload)
router.post("/", upload.single("image"), productController.createProduct);

// Update product (with image upload)
router.put("/:id", upload.single("image"), productController.updateProduct);

// Delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
