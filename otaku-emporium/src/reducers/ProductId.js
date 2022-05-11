const productId = null;

const productIdReducer = (state = productId, action) => {
  switch (action.type) {
    case "getProductId":
      return state;
    case "setProductId":
      return (state = action.payload);
    default:
      return state;
  }
};

export default productIdReducer;
