const {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_ID,
  CART_ITEMS_REQUEST,
  CART_SAVE_SHIPPING,
} = require("../constants/cartConstants");

const initialState = {
  id: "",
  cartItems: [],
  shipping: {},
};

function cartReducer(state = { initialState }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // Find the product in the state cart.
      const product = state.cartItems.find(
        (p) => p.itemId === item.cartItems.itemId
      );
      if (product) {
        // if item is found in the cart, update it with the quantity.
        //console.log(">>>cartReducer existing product");
        return {
          id: item.id,
          cartItems: state.cartItems.map((i) =>
            i.product === product.itemId ? item : i
          ),
        };
      }

      //console.log(">>>cartReducer new product " + JSON.stringify(item));
      // return { cartItems: [...state.cartItems, item] };
      return {
        id: item.id,
        cartItems: [...state.cartItems, item.cartItems],
      };
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      };
    case CART_ITEMS_REQUEST:
      return state;

    case CART_ADD_ID:
      return { ...state, cartId: action.payload };

    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };

    default:
      return state;
  }
}

export { cartReducer };
