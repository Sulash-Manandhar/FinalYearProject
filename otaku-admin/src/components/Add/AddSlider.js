import React, { useState } from "react";
import axios from "axios";
import "../../stylesheets/apparel.css";
import "../../stylesheets/bootstrap.min.css";

export const AddSlider = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const addData = () => {
    axios
      .post("http://localhost:4600/addSlider", {
        title: document.getElementById("slider-title").value,
        imagePath: `/uploads/${filename}`,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:4600/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      addData(); //adding data to the database
      window.alert("Successfully Added to the database");
      window.location.reload();
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

  return (
    <>
      <div className="apparel-body">
        <div>
          <span className="header">Add a Slider</span>
          <hr />
        </div>

        <form onSubmit={onSubmit} className="form">
          {/* Slider Title */}
          <div className="mb-3">
            <label htmlFor="Slider_Title" className="form-label">
              Slider Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="slider-title"
              aria-describedby="Title of slider"
              required
            />
          </div>

          {/* Add Image  */}
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Slider Image:
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              required
              onChange={onChange}
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
};

export default AddSlider;
