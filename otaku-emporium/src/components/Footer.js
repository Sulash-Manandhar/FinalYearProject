import React from "react";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";

const Footer = () => {
  const userSubscribtion = () => {
    axios
      .post("http://localhost:4600/users/userSubscription", {
        email: document.getElementById("emailSubscription").value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <footer className="py-5">
        <div className="row d-flex justify-content-between">
          <div className="col-2">
            <h5>Pages</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/" className="nav-link p-0 text-muted">
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/newArrival" className="nav-link p-0 text-muted">
                  New Arrival
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/apparels" className="nav-link p-0 text-muted">
                  Apparels
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/drinkware" className="nav-link p-0 text-muted">
                  Drinkware
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/accessories" className="nav-link p-0 text-muted">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-2">
            <h5>Go to</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <li className="nav-item mb-2">
                  <Link to="/account" className="nav-link p-0 text-muted">
                    Account
                  </Link>
                </li>
                <Link to="/wishList" className="nav-link p-0 text-muted">
                  WhistList
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/cart" className="nav-link p-0 text-muted">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-4 offset-1">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of whats new and exciting from us.</p>
              <div className="d-flex w-100 gap-2">
                <label htmlFor="emailSubscription" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="emailSubscription"
                  type="text"
                  className="form-control"
                  placeholder="Email address"
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    userSubscribtion();
                  }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex justify-content-between py-4 my-4 border-top">
          <p>&copy; 2021 Otaku Emporium, Inc. All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className="link-dark" href="#">
                <AiOutlineInstagram />
              </a>
            </li>
            <li className="ms-3">
              <a className="link-dark" href="#">
                <AiOutlineTwitter />
              </a>
            </li>
            <li className="ms-3">
              <a className="link-dark" href="#">
                <BsFacebook />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
