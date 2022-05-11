import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//stylesheet
import "../stylesheet/account.css";

//Redux
import { useDispatch } from "react-redux";
import { setLoggedUserData } from "../actions/Action";

export const ForgotPassword = (props) => {
  const [showInputBox, setShowInputBox] = useState(0);
  const [verifiedCode, setVerifiedCode] = useState();
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();

  const checkUserInputEmail = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4600/users/verifyEmailAddress", {
        email: document.getElementById("email").value,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          setShowInputBox(1);
          dispatch(setLoggedUserData(res.data.user));
          //send code to email address
          axios
            .post(
              "http://localhost:4600/users/sendChangePasswordVerificationCode",
              {
                fname: res.data.user.fname,
                email: res.data.user.email,
              }
            )
            .then((res1) => {
              console.log(res1);
              setVerifiedCode(res1.data.verificationCode);
            })
            .catch((err1) => {
              console.log(err1);
            });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data);
      });
  };

  const verifyCode = (e) => {
    e.preventDefault();
    console.log("verified", verifiedCode);
    const userInputCode = document.getElementById("code").value;
    if (parseInt(userInputCode) !== parseInt(verifiedCode)) {
      setErrors({
        success: false,
        msg: "Incorrect Code",
      });
    } else {
      console.log("Verified");
      props.history.push("/resetPassword");
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="mt-3">
          <h2> Forgot Password?</h2>
          <hr />
        </div>

        <form className="row g-3 needs-validation" noValidate>
          {errors ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              {errors.msg}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          ) : null}

          {/* Email Addres  */}
          <div className="col-md-8">
            <label htmlFor="validationCustomUsername" className="form-label">
              Email Address:
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
            <span className="text-muted">
              (Enter your email address to continue)
            </span>
          </div>
          {/* Code  */}
          {showInputBox === 1 ? (
            <div>
              <div className="col-md-8">
                <label htmlFor="code" className="form-label">
                  Code:
                </label>

                <input
                  type="number"
                  className="form-control"
                  id="code"
                  min="1109"
                  max="9989"
                  required
                />
              </div>
              <span className="col-md-8 text-muted">
                (Verification code has been sent to your email address. Enter to
                verify your account)
              </span>
            </div>
          ) : null}

          {/* Log in button  */}
          {showInputBox === 1 ? (
            <div className="col-12 mb-3">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={verifyCode}
              >
                Verify Code
              </button>
            </div>
          ) : (
            <div className="col-12 mb-3">
              <button
                className="btn btn-primary"
                type="button"
                onClick={checkUserInputEmail}
              >
                Continue
              </button>
            </div>
          )}
        </form>

        <div className="mb-2">
          <span className="fs-6">
            <Link to="/login">Log In Now</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
