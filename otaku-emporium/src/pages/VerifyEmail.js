import React, { useState, useEffect } from "react";
import axios from "axios";

//stylesheet
import "../stylesheet/accountVerify.css";

//Redux
import { useSelector } from "react-redux";

export const VerifyEmail = ({ setPageVerifyAccount, setVerificationCode }) => {
  //redux state
  const userData = useSelector((state) => state.loggedUserData);
  const [isVerified, setIsVerified] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:4600/users/isuserVerified/${userData.id}`)
      .then((res) => {
        setIsVerified(res.data.verified);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const verifyEmail = () => {
    axios
      .post("http://localhost:4600/users/sendEmailVerificationCode", {
        fname: userData.fname,
        email: userData.email,
      })
      .then((res) => {
        console.log(res);
        setVerificationCode(res.data.verificationCode);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid mt-3 mb-4">
      <div className=" mb-3">
        <span className="h4">Verify Account</span>
      </div>
      {/* horizontal line */}
      <hr className="text-center ms-auto me-auto" style={{ width: "75%" }} />

      {/* layout for email verification  */}
      <div className="container border px-4 py-4">
        <h4>Hello {userData.fname},</h4>
        {/* Image for email verification  */}
        <div className="text-center">
          <img
            src="./images/verified email(2).png"
            className="round-image"
            alt=""
          />
        </div>

        {isVerified === 0 ? (
          //email verification content
          <div className="text-center mt-4 ">
            <h4>Verify Your Email Address</h4>
            <p>
              Please confirm that you want to use this as your Sellfy account{" "}
              <br />
              email address. Once it's done you will be able to start using this
              account
            </p>

            <div className="d-grid gap-2 px-3 py-3">
              <button
                className="btn btn-success"
                onClick={(e) => {
                  e.preventDefault();
                  verifyEmail();
                  setPageVerifyAccount();
                }}
              >
                Verify my email
              </button>
            </div>

            <p className=" text-muted mt-2">
              Otaku Emporium &copy; 2022, All rights reserved
            </p>
          </div>
        ) : (
          //verified email content
          <div className="text-center mt-4 ">
            <h4>Your Email has been Verified</h4>
            <p>
              Thank you {userData.fname} for creating your account. Your email
              address has been verified. You can now use this account.
            </p>

            <p className=" text-muted mt-2">
              Otaku Emporium &copy; 2022, All rights reserved
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
