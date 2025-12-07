import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const amount = 100; // Replace this with real cart total

  useEffect(() => {
    fetch("http://localhost:5000/api/payment/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        window.location.href = "/success";
      }
    }
  };

  return (
    <div className="w-full p-8">
      <form onSubmit={handleSubmit}>
        <CardElement className="border p-4 bg-white" />
        <button
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
          type="submit"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;