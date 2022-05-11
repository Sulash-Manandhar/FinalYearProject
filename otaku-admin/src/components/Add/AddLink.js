import React, { Component } from "react";
import axios from "axios";
import "../../stylesheets/apparel.css";
import "../../stylesheets/bootstrap.min.css";

export default class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  getNavLinks = () => {
    axios
      .get("http://localhost:4600/getNavLinks")
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
    this.getNavLinks();
  }
  componentDidUpdate() {
    this.getNavLinks();
  }
  addData = () => {
    axios
      .post("http://localhost:4600/addLink", {
        tab_name: document.getElementById("tab-name").value,
        tab_link: document.getElementById("tab-link").value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    var tab_name = document.getElementById("tab-name").value;
    var tab_link = document.getElementById("tab-link").value;
    try {
      var check;

      //validation of link name and address
      this.state.data.map((item) => {
        if (item.tab_name.toUpperCase() === tab_name.toUpperCase()) {
          console.log("Please enter a unique tab_name");
          return (check = true);
        }
        if (item.tab_link.toUpperCase() === tab_link.toUpperCase()) {
          console.log("Please enter a unique tab_link");
          return (check = true);
        }
        return null;
      });
      if (!check) {
        this.addData(); //adding data to the database
        window.alert("Successfully Added to the database");
        window.location.reload();
      } else {
        window.alert(
          "Error!!! Please use different link name or link address..."
        );
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Error with the server");
        window.alert("Error while adding data to the database");
      } else {
        console.log(err.response.data.msg);
        window.alert("Error while adding data to the database");
      }
    }
  };

  render() {
    return (
      <>
        <div className="apparel-body">
          <div>
            <span className="header">Add a link</span>
            <hr />
          </div>

          <form onSubmit={this.onSubmit} className="form">
            {/* Link Name */}
            <div className="mb-3">
              <label htmlFor="Link_Name" className="form-label">
                Link Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="tab-name"
                aria-describedby="Name of Link"
                required
              />
            </div>

            {/* Link Address */}
            <div className="mb-3">
              <label htmlFor="Link_Address" className="form-label">
                Link Address:
              </label>
              <input
                type="text"
                className="form-control"
                id="tab-link"
                aria-describedby="Link Address"
                defaultValue="/"
                required
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
