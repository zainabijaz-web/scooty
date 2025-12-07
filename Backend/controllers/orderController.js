import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate("items.product");
  res.json(orders);
};