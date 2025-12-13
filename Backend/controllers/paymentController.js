import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/orderModel.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Valid amount required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in paisa
      currency: "pkr",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe PaymentIntent Error:", err.message);
    res.status(500).json({ message: "PaymentIntent creation failed" });
  }
};

// Dummy webhook for testing
export const stripeWebhooks = async (req, res) => {
  console.log("Webhook received");
  res.json({ received: true });
};