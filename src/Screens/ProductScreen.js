import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../redux/actions/productActions";
import Product from "../components/Product";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();
  const imageLocationPath = "../images/";

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {};
  }, []);

  // Send user to the cart, providing the item and quantity.
  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <Product
      productDetails={productDetails}
      imageLocationPath={imageLocationPath}
      onQuantityChange={setQty}
      onAddToCartClick={handleAddToCart}
    ></Product>
  );
}

export default ProductScreen;
