import Order from "../models/orderModel.js";

// ===== Create COD Order =====
export const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, amount } = req.body;

    if (!userId || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const order = await Order.create({
      user: userId,
      items: cartItems.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
      })),
      amount,
      paymentMethod: "cod",
      status: "cod",
    });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to create COD order" });
  }
};

// ===== Create Stripe Payment Order =====
export const createStripeOrder = async (req, res) => {
  try {
    const { userId, cartItems, amount, paymentIntentId } = req.body;

    if (!userId || !cartItems || cartItems.length === 0 || !paymentIntentId) {
      return res.status(400).json({ message: "Invalid payment request" });
    }

    const order = await Order.create({
      user: userId,
      items: cartItems.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
      })),
      amount,
      paymentMethod: "card",
      status: "paid",
      paymentIntentId,
    });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to create Stripe order" });
  }
};

// ===== Get All Orders (Admin) =====
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ===== Confirm Order (Admin) =====
export const confirmOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: "paid" },
      { new: true }
    ).populate("user");

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to confirm order" });
  }
};

// ===== Calculate Revenue =====
export const getRevenue = async (req, res) => {
  try {
    const paidOrders = await Order.find({ status: { $in: ["paid", "cod"] } });
    const revenue = paidOrders.reduce((acc, order) => acc + order.amount, 0);
    res.json({ revenue });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to calculate revenue" });
  }
};