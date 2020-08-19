import React from "react";
function ProductImage(props) {
  return (
    <div className="cart-image">
      <img src={props.imageSource} alt={props.altText}></img>
    </div>
  );
}
export default ProductImage;
