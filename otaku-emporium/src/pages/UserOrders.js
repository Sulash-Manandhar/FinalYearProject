import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setLoggedUserData } from "../actions/Action";

export const UserOrders = ({ setPageViewOrder }) => {
  const userData = useSelector((state) => state.loggedUserData);
  const dispatch = useDispatch();

  const [orderData, setOrderData] = useState([]);

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
      .post(`http://localhost:4600/order/getUserOrder/${userData.id}`)
      .then((res) => {
        //set data
        setOrderData(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [userData]);

  return (
    <>
      <div className="container-fluid mt-3 mb-2">
        <div className="user-profile-header mb-3">
          <span className="h2">My Orders</span>
        </div>

        {orderData.length ? (
          orderData.map((item, index) => (
            <div className="list-group mb-3 " key={index}>
              <div
                className="list-group-item list-group-item-action d-flex gap-3 py-3 mb-2"
                onClick={(e) => {
                  e.preventDefault();
                  setPageViewOrder(item.id);
                }}
              >
                <img
                  src={item.imagePath}
                  alt="twbs"
                  width="48"
                  height="48"
                  className="rounded-circle flex-shrink-0"
                />
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <p className="mb-0 opacity-75">Price: {item.price}</p>
                    {item.size !== "none" ? (
                      <p className="mb-0 opacity-75">Size: {item.size}</p>
                    ) : null}
                    <p className="mb-0 opacity-75">Quantity: {item.quantity}</p>
                  </div>

                  <small className="text-nowrap">
                    {item.status}({item.isPaid === 1 ? "Paid" : "Not Paid"})
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span>No Order has been placed till yet.</span>
        )}
      </div>
    </>
  );
};

export default UserOrders;
