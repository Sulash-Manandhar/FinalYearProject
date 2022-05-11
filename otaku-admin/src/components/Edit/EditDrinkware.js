import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../stylesheets/apparel.css";
import "../../stylesheets/bootstrap.min.css";

export const EditDrinkware = (props) => {
  const [editId, setEditId] = useState(0);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [drinkwareData, setDrinkwareData] = useState([]);

  useEffect(() => {
    setEditId(props.location.hash.slice(1));
    console.log(props.location.hash.slice(1));
  }, [props]);

  //updata datas
  useEffect(() => {
    if (editId) {
      axios
        .get(`http://localhost:4600/drinkware/getDrinkware/${editId}`)
        .then((res) => {
          setDrinkwareData(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [editId]);

  const addData = () => {
    axios
      .put("http://localhost:4600/drinkware/updateDrinkware/", {
        id: editId,
        name: document.getElementById("product-name").value,
        description: document.getElementById("product-description").value,
        color: document.getElementById("product-color").value,
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

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    console.log(`Filename:${filename}`);
  };

  return (
    <>
      <div className="apparel-body">
        <div>
          <span className="header">Edit a Drinkware</span>

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
              defaultValue={drinkwareData.name}
            />
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
              defaultValue={drinkwareData.color}
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
              defaultValue={drinkwareData.price}
            />
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
              defaultValue={drinkwareData.description}
            />
          </div>

          {/* Add Image  */}
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

          {/* Submit  */}
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
