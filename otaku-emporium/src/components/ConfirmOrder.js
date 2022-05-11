import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router";
import "../stylesheet/register.css";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setLoggedUserData } from "../actions/Action";

export const ConfirmOrder = (props) => {
  const userData = useSelector((state) => state.loggedUserData);
  const dispatch = useDispatch();

  const { totalItem, totalAmount } = useParams();
  // console.log(totalItem, totalAmount);

  const [cartData, setCartData] = useState([]);
  //get user data after page reload
  useEffect(() => {
    if (userData.name === undefined) {
      if (!sessionStorage.getItem("user")) {
        window.alert("Something went wrong try again");
      }
      dispatch(setLoggedUserData(JSON.parse(sessionStorage.getItem("user"))));
    }
  }, []);

  //fetching user cart data
  useEffect(() => {
    axios
      .post(`http://localhost:4600/cart/getUserCart/${userData.id}`)
      .then((res) => {
        //set data
        setCartData(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [userData]);

  const d = new Date();
  //place user order
  const placeUserOrder = (e) => {
    e.preventDefault();
    let successRate = true;
    let checkIfUserPaid = {
      payment: "Cash On Delivery",
      isPaid: 0,
    };
    if (localStorage.getItem("payload")) {
      checkIfUserPaid.payment = "E-Payment";
      checkIfUserPaid.isPaid = 1;
    }

    if (!localStorage.getItem("buyNowData")) {
      // console.log(checkIfUserPaid.payment, checkIfUserPaid.isPaid);
      cartData.map((item) => {
        axios
          .post("http://localhost:4600/order/addUserOrder", {
            user_id: userData.id,
            item_id: item.id,
            name: item.name,
            imagePath: item.imagePath,
            quantity: item.quantity,
            price: item.price,
            size: item.size,
            date: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
            status: "Pending",
            payment: checkIfUserPaid.payment,
            isPaid: checkIfUserPaid.isPaid,
          })
          .then((res) => {
            console.log(res);
            if (localStorage.getItem("payload")) {
              localStorage.removeItem("payload");
            }
          })
          .catch((err) => {
            successRate = false;
            console.log(err.response.data);
          });
        axios
          .post(`http://localhost:4600/cart/removeAllItem/${userData.id}`)
          .then((res) => {
            console.log(res.data);
            if (localStorage.getItem("payload")) {
              localStorage.removeItem("payload");
            }
          })
          .catch((err) => {
            successRate = false;
            console.log(err.response.data);
          });
      });
    } else {
      const buyNowData = JSON.parse(localStorage.getItem("buyNowData"));
      console.log(buyNowData);
      axios
        .post("http://localhost:4600/order/addUserOrder", {
          user_id: userData.id,
          item_id: buyNowData.item_id,
          name: buyNowData.name,
          imagePath: buyNowData.imagePath,
          quantity: buyNowData.quantity,
          price: buyNowData.price,
          size: buyNowData.size,
          date: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
          status: "Pending",
          payment: checkIfUserPaid.payment,
          isPaid: checkIfUserPaid.isPaid,
        })
        .then((res) => {
          console.log(res);
          if (localStorage.getItem("payload")) {
            localStorage.removeItem("payload");
          }
        })
        .catch((err) => {
          successRate = false;
          console.log(err.response.data);
        });
    }
    if (successRate) {
      if (localStorage.getItem("payload")) {
        localStorage.removeItem("payload");
      }
      window.alert("Your order has been placed");
      props.history.push("/account");
    }
  };

  return (
    <div className="container">
      {localStorage.getItem("payload") ? (
        <div
          className="alert alert-success alert-dismissible fade show mt-3 mb-4"
          role="alert"
        >
          Your payment is successful.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : null}
      <div className="mt-3">
        <h2>Place Order!!!</h2>
        <span className="text-muted">(Confirm your address)</span>
        <hr />
      </div>
      <br />

      <form
        className="row g-3 needs-validation"
        noValidate
        onSubmit={placeUserOrder}
      >
        {/* First Name  */}
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="Happy"
            disabled
            value={userData.fname}
          />
        </div>

        {/* Last Name  */}
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="lname"
            placeholder="Smith"
            disabled
            value={userData.lname}
          />
        </div>

        {/* Email Address  */}
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">
            Email Address
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
              value={userData.email}
              disabled
            />
          </div>
        </div>

        {/* Payment type  */}
        <div className="col-md-4">
          <label htmlFor="location" className="form-label">
            Payment Type
          </label>
          <input
            type="text"
            className="form-control"
            id="payment"
            placeholder="Payment type "
            defaultValue={
              localStorage.getItem("payload") ? "ESEWA" : "Cash on Delivery"
            }
            disabled
          />
        </div>

        {/* Phone Number */}
        <div className="col-md-4">
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

        {/* District  */}
        <div className="col-md-4">
          <label htmlFor="District selection" className="form-label">
            District
          </label>

          <select className="form-select" id="district" required>
            <option value="Kathmandu">Kathmandu</option>

            {/* %{--Mechi--}% */}

            <option value="Taplejung">Taplejung</option>
            <option value="Panchthar">Panchthar</option>
            <option value="Ilam">Ilam</option>
            <option value="Jhapa">Jhapa</option>
            {/* %{--Koshi--}% */}
            <option value="Morang">Morang</option>
            <option value="Sunsari">Sunsari</option>
            <option value="Dhankutta">Dhankutta</option>
            <option value="Sankhuwasabha">Sankhuwasabha</option>
            <option value="Bhojpur">Bhojpur</option>
            <option value="Terhathum">Terhathum</option>
            {/* %{--Sagarmatha--}% */}
            <option value="Okhaldunga">Okhaldunga</option>
            <option value="Khotang">Khotang</option>
            <option value="Solukhumbu">Solukhumbu</option>
            <option value="Udaypur">Udaypur</option>
            <option value="Saptari">Saptari</option>
            <option value="Siraha">Siraha</option>
            {/* %{--Janakpur--}% */}
            <option value="Dhanusa">Dhanusa</option>
            <option value="Mahottari">Mahottari</option>
            <option value="Sarlahi">Sarlahi</option>
            <option value="Sindhuli">Sindhuli</option>
            <option value="Ramechhap">Ramechhap</option>
            <option value="Dolkha">Dolkha</option>
            {/* %{--Bagmati--}% */}
            <option value="Sindhupalchauk">Sindhupalchauk</option>
            <option value="Kavreplanchauk">Kavreplanchauk</option>
            <option value="Lalitpur">Lalitpur</option>
            <option value="Bhaktapur">Bhaktapur</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Nuwakot">Nuwakot</option>
            <option value="Rasuwa">Rasuwa</option>
            <option value="Dhading">Dhading</option>
            {/* %{--Narayani--}% */}
            <option value="Makwanpur">Makwanpur</option>
            <option value="Rauthat">Rauthat</option>
            <option value="Bara">Bara</option>
            <option value="Parsa">Parsa</option>
            <option value="Chitwan">Chitwan</option>
            {/* %{--Gandaki--}% */}
            <option value="Gorkha">Gorkha</option>
            <option value="Lamjung">Lamjung</option>
            <option value="Tanahun">Tanahun</option>
            <option value="Tanahun">Tanahun</option>
            <option value="Syangja">Syangja</option>
            <option value="Kaski">Kaski</option>
            <option value="Manag">Manag</option>
            {/* %{--Dhawalagiri--}% */}
            <option value="Mustang">Mustang</option>
            <option value="Parwat">Parwat</option>
            <option value="Myagdi">Myagdi</option>
            <option value="Myagdi">Myagdi</option>
            <option value="Baglung">Baglung</option>
            {/* %{--Lumbini--}% */}
            <option value="Gulmi">Gulmi</option>
            <option value="Palpa">Palpa</option>
            <option value="Nawalparasi">Nawalparasi</option>
            <option value="Rupandehi">Rupandehi</option>
            <option value="Arghakhanchi">Arghakhanchi</option>
            <option value="Kapilvastu">Kapilvastu</option>
            {/* %{--Rapti--}% */}
            <option value="Pyuthan">Pyuthan</option>
            <option value="Rolpa">Rolpa</option>
            <option value="Rukum">Rukum</option>
            <option value="Salyan">Salyan</option>
            <option value="Dang">Dang</option>
            {/* %{--Bheri--}% */}
            <option value="Bardiya">Bardiya</option>
            <option value="Surkhet">Surkhet</option>
            <option value="Dailekh">Dailekh</option>
            <option value="Banke">Banke</option>
            <option value="Jajarkot">Jajarkot</option>
            {/* %{--Karnali--}% */}
            <option value="Dolpa">Dolpa</option>
            <option value="Humla">Humla</option>
            <option value="Kalikot">Kalikot</option>
            <option value="Mugu">Mugu</option>
            <option value="Jumla">Jumla</option>
            {/* %{--Seti--}% */}
            <option value="Bajura">Bajura</option>
            <option value="Bajhang">Bajhang</option>
            <option value="Achham">Achham</option>
            <option value="Doti">Doti</option>
            <option value="Kailali">Kailali</option>
            {/* %{--Mahakali--}% */}
            <option value="Kanchanpur">Kanchanpur</option>
            <option value="Dadeldhura">Dadeldhura</option>
            <option value="Baitadi">Baitadi</option>
            <option value="Darchula">Darchula</option>
          </select>
        </div>

        {/* Location  */}
        <div className="col-md-4">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Location around your area"
            required
            defaultValue={userData.location}
          />
        </div>

        {/* Province Number  */}
        <div className="col-md-4">
          <label htmlFor="province" className="form-label">
            Province
          </label>
          <select className="form-select" id="province" required>
            <option value="3">3</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* Submit button  */}
        <div className="col-12 mb-2">
          <button className="btn btn-primary" type="submit">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};
