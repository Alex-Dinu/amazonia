import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import Axios from "axios";
import ProductImage from "../components/ProductImage";
function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const [tax, setTax] = useState(0);
  const imageLocationPath = "../images/";
  const { cartItems, shipping } = cart;

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = tax * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // const setTaxRate = (state) => async () => {
  //   console.log(">>>PlaceOrderScreen.setTax tax=" + tax);
  //   if (tax === 0) {
  //     const { data } = await Axios.get("http://localhost:8080/tax/" + state);
  //     console.log(">>>PlaceOrderScreen.setTax data=" + JSON.stringify(data));
  //     setTax(data.taxRate);
  //   }
  // };

  async function setTaxRate(state) {
    try {
      if (tax === 0) {
        const { data } = await Axios.get("http://localhost:8080/tax/" + state);
        console.log(">>>PlaceOrderScreen.setTax data=" + JSON.stringify(data));
        setTax(data.taxRate);
      }
    } catch (error) {
      console.log(">>>CartScreen.updateCartDataStore error=" + error.message);
    }
  }

  const placeOrder = () => {
    props.history.push("/order/");
  };
  useEffect(() => {
    setTaxRate(cart.shipping.state);
  }, []);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {cart.shipping.address}, {cart.shipping.city},
              {cart.shipping.postalCode},{cart.shipping.state},{" "}
              {cart.shipping.country},
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: *****</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li>
                    <ProductImage
                      className={"cart-image"}
                      imageSource={imageLocationPath + item.imageFile}
                      altText={item.description}
                    ></ProductImage>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>{item.name}</Link>
                      </div>
                      <div>Qty: {item.quantity}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button className="button primary full-width">Place Order</button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
            <li>
              <button onClick={placeOrder} className="button primary">
                Place Order
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
