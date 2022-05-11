import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const ResetPassword = (props) => {
  const userData = useSelector((state) => state.loggedUserData);

  const [errors, setErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    let errorMessages = [];
    errors.forEach((item, index) => {
      errorMessages.push(<li key={index}>{item.msg}</li>);
    });
    setErrorMessages(errorMessages);
  }, [errors]);

  const resetUserPassword = () => {
    const password = document.getElementById("pass").value;
    const confirmPassword = document.getElementById("confirm-pass").value;
    console.log(password, confirmPassword);
    axios
      .post("http://localhost:4600/users/resetUserPassword", {
        id: userData.id,
        password,
        confirmPassword,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          window.alert(
            "Password is reset. Now you can login with new password"
          );
          props.history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="mt-3">
          <h2> Reset Password</h2>
          <hr />
        </div>

        <form className="row g-3 needs-validation" noValidate>
          {errorMessages.length ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <ul>{errorMessages}</ul>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          ) : null}

          {/* Password  */}
          <div className="col-md-8">
            <label htmlFor="validationCustomUsername" className="form-label">
              Password
            </label>

            <div className="input-group has-validation">
              <input
                type="password"
                className="form-control"
                id="pass"
                aria-describedby="inputGroupPrepend"
                placeholder="******"
                required
              />
            </div>
          </div>
          {/* Confirm Password  */}
          <div className="col-md-8">
            <label htmlFor="validationCustomUsername" className="form-label">
              Confirm Password
            </label>

            <div className="input-group has-validation">
              <input
                type="password"
                className="form-control"
                id="confirm-pass"
                aria-describedby="inputGroupPrepend"
                placeholder="******"
                required
              />
            </div>
          </div>

          {/* Log in button  */}

          <div className="col-12 mb-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={resetUserPassword}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
