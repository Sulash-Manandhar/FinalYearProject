import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const ChangePassword = ({ logOut }) => {
  const userData = useSelector((state) => state.loggedUserData);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      id: userData.id,
      oldPassword: document.getElementById("old-password").value,
      newPassword1: document.getElementById("new-password1").value,
      newPassword2: document.getElementById("new-password2").value,
    };

    axios
      .post("http://localhost:4600/users/change-password", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          window.alert("Your password has been changed");
          logOut();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container mt-3">
        <div className="col-md mt-3">
          <h1>Change Password</h1>
        </div>
        {/* form data  */}
        <form className="row g-3 mt-2" onSubmit={onSubmitHandler}>
          {/* Old Password  */}
          <div className="col-md-7">
            <label htmlFor="validationCustom02" className="form-label">
              Old Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="old-password"
              placeholder="*******"
              required
            />
          </div>

          {/* New Password  */}
          <div className="col-md-7">
            <label htmlFor="validationCustom02" className="form-label">
              New Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="new-password1"
              placeholder="*******"
              required
            />
          </div>
          {/* Verify new Password input  */}
          <div className="col-md-7">
            <label htmlFor="validationCustom02" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="new-password2"
              placeholder="*******"
              required
            />
          </div>

          {/* Submit button  */}
          <div className="col-12 mb-2">
            <button className="btn btn-success" type="submit">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
