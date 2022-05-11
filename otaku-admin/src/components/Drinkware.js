import React, { Component } from "react";
import style from "../stylesheets/users.module.css";

import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Drinkware extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flag: null,
      referenceValue: null,
    };
  }

  getDrinkware = () => {
    axios
      .get("http://localhost:4600/drinkware/getDrinkware")
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getDrinkware();
  }
  componentDidUpdate() {
    this.getDrinkware();
  }

  handleDelete = (itemId) => {
    console.log(itemId);
    var confimation = window.confirm(
      "Do you want to delete this data?(You cannot undo this command)"
    );
    if (confimation) {
      axios
        .delete("http://localhost:4600/drinkware/deleteDrinkware/" + itemId)
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
  render() {
    return (
      <>
        <div className={style.main}>
          {/* Header  */}
          <div className={style.header}>
            <span>Manage Drinkware</span>
          </div>
          <div className={style.crudButton}>
            <Link to="/addDrinkware">
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
                <th>Product Name</th>
                <th>Price</th>
                <th>Color</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item) => (
                <tr key={item.id}>
                  <td className={style.id}>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.color}</td>
                  <td className={style.email}>{item.description}</td>

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
                        this.props.history.push(`/editDrinkware#${item.id}`);
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
