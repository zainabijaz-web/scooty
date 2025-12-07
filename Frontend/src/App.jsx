import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Models from "./pages/Models";
import Article from "./pages/Article";
import Contact from "./pages/Contact";
import ScootyDetails from "./pages/ScootyDetails";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminApp from "./admin/AdminApp";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPage from "./pages/PaymentPage"; //Stripe payment page

const stripePromise = loadStripe("pk_test_1234567890"); //publishable key

const App = () => {
  const { user } = useSelector(state => state.auth); // Get logged-in user

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-[#374151] flex flex-col pt-16">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/details/:id" element={<ScootyDetails />} />
          <Route path="/article" element={<Article />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Auth Protected */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Payment */}
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={stripePromise}>
                  <PaymentPage />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          {/* Admin Routes - Protected */}
          <Route
            path="/admin/*"
            element={
              user?.user?.role === "admin" ? (
                <AdminApp />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Catch-all redirect for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};
export default App;