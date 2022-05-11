import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMenu,
} from "react-icons/ai";

import axios from "axios";

//stylesheet
import "../stylesheet/header.css";
import { SearchBar } from "./SearchBar";
import { useSelector } from "react-redux";

export const Header = () => {
  const [data, setData] = useState([]);

  //console cart item
  const cartItem = useSelector((state) => state.cartItem);
  // console.log(cartItem);

  useEffect(() => {}, []);

  useEffect(() => {
    axios
      .get("http://localhost:4600/getNavLinks")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <header>
        {/* header 1 */}
        <div className="header-1">
          <nav className="navbar">
            <div className="container-fluid">
              {/* Logo of page  */}
              <Link className="navbar-brand" to="/">
                <img
                  src={process.env.PUBLIC_URL + "images/logo.png"}
                  alt="Logo of Otaku Emporium"
                  className="d-inline-block align-text-top"
                />
              </Link>

              {/* Search Bar  */}
              <div className="float-end">
                <SearchBar />
              </div>
            </div>
          </nav>
        </div>

        {/* header 2 */}
        <div className="header-2">
          <nav className="navbar navbar-expand-lg  ">
            <div className="container-fluid">
              {/* responsive button  */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <AiOutlineMenu className="menu-bar" />
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {/* nav links */}
                  {data.map((item) => (
                    <li className="nav-item" key={item.id}>
                      <Link
                        className="nav-link "
                        aria-current="page"
                        to={item.tab_link}
                      >
                        {item.tab_name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Side text  */}
                <span className="navbar-text">
                  <Link
                    to="/account"
                    className=" link-dark text-decoration-none" //extra classname: dropdown-toggle
                    id="dropdownUser1"
                    // data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={"https://github.com/mdo.png"}
                      // src={
                      //   userData.profile_image === null
                      //     ? "https://github.com/mdo.png"
                      //     : userData.profile_image
                      // } //
                      alt="user_profile_img"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                  </Link>
                </span>
                <span className="navbar-text">
                  <Link to="/cart" className="white-color position-relative">
                    <AiOutlineShoppingCart />
                    <span className="position-absolute top-20 start-100 translate-middle badge rounded-pill  bg-danger">
                      {cartItem}
                    </span>
                  </Link>
                </span>
                <span className="navbar-text">
                  <Link to="/wishList" className="white-color">
                    <AiOutlineHeart />
                  </Link>
                </span>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
