import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setQty } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

// STRIPE import
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY_HERE");

// ========== STRIPE FORM COMPONENT ==========
const StripePayment = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async () => {
    if (!stripe || !elements) return;

    const res = await fetch(
      "http://localhost:5000/api/payment/create-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      }
    );

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
      }
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

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((s) => s.cart.cartItems);
  const user = useSelector((s) => s.auth.user);

  const total = cartItems.reduce(
    (acc, i) =>
      acc + (Number(i.price.replace(/[^0-9.-]+/g, "")) || 0) * (i.qty || 1),
    0
  );

  const formatPrice = (price) => {
    if (typeof price === "string" && price.includes("Rs.")) {
      return price;
    }
    return `Rs. ${parseInt(price).toLocaleString("en-PK")}`;
  };

  const [method, setMethod] = useState("card"); // card | cod
  const [codMessage, setCodMessage] = useState(""); // ✅ COD toast message

  const handleCOD = () => {
    setCodMessage("Order placed with Cash on Delivery!");
    setTimeout(() => setCodMessage(""), 3000); // 3 sec me hide ho jaye
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
            <p className="p-8 text-center bg-white/10 rounded-lg">
              Your cart is empty.
            </p>
          ) : (
            <>
              {cartItems.map((item) => (
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
                        dispatch(
                          setQty({ id: item.id, qty: (item.qty || 1) - 1 })
                        )
                      }
                      className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
                    >
                      -
                    </button>

                    <span className="font-medium">{item.qty || 1}</span>

                    <button
                      onClick={() =>
                        dispatch(
                          setQty({ id: item.id, qty: (item.qty || 1) + 1 })
                        )
                      }
                      className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(item.price)}</p>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-gray-400 hover:text-red-400 text-xl mt-2"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* ✅ Back to Shop Button */}
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

          {/* Total Payment */}
          <div className="text-white/80 font-semibold mb-4">
            Total: {formatPrice(total)}
          </div>

          {/* PAYMENT METHOD BUTTONS */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMethod("card")}
              className={`w-1/2 border py-3 rounded-lg font-medium ${
                method === "card"
                  ? "bg-white text-[#1E40AF]"
                  : "bg-white/20 text-white"
              }`}
            >
              Credit Card
            </button>

            <button
              onClick={() => setMethod("cod")}
              className={`w-1/2 border py-3 rounded-lg font-medium ${
                method === "cod"
                  ? "bg-white text-[#1E40AF]"
                  : "bg-white/20 text-white"
              }`}
            >
              Cash on Delivery
            </button>
          </div>

          {/* IF CARD → STRIPE */}
          {method === "card" && (
            <Elements stripe={stripePromise}>
              <StripePayment total={total} />
            </Elements>
          )}

          {/* IF COD → Toast Message */}
          {method === "cod" && (
            <button
              onClick={handleCOD}
              className="w-full bg-white text-[#1E40AF] mt-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              Place Order (COD)
            </button>
          )}
        </div>

        {/* ✅ COD Toast Notification */}
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