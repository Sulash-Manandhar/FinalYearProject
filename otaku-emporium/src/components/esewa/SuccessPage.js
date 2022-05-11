import React from "react";
import { Link } from "react-router-dom";

export const SuccessPage = () => {
  const payload = JSON.parse(localStorage.getItem("payload"));

  return (
    <div className="container mt-3 mb-4">
      <div className="card">
        <div className="card-body text-center">
          <h1>Payment Successful.</h1>
          <div>
            <img
              src="./images/tick.png"
              alt="success symbol"
              className="img-fluid "
              width="100px"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="card-text">
            Your order details:
            <ul className="list-group mt-3 mb-3">
              <li className="list-group-item">
                <b>Payment Id:</b> {payload.idx}
              </li>
              <li className="list-group-item">
                <b>Order Id:</b> {payload.product_identity}
              </li>

              <li className="list-group-item">
                <b>Mobile Number:</b> {payload.mobile}
              </li>
              <li className="list-group-item">
                <b>Product Name:</b> {payload.product_name}
              </li>
            </ul>
          </div>

          <div className="card-text">
            <span>
              Your payment has been successful. You can track your order from
              the user order section.
              <Link to="/account">Go to User Order section</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
