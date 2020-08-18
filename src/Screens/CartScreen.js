import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";
import Axios from "axios";
import Cookie from "js-cookie";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const imageLocationPath = "../images/";
  const { cartItems } = cart;
  const productId = props.match.params.id;
  // Get the quantity from the query screen.
  const quantity = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      console.log(">>>3");
      //console.log(">>>>useEffect pid = " + productId + "q=" + quantity);
      dispatch(addToCart(productId, quantity));
      console.log(">>>3.1");
      updateCartDataStore();
    }
  }, []);

  const removeFromCartHandler = (productId) => {
    console.log(">>>1");
    dispatch(removeFromCart(productId));
    console.log(">>>1.1");
    updateCartDataStore();
  };
  const handleAddToCartClick = useCallback((productId, quantity) => {
    //console.log(">>>productId=" + productId + ", q=" + quantity);
    console.log(">>>2");
    dispatch(addToCart(productId, quantity));
    console.log(">>>2.1");
    updateCartDataStore();
  });

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  const updateCartDataStore = () => {
    const cartItems = Cookie.getJSON("cartItems") || [];
    const cartData = { cartItems: cartItems };
    console.log(
      ">>>CartScreen.updateCartDataStore cartData=" + JSON.stringify(cartData)
    );
    try {
      const { data } = Axios.post("http://localhost:8080/cart", {
        cartData,
      }).then((res) => console.log(">>>res=" + JSON.stringify(res)));
    } catch (error) {
      console.log(">>>error=" + error.message);
    }
  };

  return (
    <div className="cart">
      <div className="cart-list">
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
                <div className="cart-image">
                  <img src={imageLocationPath + item.imageFile} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.Id}>{item.description}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.quantity}
                      onChange={(e) => {
                        handleAddToCartClick(item.product, e.target.value);
                      }}
                    >
                      {[...Array(5).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => a + c.quantity, 0)} items) : ${" "}
          {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
        </h3>
        <button
          onClick={checkoutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
