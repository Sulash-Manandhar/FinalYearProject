import React, { Component } from "react";
import axios from "axios";
import style from "../stylesheets/users.module.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export default class SlideShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flag: null,
    };
  }

  getSlider = () => {
    axios
      .get("http://localhost:4600/getSlider")
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
    var confimation = window.confirm(
      "Do you want to delete this data?(You cannot undo this command)"
    );
    if (confimation) {
      axios
        .delete("http://localhost:4600/deleteSlider/" + itemId)
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
    this.getSlider();
  }
  componentDidUpdate() {
    this.getSlider();
  }
  render() {
    return (
      <>
        <div className={style.main}>
          <div className={style.header}>
            <span>Manage Navbar Links</span>
          </div>

          <div className={style.crudButton}>
            <Link to="/addSlider">
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
              <th>ID</th>
              <th>Image Title</th>
              <th>Image Path</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item) => (
              <tr key={item.id}>
                <td className={style.id}>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.imagePath}</td>

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
