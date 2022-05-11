import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../stylesheet/index.css";

//Redux
import { useDispatch } from "react-redux";
import { setProductId } from "../actions/Action";
import { setPageLink } from "../actions/Action";

export const FeatureProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4600/apparels/getApparels")
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let newData = data.filter((item) => item.is_featured === 1);
    // console.log(newData);
    let temp = [];
    newData.map((item, index) => {
      index < 4 ? temp.push(item) : console.log("-");
    });
    console.log(newData);
    setFilterData(temp);
  }, [data]);
  return (
    <>
      <div className="container-fluid clearfix mb-4">
        <div className="title">
          <h1 className="text-center">Feature Product</h1>
        </div>
        <div>
          {filterData.map((item) => (
            <div
              className="polaroid float-start "
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setProductId(item.id));
                dispatch(setPageLink("/apparels/getApparels"));
                history.push(`/productDetails`);
              }}
            >
              <img src={item.imagePath} alt="Norther Lights" />
              <div className="polaroid-text">
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeatureProduct;
