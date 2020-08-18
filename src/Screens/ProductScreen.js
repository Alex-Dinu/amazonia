import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../redux/actions/productActions";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
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
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img
                src={imageLocationPath + product.imageFile}
                alt="product"
              ></img>
            </div>
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
                      setQty(e.target.value);
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
                  <button onClick={handleAddToCart} className="button primary">
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

export default ProductScreen;
