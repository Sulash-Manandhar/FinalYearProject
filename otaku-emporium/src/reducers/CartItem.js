const cartItem = 0;

const cartItemReducer = (state = cartItem, action) => {
  switch (action.type) {
    case "getCartItem":
      return state;
    case "setCartItem":
      return (state = action.payload);
    default:
      return state;
  }
};

export default cartItemReducer;
