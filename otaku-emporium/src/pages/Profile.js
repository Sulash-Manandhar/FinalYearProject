import React, { Component } from "react";
import { LogIn } from "../components/LogIn";
import "../stylesheet/register.css";
import Account from "./Account";

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }
  Logout = () => {
    console.log("Logging out...");
    sessionStorage.removeItem("login_status");
    window.location.reload();
  };
  render() {
    return <>profile</>;
  }
}
