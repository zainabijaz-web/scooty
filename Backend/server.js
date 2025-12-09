import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import { stripeWebhooks } from "./controllers/paymentController.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Stripe webhook must come before JSON parser
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

// JSON parser
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/models", modelRoutes);
app.use("/api/admin/users", adminUserRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Testing route
app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);