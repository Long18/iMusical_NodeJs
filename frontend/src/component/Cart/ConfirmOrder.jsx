import React from "react";
import "./ConfirmOrder.css";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../../more/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import BottomTab from "../../more/BottomTab";



const ConfirmOrder = ({ history }) => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const { user } = useSelector((state) => state.user);

    let priceVND = 0;
    
    let productPrice =  cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    const subtotal = productPrice 
      // eslint-disable-next-line
    const shippingCharges = productPrice > 99 ? 0 : 50;
    
    const totalPrice = (subtotal + shippingCharges)/22.88888888888;
  
    const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.country}`;
  
    const proceedToPayment = () => {
      const data = {
        subtotal,
        shippingCharges,
        totalPrice,
      };
  
      sessionStorage.setItem("orderInfo", JSON.stringify(data));
  
      history.push("/process/payment");
    };
  
    return (
      <>
        <MetaData title="Confirm Order" />
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
          <div>
            <div className="confirmshippingArea">
              <Typography>Shipping Info</Typography>
              <div className="confirmshippingAreaBox">
                <div>
                  <p>Name:</p>
                  <span>{user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography>Your Cart Items:</Typography>


              {cartItems.length === 0 ? 
                <div className="confirmCartItemsContainer">
                   ""
                 </div>
                  :
             <div className="confirmCartItemsContainer">
             {cartItems.map((item) => (
               <div key={item.product}>
                 <img src={item.image} alt="Product" />
                 <Link to={`/product/${item.product}`}>
                   {item.name}
                 </Link>{" "}
                 <span>
                   {item.quantity} X {item.price} ={" "}
                   <input type="hidden" value={priceVND = item.price * item.quantity}/>
                   <b>{priceVND.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</b>
                   
                 </span>
               </div>
             ))
              }
           </div>
          }
     
            </div>
          </div>
          {/*  */}
          <div>
            <div className="orderSummary">
              <Typography>Order Summery</Typography>
              <div>
                <div>
                  <p>Subtotal:</p>
                  <span>{subtotal.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                </div>
                <div>
                  <p>Shipping Charges:</p>
                  <span>{shippingCharges}</span>
                </div>
                <div>
                </div>
              </div>
  
              <div className="orderSummaryTotal">
                <p>
                  <b>Total:</b>
                </p>
                <span>{totalPrice.toLocaleString('en-US',{ style: 'currency', currency: 'USD' })}</span>
              </div>

              <div className="payment__method">
                <span style={{
                  textAliign: "center",
                  display: "block",
                  fontWeight: "600",
                }}>Select a payment method</span>
                <form>
                  <div style={{
                    justifyContent: "unset",
                    padding: "10px 0",
                  }}>
                    <input type="checkbox" name="Payment_method_Cash" required/>
                    <span style={{
                      paddingLeft: "5px",
                    }}>Cash on delivery</span>

                  </div>
                  <div style={{
                    justifyContent: "unset",
                    padding: "10px 0",
                  }}>
                    <input type="checkbox" name="Payment_method_Momo" required/>
                    <span style={{
                      paddingLeft: "5px",
                    }}>Momo payment</span>

                  </div>
                  <div style={{
                    justifyContent: "unset",
                    padding: "10px 0",
                  }}>
                    <input type="checkbox" name="Payment_method_Momo" required/>
                    <span style={{
                      paddingLeft: "5px",
                    }}>Ăn quỵt</span>

                  </div>
                </form>

              </div>
                  
              <button className="OrderConfirm__Button" onClick={proceedToPayment}>Proceed To Payment</button>
            </div>
          </div>
        </div>
        <BottomTab />
      </>
    );
  };
  
  export default ConfirmOrder;
