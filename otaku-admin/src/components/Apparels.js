import React, { Component } from "react";
import style from "../stylesheets/users.module.css";

import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineEdit,
  AiFillCheckCircle,
} from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Apparels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flag: null,
      referenceValue: null,
    };
  }

  getApparels = () => {
    axios
      .get("http://localhost:4600/apparels/getApparels")
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
    this.getApparels();
  }
  componentDidUpdate() {
    this.getApparels();
  }

  handleDelete = (itemId) => {
    console.log(itemId);
    var confimation = window.confirm(
      "Do you want to delete this data?(You cannot undo this command)"
    );
    if (confimation) {
      axios
        .delete("http://localhost:4600/apparels/deleteApparels/" + itemId)
        .then((res) => {
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
  };

  handleIsFeatured = (itemId) => {
    let userToBeModified = this.state.data.filter((item) => item.id === itemId);
    let changeFeature = userToBeModified[0].is_featured === 0 ? 1 : 0;

    axios
      .put("http://localhost:4600/apparels/updateFeature", {
        id: itemId,
        is_featured: changeFeature,
      })
      .then((res) => {
        this.getApparels();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(itemId);
  };
  render() {
    return (
      <>
        <div className={style.main}>
          {/* Header  */}
          <div className={style.header}>
            <span>Manage Apparels</span>
          </div>
          <div className={style.crudButton}>
            <Link to="/addApparels">
              <button type="button" className="btn btn-success">
                Add <AiOutlinePlusCircle />
              </button>
            </Link>
          </div>

          {/* Clearfix  */}
          <div className={style.clearfix}> </div>
          <hr />

          {/* Table Data  */}
          <table className={style.table}>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Category</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Color</th>
                <th>Featured</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item) => (
                <tr key={item.id}>
                  <td className={style.id}>{item.id}</td>
                  <td>{item.category}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.color}</td>
                  <td>{item.is_featured === 1 ? "Yes" : "No"}</td>

                  {/* Featured button */}
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        this.handleIsFeatured(item.id);
                      }}
                    >
                      Feature <AiFillCheckCircle />
                    </button>
                  </td>
                  {/* Delete button  */}
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

                  {/* Edit button  */}
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.history.push(`/editApparels#${item.id}`);
                      }}
                    >
                      Edit <AiOutlineEdit />
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
