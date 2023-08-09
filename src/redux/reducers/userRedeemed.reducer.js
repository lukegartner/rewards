const userRedeemedReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_REDEEMED":
      return action.payload;
    case "UNSET_USER_REDEEMED":
      return {};
    default:
      return state;
  }
};

export default userRedeemedReducer;
