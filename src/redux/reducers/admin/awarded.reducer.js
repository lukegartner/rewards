const adminAwardedReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_AWARDED_ADMIN":
      return action.payload;
    case "UNSET_AWARDED_ADMIN":
      return {};
    default:
      return state;
  }
};

export default adminAwardedReducer;
