import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setLoggedUserData } from "../actions/Action";

export const ViewOrder = ({ orderId, setPageUserOrder }) => {
  //redux state
  const userData = useSelector((state) => state.loggedUserData);
  const dispatch = useDispatch();

  //useState
  const [orderData, setOrderData] = useState([]);
  const [progress, setProgrgess] = useState("0");
  const [disableCancel, setDisableCancel] = useState(0);

  //get user data after page reload
  useEffect(() => {
    if (userData.name === undefined) {
      if (!sessionStorage.getItem("user")) {
        window.alert("Something went wrong try again");
      }
      dispatch(setLoggedUserData(JSON.parse(sessionStorage.getItem("user"))));
    }
  }, []);

  useEffect(() => {
    axios
      .post(`http://localhost:4600/order/getOrder/${orderId}`)
      .then((res) => {
        //set data
        setOrderData(res.data.result[0]);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [userData]);

  //get status of a order
  useEffect(() => {
    if (orderData.status === "Pending") {
      setProgrgess("25%");
      setDisableCancel(0);
    } else if (orderData.status === "Packaged") {
      setProgrgess("50%");
      setDisableCancel(0);
    } else if (orderData.status === "On The Way") {
      setProgrgess("75%");
      setDisableCancel(1);
    } else if (orderData.status == "Delivered") {
      setProgrgess("100%");
      setDisableCancel(1);
    } else {
      setProgrgess("100%");
      setDisableCancel(1);
    }
  }, [orderData]);

  const cancelOrder = () => {
    console.log("button clicked");
    axios
      .post(`http://localhost:4600/order/cancelOrder/${orderId}`)
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success) {
          window.alert("Your order has been canceled");
        }
        setPageUserOrder();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="container-fluid mt-3">
      {/* //progress bar  */}

      <div
        className={
          orderData.status === "Canceled"
            ? "progress mt-4 mb-1 bg-danger"
            : "progress mt-4 mb-1"
        }
        style={{ height: "20px" }}
      >
        <div
          className={
            orderData.status === "Canceled"
              ? "progress-bar bg-danger"
              : orderData.status === "Delivered"
              ? "progress-bar bg-success"
              : "progress-bar"
          }
          role="progressbar"
          aria-valuenow="25"
          style={{ width: progress }}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div>
        <span className="text-center text-muted mb-4">{orderData.status}</span>
      </div>
      {/* Product Details  */}
      <div className="list-group mb-3 ">
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3 mb-2">
          <img
            src={orderData.imagePath}
            alt="twbs"
            width="100"
            height="100"
            className="rounded-circle flex-shrink-0"
          />
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <div className="d-flex justify-content-between">
                <h6 className="h4 mb-0">{orderData.name}</h6>
                <span className="float-end">
                  <b> ({orderData.isPaid === 1 ? "Paid" : "Remaining"})</b>
                </span>
              </div>
              <p className="mb-0 opacity-75">Price: {orderData.price}</p>
              {orderData.size !== "none" ? (
                <p className="mb-0 opacity-75">Size: {orderData.size}</p>
              ) : null}
              <p className="mb-0 opacity-75">Quantity: {orderData.quantity}</p>
              <p className="mb-0 opacity-75">
                Payment Type: {orderData.payment}
              </p>

              <p className="mb-0 opacity-75">Ordered Date: {orderData.date}</p>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2 mt-2">
          <button
            className={
              disableCancel === 0
                ? "btn btn-danger "
                : "btn btn-secondary disabled"
            }
            onClick={(e) => {
              e.preventDefault();
              cancelOrder();
            }}
            type="button"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
