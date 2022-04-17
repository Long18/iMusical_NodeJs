/* eslint-disable no-unused-vars */
import "./App.css";

import ProtectedRoute from "./route/ProtectedRoute";

import Home from "./component/Home/Home";

import LoginSignup from "./component/Authentication/LoginSignup";

import ProductDetails from "./component/Products/ProductDetails";
import Products from "./component/Products/Products";
import Search from "./component/Products/Search";

import Profile from "./component/User/Profile";
import UpdatePassword from "./component/User/UpdatePassword";
import EditProfile from "./component/User/EditProfile";
import MyOrder from "./component/User/MyOrder";
import MyOrderDetails from "./component/User/MyOrderDetails";
import MoreOption from "./component/User/MoreOption";

import Cart from "./component/Cart/Cart";
import Favourites from "./component/Cart/Favourites";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import Success from "./component/Cart/Success";

import About from "./component/About/About";

import CommingSoon from "./more/CommingSoon.jsx";
import Rules from "./more/Rules.jsx";
import Contact from "./more/Contact.jsx";
import Support from "./more/Support";
import UserData from "./more/UserData";

import Store from "./store";
import { loadUser } from "./actions/UserAction";

import WebFont from "webfontloader";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "sans-serif", "Roboto Condensed"],
      },
    });
    Store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/login" component={LoginSignup} />
        <Route exact path="/about" component={About} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/Cart" component={Cart} />
        <Route exact path="/favourites" component={Favourites} />
        <Route exact path="/creator" component={CommingSoon} />
        <Route exact path="/faq" component={Rules} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/more" component={MoreOption} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <ProtectedRoute exact path="/me/update/info" component={EditProfile} />
        <ProtectedRoute exact path="/success" component={Success} />
        <ProtectedRoute exact path="/orders" component={MyOrder} />
        <ProtectedRoute exact path="/order/:id" component={MyOrderDetails} />
      </Switch>
    </Router>
  );
}
export default App;
