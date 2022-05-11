import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../stylesheet/account.css";

//Redux
import { useDispatch } from "react-redux";
import { setLoggedUserData } from "../actions/Action";

export const LogIn = (props) => {
  //Redux state
  // const userData = useSelector((state) => state.loggedUserData);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4600/users/login", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          console.log("success");
          sessionStorage.setItem("user", JSON.stringify(res.data.user));

          //updating redux
          dispatch(setLoggedUserData(res.data.user));
          setTimeout(props.history.push("/account"), 5000);
        }
      })
      .catch((err) => {
        if (err.response.data) {
          console.log(err.response.data);
          setErrors(err.response.data);
        }
        console.log(err);
      });
  };

  return (
    <>
      {sessionStorage.getItem("user") ? (
        props.history.push("/account")
      ) : (
        <div className="container-fluid">
          <div className="mt-3">
            <h2> Log in to your account</h2>
            <hr />
          </div>

          {errors ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              {errors.info.msg}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          ) : null}

          <form
            onSubmit={onSubmitHandler}
            className="row g-3 needs-validation"
            noValidate
          >
            {/* Email Addres  */}
            <div className="col-md-8">
              <label htmlFor="validationCustomUsername" className="form-label">
                Email Address
              </label>
              <div className="input-group has-validation">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="inputGroupPrepend"
                  placeholder="offical.otakuemporium@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Password  */}
            <div className="col-md-8">
              <label htmlFor="validationCustom02" className="form-label">
                Password:
              </label>

              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="*******"
                required
              />
            </div>

            {/* Log in button  */}
            <div className="col-12 mb-3">
              <button className="btn btn-primary" type="submit">
                Log in
              </button>
            </div>
          </form>
          <div className="mb-3 border-b">
            <span className="fs-6">
              <Link to="/forgotPassword">Forgot Password?</Link>
            </span>
          </div>

          <div className="mb-2">
            <span className="fs-6">
              Haven't registed yet? <Link to="/register">Register Now</Link>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LogIn;
