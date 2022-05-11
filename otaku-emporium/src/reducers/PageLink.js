const link = null;

const pageLinkReducer = (state = link, action) => {
  switch (action.type) {
    case "getPageLink":
      return state;
    case "setPageLink":
      return (state = action.payload);
    default:
      return state;
  }
};

export default pageLinkReducer;
