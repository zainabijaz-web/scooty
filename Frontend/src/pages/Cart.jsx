import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setQty } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// ===== STRIPE SETUP =====
const stripePromise = loadStripe("pk_test_Your_Real_Test_Key"); // Replace with your Stripe publishable key

// ===== STRIPE PAYMENT COMPONENT =====
const StripePayment = ({ total, cartItems, user, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async () => {
    if (!stripe || !elements) return;

    try {
      // Create PaymentIntent on backend
      const res = await axios.post("http://localhost:5000/api/payment/create-intent", {
        amount: total,
        cartItems,
        userId: user._id,
        paymentMethod: "card",
      });

      const clientSecret = res.data.clientSecret;
      if (!clientSecret) throw new Error("PaymentIntent creation failed");

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        alert("Payment Successful!");

        // Save order as paid in backend
        await axios.post("http://localhost:5000/api/orders/stripe", {
          userId: user._id,
          cartItems,
          amount: total,
          paymentIntentId: result.paymentIntent.id,
        });

        onPaymentSuccess();
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="space-y-4">
      <CardElement className="p-3 bg-white text-black rounded-md" />
      <button
        onClick={handlePay}
        className="w-full bg-white text-[#1E40AF] mt-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
      >
        Pay with Card
      </button>
    </div>
  );
};

// ===== MAIN CART COMPONENT =====
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((s) => s.cart.cartItems) || [];
  const user = useSelector((s) => s.auth.user);

  const [method, setMethod] = useState("card");
  const [codMessage, setCodMessage] = useState("");

  // ===== SAFE TOTAL CALCULATION =====
  const total = cartItems.reduce((acc, item) => {
    const price = Number(item.price?.toString().replace(/[^0-9.-]+/g, "")) || 0;
    const qty = item.qty || 1;
    return acc + price * qty;
  }, 0);

  const formatPrice = (price) => `Rs. ${parseInt(price).toLocaleString("en-PK")}`;

  // ===== COD ORDER =====
  const handleCOD = async () => {
    if (!user) {
      navigate("/login", { state: { msg: "login_required" } });
      return;
    }

    if (cartItems.length === 0) return;

    try {
      // Prepare payload
      const backendItems = cartItems.map((i) => ({
        id: i.id,
        name: i.name,
        price: Number(i.price?.toString().replace(/[^0-9.-]+/g, "")) || 0,
        qty: i.qty || 1,
      }));

      const amount = backendItems.reduce((acc, i) => acc + i.price * i.qty, 0);

      const res = await axios.post("http://localhost:5000/api/orders", {
        userId: user._id,
        cartItems: backendItems,
        amount,
      });

      setCodMessage("✅ Order placed with Cash on Delivery!");
      setTimeout(() => setCodMessage(""), 3000);

      // Clear cart
      backendItems.forEach((item) => dispatch(removeFromCart(item.id)));
      console.log("COD order saved:", res.data);
    } catch (err) {
      console.error("Failed to create COD order:", err);
      setCodMessage("❌ Failed to place COD order!");
      setTimeout(() => setCodMessage(""), 3000);
    }
  };

  // ===== AFTER STRIPE PAYMENT SUCCESS =====
  const onPaymentSuccess = () => {
    cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#1E3A8A] text-white px-6 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold my-8">Shopping Cart</h1>

          {/* TABLE HEADER */}
          <div className="grid grid-cols-4 font-semibold text-gray-300 pb-4 border-b border-gray-600">
            <p>Product</p>
            <p>Size</p>
            <p>Quantity</p>
            <p className="text-right">Total Price</p>
          </div>

          {/* ITEMS */}
          {cartItems.length === 0 ? (
            <p className="p-8 text-center bg-white/10 rounded-lg">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => {
              const price = Number(item.price?.toString().replace(/[^0-9.-]+/g, "")) || 0;
              const qty = item.qty || 1;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-4 items-center py-6 border-b border-gray-600"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      className="w-20 h-20 rounded-lg object-contain bg-white/10 p-2"
                      alt=""
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-300">{item.subname}</p>
                    </div>
                  </div>

                  <select className="w-24 p-2 border border-gray-600 rounded-lg bg-white/10 text-white">
                    <option className="text-black">35 L</option>
                    <option className="text-black">30 L</option>
                    <option className="text-black">25 L</option>
                  </select>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        dispatch(setQty({ id: item.id, qty: Math.max(qty - 1, 1) }))
                      }
                      className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
                    >
                      -
                    </button>
                    <span className="font-medium">{qty}</span>
                    <button
                      onClick={() => dispatch(setQty({ id: item.id, qty: qty + 1 }))}
                      className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(price * qty)}</p>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-gray-400 hover:text-red-400 text-xl mt-2"
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })
          )}

          <button
            onClick={() => navigate("/models")}
            className="mt-6 px-5 py-2 bg-white text-[#1E40AF] rounded-lg hover:bg-gray-200 font-semibold"
          >
            ← Back to Shop
          </button>
        </div>

        {/* RIGHT PAYMENT SECTION */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-md p-8 mt-10 max-h-[370px] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">Payment Info</h2>
          <div className="text-white/80 font-semibold mb-4">Total: {formatPrice(total)}</div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMethod("card")}
              className={`w-1/2 border py-3 rounded-lg font-medium ${
                method === "card" ? "bg-white text-[#1E40AF]" : "bg-white/20 text-white"
              }`}
            >
              Credit Card
            </button>
            <button
              onClick={() => setMethod("cod")}
              className={`w-1/2 border py-3 rounded-lg font-medium ${
                method === "cod" ? "bg-white text-[#1E40AF]" : "bg-white/20 text-white"
              }`}
            >
              Cash on Delivery
            </button>
          </div>

          {method === "card" && (
            <Elements stripe={stripePromise}>
              <StripePayment
                total={total}
                cartItems={cartItems}
                user={user}
                onPaymentSuccess={onPaymentSuccess}
              />
            </Elements>
          )}

          {method === "cod" && (
            <button
              onClick={handleCOD}
              className="w-full bg-white text-[#1E40AF] mt-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              Place Order (COD)
            </button>
          )}
        </div>

        {/* COD TOAST */}
        {codMessage && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
            {codMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;