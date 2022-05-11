import React, { useEffect, useState } from "react";
import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import { v4 as uuidv4 } from "uuid";

import { BsCashCoin } from "react-icons/bs";
import { MdPayment } from "react-icons/md";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setLoggedUserData, setCartItem } from "../actions/Action";
import { AiOutlineMinus } from "react-icons/ai";

//stylesheet
import "../stylesheet/cart.css";

export const Cart = (props) => {
  const userData = useSelector((state) => state.loggedUserData);
  const dispatch = useDispatch();

  //useState
  const [data, setData] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productNames, setProductNames] = useState("");

  //get userData
  useEffect(() => {
    if (userData.name === undefined) {
      if (!sessionStorage.getItem("user")) {
        props.history.push("/login");
      }
      dispatch(setLoggedUserData(JSON.parse(sessionStorage.getItem("user"))));
    }
  }, []);

  //fetching user cart data
  useEffect(() => {
    if (localStorage.getItem("payload")) {
      localStorage.removeItem("payload");
    }
    axios
      .post(`http://localhost:4600/cart/getUserCart/${userData.id}`)
      .then((res) => {
        //set data
        setData(res.data);
        // console.log(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [userData]);

  // set total number of item, total price
  useEffect(() => {
    //set total number of item
    setTotalItem(data.length);
    //set total price
    let temp = 0;
    let tempName = "";
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].name);
      tempName = tempName + data[i].name;
      tempName = tempName + ";";

      temp += data[i].price * data[i].quantity;
    }
    setProductNames(tempName);
    setTotalAmount(temp);
    dispatch(setCartItem(data.length));
  }, [data]);

  console.log(productNames);
  useEffect(() => {
    let cardData = [];

    data.forEach((item) => {
      cardData.push(
        <div className="list-group mb-3  position-relative" key={item.id}>
          <div
            className="list-group-item  d-flex gap-3 py-3 mb-2 hover"
            aria-current="true"
          >
            <img
              src={item.imagePath}
              alt="product_img"
              width="48"
              height="48"
              className="rounded-circle flex-shrink-0"
            />
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <span className="h5 mb-0">{item.name}</span>
                <p className="mb-0 opacity-75">Family Color: {item.color}</p>
                <p className="mb-0 opacity-75">Price: Rs. {item.price}/-</p>
              </div>
              <div>
                <p className="mb-0 opacity-75">Quantity: {item.quantity}</p>
              </div>

              <small className="opacity-100 text-nowrap">
                Total:{item.price * item.quantity}
              </small>
            </div>
          </div>
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
            onClick={(e) => {
              e.preventDefault();
              removeItem(item.id);
            }}
          >
            <AiOutlineMinus className="cart-remove" />
            <span className="visually-hidden">unread messages</span>
          </span>
        </div>
      );
    });
    setCardInfo(cardData);
  }, [data]);

  //removing item from the cart
  const removeItem = (id) => {
    console.log(id);
    axios
      .post(`http://localhost:4600/cart/removeItem/${id}`)
      .then((res) => {
        console.log(res);
        let newCardData = [...data];
        newCardData = newCardData.filter((card) => card.id !== id);

        setData(newCardData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Khalti Config
  let config = {
    // replace this key with yours
    publicKey: "test_public_key_d82e882476af462bba27aeaef285fe38",
    productIdentity: uuidv4(),
    productName: productNames,
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        localStorage.setItem("payload", JSON.stringify(payload));

        props.history.push(`/confirmOrder/${totalItem}/${totalAmount}`);
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error.response);
        props.history.push("/esewaFail");
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  let checkout = new KhaltiCheckout(config);

  return (
    <div className="container-fluid">
      <div className="h2 mt-4 mb-3 pb-2 border-bottom">Your Cart</div>
      <div className="row justify-content-between">
        {/* column 1; product list  */}
        <div className="col-md-8 mt-3">{cardInfo}</div>
        {/* column 2 pay  */}
        <div className="col-4 mt-3 mb-4">
          <div className="border">
            <div className="text-center fw-bold">
              <span className="h5 mt-3 mb-4 ">Order Summary</span>
            </div>
            <ul className="list-group ">
              {/* Total Item  */}
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div>Total Item</div>
                </div>
                <span>{totalItem}</span>
              </li>
              {/* Total Amount  */}
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div>Total Amount</div>
                </div>
                <span>{totalAmount}</span>
              </li>

              {/* //checkout button  */}
              <li className="list-group-item ">
                <div className="d-grid gap-2">
                  {/* Model Trigger  */}
                  <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.clear();
                    }}
                  >
                    Checkout
                  </button>
                  {/* Modal  */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">
                            Choose A Payment Method
                          </h5>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                          {/* Cash on delivery  */}
                          <div
                            className="card mt-3 mb-3 ms-4 broder shadow p-3 mb-5 bg-body rounded text-cecnter"
                            data-bs-dismiss="modal"
                            style={{ width: "30%", height: "30%" }}
                            onClick={(e) => {
                              e.preventDefault();

                              props.history.push(
                                `/confirmOrder/${totalItem}/${totalAmount}`
                              );
                            }}
                          >
                            <BsCashCoin
                              className="card-img-top x"
                              style={{ fontSize: "3em" }}
                            />
                            <span className="text-center mt-2">
                              Cash on Delivery
                            </span>
                          </div>

                          {/* Online payment  */}

                          <div
                            className="card mt-3 mb-3 ms-4 broder shadow p-3 mb-5 bg-body rounded text-center"
                            data-bs-dismiss="modal"
                            style={{ width: "30%", height: "30%" }}
                            onClick={(e) => {
                              e.preventDefault();
                              checkout.show({ amount: totalAmount * 5 });
                            }}
                          >
                            <button type="submit">
                              <MdPayment
                                className="card-img-top"
                                style={{ fontSize: "3em" }}
                              />
                            </button>
                            <span className="text-center mt-2">
                              Online Payment
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
