import React, { useState, useEffect } from "react";
import axios from "axios";
var classNames = require("classnames");

export const HeroSlide = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4600/getSlider")
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log("Error!!!");
      });
  }, []);

  useEffect(() => {
    if (data.length) {
      let carouselItems = [];

      carouselItems = data.map(function (item, index) {
        return (
          <div
            className={classNames({
              active: index === activeIndex,
              "carousel-item": true,
            })}
            key={item.id}
          >
            <img
              src={item.imagePath}
              className="d-block w-100"
              alt={item.title}
            />
          </div>
        );
      });

      setCarouselItems(carouselItems);
    }
  }, [data]);

  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {/* //something  */}
          {carouselItems}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
          // onClick={setActiveIndex(activeIndex + 1)}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default HeroSlide;
