import loggedUserDataReducer from "./LoggedUserData";
import productIdReducer from "./ProductId";
import pageLinkReducer from "./PageLink";
import cartItemReducer from "./CartItem";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  loggedUserData: loggedUserDataReducer,
  productId: productIdReducer,
  pageLink: pageLinkReducer,
  cartItem: cartItemReducer,
});

export default allReducers;
