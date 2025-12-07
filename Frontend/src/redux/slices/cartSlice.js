import { createSlice } from "@reduxjs/toolkit";

const persisted = localStorage.getItem("cart");
const initialState = persisted ? JSON.parse(persisted) : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const exist = state.cartItems.find(i => i.id === item.id);
      if (exist) {
        exist.qty = (exist.qty || 1) + (item.qty || 1);
      } else {
        state.cartItems.push({ ...item, qty: item.qty || 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    setQty(state, action) {
      const { id, qty } = action.payload;
      state.cartItems = state.cartItems.map(i => i.id === id ? { ...i, qty } : i);
      state.cartItems = state.cartItems.filter(i => i.qty > 0);
      localStorage.setItem("cart", JSON.stringify(state));
    }
  }
});

export const { addToCart, removeFromCart, clearCart, setQty } = cartSlice.actions;
export default cartSlice.reducer;
