// backend/config/stripe.js
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize Stripe with Secret Key from .env
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-10", // specify latest version for safety
});