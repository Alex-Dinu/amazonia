import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../redux/actions/productActions";

function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const imageLocationPath = "../images/";

  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product.id}>
              <div className="product">
                <Link to={"/product/" + product.id}>
                  <img
                    className="product-image"
                    src={imageLocationPath + product.imageFile}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={"/product/" + product.id}>
                    {product.description}
                  </Link>
                </div>
                <div className="product-price">${product.price}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
      ;
    </>
  );
}

export default HomeScreen;
