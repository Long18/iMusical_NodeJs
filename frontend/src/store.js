import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newReviewReducer,
  productDetailsReducer,
  productsReducer,
} from "./reducers/ProductReducer";
import { profileReducer, userReducer } from "./reducers/UserReducer";
import { cartReducer } from "./reducers/CartReducer";
import { favouriteReducer } from "./reducers/FavouriteReducer";
import {
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./reducers/OrderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
  favourite: favouriteReducer,
  order: newOrderReducer,
  myOrder: myOrdersReducer,
  myOrderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  favourite: {
    favouriteItems: localStorage.getItem("favouriteItems")
      ? JSON.parse(localStorage.getItem("favouriteItems"))
      : [],
  },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
