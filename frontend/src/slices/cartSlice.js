import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // any function that have to deal with the cart
    addToCart: (state, action) => {
      const item = action.payload; //新
      const existItem = state.cartItems.find((x) => x._id === item._id); //旧

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems];
      }

      // calculate item price
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // calculate shipping price (if order is over $100 free, else $10)
      state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);
      // calculate tax price(15% tax)
      state.taxPrice = addDecimals(Number(0.15 * state.itemPrice).toFixed(2));
      // calculate total price
      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

//export function as an action
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
