import Axios from "axios";
import Cookie from "js-cookie";

const {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_ID,
  CART_ITEMS_REQUEST,
  CART_SAVE_SHIPPING,
} = require("../constants/cartConstants");

const addToCart = (cartId, productId, quantity) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await Axios.get("http://localhost:8080/item/" + productId);
    //console.log(">>>cartActions.addToCart data=" + JSON.stringify(data));
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: cartId,
        cartItems: {
          price: data.price,
          description: data.description,
          imageFile: data.imageFile,
          itemId: data.id,
          quantity,
        },
      },
    });

    Cookie.set("cart", JSON.stringify(getState().cart));
  } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const { cart } = getState();
  Cookie.set("cart", JSON.stringify(cart));
};

const getCart = () => (dispatch) => {
  dispatch({ type: CART_ITEMS_REQUEST });
};

const addCartId = (cartId) => (dispatch, getState) => {
  //console.log(">>>cartActions.addCartId cartId=" + cartId);
  dispatch({
    type: CART_ADD_ID,
    payload: cartId,
  });
  //console.log(">>>cartActions.addCartId state=" + JSON.stringify(getState()));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

export { addToCart, removeFromCart, addCartId, getCart, saveShipping };
