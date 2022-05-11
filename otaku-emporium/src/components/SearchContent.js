import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const SearchContent = () => {
  let location = useLocation();
  const [searchWord, setSearchWord] = useState("");
  const [apparelData, setApparelData] = useState([]);
  const [drinkwareData, setDrinkwareData] = useState([]);
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [result, setResult] = useState([]);
  const [card, setCard] = useState([]);

  useEffect(() => {
    setResult([]);
    setCard([]);
    const myURL = location.pathname.split("/");
    // console.log(location);
    setSearchWord(myURL[2].toLowerCase());
    // console.log(searchWord);
  }, [location]);

  //get apparel data
  useEffect(() => {
    axios
      .get("http://localhost:4600/apparels/getApparels")
      .then((res) => {
        setApparelData(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  // get drinkware
  useEffect(() => {
    axios
      .get("http://localhost:4600/drinkware/getDrinkware")
      .then((res) => {
        setDrinkwareData(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  //get accessories data
  useEffect(() => {
    axios
      .get("http://localhost:4600/accessories/getAccessories")
      .then((res) => {
        setAccessoriesData(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  //filter apparel data
  useEffect(() => {
    let apparelFilterData = apparelData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchWord) ||
        item.category.toLowerCase().includes(searchWord) ||
        item.description.toLowerCase().includes(searchWord)
    );
    setResult(apparelFilterData);
  }, [apparelData, searchWord]);

  //filter drinkware data
  useEffect(() => {
    const text = "cup drinkware";
    let filterData = drinkwareData.filter((item) =>
      item.name.toString().toLowerCase().includes(searchWord)
    );

    if (text.includes(searchWord)) {
      let temp = [...result, ...drinkwareData];
      // console.log(temp);
      setResult(temp);
    }
    if (filterData.length) {
      let temp = [...result, ...filterData];
      setResult(temp);
    }

    // console.log("Result", result);
    // console.log("Filter Data", filterData);
  }, [drinkwareData, searchWord]);

  // filter accessories data
  useEffect(() => {
    let filterData = accessoriesData.filter(
      (item) =>
        item.name.toString().toLowerCase().includes(searchWord) ||
        item.category.toString().toLowerCase().includes(searchWord)
    );
    if (filterData.length) {
      let temp = [...result, ...filterData];
      setResult(temp);
    }

    console.log("Filter Data", filterData);
  }, [accessoriesData, searchWord]);

  useEffect(() => {
    let cardData = [];

    result.forEach((item) => {
      cardData.push(
        <div
          className="card mb-2 float-start me-3 inner-card-width"
          key={uuidv4()}
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
      setCard(cardData);
    });
  }, [result]);

  return (
    <>
      <div className="container-fluid mt-2 mb-2">
        <h3 className="mb-4 border-bottom">Search: {searchWord}</h3>
      </div>
      {card.length ? (
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col">
              <div className="">{card}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid mt-3 mb-4">
          <h4>No result found. Try different search word.</h4>
        </div>
      )}
    </>
  );
};
