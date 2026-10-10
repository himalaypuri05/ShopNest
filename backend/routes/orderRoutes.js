const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const {
  getOrders,
  getOrderById,
  myOrders,
  updateOrderStatus,
} = require("../controllers/orderController.Js");

const router = express.Router();

router.route("/").get(protect, admin, getOrders);
router.route("/myorders").get(protect, myOrders);
router.route("/:id/status").put(protect, admin, updateOrderStatus);
router.route("/:id").get(protect, getOrderById);

module.exports = router;
