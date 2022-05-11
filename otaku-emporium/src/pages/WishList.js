import React, { useState, useEffect } from "react";
import axios from "axios";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setLoggedUserData } from "../actions/Action";
import { setProductId } from "../actions/Action";
import { setPageLink } from "../actions/Action";

export const WishList = (props) => {
  const userData = useSelector((state) => state.loggedUserData);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);

  //check if user is logged in?
  useEffect(() => {
    if (userData.name === "") {
      if (JSON.parse(sessionStorage.getItem("user")).fname === "") {
        window.alert("You need to be login first.");
        setTimeout(props.history.push("login"), 3000);
      }
      dispatch(setLoggedUserData(JSON.parse(sessionStorage.getItem("user"))));
    }
  }, []);

  //fetching user wishlist data
  useEffect(() => {
    axios
      .get(`http://localhost:4600/wishlist/getAllWishlist/${userData.id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [userData]);

  //adding data to the card
  useEffect(() => {
    let cardData = [];

    data.forEach((item) => {
      cardData.push(
        <div
          className="card mb-2 float-start me-3 inner-card-width"
          key={item.id}
          onClick={(e) => {
            e.preventDefault();
            dispatch(setProductId(item.item_id));
            dispatch(setPageLink(item.pageLink));
            props.history.push(`/productDetails`);
          }}
        >
          <img src={item.imagePath} className="card-img-top" />
          <div className="card-body">
            <span className="fs-6 text-muted ">Otaku Emporium</span>
            <div className="card-text h6 mb-1 card-text-height text-capitalize ">
              {item.name}
            </div>

            <div className="card-text h4">Rs. {item.price}/-</div>
            <p className="card-text text-end text-muted">Nepal</p>
          </div>
        </div>
      );
      setCardInfo(cardData);
    });
  }, [data]);

  return (
    <>
      {userData.fname !== "" ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col mt-3">
              <div className="h2 mb-3 pb-2 border-bottom">Your WishList</div>
              {cardInfo}
            </div>
          </div>
        </div>
      ) : (
        <div>Please login to use this functionality.</div>
      )}
    </>
  );
};

export default WishList;
