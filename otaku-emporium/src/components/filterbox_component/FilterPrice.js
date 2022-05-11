import React, { useState } from "react";

export const FilterPrice = ({ getFilterPrice }) => {
  const [rangeValue, setRangeValue] = useState(500);

  const handleRange = (amount) => {
    setRangeValue(amount);
    getFilterPrice(amount);
  };
  return (
    <>
      <div className="col-md mt-4">
        <div className="h3 border=bottom">Price</div>
        <div className="form">
          <div className="col-md mb-1">
            <input
              type="range"
              className="form-range"
              min="100"
              max="2500"
              defaultValue="500"
              step="100"
              id="range-value"
              onChange={(e) => {
                e.preventDefault();
                handleRange(e.target.value);
              }}
            />
            <p className="text-center">Rs. {rangeValue} </p>
          </div>
        </div>
      </div>
    </>
  );
};
