import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

// Create new order
router.post("/", async (req, res) => {
  try {
    await createOrder(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders of a user
router.get("/:userId", async (req, res) => {
  try {
    await getUserOrders(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;