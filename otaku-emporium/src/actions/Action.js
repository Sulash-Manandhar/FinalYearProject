//return logged in user data
export const getLoggedUserData = () => {
  return {
    type: "getLoggedUserData",
  };
};

//set logged in user data
export const setLoggedUserData = (userData) => {
  return {
    type: "setLoggedUserData",
    payload: userData,
  };
};

//return product getProductId
export const getProductId = () => {
  return {
    type: "getProductId",
  };
};

//set product id
export const setProductId = (productId) => {
  return {
    type: "setProductId",
    payload: productId,
  };
};

//set prodcuct link
export const getPageLink = () => {
  return {
    type: "getPageLink",
  };
};

//set product id
export const setPageLink = (link) => {
  return {
    type: "setPageLink",
    payload: link,
  };
};

//set cartItem
export const getCartItem = () => {
  return {
    type: "getCartItem",
  };
};

//set cartItem
export const setCartItem = (cartItem) => {
  return {
    type: "setCartItem",
    payload: cartItem,
  };
};
