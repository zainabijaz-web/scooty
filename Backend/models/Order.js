import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Model", required: true },
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    amount: { type: Number, required: true }, // total amount
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    paymentIntentId: { type: String }, // store Stripe paymentIntent id
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
