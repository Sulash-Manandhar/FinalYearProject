import React, { Component } from "react";
import axios from "axios";

//react-icons
import { AiOutlineMinusCircle } from "react-icons/ai";
import { HiOutlineBan } from "react-icons/hi";
import { MdVerifiedUser } from "react-icons/md";

//stylesheet
import "../stylesheets/bootstrap.min.css";
import style from "../stylesheets/users.module.css";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flag: null,
    };
  }

  getUsers = () => {
    axios
      .get("http://localhost:4600/users/getUsers")
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((error) => {
        console.log("Error!!!");
      });
  };

  componentDidMount() {
    this.getUsers();
  }
  componentDidUpdate() {
    this.getUsers();
  }

  banData = (itemId) => {
    let userToBeModified = this.state.data.filter((item) => item.id === itemId);
    //console.log(userToBeModified);
    let isBan = userToBeModified[0].ban === 0 ? 1 : 0;
    //console.log(isBan);
    axios
      .put("http://localhost:4600/users/banUser", {
        userId: itemId,
        banValue: isBan,
      })
      .then((res) => {
        this.getUsers();
        //console.log(res);
        console.log(
          `User Id: ${itemId} is ${isBan === 1 ? "" : "not"} banned.`
        );
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  verifyUser = (itemId) => {
    let userToBeModified = this.state.data.filter((item) => item.id === itemId);
    console.log(userToBeModified);
    let isVerify = userToBeModified[0].verified === 0 ? 1 : 0;
    // console.log(isVerify);
    axios
      .post("http://localhost:4600/users/toggleUserVerification", {
        id: itemId,
        verifyValue: isVerify,
      })
      .then((res) => {
        console.log(res);
        this.getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteData = (itemId) => {
    var confimation = window.confirm(
      "Do you want to delete this data?(You cannot undo this command)"
    );
    //delete wishlist
    if (confimation) {
      axios
        .post(`http://localhost:4600/wishlist/deleteWishlist/${itemId}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      //delete cart history
      axios
        .post(`http://localhost:4600/cart/removeAllItem/${itemId}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });

      //delete order history
      axios
        .post(`http://localhost:4600/order/removeAllOrders/${itemId}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      // delete user axios
      axios
        .delete("http://localhost:4600/users/deleteUser/" + itemId)
        .then((res) => {
          // this.getUsers();
          console.log(res);
          console.log("Successfully deleted data.");
          alert("Successfully delete the data");
        })
        .catch((res) => {
          console.log(res);
          alert("Data was not deleted.");
        });
    } else {
      alert("Data was not deleted.");
    }
    // window.location.reload();
  };

  render() {
    return (
      <>
        <div className={style.main}>
          <div className={`${style.header}`}>
            <span>Manage Users </span>
          </div>
          <div className={style.clearfix}></div>
          <hr />

          <table className={style.table}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Ban</th>
                <th>Verified</th>

                <th>{/*verify button*/}</th>
                <th>{/*ban button*/}</th>
                <th>{/*delete user*/}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item) => (
                <tr key={item.id}>
                  <td className={style.id}>{item.id}</td>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td className={style.id}>{item.email}</td>
                  {/* Ban Data  */}
                  <td>{item.ban === 1 ? "Yes" : "No"}</td>
                  {/* Verified Data  */}
                  <td>{item.verified === 1 ? "Yes" : "No"}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        this.banData(item.id);
                      }}
                    >
                      Ban <HiOutlineBan />
                    </button>
                  </td>
                  {/* Verify User  */}
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={(e) => {
                        e.preventDefault();
                        this.verifyUser(item.id);
                      }}
                    >
                      Verify <MdVerifiedUser />
                    </button>
                  </td>
                  {/* Delete Data  */}
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        this.deleteData(item.id);
                      }}
                    >
                      {" "}
                      Delete <AiOutlineMinusCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
