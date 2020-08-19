import React from "react";
import { Link, Redirect } from "react-router-dom";
import ProductImage from "./ProductImage";
function Cart(props) {
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {props.cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            props.cartItems.map((item) => (
              <li>
                <ProductImage
                  className={"cart-image"}
                  imageSource={props.imageLocationPath + item.imageFile}
                  altText={item.description}
                ></ProductImage>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.Id}>{item.description}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.quantity}
                      onChange={(e) => {
                        props.onQuantityChange(item.product, e.target.value);
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
                      onClick={() => props.onDeleteItemClick(item.product)}
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
          Subtotal ( {props.cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
          items) : ${" "}
          {props.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
        </h3>
        <button
          onClick={props.onCheckOutClick}
          className="button primary full-width"
          // disabled={props.cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
export default Cart;
