import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  addCartId,
} from "../redux/actions/cartActions";
import { Link } from "react-router-dom";
import Axios from "axios";
import Cookie from "js-cookie";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  console.log(">>>CartScreen cart=" + JSON.stringify(cart));
  const imageLocationPath = "../images/";
  const cartItems = cart.cartItems;
  //console.log(">>>cartItems=" + JSON.stringify(cartItems));
  const productId = props.match.params.id;
  // Get the quantity from the query string.
  const quantity = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      const cart = Cookie.getJSON("cart") || [];
      if (cart.id) {
        dispatch(addToCart(cart.id, productId, quantity)).then(() => {
          console.log(">>>CartScreen.useEffect");
          updateCartDataStore();
        });
      } else {
        const cartId = getNewCartId().then((cartId) => {
          dispatch(addToCart(cartId, productId, quantity)).then(() => {
            console.log(">>>CartScreen.useEffect");
            updateCartDataStore();
          });
        });
      }
    }
  }, []);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId)).then(() => {
      updateCartDataStore();
      console.log(">>>CartScreen.removeFromCartHandler");
    });
  };
  const handleAddToCartClick = useCallback((productId, quantity) => {
    //console.log(">>>productId=" + productId + ", q=" + quantity);
    dispatch(addToCart(productId, quantity)).then(() => {
      updateCartDataStore();
      console.log(">>>CartScreen.handleAddToCartClick");
    });
  });

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  async function getNewCartId() {
    try {
      const { data } = await Axios.post("http://localhost:8080/cart", {});
      console.log(">>>CartScreen.getNewCartId cartid=" + data.id);
      return data.id;
      // const { data } = await Axios.post("http://localhost:8080/cart", {}).then(
      //   (res) => {
      //     console.log(">>>CartScreen.getNewCartId cartid=" + res.data.id);
      //     return res.data.id;
      //   }
      // );
    } catch (error) {
      console.log(">>>CartScreen.updateCartDataStore error=" + error.message);
    }
  }

  const updateCartDataStore = () => {
    const cart = Cookie.getJSON("cart") || [];
    const cartRequest = {
      id: cart.id,
      cartItems: cart.cartItems,
    };

    console.log(
      ">>>CartScreen.updateCartDataStore cartData=" +
        JSON.stringify({ cartRequest })
    );
    try {
      const { data } = Axios.post("http://localhost:8080/cart", cart);
    } catch (error) {
      console.log(">>>CartScreen.updateCartDataStore error=" + error.message);
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
