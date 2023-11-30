const express = require("express");
const router = express.Router();
const hoadonController = require("../controller/hoadonController");

// Create order
router.post("/createOrder", hoadonController.createOrder);

// Calculate total cost of an order
router.post("/calculateTongTienHoaDon", hoadonController.calculateTongTienHoaDon);

// Finalize an order
router.post("/finalizeOrder", hoadonController.finalizeOrder);

// Get order status
router.get("/getOrderStatus/:idHoaDon", hoadonController.getOrderStatus);

// Update order status
router.put("/updateOrderStatus/:idHoaDon", hoadonController.updateOrderStatus);

// Get total items in an order
router.get("/getTotalItems/:idHoaDon", hoadonController.getTotalItems);

module.exports = router;