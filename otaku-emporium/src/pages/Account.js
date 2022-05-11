import React, { useState, useEffect } from "react";

//react-icons
import { HiUsers } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";

//stylesheet
import "../stylesheet/account.css";

//pages and components
import UserProfile from "./UserProfile";
import UserOrders from "./UserOrders";
import axios from "axios";

//redux import
import { useDispatch, useSelector } from "react-redux";
import { setLoggedUserData, setCartItem, getCartItem } from "../actions/Action";
import { ChangePassword } from "../components/ChangePassword";
import { VerifyEmail } from "./VerifyEmail";
import { ConfirmEmail } from "../components/ConfirmEmail";
import ViewOrder from "../components/ViewOrder";

export const Account = (props) => {
  const dispatch = useDispatch();

  //redux state
  const userData = useSelector((state) => state.loggedUserData);

  //useState
  const [page, setPage] = useState("UserProfile");
  const [code, setCode] = useState(null);
  const [orderId, setOrderId] = useState(null);

  //get userData
  useEffect(() => {
    if (userData.name === undefined) {
      if (!sessionStorage.getItem("user")) {
        props.history.push("/login");
      }
      dispatch(setLoggedUserData(JSON.parse(sessionStorage.getItem("user"))));
    }
  }, []);

  const logOut = () => {
    axios
      .get("http://localhost:4600/users/logout")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          sessionStorage.clear();
          const reduxDefaultValue = {
            id: 1,
            fname: "",
            lname: "",
            email: "",
            phone: "",
            province: 0,
            district: "",
            location: "",
            profile_image: "https://github.com/mdo.png",
          };
          //updating redux state
          dispatch(setLoggedUserData(reduxDefaultValue));
          dispatch(setCartItem(0));
          setTimeout(props.history.push("/login"), 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setPageChangePassword = () => {
    setPage("ChangePassword");
    console.log(page);
  };

  const setPageVerifyAccount = () => {
    setPage("ConfirmEmail");
    console.log(page);
  };

  const setVerificationCode = (code) => {
    console.log("verifing");
    setCode(code);
  };
  const setPageViewOrder = (id) => {
    setPage("ViewOrder");
    setOrderId(id);
    console.log(id);
  };
  const setPageUserOrder = () => {
    setPage("UserOrder");
  };

  //set cartItem
  useEffect(() => {
    axios
      .post(`http://localhost:4600/cart/getUserCart/${userData.id}`)
      .then((res) => {
        dispatch(setCartItem(res.data.length));
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="account-sidebar d-flex flex-column flex-shrink-0 p-3 bg-light">
              <div className="mb-2">
                <span className="h4">Setting</span>
                <hr />
              </div>
              <ul className="nav nav-pills flex-column mb-auto">
                {/* UserProfile link  */}
                <li
                  className={
                    page === "UserProfile" || page === "ChangePassword"
                      ? "nav-link nav-link link-dark active pointer"
                      : "nav-link nav-link link-dark pointer"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setPage("UserProfile");
                    console.log("UserProfile");
                  }}
                >
                  <HiUsers className="me-2 icon-size " />
                  My Profile
                </li>
                {/* UserOrder link  */}
                <li
                  className={
                    page === "UserOrder"
                      ? "nav-link nav-link link-dark active pointer"
                      : "nav-link nav-link link-dark pointer"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setPage("UserOrder");
                    console.log("UserOrder");
                  }}
                >
                  <AiOutlineTable className="me-2 icon-size" />
                  My orders
                </li>

                {/* Verify Email link  */}
                <li
                  className={
                    page === "VerifyAccount"
                      ? "nav-link nav-link link-dark active pointer"
                      : "nav-link nav-link link-dark pointer"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setPage("VerifyAccount");
                    console.log("VerifyAccount");
                  }}
                >
                  <MdOutlineEmail className="me-2 icon-size" />
                  Verify Account
                </li>

                {/* Logout link */}
                <li className="nav-item ">
                  <button
                    className="nav-link nav-link link-dark"
                    onClick={logOut}
                  >
                    <BiLogOut className="me-2 icon-size" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col bg-red">
            {page === "UserProfile" ? (
              <UserProfile
                setPageChangePassword={setPageChangePassword}
                history={props.history}
              />
            ) : (
              ""
            )}
            {page === "UserOrder" ? (
              <UserOrders setPageViewOrder={setPageViewOrder} />
            ) : (
              ""
            )}
            {page === "ChangePassword" ? (
              <ChangePassword logOut={logOut} />
            ) : (
              ""
            )}
            {page === "VerifyAccount" ? (
              <VerifyEmail
                setPageVerifyAccount={setPageVerifyAccount}
                setVerificationCode={setVerificationCode}
              />
            ) : (
              ""
            )}
            {page === "ConfirmEmail" ? (
              <ConfirmEmail code={code} setPage={setPage} />
            ) : (
              ""
            )}
            {page === "ViewOrder" ? (
              <ViewOrder
                orderId={orderId}
                setPageUserOrder={setPageUserOrder}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="clearfix"></div>
    </>
  );
};

export default Account;
