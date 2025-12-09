import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate("items.product");
  res.json(orders);
};