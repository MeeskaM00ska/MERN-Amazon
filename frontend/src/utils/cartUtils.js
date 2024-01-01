export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
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

  return state;
};
