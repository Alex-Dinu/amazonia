import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import Cookie from "js-cookie";
import Cart from "../components/Cart";

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
        getNewCartId().then((cartId) => {
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
    //console.log(">>>CartScreen.checkoutHandler Im in");
    //return <Redirect push to="/shipping/" />;
    props.history.push("/shipping/");
  };

  async function getNewCartId() {
    try {
      const { data } = await Axios.post("http://localhost:8080/cart", {});
      console.log(">>>CartScreen.getNewCartId cartid=" + data.id);
      return data.id;
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
      Axios.post("http://localhost:8080/cart", cart);
    } catch (error) {
      console.log(">>>CartScreen.updateCartDataStore error=" + error.message);
    }
  };

  return (
    <Cart
      cartItems={cartItems}
      imageLocationPath={imageLocationPath}
      onQuantityChange={handleAddToCartClick}
      onDeleteItemClick={removeFromCartHandler}
      onCheckOutClick={checkoutHandler}
    ></Cart>
  );
}

export default CartScreen;
