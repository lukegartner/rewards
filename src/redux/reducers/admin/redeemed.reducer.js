const adminRedeemedReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_REDEEMED_ADMIN":
      return action.payload;
    case "UNSET_REDEEMED_ADMIN":
      return {};
    default:
      return state;
  }
};

export default adminRedeemedReducer;
