const {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_ID,
} = require("../constants/cartConstants");

function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      //console.log(">>>Reducer item=" + JSON.stringify(item));
      // Find the product in the state cart.
      const product = state.cartItems.find(
        (p) => p.productId === item.productId
      );
      if (product) {
        // if item is found in the cart, update it with the quantity.
        //console.log(">>>cartReducer existing product");
        return {
          cartItems: state.cartItems.map((i) =>
            i.product === product.productId ? item : i
          ),
        };
      }

      //console.log(">>>cartReducer new product " + JSON.stringify(item));
      return { cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      };

    // case CART_ADD_ID:
    //   return state.concat(cartId);
    default:
      return state;
  }
}

export { cartReducer };
