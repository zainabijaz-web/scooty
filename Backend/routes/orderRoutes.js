import express from "express";
import {
  createOrder,
  createStripeOrder,
  getAllOrders,
  confirmOrder,
  getRevenue,
} from "../controllers/orderController.js";

const router = express.Router();

// Create new COD order
router.post("/", createOrder);

// Create new Stripe order
router.post("/stripe", createStripeOrder);

// Get all orders (admin)
router.get("/", getAllOrders);

// Confirm an order (admin)
router.patch("/:orderId/confirm", confirmOrder);

// Get revenue (admin)
router.get("/revenue", getRevenue);

export default router;
