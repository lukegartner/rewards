const userAwardedReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_AWARDED":
      return action.payload;
    case "UNSET_USER_AWARDED":
      return {};
    default:
      return state;
  }
};

export default userAwardedReducer;
