import React, { Component } from "react";
import axios from "axios";
import style from "../stylesheets/users.module.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
export default class NavLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flag: null,
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

  handleDelete = (itemId) => {
    console.log(itemId);
    var confimation = window.confirm(
      "Do you want to delete this data?(You cannot undo this command)"
    );
    if (confimation) {
      axios
        .delete("http://localhost:4600/deleteNavLink/" + itemId)
        .then((res) => {
          // console.log(res);
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
  };

  componentDidMount() {
    this.getNavLinks();
  }
  componentDidUpdate() {
    this.getNavLinks();
  }
  render() {
    return (
      <>
        <div className={style.main}>
          <div className={style.header}>
            <span>Manage Navbar Links</span>
          </div>

          <div className={style.crudButton}>
            <Link to="/addLink">
              <button type="button" className="btn btn-success">
                Add <AiOutlinePlusCircle />
              </button>
            </Link>
          </div>
          <div className={style.clearfix}></div>
          <hr />
        </div>

        <table className={style.table}>
          <thead>
            <tr>
              <th>Link ID</th>
              <th>Link Name</th>
              <th>Tab Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item) => (
              <tr key={item.id}>
                <td className={style.id}>{item.id}</td>
                <td>{item.tab_name}</td>
                <td>{item.tab_link}</td>

                {/* Delete Data  */}
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleDelete(item.id);
                    }}
                  >
                    Delete <AiOutlineMinusCircle />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
