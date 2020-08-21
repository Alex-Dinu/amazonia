import React from "react";
import PropTypes from "prop-types";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen(props) {
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                ></input>
                <label htmlFor="paymentMethod">Paypal</label>
              </div>
            </li>

            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

PaymentScreen.propTypes = {
  qqq: PropTypes.string.isRequired,
};
export default PaymentScreen;
