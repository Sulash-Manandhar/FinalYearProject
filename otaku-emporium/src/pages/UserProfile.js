import React, { useState, useEffect } from "react";
import axios from "axios";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setLoggedUserData } from "../actions/Action";

//register css
import "../stylesheet/register.css";

export const UserProfile = ({ setPageChangePassword, history }) => {
  //redux state
  const userData = useSelector((state) => state.loggedUserData);
  const dispatch = useDispatch();

  // useState
  const [errors, setErrors] = useState([]);
  const [errorData, setErrorData] = useState([]);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");

  //get user data after page reload
  useEffect(() => {
    if (userData.name === undefined) {
      if (!sessionStorage.getItem("user")) {
        history.push("/login");
      }
      dispatch(setLoggedUserData(JSON.parse(sessionStorage.getItem("user"))));
    }
  }, []);

  //delete user
  const handleDeleteAccount = (e) => {
    e.preventDefault();

    const id = userData.id;
    console.log("id:", id);

    //delete wishlist
    axios
      .post(`http://localhost:4600/wishlist/deleteWishlist/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //delete cart history
    axios
      .post(`http://localhost:4600/cart/removeAllItem/${userData.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    //delete order history
    axios
      .post(`http://localhost:4600/order/removeAllOrders/${userData.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    // delete user axios
    axios
      .delete(`http://localhost:4600/users/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //logout user
    axios
      .get("http://localhost:4600/users/logout")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          sessionStorage.clear();
          const reduxDefaultValue = {
            id: 1,
            fname: "",
            lname: "",
            email: "",
            phone: "",
            province: 0,
            district: "",
            location: "",
            profile_image: "https://github.com/mdo.png",
          };

          //updating redux state
          dispatch(setLoggedUserData(reduxDefaultValue));

          window.location.replace("http://localhost:4001/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();
    const ans = window.confirm(
      "Are you sure you want to update your information?"
    );
    if (ans) {
      axios
        .post("http://localhost:4600/users/updateUser", {
          id: userData.id,
          fname: document.getElementById("fname").value,
          lname: document.getElementById("lname").value,
          phone: document.getElementById("phone-num").value,
        })
        .then((res) => {
          console.log(res.data.user);
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch(setLoggedUserData(res.data.user));
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data) {
            setErrors(err.response.data);
            console.log("debug error:", errors);
          }
        });
    } else {
      document.getElementById("fname").value = userData.fname;
      document.getElementById("lname").value = userData.lname;
      document.getElementById("phone-num").value = userData.phone;
    }
  };

  // handle error messages
  useEffect(() => {
    let errorMessages = [];
    errors.forEach((item, index) => {
      errorMessages.push(<li key={index}>{item.msg}</li>);
    });
    setErrorData(errorMessages);
  }, [errors]);

  //OnChange update filename
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  // SUbmitting Image and calling add function
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:4600/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File Uploaded");

      const newUserData = {
        id: userData.id,
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
        phone: userData.phone,
        province: userData.province,
        district: userData.district,
        location: userData.location,
        profile_image: `/uploads/${filename}`,
      };

      //update image path in db;
      axios
        .post("http://localhost:4600/users/updateUserProfile", {
          id: userData.id,
          profile_image: `/uploads/${filename}`,
        })
        .then((res) => {
          console.log(res.data);
          sessionStorage.clear();
          sessionStorage.setItem("user", JSON.stringify(newUserData));
          dispatch(setLoggedUserData(newUserData));
          setTimeout("", 3000);
          window.alert("Successfully changed profile picture");
          console.log("Session Storage updated");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid mt-3 mb-2">
        <div className="user-profile-header mb-3">
          <span className="h4">My Profile</span>
        </div>
        <div className="user-avatar-container">
          <div className="mb-2">
            <span className="mb-1">Avatar</span>
          </div>
          <div className="user-avatar">
            <img
              src="https://github.com/mdo.png"
              // src={
              //   userData.profile_image === undefined
              //     ? "https://github.com/mdo.png"
              //     : userData.profile_image
              // }
              alt="user_profile_img"
              width="46"
              height="46"
              className="rounded-circle"
            />

            {/* <!-- Button trigger modal --> */}
            {/* upload button  */}
            <button
              type="button"
              className="btn btn-primary btn-sm ms-3"
              value="Upload"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Change
            </button>
            {/* Model  */}
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Change your profile picture
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb">
                      <label htmlFor="formFile" className="form-label">
                        Profile Image
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        required
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={onSubmit}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* horizontal line */}
        <hr className="text-center ms-auto me-auto" style={{ width: "75%" }} />

        {/* error data display  */}
        {errorData.length ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            {errorData}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : null}

        {/* Form  */}
        <form className="row g-3 mb-3  pb-4 border-bottom">
          {/* First Name  */}
          <div className="col-md-6">
            <label htmlFor="validationCustom01" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="fname"
              placeholder="Happy"
              required
              defaultValue={userData.fname}
            />
          </div>
          {/* Last Name  */}
          <div className="col-md-6">
            <label htmlFor="validationCustom02" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lname"
              placeholder="Smith"
              required
              defaultValue={userData.lname}
            />
          </div>
          {/* Email Address  */}
          <div className="col-md-6 ">
            <label htmlFor="validationCustomUsername" className="form-label">
              Email Address{" "}
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="inputGroupPrepend"
                placeholder="offical.otakuemporium@gmail.com"
                required
                readOnly={userData.email}
              />
              <br />
            </div>
            <span className="text-muted text-center mt-1 fs-6">
              (Email address cannot be changed)
            </span>
          </div>

          {/* Phone Number */}
          <div className="col-md-6">
            <label htmlFor="validationCustom02" className="form-label">
              Phone Number:
            </label>
            <input
              type="number"
              className="form-control"
              id="phone-num"
              placeholder="98********"
              required
              autoComplete="true"
              defaultValue={userData.phone}
            />
          </div>
        </form>

        {/* //Change password account */}
        <div className="row mb-2 pb-3 border-bottom">
          <div className="col-md-8 text-start">
            <b>Change user password</b> <br />
            Updata your old password with a new password.
          </div>
          <div className="col-md text-end">
            <button
              className="mt-2 btn btn-warning btn-sm"
              onClick={(e) => {
                e.preventDefault();
                setPageChangePassword();
              }}
            >
              Change
            </button>
          </div>
        </div>

        {/* //delete account */}
        <div className="row mb-2 pb-3 border-bottom">
          <div className="col-md-8 text-start">
            <b>Delete Account</b> <br />
            By deleting your account, you will lose all your related
            information.
          </div>
          <div className="col-md text-end">
            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              className="btn btn-danger mt-2  btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Delete Account
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
                    Delete Account title
                    <h5 className="modal-title" id="exampleModalLabel">
                      Delete Your Account
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  {/* Delete account content */}
                  <div className="modal-body">
                    <p className="text-start">
                      By deleting your account, you will lose all your related
                      information (cart, purchase history).
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDeleteAccount}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Save Changes  */}
        <div className="col-md mt-4 mb-4 text-end">
          <button
            type="submit"
            className="btn btn-primary btn-sm "
            onClick={handleUserUpdate}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
