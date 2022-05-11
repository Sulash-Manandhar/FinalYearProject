import React from "react";
import { useHistory } from "react-router-dom";

import "../stylesheet/index.css";

export const TopCollection = () => {
  const history = useHistory();

  return (
    <>
      <div className="container ">
        <div className="title">
          <h1 className="text-center">Top Collection</h1>
        </div>
        <div className="container d-flex justify-content-around">
          <div
            className="polaroid"
            onClick={(e) => {
              e.preventDefault();
              history.push("/apparels");
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "images/image1.png"}
              alt="Norther Lights"
            />
            <div className="polaroid-text">
              <p>Apparels</p>
            </div>
          </div>
          <div
            className="polaroid"
            onClick={(e) => {
              e.preventDefault();
              history.push("/accessories");
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "uploads/maks87.png"}
              alt="Norther Lights"
            />
            <div className="polaroid-text">
              <p>Northern Lights</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopCollection;
