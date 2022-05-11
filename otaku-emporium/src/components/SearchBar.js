import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

export const SearchBar = () => {
  const [inputWord, setInputWord] = useState("");
  let history = useHistory();

  const searchButtonTrigger = (e) => {
    e.preventDefault();
    if (inputWord === "") {
      console.log("Enter a word");
      return null;
    }
    console.log(inputWord);
    history.push(`/searchContent/${inputWord}`);
  };

  return (
    <form className="col d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        id="search-input"
        onChange={(e) => {
          e.preventDefault();
          setInputWord(e.target.value);
        }}
      />
      <button
        className="btn btn-outline-success"
        type="submit"
        onClick={searchButtonTrigger}
      >
        <BsSearch />
      </button>
    </form>
  );
};
