import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const totalQty = cartItems.reduce((a, i) => a + (i.qty || 1), 0);
  const dispatch = useDispatch();

  return (
    <header className="fixed top-0 z-50 w-full 
  bg-gradient-to-r from-[#111827]/90 to-[#1E3A8A]/90 
  backdrop-blur-lg border-b border-blue-400/30">
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

    {/* Logo */}
    <Link to="/" className="text-3xl font-extrabold tracking-wide text-white">
      E-SCOOTY
    </Link>

    {/* Desktop Menu */}
    <nav className="hidden md:flex gap-10 text-white/80 text-sm font-medium">
      {[
        { path: "/", label: "Home" },
        { path: "/models", label: "Models" },
        { path: "/article", label: "Article" },
        { path: "/contact", label: "Contact" },
      ].map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `uppercase tracking-wider hover:text-white transition ${
              isActive ? "text-white font-semibold" : ""
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>

    {/* Right Side Buttons */}
    <div className="flex items-center gap-5">
      
      {/* Cart */}
      <Link
        to={user ? "/cart" : "/register"}
        className="relative w-10 h-10 rounded-full 
        bg-white/20 flex items-center justify-center 
        text-white hover:bg-white/30 transition"
      >
        <ShoppingCart size={20} />
        {totalQty > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
            {totalQty}
          </span>
        )}
      </Link>

      {/* Auth */}
      {!user ? (
        <Link
          to="/login"
          className="px-5 py-2 text-sm rounded-full bg-white/20 hover:bg-white/30 text-white transition"
        >
          LOGIN
        </Link>
      ) : (
        <button
          onClick={() => dispatch(logout())}
          className="px-5 py-2 text-sm rounded-full bg-white/20 hover:bg-white/30 text-white transition"
        >
          LOGOUT
        </button>
      )}

      {/* Mobile Toggle */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-white">
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {open && (
    <div className="md:hidden 
      bg-gradient-to-r from-[#111827] to-[#1E3A8A] 
      px-6 py-4 flex flex-col gap-4 text-white">
      <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
      <NavLink to="/models" onClick={() => setOpen(false)}>Models</NavLink>
      <NavLink to="/article" onClick={() => setOpen(false)}>Article</NavLink>
      <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

      {!user && <Link to="/login">Login</Link>}
    </div>
  )}
</header>
  );
}
