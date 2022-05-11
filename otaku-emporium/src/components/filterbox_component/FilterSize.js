import React from "react";

export const FilterSize = ({ getFilterSize }) => {
  const handleSize = () => {
    let temp = [];
    let checkboxArray = document.getElementsByName("size");
    for (let i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray[i].checked) {
        temp.push(checkboxArray[i].value);
      }
    }
    console.log(temp);
    getFilterSize(temp);
  };
  return (
    <>
      <div className="col-md mt-4">
        <div className="h3 border-bottom">Size</div>
        <form className="form" onChange={handleSize}>
          <div className="col-md mb-1">
            <input
              type="checkbox"
              name="size"
              id="size-small"
              value="small"
              className="me-2"
              onClick={handleSize}
            />
            <label htmlFor="small">Small</label>
          </div>

          <div className="col-md mb-1">
            <input
              type="checkbox"
              name="size"
              id="size-medium"
              className="me-2"
              value="medium"
              onClick={handleSize}
            />
            <label htmlFor="medium">Medium</label>
          </div>
          <div className="col-md mb-1">
            <input
              type="checkbox"
              name="size"
              id="size-large"
              className="me-2"
              value="large"
              onClick={handleSize}
            />
            <label htmlFor="large">Large</label>
          </div>
        </form>
      </div>
    </>
  );
};
