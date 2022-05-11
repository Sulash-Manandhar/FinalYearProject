import React, { useState } from "react";
import axios from "axios";
import "../../stylesheets/apparel.css";
import "../../stylesheets/bootstrap.min.css";

export const AddNewArrival = () => {
  //States
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  //const [uploadedFile, setUploadedFile] = useState({});

  //OnChange update filename
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  //adds information to the json (name of product, description, image path, size color)
  const addData = () => {
    axios
      .post("http://localhost:4600/newArrival/addNewArrival", {
        name: document.getElementById("product-name").value,
        category: document.getElementById("product-category").value,
        description: document.getElementById("product-description").value,
        color: document.getElementById("product-color").value,
        smallSize: document.getElementById("small").checked ? 1 : 0,
        mediumSize: document.getElementById("medium").checked ? 1 : 0,
        largeSize: document.getElementById("large").checked ? 1 : 0,
        price: document.getElementById("product-price").value,
        imagePath: `/uploads/${filename}`,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // SUbmitting Image and calling add function
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
      console.log("File Uploaded");

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
    <div className="apparel-body">
      <div>
        <span className="header">Add a NewArrival</span>
        <hr />
      </div>

      <form onSubmit={onSubmit} className="form">
        {/* Product Name */}
        <div className="mb-3">
          <label htmlFor="ProductName" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="product-name"
            aria-describedby="Name of Product"
          />
        </div>

        {/* Product Category  */}
        <div className="mb-3">
          <label htmlFor="ProductCategory" className="form-label">
            Product Category:
          </label>
          <select
            className="form-select"
            id="product-category"
            aria-label="Category selection"
          >
            <option defaultValue="T-shirt">Choose...</option>
            <option value="SweatShirt">SweatShirt</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Full-sleeve T-shirt">Full-sleeve T-shirt</option>
            <option value="Half-sleeve T-shirt">Half-sleeve T-shirt</option>
          </select>
        </div>

        {/* Product Color */}
        <div className="mb-3">
          <label htmlFor="ProductColor" className="form-label">
            Product Color:
          </label>
          <input
            type="text"
            className="form-control"
            id="product-color"
            autoComplete="off"
            aria-describedby="Available Color of Product"
          />
        </div>

        {/* Product Price */}
        <div className="mb-3">
          <label htmlFor="ProductPrice" className="form-label">
            Product Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="product-price"
            autoComplete="off"
            aria-describedby="Price of Product"
          />
        </div>

        {/* Product Size */}
        <div
          className="mb-3"
          id="product-size"
          role="group"
          aria-label="Product Size selection"
        >
          <label htmlFor="ProductSize" className="form-label">
            Product Size:
          </label>
          <br />
          <input
            type="checkbox"
            value="small"
            className="btn-check"
            id="small"
            autoComplete="off"
          />
          <label
            id="checkbox"
            className="btn btn-outline-success"
            htmlFor="small"
          >
            Small
          </label>
          <input
            type="checkbox"
            value="medium"
            className="btn-check"
            id="medium"
            autoComplete="off"
            defaultChecked
          />
          <label
            id="checkbox"
            className="btn btn-outline-success"
            htmlFor="medium"
          >
            Medium
          </label>
          <input
            type="checkbox"
            value="large"
            className="btn-check"
            id="large"
            autoComplete="off"
          />
          <label
            id="checkbox"
            className="btn btn-outline-success"
            htmlFor="large"
          >
            Large
          </label>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="ProductDescription" className="form-label">
            Product Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="product-description"
            aria-describedby="Description of Product"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Add a product image
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
  );
};
export default AddNewArrival;
