const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const {getproducts, getproductById, createProduct, updateProduct, deleteProduct} = require("../controllers/productController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// all products
router.route("/").get(getproducts).post(protect, admin, upload.single("image"), createProduct);
// Specific product
router
  .route("/:id").get(getproductById).put(protect, admin, upload.single("image"), updateProduct).delete(protect, admin, deleteProduct);
module.exports = router;