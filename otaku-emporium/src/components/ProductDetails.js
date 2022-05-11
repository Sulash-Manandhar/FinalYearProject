import React, { useState, useEffect } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setCartItem } from "../actions/Action";

//stylesheet
import "../stylesheet/productDetails.css";

//react-icons
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { MdPayment } from "react-icons/md";

export const ProductDetails = (props) => {
  const dispatch = useDispatch();

  //redux state
  const [productData, setProductData] = useState([]);
  const productId = useSelector((state) => state.productId);
  const userData = useSelector((state) => state.loggedUserData);
  const pageLink = useSelector((state) => state.pageLink);
  const cartItem = useSelector((state) => state.cartItem);

  //useState
  const [isWishedIcon, setIsWishedIcon] = useState(false);
  const [quantityValue, setQuantityValue] = useState(1);
  const [size, setSize] = useState("none");

  //redirect back if product id is not found
  useEffect(() => {
    if (productId === null) {
      props.history.goBack();
    }
  }, []);

  //get product data using product id
  useEffect(() => {
    // console.log(pageLink, "/", productId);
    if (productId) {
      axios
        .get(`http://localhost:4600${pageLink}/${productId}`)
        .then((res) => {
          setProductData(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [productId]);

  //checkIsWish (is this item wished already)
  useEffect(() => {
    axios
      .post("http://localhost:4600/wishlist/checkIsWished", {
        user_id: userData.id,
        item_id: productId,
        category: productData.description,
      })
      .then((res) => {
        // console.log("Wishlisted?:", res.data);
        if (res.data.length !== 0) {
          setIsWishedIcon(true);
          console.log("isWished:", isWishedIcon);
        } else {
          setIsWishedIcon(false);
          console.log("isWished:", isWishedIcon);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productData]);

  //add to wishlist heart button
  const toggleWished = () => {
    //check if user is logged in
    if (userData.fname !== "") {
      // axios adding to user wish list
      if (!isWishedIcon) {
        axios
          .post("http://localhost:4600/wishlist/addWishList", {
            user_id: userData.id,
            item_id: productId,
            category: productData.description,
            item_name: productData.name,
            item_price: productData.price,
            item_imagePath: productData.imagePath,
            pageLink: pageLink,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      //axios removing from the wishlist
      if (isWishedIcon) {
        axios
          .post("http://localhost:4600/wishlist/deleteWishlist", {
            user_id: userData.id,
            item_id: productId,
            category: productData.description,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      //if user is not logged in
      window.alert("You are required to login first");
      setTimeout(props.history.push("/login"), 3000);
    }
  };

  //add item to cart
  const handleAddToCart = () => {
    if (userData.fname !== "") {
      let size = "none";
      if (productData.hasOwnProperty("small_size")) {
        let mySizeArray = document.getElementsByName("product-size");
        for (let i = 0; i < mySizeArray.length; i++) {
          if (mySizeArray[i].checked) {
            size = mySizeArray[i].value;
            break;
          }
        }
      }
      const d = new Date();
      console.log(d.getDate());

      //definnin data
      const sendData = {
        item_id: productData.id,
        user_id: userData.id,
        name: productData.name,
        description: productData.description,
        imagePath: productData.imagePath,
        quantity: quantityValue,
        price: productData.price,
        color: productData.color,
        size: size,
        pageLink: pageLink,
        date: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
        time: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
      };
      // console.log(sendData);

      //axios update user cart (adding item to user cart)
      axios
        .post("http://localhost:4600/cart/add_to_cart", sendData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            dispatch(setCartItem(cartItem + 1));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //if user is not logged in
      window.alert("You are required to login first");
      setTimeout(props.history.push("/login"), 3000);
    }
  };

  const handleBuyNow = () => {
    if (userData.fname !== "") {
      if (localStorage.getItem("payload")) {
        localStorage.removeItem("payload");
      }
      let size = "none";
      if (productData.hasOwnProperty("small_size")) {
        let mySizeArray = document.getElementsByName("product-size");
        for (let i = 0; i < mySizeArray.length; i++) {
          if (mySizeArray[i].checked) {
            size = mySizeArray[i].value;
            break;
          }
        }
      }
      const d = new Date();
      console.log(d.getDate());

      //definnin data
      const buyNowData = {
        item_id: productData.id,
        user_id: userData.id,
        name: productData.name,
        description: productData.description,
        imagePath: productData.imagePath,
        quantity: quantityValue,
        price: productData.price,
        color: productData.color,
        size: size,
        pageLink: pageLink,
        date: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
        time: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
      };

      if (localStorage.getItem("buyNowData")) {
        localStorage.removeItem("buyNowData");
        localStorage.setItem("buyNowData", JSON.stringify(buyNowData));
      } else {
        localStorage.setItem("buyNowData", JSON.stringify(buyNowData));
      }
    } else {
      //if user is not logged in
      window.alert("You are required to login first");
      setTimeout(props.history.push("/login"), 3000);
    }
  };

  //Khalti Config
  let config = {
    // replace this key with yours
    publicKey: "test_public_key_d82e882476af462bba27aeaef285fe38",
    productIdentity: uuidv4(),
    productName: productData.name,
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        localStorage.setItem("payload", JSON.stringify(payload));

        props.history.push(
          `/confirmOrder/1/${productData.price * quantityValue}`
        );
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
    <>
      <div className="container mt-5 mb-4">
        <div className="row">
          {/* image container  */}
          <div className="col-md-4">
            <img src={productData.imagePath} className="img-fluid" />
          </div>

          {/* product description container  */}
          <div className="col-md-8">
            <div className="container">
              {/* Name of product  */}
              <div className="container justify-content-between">
                <h1>{productData.name}</h1>
                {/* Wished Icon  */}
                <h2>
                  {isWishedIcon === true ? (
                    <AiFillHeart
                      className="icon2 ms-2"
                      onClick={() => {
                        setIsWishedIcon(!isWishedIcon);
                        console.log(isWishedIcon);
                        toggleWished();
                      }}
                    />
                  ) : (
                    <AiOutlineHeart
                      className="icon1 ms-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsWishedIcon(!isWishedIcon);
                        console.log(isWishedIcon);
                        toggleWished();
                      }}
                    />
                  )}
                </h2>
              </div>

              {/* Price of the product  */}
              <div className="container">
                <h2>Rs. {productData.price}/-</h2>
              </div>
              <br />
              {/* Color of the product  */}
              <div className="container">
                <label className=" fw-bold" htmlFor="color of the product">
                  Color family:
                </label>
                <br />
                <span
                  className="color-span"
                  style={{
                    backgroundColor: productData.color,
                  }}
                ></span>
              </div>

              {/* product Size  */}
              {productData.small_size ? (
                <div className="container mt-3">
                  <label className="span fw-bold">Available size: </label>
                  <br />

                  {/* Small size  */}

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="product-size"
                      id="small-size"
                      value="small"
                    />
                    <label className="form-check-label " htmlFor="small-size">
                      Small
                    </label>
                  </div>

                  {/* Medium size  */}
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="product-size"
                      id="medium-size"
                      value="medium"
                      defaultChecked
                    />
                    <label className="form-check-label " htmlFor="medium-size">
                      Medium
                    </label>
                  </div>

                  {/* Large size  */}
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="product-size"
                      id="large-size"
                      value="large"
                    />
                    <label className="form-check-label " htmlFor="large-size">
                      Large
                    </label>
                  </div>
                </div>
              ) : null}

              {/* Quanity of a product  */}

              <div className="container mt-3 mb-1">
                <label htmlFor="color of the product" className="me-3 fw-bold">
                  Quantity:
                </label>

                <span>
                  {/*decrease the value of quantity by 1, if quantity value is 0 value is not changed; ie quantityValue*/}
                  <button
                    className="btn btn-group btn-secondary btn-sm me-3"
                    onClick={(e) => {
                      e.preventDefault();
                      if (quantityValue === 1) {
                        return quantityValue;
                      }
                      setQuantityValue(quantityValue - 1);
                    }}
                  >
                    -
                  </button>

                  {quantityValue}
                  {/*increase the value of quantity by 1; ie quantityValue*/}

                  <button
                    className="btn btn-group btn-secondary btn-sm ms-3 "
                    onClick={(e) => {
                      e.preventDefault();
                      if (quantityValue === 10) {
                        return quantityValue;
                      }
                      setQuantityValue(quantityValue + 1);
                    }}
                  >
                    +
                  </button>
                </span>
              </div>

              {/* Button container  */}
              <div className="container mt-3 ">
                {/* <!-- Button trigger modal --> */}
                <button
                  type="submit"
                  className="btn btn-group btn-success btn-group-lg me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuyNow();
                  }}
                >
                  Buy Now
                </button>
                {/* <!-- Modal --> */}
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
                        <h5 className="modal-title" id="exampleModalLabel">
                          Confirm Payment Method
                        </h5>
                      </div>
                      <div className="modal-body d-flex justify-content-center">
                        {/* Cash on Delivery Button  */}
                        <div
                          className="card mt-3 mb-3 ms-4 broder shadow p-3 mb-5 bg-body rounded"
                          data-bs-dismiss="modal"
                          style={{ width: "30%", height: "30%" }}
                          onClick={(e) => {
                            e.preventDefault();
                            let totalAmount = productData.price * quantityValue;
                            localStorage.removeItem("payload");
                            props.history.push(
                              `/confirmOrder/1/${totalAmount}`
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
                        {/* E-payment  */}
                        <div
                          className="card mt-3 mb-3 ms-4 broder shadow p-3 mb-5 bg-body rounded"
                          style={{ width: "30%", height: "30%" }}
                          data-bs-dismiss="modal"
                          onClick={(e) => {
                            e.preventDefault();
                            let totalAmount = productData.price * quantityValue;
                            checkout.show({ amount: totalAmount * 5 });
                          }}
                        >
                          <MdPayment
                            className="card-img-top"
                            style={{ fontSize: "3em" }}
                          />
                          <span className="text-center mt-2">
                            Online Payment
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-group btn-group-lg btn-warning"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
