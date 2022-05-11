import React, { useEffect, useState } from "react";
import axios from "axios";

//Components
import { FilterColor } from "../components/filterbox_component/FilterColor";
import { FilterPrice } from "../components/filterbox_component/FilterPrice";

//stylesheet
import "../stylesheet/responsive.css";

//Redux
import { useDispatch } from "react-redux";
import { setProductId } from "../actions/Action";
import { setPageLink } from "../actions/Action";

export const NewArrival = (props) => {
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [msg, setMsg] = useState();
  const [cardInfo, setCardInfo] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:4600/apparels/getApparels")
      .then((res) => {
        setData(res.data);
        setTemp(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  useEffect(() => {
    let cardData = [];

    data.forEach((item) => {
      cardData.push(
        <div
          className="card mb-2 float-start mx-2 inner-card-width"
          key={item.id}
          onClick={(e) => {
            e.preventDefault();
            dispatch(setProductId(item.id));
            dispatch(setPageLink("/apparels/getApparels"));
            props.history.push(`/productDetails`);
          }}
        >
          <img
            src={item.imagePath}
            className="card-img-top"
            alt={item.description}
          />
          <div className="card-body">
            <span className="fs-6 text-muted ">Otaku Emporium</span>
            <div className="card-text h6 mb-1 card-text-height text-capitalize ">
              {item.name}
            </div>

            <div className="card-text h4">Rs. {item.price}/-</div>
            <p className="card-text text-end text-muted">Nepal</p>
          </div>
        </div>
      );
    });
    if (!cardData.length) {
      setMsg("No Result Found");
    } else {
      setMsg(null);
    }

    setCardInfo(cardData);
  }, [data]);

  const getFilterPrice = (amount) => {
    let newData = [...temp];
    newData = newData.filter((item) => item.price <= amount);
    setData(newData);
  };

  const getFilterColor = (color) => {
    let newData = [...temp];
    newData = newData.filter(
      (item) => item.color.toLowerCase() === color.toLowerCase()
    );
    console.log(newData);
    setData(newData);
  };

  const toggleFilter = () => {
    const filterContainer = document.getElementById("toggle-filter");
    if (filterContainer.style.display === "none") {
      filterContainer.style.display = "block";
    } else {
      filterContainer.style.display = "none";
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 mb-4 display-none">
          <FilterPrice getFilterPrice={getFilterPrice} />
          <FilterColor getFilterColor={getFilterColor} />
        </div>
        <div className="col mt-3">
          <div className="h2 mb-3 pb-2 border-bottom">
            New Arrival
            <div className="hide float-end clearfix">
              <button
                className="btn btn-secondary btn-sm"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFilter();
                }}
              >
                Show Filter
              </button>
            </div>
          </div>

          {/* //responsive button  */}

          <div id="toggle-filter" className="mb-3">
            <FilterPrice getFilterPrice={getFilterPrice} />
            <FilterColor getFilterColor={getFilterColor} />
          </div>
          {msg ? <div className="h2 mb-3 pb-2 ">{msg}</div> : null}

          {cardInfo}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
