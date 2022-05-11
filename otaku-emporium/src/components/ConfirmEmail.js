import React from "react";
//stylesheet
import "../stylesheet/accountVerify.css";

//Redux
import { useSelector } from "react-redux";
import axios from "axios";

export const ConfirmEmail = ({ code, setPage }) => {
  console.log("Code()confirm email:", code);

  //redux state
  const userData = useSelector((state) => state.loggedUserData);

  const authenticateUserVerificationCode = () => {
    // console.log("running");
    let code1 = document.getElementById("code1").value;
    let code2 = document.getElementById("code2").value;
    let code3 = document.getElementById("code3").value;
    let code4 = document.getElementById("code4").value;
    const userInputCode = `${code1}` + `${code2}` + `${code3}` + `${code4}`;
    // console.log("user", userInputCode);

    if (parseInt(userInputCode) === code) {
      axios
        .post(
          `http://localhost:4600/users/setUserVerificationTrue/${userData.id}`
        )
        .then((res) => {
          console.log(res);
          console.log("Verification Successful");
          setPage("VerifyAccount");
        })
        .catch((err) => {
          console.log(err);
          console.log("verification error");
        });
    }
  };
  return (
    <div className="container mt-3 mb-4">
      <div className="mb-3">
        <span className="h4">Confirm Email</span>
      </div>
      {/* horizontal line */}
      <hr className="text-center ms-auto me-auto" style={{ width: "75%" }} />
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
        <div className="text-center">
          <p>
            A verification code has been sent to your email address. Please
            insert <br />
            in below box to verify your password.
          </p>
          <input
            type="number"
            className="email-code-input me-2"
            pattern="[0-9]+"
            id="code1"
          />
          <input
            type="number"
            className="email-code-input me-2"
            pattern="[0-9]+"
            id="code2"
          />
          <input
            type="number"
            className="email-code-input me-2"
            id="code3"
            pattern="[0-9]+"
          />
          <input
            type="number"
            className="email-code-input me-2"
            id="code4"
            pattern="[0-9]+"
          />
          <div className="d-grid gap-2 px-3 py-3 mt-2 mb-2">
            <button
              className="btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                authenticateUserVerificationCode();
              }}
            >
              Confirm Code
            </button>
          </div>

          <p className=" text-muted mt-2">
            Otaku Emporium &copy; 2022, All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};
