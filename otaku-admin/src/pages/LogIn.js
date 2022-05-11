import React, { useState } from "react";
import "../stylesheets/body.css";
import style from "../stylesheets/login.module.css";

function LogIn({ Login, error }) {
  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  return (
    <div className={`${style.login}`}>
      <form onSubmit={submitHandler}>
        <div className={`${style.loginMainContainer}`}>
          <div className={`${style.loginHeader}`}>
            <img
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              alt="otaku-emporium-symbol"
            />
            <span> Admin </span>
          </div>
          <div className={`${style.inputContainer}`}>
            <input
              type="text"
              name="email"
              id="login-email-input"
              className="login-input-box"
              placeholder="Username..."
              required
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
          </div>
          <div className={`${style.inputContainer}`}>
            <input
              type="password"
              name="password"
              id="login-password-input"
              className="login-input-box"
              placeholder="Password...."
              required
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          {/* error message  */}{" "}
          {error !== "" ? (
            <div className={`${style.errorDisplay}`}> {error} </div>
          ) : (
            ""
          )}
          <div id="login-button-container">
            <input type="submit" value="Log In" className="btn btn-success" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
