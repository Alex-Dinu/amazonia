import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import PropTypes from "prop-types";

function Product(props) {
  const { product, loading, error } = props.productDetails;
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to items</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <ProductImage
              className={"details-image"}
              imageSource={props.imageLocationPath + product.imageFile}
              altText={product.description}
            ></ProductImage>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.description}</h4>
                </li>
                <li>
                  Price: <b>${product.price}</b>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Price: ${product.price}</li>
                <li>
                  Qty:{" "}
                  <select
                    value={product.quantity}
                    onChange={(e) => {
                      props.onQuantityChange(e.target.value);
                    }}
                  >
                    {[...Array(5).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  <button
                    onClick={props.onAddToCartClick}
                    className="button primary"
                  >
                    Add to Cart
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
Product.prototypes = {
  qqq: PropTypes.bool.isRequired,
};
