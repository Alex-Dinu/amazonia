import React from "react";
import PropTypes from "prop-types";

function ProductImage(props) {
  return (
    <div className="cart-image">
      <img src={props.imageSource} alt={props.altText}></img>
    </div>
  );
}

ProductImage.prototypes = {
  imageSource: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default ProductImage;
