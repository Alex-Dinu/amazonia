import Axios from "axios";
import Cookie from "js-cookie";

const {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_ID,
} = require("../constants/cartConstants");

const addToCart = (productId, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("http://localhost:8080/item/" + productId);
    //console.log(">>>2 data=" + JSON.stringify(data));
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        price: data.price,
        description: data.description,
        imageFile: data.imageFile,
        productId: data.id,
        quantity,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

// const addCartId = (cartId) => {
//   dispatch({
//     type: CART_ADD_ID,
//     payload: cartId,
//   });

//   Cookie.set("cartId", JSON.stringify(cartId));
// };
export { addToCart, removeFromCart };
